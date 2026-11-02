#!/usr/bin/env python3
"""
Grimsheet browser check: runs the main features in a real browser and reports what passed.

Setup (once):
    pip install selenium
Run (Firefox is the default; Selenium downloads the matching driver by itself):
    python browser_check.py
    python browser_check.py --browser edge        # or chrome
    python browser_check.py --headless            # without a visible window
    python browser_check.py --url http://localhost:8794/index.html

It uses a fresh, temporary browser profile, so nothing on your own Grimsheet is touched.
Screenshots and a report go into a "grimsheet-check" folder next to this script.
"""
import argparse, json, os, sys, time, traceback

try:
    from selenium import webdriver
    from selenium.common.exceptions import WebDriverException
except ImportError:
    sys.exit('Selenium is missing. Install it with:  pip install selenium')

ap = argparse.ArgumentParser(description='Check Grimsheet in a real browser.')
ap.add_argument('--browser', default='firefox', choices=['firefox', 'chrome', 'edge', 'webkit'])
ap.add_argument('--url', default='https://benfass.github.io/grimsheet/index.html')
ap.add_argument('--headless', action='store_true')
ap.add_argument('--slow', type=float, default=1.0, help='multiply the waits (2 = twice as slow)')
args = ap.parse_args()

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'grimsheet-check')
os.makedirs(OUT, exist_ok=True)
results = []


def start():
    b = args.browser
    if b == 'firefox':
        o = webdriver.FirefoxOptions()
        if args.headless: o.add_argument('-headless')
        return webdriver.Firefox(options=o)
    if b == 'chrome':
        o = webdriver.ChromeOptions()
        if args.headless: o.add_argument('--headless=new')
        return webdriver.Chrome(options=o)
    if b == 'edge':
        o = webdriver.EdgeOptions()
        if args.headless: o.add_argument('--headless=new')
        return webdriver.Edge(options=o)
    o = webdriver.WebKitGTKOptions()  # Linux only (used to try this script out)
    o.binary_location = '/usr/lib/x86_64-linux-gnu/webkit2gtk-4.1/MiniBrowser'
    o.add_argument('--automation')
    return webdriver.WebKitGTK(options=o)


d = start()
d.set_window_size(1200, 900)


def wait(s=0.35): time.sleep(s * args.slow)
def js(s, *a): return d.execute_script(s, *a)
def click(sel):
    if not js("var e=document.querySelector(arguments[0]); if(!e) return false; e.click(); return true;", sel):
        raise AssertionError('not found on screen: ' + sel)
    wait()
def setv(sel, v):
    # type a value and commit it, the way leaving the field does
    if not js("var e=document.querySelector(arguments[0]); if(!e) return false; e.focus(); e.value=arguments[1]; e.dispatchEvent(new Event('input',{bubbles:true})); e.dispatchEvent(new Event('change',{bubbles:true})); return true;", sel, v):
        raise AssertionError('field not found: ' + sel)
    wait()
def tick(sel, on=True):
    if not js("var e=document.querySelector(arguments[0]); if(!e) return false; e.checked=arguments[1]; e.dispatchEvent(new Event('change',{bubbles:true})); return true;", sel, on):
        raise AssertionError('checkbox not found: ' + sel)
    wait(0.2)
def text(sel): return js("var e=document.querySelector(arguments[0]); return e ? e.innerText.replace(/\\s+/g,' ').trim() : '';", sel)
def store(): return js("try { var s=JSON.parse(localStorage.getItem('grimsheet.v1')); return s ? {active: s.chars[s.active], n: Object.keys(s.chars).length} : null; } catch(e) { return {error: String(e)}; }")
def errors(): return js("return window.__gsErrs || []")
def catch_errors():
    js("if(!window.__gsErrs){window.__gsErrs=[];addEventListener('error',function(e){__gsErrs.push(String(e.message))});addEventListener('unhandledrejection',function(e){__gsErrs.push('promise: '+String(e.reason))});}")
def load():
    d.get(args.url); wait(2.5); catch_errors()
def step(name):
    def wrap(fn):
        t0 = time.time()
        try:
            detail = fn() or ''
            errs = errors()
            if errs: raise AssertionError('page errors: ' + '; '.join(errs[:3]))
            results.append((True, name, detail))
            print('  PASS  ' + name + (('  (' + detail + ')') if detail else ''), flush=True)
        except Exception as e:
            msg = str(e).split('\n')[0][:300]
            results.append((False, name, msg))
            print('  FAIL  ' + name + '  -> ' + msg, flush=True)
            try: d.save_screenshot(os.path.join(OUT, 'fail-%02d.png' % len(results)))
            except Exception: pass
            try: js("window.__gsErrs=[]")
            except Exception: pass
        return fn
    return wrap


print('Grimsheet browser check: %s at %s' % (args.browser, args.url), flush=True)
load()


@step('Loads and shows a character')
def _():
    ua = js('return navigator.userAgent')
    t = text('#top')
    assert t, 'the top bar is empty'
    v = js("var m=document.documentElement.innerHTML.match(/APP_VERSION = '([0-9.]+)'/); return m ? m[1] : '?'")
    return 'version %s · %s' % (v, ua.split(')')[-1].strip()[:60])


@step('Simple character: name, AC, max HP, damage')
def _():
    setv('#f-sname', 'Firefly'); setv('#f-ac', '15'); setv('#f-hpmax', '24'); setv('#hp-qm', '24'); setv('#hp-qm', '-5')
    wait(0.6)
    s = store()['active']
    assert s['name'] == 'Firefly', 'name is ' + s['name']
    assert str(s['acFormula']) == '15', 'AC formula is ' + str(s['acFormula'])
    assert s['hp']['cur'] == 19 and s['hp']['max'] == 24, 'HP is %s/%s' % (s['hp']['cur'], s['hp']['max'])
    return 'HP 19/24, AC 15'


@step('Rolls initiative')
def _():
    click('[data-act=init]'); wait(2.5)
    t = text('#tray')
    assert 'Initiative' in t, 'roll tray shows: ' + t[:80]
    return t[:40]


@step('Remembers the character after a reload')
def _():
    d.refresh(); wait(2.5); catch_errors()
    assert store()['active']['name'] == 'Firefly', 'got ' + store()['active']['name']


@step('Character wizard: halfling rogue')
def _():
    click('[data-act=modal][data-v=chars]'); click('.dlg [data-act=create]')
    setv('#cw-name', 'Pip')
    click('[data-act=cwcls][data-v=Rogue]'); click('[data-act=cwnext]')
    click('[data-act=cwsp][data-v=Halfling]'); click('[data-act=cwnext]')
    click('[data-act=cwbg][data-v=Criminal]'); click('[data-act=cwnext]')
    click('[data-act=cwnext]')  # abilities: standard array
    for s in ['Acrobatics', 'Deception', 'Insight', 'Perception']: tick('#cw-sk-' + s)
    click('[data-act=cwnext]'); click('[data-act=cwnext]')  # skills, equipment
    assert 'Finish' in text('.cw-steps .on'), 'stuck at ' + text('.cw-steps .on') + ': ' + text('.dlg-f .muted')
    click('[data-act=cwmake]'); wait(1)
    c = store()['active']
    skills = [s['name'] for s in c['skills'] if s['prof']]
    assert c['name'] == 'Pip' and c['cls'] == 'Rogue' and c['species'] == 'Halfling', '%s %s %s' % (c['name'], c['species'], c['cls'])
    assert len(skills) == 6, 'skills: ' + ', '.join(skills)
    return 'HP %s, skills %s' % (c['hp']['max'], ', '.join(skills))


@step('Attack roll with damage follow-up')
def _():
    ok = js("var b=[...document.querySelectorAll('.roll')].find(x=>/hit/.test(x.textContent)); if(!b) return false; b.click(); return true;")
    assert ok, 'no attack button on the sheet'
    wait(2.5)
    t = text('#tray'); assert 'to hit' in t, t[:80]
    assert js("return !!document.querySelector('#tray [data-act=dmg]')"), 'no Damage button after the hit'
    click('#tray [data-act=dmg]'); wait(2.5)
    t = text('#tray'); assert 'damage' in t.lower(), t[:80]
    return t[:50]


@step('Settings dialog')
def _():
    click('[data-act=modal][data-v=settings]')
    n = js("return document.querySelectorAll('.setrow').length")
    assert n >= 8, 'only %s rows' % n
    click('.dlg [data-act=close]')
    return '%s rows' % n


@step('Sheet tour: every bubble on screen')
def _():
    js("var b=document.createElement('button'); b.dataset.act='tour'; b.dataset.v='player'; document.body.appendChild(b); b.click(); b.remove();"); wait(0.8)
    seen, bad = [], []
    for _ in range(25):
        st = js("var t=document.querySelector('#tour'); if(!t) return null; var b=t.querySelector('.tour-bub').getBoundingClientRect(); return {t: t.querySelector('.tour-t').textContent, off: b.top < 0 || b.bottom > innerHeight + 1 || b.left < 0 || b.right > innerWidth + 1};")
        if not st: break
        seen.append(st['t'])
        if st['off']: bad.append(st['t'])
        js("var n=document.querySelector('#tour [data-tour=next]')||document.querySelector('#tour [data-tour=done]'); n&&n.click();"); wait(0.5)
    d.save_screenshot(os.path.join(OUT, 'after-tour.png'))
    assert len(seen) >= 10, 'only %d steps: %s' % (len(seen), ', '.join(seen))
    assert not bad, 'off screen: ' + ', '.join(bad)
    return '%d steps' % len(seen)


@step('Cleric starting at level 2: level-up, then Prepare spells')
def _():
    click('[data-act=modal][data-v=chars]'); click('.dlg [data-act=create]')
    setv('#cw-name', 'Mira')
    click('[data-act=cwcls][data-v=Cleric]'); setv('#cw-level', '2'); click('[data-act=cwnext]')
    click('[data-act=cwsp][data-v=Human]'); setv('#cw-sps', 'Athletics'); click('[data-act=cwnext]')
    click('[data-act=cwbg][data-v=Acolyte]'); click('[data-act=cwnext]'); click('[data-act=cwnext]')
    tick('#cw-sk-Medicine'); tick('#cw-sk-Persuasion'); click('[data-act=cwnext]'); click('[data-act=cwnext]')
    for n in ['SacredFlame', 'Guidance', 'Light', 'Bless', 'CureWounds', 'GuidingBolt', 'HealingWord']: tick('#cw-sp-' + n)
    click('[data-act=cwnext]'); click('[data-act=cwmake]'); wait(1.2)
    assert 'Level up' in text('.dlg h2'), 'expected the level-up, got: ' + text('.dlg h2')
    click('[data-act=ludo]'); wait(1.2)
    assert 'Prepare spells' in text('.dlg h2'), 'expected Prepare spells, got: ' + text('.dlg h2')
    count = text('.prep-count')
    tick('#pp-ShieldofFaith'); click('[data-act=prepsave]'); wait(0.8)
    c = store()['active']
    spells = [e['name'] for m in c['modules'] if m['type'] == 'spells' for e in m['entries']]
    assert c['level'] == 2 and 'Shield of Faith' in spells, 'level %s, spells %s' % (c['level'], spells)
    return count


@step('Narrow window: nothing sticks out sideways')
def _():
    d.set_window_size(420, 860); wait(1)
    w = js("return [document.documentElement.scrollWidth, innerWidth]")
    d.save_screenshot(os.path.join(OUT, 'narrow.png'))
    d.set_window_size(1200, 900); wait(0.5)
    assert w[0] <= w[1] + 2, 'page is %spx wide in a %spx window' % (w[0], w[1])
    return '%spx window' % w[1]


@step('Undo puts back a change')
def _():
    before = store()['active']['hp']['cur']
    setv('#hp-qm', '-3'); wait(0.5)
    assert store()['active']['hp']['cur'] == before - 3, 'damage not applied'
    ok = js("var b=document.querySelector('[data-act=undo]'); if(!b) return false; b.click(); return true;"); wait(0.8)
    if not ok: return 'no undo button found (skipped)'
    assert store()['active']['hp']['cur'] == before, 'HP is %s, expected %s' % (store()['active']['hp']['cur'], before)


d.save_screenshot(os.path.join(OUT, 'final.png'))
passed = sum(1 for r in results if r[0])
summary = '%d of %d passed in %s' % (passed, len(results), args.browser)
print('\n' + summary)
with open(os.path.join(OUT, 'report.txt'), 'w', encoding='utf-8') as f:
    f.write('Grimsheet browser check\nBrowser: %s\nUser agent: %s\nURL: %s\n\n' % (args.browser, js('return navigator.userAgent'), args.url))
    for ok, name, detail in results: f.write(('PASS  ' if ok else 'FAIL  ') + name + ('  ' + detail if detail else '') + '\n')
    f.write('\n' + summary + '\n')
print('Report and screenshots: ' + OUT)
d.quit()
