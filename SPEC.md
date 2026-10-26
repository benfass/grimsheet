# D&D Character Sheet App — Product Spec (v1.0)

*Working name: Grimsheet. v0.2 recorded the platform decision and first build; v0.3 added the SRD 5.2 content pack and locked skill proficiency to Edit mode; v0.4 expanded the pack; v0.5 added PDF import and documented the saved character format; v0.6 replaced the grid with a row-and-column layout; v0.7 added dice animation and a Settings panel; v0.8 added the Owlbear Rodeo extension and a backup reminder; v0.9 added panel sizes and compact mode; v1.0 adds the background page and token linking.*

## 1. Vision

A character sheet that is **very easy to use**, **fully customizable**, and works equally well with **official content and homebrew**. The sheet is built from **modules** that the user arranges freely. Each module has one clear purpose. The user pastes in their own text (features, spells, homebrew abilities) and attaches mechanics to it — dice, bonuses, saves, counters — so the sheet does the math and rolls for them.

### Design principles
- **Easy first.** Common actions take one tap: roll an attack, tick a use, reset on a long rest.
- **User-owned content.** The app doesn't need to "know" a rule for the user to use it. Any text can become a working, rollable feature.
- **Derived, not duplicated.** Values link to their source (e.g. an attack linked to Strength updates when Strength changes).
- **Modular layout.** The user decides what is on the sheet and where.
- **Homebrew is a first-class citizen**, not a workaround.

---

## 2. Core concepts

| Concept | Description |
|---|---|
| **Character** | The saved sheet: core stats + a set of modules + layout. |
| **Module** | A self-contained block on the sheet with a specific purpose (Attributes, Skills, Attacks, Spells, Features, etc.). Can be moved, resized, hidden, duplicated. |
| **Entry** | An item inside a module (one attack, one spell, one feature). |
| **Attachment** | A piece of mechanics attached to an entry: a roll, a bonus, a saving throw, a counter. |
| **Reference** | A link to a character value (e.g. `STR mod`, `proficiency bonus`, `level`) used in formulas, so values update automatically. |

---

## 3. Modules

### 3.1 Attributes (ability scores)
- The six scores (STR, DEX, CON, INT, WIS, CHA) with automatic modifiers.
- Click to roll an ability check.
- Saving throw proficiency toggles per ability; click to roll a save.
- Homebrew: allow renaming or adding extra attributes if the user wants (e.g. a custom "Sanity" stat).

### 3.2 Skills
- Skills are regular, so this module is mostly pre-built: list of skills, each tied to an attribute.
- Proficiency / expertise / none toggle per skill, changeable only in Edit mode; bonus calculated automatically.
- Click to roll.
- User can add custom skills and pick which attribute they use.

### 3.3 Attacks
The user builds their own attacks.
- **Name** and optional description.
- **Linked attribute** (e.g. Strength) — to-hit and damage bonus pulled automatically from that attribute's modifier.
- **Proficiency** toggle (adds proficiency bonus to hit).
- **Damage dice** (e.g. `1d8`), with damage type.
- **Extra bonuses** — flat (`+1` magic weapon) or dice (`+1d6` fire), to hit and/or damage.
- Support multiple damage parts (e.g. `1d8 slashing + 1d6 fire`).
- **Attack button**: rolls to-hit; **Damage button**: rolls damage. Option to roll both at once.
- Optional: crit handling (double dice on a natural 20), advantage/disadvantage.

### 3.4 Spells
- **Paste the full spell description once.**
- **Short description**: a one-line summary the user can glance at without reading the whole spell (user-written or auto-suggested).
- Expand/collapse to view the full text.
- Relevant mechanics attached as needed: spell attack roll, save DC + save type, damage/healing dice, upcasting dice.
- Spell level, school, casting time, range, components, duration, concentration and ritual flags (all optional, editable).
- Spell slot tracking per level (checkboxes) with reset on long rest.
- Spellcasting ability selector → spell attack bonus and spell save DC calculated automatically.

### 3.5 Features & Abilities (free-text blocks)
The key module for homebrew and class/race features.
- The user **pastes any block of text** (a class feature, racial trait, magic item, homebrew ability).
- The user can then **attach mechanics** to it:
  - **Saving throw** (type + DC formula, e.g. `8 + prof + WIS mod`)
  - **Attack roll**
  - **Damage/healing dice**
  - **Counters / limited uses** — e.g. "3 times per long rest" renders as 3 checkboxes the user can tick and untick.
  - **Reset rule** for each counter: short rest, long rest, dawn, manual.
- Counter max can be a formula (e.g. `PROF` uses, or `CHA mod` uses).

### 3.6 Other modules (baseline)
- **Header**: name, class(es) and level, race/species, background, portrait.
- **Combat stats**: HP (current/max/temp), AC, initiative (rollable), speed, hit dice, death saves.
- **Proficiency bonus** (auto from level, overridable).
- **Inventory**: items, quantity, weight; items can carry attachments too (e.g. a potion with healing dice).
- **Currency**.
- **Notes**: free text.
- **Conditions** tracker.

---

## 4. Rest & reset system
- **Short Rest** and **Long Rest** buttons reset every counter/slot tagged with that rule.
- Per-module and per-entry reset buttons for manual control.
- Clear feedback of what was reset.

---

## 5. Dice roller
- Supports standard notation: `XdY + Z`, multiple terms, advantage/disadvantage, crits.
- Each roll shows a breakdown (dice results + every bonus and where it came from).
- Roll history/log.
- **Dice animation (optional):** the dice tumble onto a small tray above the roll bar in their real shapes (d4 triangle, d6 square, d8 diamond, d10 kite, d12 pentagon, d20 hexagon; others round), flicker through faces and land on the actual results. The total appears when they land. Attack/check dice are teal, damage gold, healing green; the dropped advantage/disadvantage die is faded and struck through; a natural 20 glows gold and a natural 1 red. Up to 12 dice are drawn, with "+N more" beyond. The tray fades after a few seconds; a new roll replaces it.

## 5a. Settings
- **Settings** button in the toolbar. Saved per browser (`grimsheet.settings.v1`), not per character. Also holds Compact mode, roll sharing and the Owlbear panel size.
- **Dice animation** on/off. Starts off when the device asks for reduced motion.
- **Animation speed:** Quick (≈0.45 s), Normal (≈0.85 s), Dramatic (≈1.4 s).
- **Try it** button rolls 1d20 + 2d6.

## 6. Auto-recognition of pasted text (smart suggestions)
When the user pastes a spell or feature, the app scans the text and **suggests** attachments — never applies them silently. The user accepts, edits, or dismisses each suggestion.

Examples of patterns to detect:
- Dice expressions: `2d6 fire damage`, `1d8 + your Wisdom modifier`
- Saving throws: `must make a Dexterity saving throw`
- Spell attacks: `make a ranged spell attack`
- Limited uses: `3 times per long rest`, `once per short or long rest`, `a number of times equal to your proficiency bonus`
- Upcasting: `increases by 1d6 for each slot level above 1st`
- Spell metadata: casting time, range, duration, concentration
- A suggested short description (first sentence or a condensed summary)

Phase 1 can be rule-based (regex/patterns). A later phase could optionally use an LLM for summaries and harder cases.

---

## 7. Customizable layout
- The sheet is a list of **rows**; each row is split into up to **4 columns**; each column is a vertical **stack of modules**. A tall module (Skills) can sit in its own column with several modules stacked beside it.
- **Drag** (Edit mode, grip on the module header; mouse or touch): drop on the top or bottom half of a module to stack above or below it; drop on its left or right edge to make a new column beside it; drop on a "New row here" strip (shown between rows while dragging) for a full-width row. A ghost label names the drop ("in a new column right of Skills") and a bar marks the spot. The page scrolls near the top and bottom edges; Escape cancels.
- **Resize columns** by dragging the line between them (300 px minimum). Widths are stored as ratios.
- **Move menu** on each header for keyboard and phone use: Up, Down, into the left/right column (or a new one), onto its own row, reset the whole layout.
- Empty columns and rows disappear automatically. Rows wrap their columns on narrow screens and stack to one column on phones.
- Collapse, hide/restore and rename work as before. Multiple instances of a module type are allowed. Layout saved per character.

## 8. Persistence (memory)
- Characters save automatically.
- Multiple characters per user, with a character list.
- Export/import a character as a file (JSON) for backups and sharing.
- Future: optional cloud sync.

---

## 9. Platform (decided)
**Web app, built to become an installable PWA.** One self-contained HTML/JS page, no framework, no server.
- Runs in any browser, phone to desktop; the same code can later be wrapped as a PWA (offline) or a desktop app (Tauri).
- Characters save in the browser automatically; JSON export/import moves them between devices.
- Next: service worker + manifest for offline install; optional cloud sync of a user's own characters.

---|---|---|
| Web app (local storage) | Runs anywhere, no install, easiest to share | Storage tied to browser unless synced |
| PWA (installable web app) | Works offline, installable on desktop and phone | Same storage caveat |
| Desktop wrapper (Tauri/Electron) around a web app | Real files on disk, desktop feel | Install required; no phone |

A web-first build keeps the other options open: the same code can later be wrapped as a PWA or desktop app.

---

## 10. Data model (as built)

Saved in the browser under `grimsheet.v1` as `{ active, chars: { id: Character } }`; the homebrew library under `grimsheet.library.v1`. Export/Import uses one Character as JSON. Import only requires `abilities` and `modules`; anything missing is filled with defaults.

```ts
Character {
  id, name, cls, level, species, background, profOverride: "" | "3"
  abilities: [{ key: "STR", name, score, save, custom? }]
  skills:    [{ id, name, ab: "STR", prof: 0 | 1 | 2 }]
  hp: { cur, max, temp }, acFormula: "10 + DEX" | "17", initBonus, speed, hitDie, hdUsed, hdRecover: "all" | "half"
  death: { s, f }, conditions: [], exhaustion
  spellAbility, slots: { 1..9: { max, used } }, currency: { cp, sp, ep, gp, pp }, notes, example
  modules: Module[], hidden: [moduleId]
  layout: { rows: [{ id, cols: [{ id, w: 1.2, items: [moduleId] }] }] }
}
Module { id, type, title, collapsed, wide, entries: Entry[], hideUsed?, text? }
Entry {
  id, name, short, text, pinned, tags: { action, conc, ritual }
  attack?:   { ability: "STR" | "SPELL" | "none", prof, bonus, crit }
  damage:    [{ dice, mod, type }]
  save?:     { ability, dc }
  counter?:  { kind: "boxes" | "pool" | "succfail", max, used, reset: "short" | "long" | "dawn" | "manual", recover }
  effect?:   { active, attack, damage, save, ac, check, only }
  spell?:    { level, school, castTime, range, duration, components, upcast, cantrip }
  item?:     { qty, weight, equipped }
  creature?: { ac, hpMax, hp, speed }
}
```
Number fields (`bonus`, `mod`, `dc`, `max`, `acFormula`) are formulas over `STR…CHA`, `<KEY>_SCORE`, `PROF`, `LEVEL`, `SPELL`, `SPELLDC`, `SPELLATK`, with `max/min/floor/ceil/table/d`.

## 11. Phasing

### Built in v1 (first working build)
- Modules: Combat, Abilities (with custom attributes), Quick Actions, Skills, Attacks, Spells, Features & Traits, Inventory, Companions, Notes. Multiple instances of list modules.
- Layout: drag-and-drop or arrow reordering, wide/normal width, collapse, hide/restore, rename (Edit mode).
- **Play / Edit mode** lock.
- Formulas with named references (`STR`, `PROF`, `LEVEL`, `SPELL`, `SPELLDC`, `SPELLATK`, `<KEY>_SCORE`, `max/min/floor/ceil`) and live validation in the editor.
- Attacks: linked ability, proficiency, extra bonus, multiple damage parts, **per-attack crit range**, crit doubles dice, advantage/disadvantage toggle.
- Spells: short + full text, slots per level, Cast button that spends a slot, **upcast dice**, cantrip scaling, spell attack / DC with breakdown.
- Features: paste any text, attach attack, damage/healing, save DC, **counters** (checkboxes, points pool, success/failure) with reset on short/long rest, dawn or manual and **partial or rolled recovery**.
- **Toggle effects / buffs** (attack, damage, saves, AC, checks; filter by ability, weapon or spell) and **equipped items** that apply bonuses automatically.
- **Value breakdown**: every roll lists each part and its source; AC, spell DC and save DCs explain themselves on tap.
- **Clickable dice** (`2d6`, `+5 to hit`) and highlighted DCs inside any text.
- **Auto-recognition** (rule-based) of pasted text: spell level/school/timing, action type, concentration/ritual, attacks, damage and healing, saves and DCs, uses and recharge, upcasting, cantrip scaling, short description. Suggestions are reviewed before applying.
- **Quick math** inputs for HP (temp HP absorbs damage first), temp HP, pools, quantities, companion HP and currency.
- **Pins + action-economy view** (Pinned / Action / Bonus / Reaction / Other, hide used up).
- **Personal homebrew library**: save any entry, add it to any character, export/import library packs.
- Rests: Short, Long, Dawn buttons with a summary of what was restored; hit dice (2024 "all" or 2014 "half"), death saves with auto-marking, conditions, exhaustion.
- Roll tray with follow-up buttons (damage after a hit, crit damage, heal me), free-roll box, roll history.
- Characters list: new, example, duplicate, delete, export (copy or file), import (file or paste).

### Built in v1.1: SRD 5.2 content pack
- **Browse SRD & library** in every list module: search, category chips (Spells, Weapons, Armor, Gear, Magic Items, Features), defaulting to the module's type. Adding keeps the browser open for more picks.
- Content: all SRD weapons with properties and **2024 weapon mastery**; all armor (adding armor sets the AC formula) and shields; healing potions and common magic items with equip bonuses and charges; 97 spells (cantrips to 5th level) with damage, saves, attacks, upcasting, cantrip scaling and toggle effects; 26 class, species and feat features with level-scaling uses.
- Weapons pick STR, DEX (ranged) or the better of the two (finesse) when added.
- Descriptions are short summaries in our own words; mechanics follow SRD 5.2. Required CC-BY-4.0 attribution shown in the browser and the page footer.
- Formula engine: `table(LEVEL, 1,2, 3,3, …)` for level tables and `d(count, sides)` for variable dice, e.g. Sneak Attack `d(ceil(LEVEL / 2), 6)`, Martial Arts `d(1, table(LEVEL, 1,6, 5,8, 11,10, 17,12))`. Division is exact inside a term; each term rounds down.

### Built in v1.2: SRD expansion
- **Spells:** 309, cantrips through 9th level (24 / 50 / 49 / 43 / 31 / 34 / 29 / 19 / 15 / 15 by level), each with level, school, timing, range, components and duration, plus damage, saves, attacks, upcasting and toggle effects where they apply.
- **Magic items:** 63, including +1/+2/+3 weapons and armor, protection items, charged wands and staffs that recharge at dawn, potions, and ability-setting items.
- **Gear:** 33 adventuring items, packs, ammunition and tools.
- **Features:** 108, covering core class features, all twelve SRD subclasses (Berserker, Lore, Life, Land, Champion, Open Hand, Devotion, Hunter, Thief, Draconic, Fiend, Evoker), all nine SRD species, SRD 5.2 feats and fighting styles. Lucky and Tough were removed because they are not in SRD 5.2.
- **Creatures (new category):** 32 familiars, pact familiars, beasts and mounts from SRD 5.1 stat blocks, added as companions with AC, HP, speed and a main attack. SRD 5.1 attribution added alongside SRD 5.2.
- Your own toggle effects no longer apply to companion attacks.

### Built in v1.3: Import from PDF
- **Characters → Import from PDF.** pdf.js (loaded on demand from cdnjs) reads the file in the browser; nothing is uploaded.
- **Official fillable 5e sheet (2014 form)** is read field by field. Checkbox map verified on a filled copy: saves `Check Box 11, 18–22` (STR…CHA), skills `Check Box 23–40` in alphabetical order, death saves `12–14` successes / `15–17` failures. Spell lines are assigned to a level by position under the slot headers (`SlotsTotal 19–27` = levels 1–9).
- **Building the character:** level from the class field, or from total hit dice; scores from the first number (e.g. `21(19)` → 21); proficiency bonus kept when the sheet's differs from the rules; attack rows linked to an ability when the to-hit fits (mod + prof, or mod alone) and damage bonuses linked the same way; a written DC equal to 8 + prof + exactly one ability becomes that formula; spellcasting ability worked out from spell attack and DC; spells fuzzy-matched to the SRD (typos tolerated) with notes like "(once a day)" turned into uses; features split one per line and run through auto-recognition; an attack row and a feature that are the same thing are merged into one Attacks entry; equipment lines become items (SRD matches added unequipped).
- **Preview before saving:** stats, counts, a "Check these" list of every guess, and a full log of what was linked. Imported as a new character.
- **Other PDFs** (D&D Beyond exports, 2024 sheets, flattened PDFs with text): the page text is sent to Claude (the `sample` capability, with the viewer's consent) to fill the same intermediate format, then built and previewed the same way. Scanned images without text are reported, not guessed.
- Auto-recognition now understands paper-sheet shorthand: `Dex saving DC 13`, untyped `1D8 +5`, typed dice without the word damage (`+1d10 necrotic`), `once a day`, `5 times total`.
- SRD items added from a module that can't show them go to the right module (armor → Inventory, etc.).

### Built in v1.4: Row and column layout
- Replaced the auto-flow grid (where a tall module left gaps) with rows → columns → stacks, pointer-based drag with above/below/left/right/new-row drop zones, column resizing, and a Move menu. Existing characters get the default layout once; the old "wide" toggle is retired.

### Built in v1.5: Dice animation and Settings
- Engine now records every die (sides, value, dropped) per roll part, which drives the animation. Settings panel with dice animation on/off and speed.

### Built in v1.6: Owlbear Rodeo extension
- **Hosting:** GitHub Pages from `benfass/grimsheet` (public repo; holds only the app). Owlbear manifest at `https://benfass.github.io/grimsheet/manifest.json` with absolute URLs for the popover (1000×900) and icon. Hosted once; every player uses the same link and keeps their own characters in their own browser.
- **Detection:** Owlbear opens extensions with `?obrref=…`; only then is the bundled Owlbear SDK 3.1.0 (`vendor/`, MIT) loaded. Outside Owlbear nothing changes.
- **Share rolls** after the dice land, by broadcast on `com.grimsheet/roll`: Everyone, GM only (receivers who aren't GM ignore it) or Off, in Settings. Receivers get an Owlbear notification (success style on crits, warning on natural 1s) and a **Table** tab in roll history.
- **Party module** (added once to the top row when first opened in Owlbear): each player's character, HP/max/temp, AC, Down/Dead and conditions, from player metadata `com.grimsheet/status`, updated on every save.
- Follows Owlbear's light or dark theme.
- **Backup reminder** (everywhere): a banner when a character has never been exported (after a day) or has changes not exported for 3+ days; Copy or Download in Export counts as a backup. Room storage was considered for backups but Owlbear caps room metadata at 16 kB for the whole room.
- Not available inside Owlbear: Claude-assisted PDF reading (needs claude.ai). Official-form PDF import works.

### Built in v1.7: Panel size and compact mode
- **Size** button in the toolbar inside Owlbear: Small (440 × 620), Medium (760 × 820, default), Large (1100 × 960), or Custom width × height in Settings (320–1600 × 300–1400). Uses `OBR.action.setWidth/setHeight`; applied each time the panel connects. Manifest maximum raised to 1600 × 1400 so Large and Custom aren't capped.
- **Compact** setting (everywhere): smaller text and tighter spacing.
- In narrow (< 560 px) or short (< 700 px) panels the toolbar scrolls with the page instead of staying pinned.

### Built in v1.8: Background page and token linking
- **Background page** (`background.html`, manifest `background_url`): runs for each player while they're in the room, even with the panel closed. Shows roll notifications, stores the table feed in the browser (`grimsheet.feed.<room>`, last 100), and registers the token right-click menus. It writes a heartbeat (`grimsheet.bg.v1`); while that's fresh the panel doesn't show notifications itself, so nothing doubles. Without the background page (old installs) the panel falls back to notifying on its own.
- **Link / Unlink** in the token right-click menu (character layer, one token, only when the player may edit it). Link metadata: `com.grimsheet/link = { player, char, name }`. A token links to the active character; the panel shows "Token linked" or how to link in the Combat module.
- **Stat Bubbles sync:** on every save the panel writes `com.owlbear-rodeo-bubbles-extension/metadata` `{ health, "max health", "temporary health", "armor class" }` on linked tokens (other keys such as `hide` are kept), only when values changed. Linking fills it immediately from the last saved status (`grimsheet.status.v1`). Format read from the Stat Bubbles source.
- **Initiative tracker:** rolling Initiative sets `rodeo.owlbear.initiative-tracker/metadata` `{ count: "<total>", active }` on linked tokens after the dice land (keeps `active`). Format read from the official initiative tracker source.
- Repo `index.html` is now built as a complete HTML page (charset, viewport) from the artifact source.

### Next
1. GM tools: apply damage/healing from a linked token to the player's sheet; read-only view of party sheets.
2. Cloud backup/sync of characters across devices.
3. PWA install + offline (service worker, manifest).
2. Cloud sync of the user's own characters across devices.
3. Print / PDF layout.
4. Triggers (on 0 HP, on rest) and concentration reminders when taking damage.
5. Importers (D&D Beyond JSON).
6. Themes, portrait, Discord webhook for shared rolls.
7. LLM-assisted summaries and recognition for harder text.
