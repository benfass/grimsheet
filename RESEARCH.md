# Competitive Research — D&D Character Sheet Apps

*Researched October 2026. Companion to `SPEC.md`.*

## 1. Summary

Most existing tools are **compendium-first**: they shine when your content is official and already in their database, and they get awkward the moment you go homebrew. The tools that *do* handle homebrew well (DiceCloud, Foundry with modules) pay for it with complexity and a steep setup.

That leaves a clear gap for our app: **paste-first, homebrew-native, and still easy.** Our core idea — paste any text, then attach dice, saves and counters to it — is exactly what users of the big platforms keep asking for.

---

## 2. Apps reviewed

### D&D Beyond (official, Wizards of the Coast)
- Web + mobile app; character sheets sync across devices and work offline in the app. Free tier allows up to six characters.
- Strong builder and auto-calculation: modifiers, crit damage doubling, healing/damage math, 3D dice, color themes, real-time shared rolls, and (since April 2026) the sheet is embedded in its Maps VTT.
- 2026 roadmap: platform rebuild, a new guided "Quickbuilder", deeper builder customization, DM prep tools, and a new mobile app announced at Gen Con 2026.
- **Weak spot: homebrew.** You can make homebrew spells, items, races, feats, monsters — but not base class features. The community workaround is to fake a feature as a homebrew feat. Users with homebrew-heavy DMs report the sheet is hard to use because class/race features can't be edited directly. Some users also complained there was no roll log on the sheet outside a campaign.

### Roll20 (VTT + "Roll20 Characters")
- New D&D 2024 sheet + builder; drag-and-drop from compendium auto-fills weapons/armor.
- Recently added: inline editing of any number on the sheet, custom backgrounds/species/classes in the builder, reusable homebrew character templates, custom sorting for inventory/spells/actions, macros and a token action bar to roll without opening the sheet, full mobile support, a Bastion sheet.
- **Weak spots (from their own forums):** setting up custom attacks/spells felt limited at launch; per-weapon crit range (crit on 19) had to be requested; no tab for companions/familiars/summons; a custom compendium is described as out of reach.

### Foundry VTT — dnd5e system + community modules
- Very powerful automation ("activities": attacks, saves, damage, uses, recovery, consumption).
- **Tidy 5e Sheets** (popular alt sheet): lock/unlock edit mode, grid vs list views, custom sheet sections (show/hide/reorder), favorites and per-tab "pins", item aliases, quick HP/money math input.
- **Custom D&D 5e** module: four counter types (checkbox, fraction, number, success/failure) and triggers (on 0 HP, half HP, short/long rest) — e.g. a homebrew exhaustion track that changes automatically.
- **Action panels** (Action Pack / CRUX): a side tray listing everything usable, tagged bonus action / reaction / concentration / ritual, with option to hide expended abilities.
- **Weak spot:** requires running a VTT, steep learning curve, features scattered across modules.

### DiceCloud (free, open source)
- Core idea: **every number shows where it came from** ("auditable"). Unequip armor and AC, speed, CON, HP and saves all update.
- v2 re-architecture added **custom attributes** (homebrew stats like Honor, extra speeds, separate slot pools).
- Integrates with the Avrae Discord bot.
- **Weak spot:** setup takes noticeably longer than a paper sheet; people even pay others to build characters for them. A user script once had to add rest buttons, click-to-roll and rolled recovery ("regain 1d3 uses at dawn").

### Shard Tabletop
- 5e VTT + sheet focused on ease of use and homebrew tools; runs on phone/tablet/PC without install; imports characters from D&D Beyond.
- An **actions block** groups actions, bonus actions, reactions, free actions, and things that modify other actions, including active spell effects and conditions.
- Feature modeling: recovery tied to rest buttons, values that scale by level, and **dice patterns in text detected automatically as clickable rolls** — very close to our auto-recognition idea.
- Weak spot: 5e only; modeling UI is powerful but technical.

### Fight Club 5th Edition (mobile/Mac)
- Offline, no data collection. Free for one character.
- Customizable compendium preloaded with SRD 5.1; users import content files built on a PC.
- Generates a printable PDF sheet; exports characters to its DM companion app.
- Weak spot: aging UI; import format is clunky by users' own accounts.

### Rollplay — Character Sheet (iOS)
- System-agnostic: custom mechanical effects on features/items, formula automation, **drag-and-drop custom sheet layouts**, creator tools to define your own game system without code.
- Closest to our "modular layout" vision. Monetizes unlimited homebrew as an in-app purchase.

### Demiplane
- Polished sheets, but currently no way to add content that isn't in its compendium; homebrew is "coming". Shows how much users miss free-form entry.

---

## 3. Feature comparison

✅ = strong · ◐ = partial / via workaround or add-on · ❌ = missing

| Feature | D&D Beyond | Roll20 | Foundry (+mods) | DiceCloud | Shard | Fight Club | Rollplay | **Our app (spec)** |
|---|---|---|---|---|---|---|---|---|
| Auto-calc from ability scores | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Click-to-roll everything | ✅ | ✅ | ✅ | ✅ | ✅ | ◐ | ✅ | ✅ |
| Custom attacks w/ linked ability | ◐ | ◐ | ✅ | ✅ | ✅ | ◐ | ✅ | ✅ |
| Paste free text → attach mechanics | ❌ | ❌ | ◐ | ◐ | ◐ | ❌ | ◐ | ✅ **core** |
| Auto-detect dice in text | ❌ | ❌ | ◐ | ❌ | ✅ | ❌ | ❌ | ✅ (suggest) |
| Homebrew class/race features | ◐ (feat hack) | ◐ | ✅ | ✅ | ✅ | ◐ | ✅ | ✅ |
| Limited-use counters + rest reset | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ◐ | ✅ |
| Multiple counter types / triggers | ❌ | ❌ | ✅ (module) | ◐ | ◐ | ❌ | ◐ | ➕ suggest |
| Value source breakdown | ◐ | ❌ | ◐ | ✅ | ◐ | ❌ | ❌ | ➕ suggest |
| Custom layout (drag modules) | ❌ | ❌ | ◐ (sections) | ❌ | ❌ | ❌ | ✅ | ✅ **core** |
| Action-economy view | ✅ | ◐ | ✅ (module) | ◐ | ✅ | ❌ | ❌ | ➕ suggest |
| Favorites / pins | ❌ | ◐ (token bar) | ✅ | ❌ | ❌ | ❌ | ❌ | ➕ suggest |
| Custom attributes / stats | ❌ | ◐ | ◐ | ✅ | ◐ | ❌ | ✅ | ✅ |
| Companions / summons | ◐ | ❌ | ✅ | ◐ | ◐ | ◐ | ◐ | ➕ suggest |
| Roll log | ◐ | ✅ | ✅ | ◐ | ✅ | ◐ | ◐ | ✅ |
| Offline | ✅ (app) | ❌ | ◐ (self-host) | ◐ | ❌ | ✅ | ✅ | ✅ (local) |
| Print / PDF | ✅ | ◐ | ◐ | ◐ | ◐ | ✅ | ❌ | ➕ suggest |
| Import / export | ◐ | ◐ | ✅ | ◐ | ✅ (DDB import) | ◐ | ◐ | ✅ JSON |
| Free / no account | ◐ | ◐ | ❌ (paid) | ✅ | ◐ | ◐ | ◐ | ✅ |

---

## 4. Recommendations for our app

Ordered by value for effort. Items marked 🔑 reinforce our main differentiator (paste-first homebrew).

### Must-have (fold into MVP or right after)
1. **Value breakdown on hover/tap** — tapping `+7 to hit` shows `STR +4, PROF +3`. Cheap to build because our formulas already reference sources. *(DiceCloud's best idea.)*
2. **Edit mode vs Play mode** — a lock toggle. Play mode is clean and tap-to-roll; Edit mode exposes inline editing of any value. Keeps "very easy to use" true even as customization grows. *(Tidy 5e lock + Roll20 inline editing.)*
3. 🔑 **Clickable dice inside any text** — every `2d6` or `DC 15` in pasted text becomes rollable even before the user formally attaches anything. A natural first step of auto-recognition. *(Shard.)*
4. **Per-attack crit range** (`19–20`) and custom crit dice. Small, frequently requested. *(Roll20 forums.)*
5. **Richer counters** — types: checkboxes, number (e.g. Lay on Hands pool), and success/failure. Recovery options: full, partial (`regain 1`), or rolled (`regain 1d3`); reset on short rest, long rest, **dawn**, or manual. *(Custom D&D 5e module, DiceCloud Extender.)*
6. **Quick math inputs** — type `-12` or `+5` into HP/currency instead of computing the new value. *(Tidy "lazy" HP/money.)*

### Should-have
7. 🔑 **Toggleable effects / buffs** — a feature can carry a modifier that applies while toggled on: Rage `+2 damage on STR attacks`, Bless `+1d4 to attacks and saves`, a homebrew curse `-1 AC`. This is what makes homebrew feel automated rather than just annotated. *(DiceCloud effects, Shard active effects.)*
8. **Equipped state** — items with attachments (AC bonus, stat bonus) only apply when equipped. *(DiceCloud.)*
9. **Action-economy tags + filtered "Combat" view** — tag entries as Action / Bonus / Reaction / Free / Concentration / Ritual; one view lists everything usable this turn, optionally hiding expended ones. *(Shard actions block, Foundry Action Pack.)*
10. **Pins / favorites** — pin any entry to a compact quick-access module. Fits our modular layout perfectly. *(Tidy 5e pins.)*
11. 🔑 **Personal homebrew library** — save any configured entry (attack, spell, feature) to a library and reuse it on other characters; export/import library packs to share with your group. *(Roll20 templates, Shard reusable creations, Fight Club import files.)*
12. **Companions / summons** — a mini-sheet module for familiars, Steel Defender, Wild Shape forms. *(Gap on Roll20.)*
13. **Responsive layout + installable PWA** — the sheet is mostly used at the table on phones/tablets; offline matters. *(DDB offline app, Shard any-device, Roll20 mobile push.)*

### Nice-to-have (later)
14. **Print / PDF export** of the current layout. *(Fight Club.)*
15. **Triggers** — automatic counter changes on events (on long rest, on reaching 0 HP). *(Custom D&D 5e.)*
16. **Optional open SRD content pack** — load SRD spells/classes as a starting library so official-content players don't paste everything. SRD content is Creative Commons licensed; proprietary book text is not, so it stays paste-only.
17. **Importers** — from D&D Beyond / other JSON formats, as Shard does with DDB.
18. **Themes** and character portrait. *(DDB color themes.)*
19. **Shared roll output** (e.g. Discord webhook) for online play. *(DiceCloud ↔ Avrae, DDB shared rolls.)*
20. **System-agnostic mode** — rename/add attributes and skills freely to run other d20 systems. *(Rollplay, DiceCloud custom attributes.)*

### Deliberately skip (for now)
- Full VTT / maps — a different product; Beyond, Roll20, Foundry and Shard all compete there.
- Guided step-by-step character *builder* with rules enforcement — huge effort, and it's precisely what fights homebrew. Better: fast blank-sheet setup plus templates.
- Account system / cloud sync — local + JSON export first.

---

## 5. Positioning statement (draft)

> *The character sheet that works with whatever your table plays. Paste any feature, spell or homebrew rule, attach dice and uses in seconds, arrange your sheet the way you like — and just tap to roll.*

---

## Sources
- D&D Beyond character sheet page — https://www.dndbeyond.com/My-Characters
- D&D Beyond on Google Play — https://play.google.com/store/apps/details?id=com.fandom.playercompanion
- D&D Beyond changelog — https://www.dndbeyond.com/changelog
- Wargamer, D&D Beyond 2026 roadmap — https://www.wargamer.com/dnd/beyond-roadmap
- VICE, new D&D Beyond tools (Gen Con 2026) — https://www.vice.com/en/article/dungeons-and-dragons-every-new-tool-announced-for-dd-beyond/
- D&D Beyond forums, homebrew class features — https://www.dndbeyond.com/forums/d-d-beyond-feedback/147203-alternate-character-sheet-pdf-request/previous
- D&D Beyond forums, homebrew-heavy campaigns — https://www.dndbeyond.com/forums/d-d-beyond-feedback/43946-equipment-shopping-mode/next
- Roll20 blog, D&D updates — https://blog.roll20.net/posts/what-youve-missed-in-dd/
- Roll20 blog, custom backgrounds & sorting — https://blog.roll20.net/posts/dd-2024-updates-custom-backgrounds-sorting-filters-and-mod-scripts/
- Roll20 blog, January updates — https://blog.roll20.net/posts/dd-january-updates-new-year-new-features/
- Roll20 forums, 2024 sheet feedback — https://app.roll20.net/forum/permalink/12048812 , https://app.roll20.net/forum/permalink/12019521 , https://app.roll20.net/forum/permalink/12613315
- DiceCloud GitHub — https://github.com/ThaumRystra/DiceCloud
- DiceCloud custom attributes (Patreon) — https://www.patreon.com/dicecloud/posts/version-2-custom-24853112
- DiceCloud Extender — https://greasyfork.org/scripts/408130-dicecloud-extender
- Shard Tabletop about — https://www.shardtabletop.com/about
- Shard feature modeling — https://shardtabletop.com/feature-modeling
- Shard new features blog — https://shardtabletop.com/blog/category/New+Features
- Fight Club 5th Edition (App Store) — https://apps.apple.com/app/id901057473
- Rollplay Character Sheet (App Store) — https://apps.apple.com/py/app/rollplay-character-sheet/id1629416212
- Demiplane forums, homebrew — https://forums.demiplane.com/t/adding-homebrew-items-perks-to-character-sheet/4914
- Custom D&D 5e (Foundry) — https://www.foundryvtt-hub.com/package/custom-dnd5e
- Tidy 5e Sheets releases — https://github.com/kgar/foundry-vtt-tidy-5e-sheets/releases/tag/v3.4.0 , https://newreleases.io/project/github/kgar/foundry-vtt-tidy-5e-sheets/release/v13.7.0
- Action Pack (Foundry) — https://www.foundryvtt-hub.com/package/action-pack/
