# D&D Character Sheet App — Product Spec (v1.34)

*Working name: Grimsheet. v0.2 recorded the platform decision and first build; v0.3 added the SRD 5.2 content pack and locked skill proficiency to Edit mode; v0.4 expanded the pack; v0.5 added PDF import and documented the saved character format; v0.6 replaced the grid with a row-and-column layout; v0.7 added dice animation and a Settings panel; v0.8 added the Owlbear Rodeo extension and a backup reminder; v0.9 added panel sizes and compact mode; v1.0 added the background page and token linking; v1.1 added GM tools; v1.2 added monsters, the Encounter view and initiative; v1.3 added attacks against a target on the map; v1.4 added rerolls; v1.5 added spell areas on the map; v1.6 added combat prompts; v1.7 added the level-up wizard; v1.8 added undo; v1.9 added campaign notes; v1.10 added GM mode; v1.11 added several encounters; v1.12 added finding tokens, fog-aware targets and target buttons; v1.13 showed prompts next to what they're about; v1.14 read monster spellcasting; v1.15 added search; v1.16 adds rules automation (resistances, conditions, durations), token pictures, encounter difficulty and Heroic Inspiration; v1.17 added room homebrew; v1.18 linked monsters to tokens from the Encounter view; v1.19 added fixes and GM conveniences from the first real-room test; v1.20 let players end their own turn; v1.21 added reactions, legendary resistance and other small rules helpers; v1.22 showed conditions under tokens; v1.23 wrote names on tokens; v1.24 added backups across devices; v1.25 read stat blocks from more sources; v1.26 imported homebrew classes; v1.27 added their racial traits; v1.28 added subclasses and optional features for the basic classes from books like Tasha's; v1.29 handled features that replace others; v1.30 raised ability scores in imported classes; v1.31 read ability maximums and automatic raises from class features; v1.32 gave repeat spells a second button and flagged the example character in the party; v1.33 replaced the example character with a simple character; v1.34 adds guided tours.*

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

### Built in v1.9: GM tools
- **GM token menu** (right-click a character token → **Grimsheet**, GM only): a small panel inside the menu (`gm.html`). Unlinked token: list of every connected player's current character (from party metadata, now including `charId`) to link it to. Linked token: owner, HP/AC bar, an amount box with **Damage** and **Heal**, **Open sheet**, **Unlink**. Damage and the sheet are disabled when the owner isn't in the room.
- **Damage/heal reach the player's sheet**: broadcast `com.grimsheet/gm` `{ type: 'hp', to, char, amount, from }`. The player's background page applies it to the saved character (temporary HP first; healing from 0 clears death saves), updates the party status and the linked token's Stat Bubbles, and notifies the player. An open panel reloads live (storage event) and shows a toast. Without a background page the panel applies it itself.
- **Read-only sheet viewer**: the GM's panel sends `sheetReq`; the player's background replies with the character gzip-compressed, base64, in parts of 12,000 characters (Owlbear messages are capped at 16 kB). The GM's panel shows it with a banner (owner, time, Refresh, Back to my sheet). Rolling works and stays on the GM's screen; every change is blocked. "Open sheet" in the token menu opens the GM's panel (`OBR.action.open`) via a same-browser message.
- **Party module for the GM**: a "−12 or +8" box and **View sheet** for each player.
- Players' own Link/Unlink menu items now show only for the PLAYER role; the GM uses the Grimsheet menu.
- **Diagnostics**: Settings shows the app version and whether the background page is running (and its version). The panel rechecks links every 5 seconds and explains when a token is linked to a different character.
- Shared helpers for background and GM pages in `shared.js`.

### Built in v2.0: Monsters, Encounter view and initiative
Decisions: monster HP visibility is a GM setting; Grimsheet's tracker is primary and Owlbear's tracker is kept updated; monsters start at average HP (editable, or re-roll from hit dice); identical monsters share initiative by default with a per-monster "rolls its own initiative" option.
- **Stat block reader** (`MONSTERS.parse`): 2014 and 2024 layouts. Reads name, size/type, AC (+note), HP and hit dice, speed, initiative (or DEX), ability scores and saves, CR/XP/PB, skills/senses/languages/resistances, traits, Actions, Bonus Actions, Reactions and Legendary Actions (count and costs). Per action: attack bonus, damage parts (skipping "or …" alternatives and "if …" extras), save DC and ability, Recharge X–6, X/Day, "recharges after a rest".
- **SRD 5.1 starter set**: 35 monsters (kobold to young green dragon) stored as stat blocks and read at load. **My monsters**: pasted stat blocks saved in the browser (`grimsheet.bestiary.v1`).
- **Encounter view** (GM in Owlbear; anyone outside Owlbear): Sheet/Encounter switch in the toolbar. Encounter state per room in the browser (`grimsheet.encounter.v1`): templates, monster instances (HP, temp, max, AC, conditions, recharge, uses, legendary used, initiative, group/solo), characters, group initiative, combat (active, round, turn).
- **Monster cards**: HP with quick math, Bloodied/Down, conditions, ability checks and saves, attack and damage buttons (crits double dice), DC chips, recharge toggles, per-day uses, legendary action boxes, full stat block on demand, edit name/max HP/AC, roll HP. Rolls are GM-only unless "Share monster rolls" is on.
- **Initiative**: rows are monster groups (shared roll), solo monsters and characters, sorted high to low. Roll monster initiative, add party, Ask for initiative (players get a notification), players' INIT rolls arrive automatically (`com.grimsheet/gm` `type: 'init'`), type any value by hand, Start combat (adds party, rolls missing monster initiative), Next/previous turn with round counter, tap a row to jump. At the start of a monster's turn its legendary actions reset and recharge abilities roll d6 (toast with results). The current row's tokens are selected on the map.
- **Players**: turn order published in room metadata (`com.grimsheet/initiative`: round, turn, rows with name, initiative, owner and the HP text allowed by the setting; groups show "N down" when HP is hidden). Their panel shows a round/turn strip and the order in the Party module; the background page notifies "Your turn!" and "You're up next".
- **Monster tokens**: GM menu now works on several tokens. Unlinked tokens → search the bestiary (catalog cached in `grimsheet.moncat.v1` for the menu page) → numbered monsters, token renamed, linked with `com.grimsheet/monster = { room, inst, name }`. Linked selections → damage/heal all (characters by message, monsters directly), unlink all, "Open in Encounter" (focuses the card). Selecting a monster token highlights its card. Stat Bubbles on monster tokens use `hide` unless HP visibility is Exact.
- **Owlbear tracker**: when on, initiative and the active turn are written to linked character and monster tokens.

### Built in v2.1: Attacks against a target
- **Target**: selecting one token on the map (Character or Mount layer; hidden tokens only for the GM) makes it the target; the player's own tokens are ignored. A target button in the toolbar shows its name and distance, and opens a list of tokens sorted by distance. The target stays until another one is chosen or it is cleared.
- **Distance**: edge to edge, from the nearest grid square of the attacker's token to the nearest square of the target, using the scene's grid measurement and scale (ft, or m converted at 1.5 m = 5 ft). Recomputed when tokens move.
- **Range**: read from the attack's text: monster "reach X ft." / "range X/Y ft.", weapon properties (Reach, Thrown and Ammunition ranges, melee = 5 ft), spell range ("Touch", "120 feet"). Verdict: in reach, in range, long range (disadvantage), out of range/reach. It is a warning only.
- **Flow**: an attack or damage roll with a target goes to the GM (`com.grimsheet/gm`, `type: 'atk'`, `part: atk|dmg|heal`; the damage roll after an attack on the same weapon joins it). The roll tray shows the target, distance, range and the GM's answer.
- **GM confirms**: a card per attack above the sheet or encounter: attacker → target, distance and range, to-hit against the target's AC (monster AC, the player's published AC, or the token's Stat Bubbles AC), suggested hit/miss (natural 20 = critical, natural 1 = miss), damage, and for saving throw damage a "Roll save" button for monsters. Buttons: Hit / Miss before damage; Apply / Half / Miss after. Applying changes the monster's HP, sends the damage to the player's sheet, or changes an unlinked token's HP bubble; the attacker is told the result (`type: 'atkResult'`). The GM's own monster attacks use the same cards.
- **Waiting attacks** are kept in the GM's browser (`grimsheet.attacks.<room>`, last 30) by the background page, so they arrive even when the GM's panel is closed, with a notification.

### Built in v2.2: Rerolls
- **Reroll tag** on any entry: `reroll = { on: d20|damage|any, dice: one|all|low, low, keep: new|best, bonus }`. Set in the editor's Reroll section, or found in pasted text (and in SRD features and PDF imports): "reroll", "roll it again", "roll an additional d20", "roll the damage dice twice and use either", Luck Points for advantage, "a 1 on the d20", "a 1 or 2 on a damage die", "with a bonus equal to your level". Examples: Heroic Inspiration (any die, new), Lucky (d20, higher), Halfling Luck (d20 showing 1), Great Weapon Fighting 2014 (damage dice showing 1–2), Savage Attacker (all damage dice, higher total), Indomitable (d20, + level). Entries show a "↻ reroll" chip.
- **On a roll**: matching sources appear as buttons in the roll bar and on the dice: only when they apply (a d20 roll, a damage roll, a low die showing), with uses left from the entry's limited uses (each reroll spends one); sources without uses work once per roll. "One die" on several dice asks which die (tap it on the dice or in the roll bar); d20 rerolls take the kept d20 and re-apply advantage/disadvantage. Totals, crits and follow-up buttons are recomputed; the roll keeps a visible history ("Lucky: d20 3 → 17, was 15").
- **Monsters**: reroll traits in a monster's stat block work the same on its rolls (X/Day uses tracked on the card).
- **Honesty**: rerolls are always announced: to the table with the roll's sharing, or to the GM when sharing is off (GM-only monster rolls stay hidden). Rerolling a targeted roll updates the GM's attack card, marked "↻ rerolled" with what changed.
- **Dice on screen**: setting "Dice stay on screen" (Auto: about 3 s, 8 s when a reroll is possible; Longer; Until closed). Pointing at the dice keeps them up; ✕ hides them. The roll bar always keeps the buttons.

### Built in v2.3: Spell areas on the map
- **Area detection** (`ENGINE.areaOf`) from a spell's range and text, or a monster action: "20-foot-radius Sphere", "Self (60-foot line)", "30-foot cone", "15-foot Emanation", "line … 5 feet wide", "N-ft cube/cylinder/radius"; whether the area starts from the caster; "half as much damage on a successful one".
- **Place**: entries with an area get a button with its size and shape (in Owlbear). Leveled spells open the Cast menu first (slot spent, damage at that level); after casting, the roll bar also offers "Place …". Monster actions with an area get the button on the monster card (marks recharge/uses spent).
- **Shape on the map**: a Curve item on the Drawing layer (`com.grimsheet/area = { id, owner, name }`), movable and rotatable like any drawing. Cones and lines start at the edge of the caster's token and point at the target; spheres, cylinders and cubes are centred on the target (or on the caster with no target); self cubes start at the caster; emanations surround the caster and are attached to its token. Size from the scene's grid scale. A kept spell (duration other than Instantaneous) reuses its area when used again.
- **Who is inside**: every grid square of a token (from its bounds) is tested against the shape's current points, position, rotation and scale; a token is inside when the centre of any of its squares is. The caster is left out of areas that start from them. The GM's copy rechecks automatically (hidden tokens included) and again whenever the area is moved.
- **Area card for the GM** (same queue as attack cards): caster → area, DC and save, damage (the damage roll joins it, rerolls included), and a row per creature: Roll save (monsters, with their save bonus), Ask (players get a notification and a "Roll DEX save" card; a normal save roll of that ability answers it too), or mark ✗/✓ by hand; damage per row is full, half or none. Buttons: roll all monster saves, ask all players, Recheck, Apply to all (heal all for healing areas), Remove area. Applying updates monsters, players' sheets and HP bubbles, removes an instantaneous area from the map, and tells the caster (hidden creatures left out of what the caster sees).
- **Messages**: `type: 'atk'` with `part: 'area'` (targets, item, save, half), `saveReq` (GM → player), `saveRes` (player → GM). The background pages keep save requests (`grimsheet.saves.<room>`) and answers while panels are closed.

### Built in v2.4: Combat prompts
- **Concentration** (`c.conc = { id, name, at }`): casting a spell tagged Concentration, or switching on a concentration effect, starts it; the Combat module shows "Concentrating on Bless" with End, and the party (and GM) see it. Starting another concentration spell ends the first. Ending it switches its effect off and removes its area from the map.
- **Concentration checks**: taking damage while concentrating (typed into HP, from the GM, an attack or an area) adds a prompt card: CON save, DC 10 or half the damage (at most 30), with Roll and Let it end. A failed roll ends the spell; a plain CON save roll answers the prompt too. Dropping to 0 HP ends it at once. Without the panel open, the background page adds the prompt and says so in the damage notification.
- **Monsters**: "Concentrating" can be set on a monster card; damage rolls its CON save automatically (toast and a note on the card) and clears it on a failure or at 0 HP.
- **Death saves**: when a downed player's turn starts (not stable, not dead), their panel shows "Your turn: you're down" with a Roll death save button; the background notification says so too.
- **Turn reminders**: players get "Your turn!" with what to remember (down, concentrating, effects that are on, conditions) in the notification and the turn bar. The GM's tracker shows a note under the current row: monster conditions, a player who is down or concentrating, and any lasting area (Spirit Guardians, Cloudkill…) the creature starts its turn in.
- Prompt cards share the save-request queue (`grimsheet.saves.<room>`, kinds `conc`, `death`, and the GM's save requests).

### Built in v2.5: Level-up wizard
- **Entry**: a "Level up" button next to the level in the header (play mode, below 20).
- **Classes**: `c.classes = [{ name, sub, level, hd?, cast? }]`, read from the class line the first time ("Paladin (Oath of Devotion)", "Fighter 3 / Wizard 2") and written back to it. Built-in table for the 12 SRD 5.2 classes: hit die, spellcasting (full, half, pact) and ability, ability score levels (Fighter 6 and 14, Rogue 10 too), subclass level, class features by level, the SRD subclass's features, and notes (Fighter's extra uses). Homebrew classes ask for hit die and spellcasting.
- **One dialog, numbered steps**: (1) which class gains the level, or a new class (multiclass); (2) hit points: average or a roll (the roll goes through the dice and is shared like any roll), plus CON and per-level bonuses found in the sheet's text (Dwarven Toughness, Tough); (3) new features, each added to Features with its SRD text when there is one, otherwise as a note to fill in; subclass choice at the subclass level; features that scale with LEVEL are listed as updating themselves; (4) Ability Score Improvement (+2 / +1 +1, capped at 20) or a feat (SRD feats or any name), and at 19 an Epic Boon (SRD boons, +1 up to 30); (5) spell slots before → after, from all caster classes together (half casters rounded up) plus pact slots; sets the spellcasting ability if empty. The button stays disabled until every choice is made.
- **Undo**: the whole level is one change: a snapshot is kept (`c.levelUndo`), and a banner offers "Undo level-up" (tap twice) for 7 days or until dismissed; undoing also drops changes made after the level-up, and says so.

### Built in v2.6: Undo
- **History per character**: every save is compared with the character's last known state; what changed is kept as one step of `[path, old, new]` (arrays of entries/modules compared by id; added or removed items keep the whole list). Bookkeeping fields (changedAt, lastBackup, collapsed modules, the level-up snapshot, layout creation) are ignored. Repeating the same change within 1.5 s merges into one step (typing, tapping a pool). Changes arriving from another page (the background applying the GM's damage) are recorded too.
- **Labels** in plain words: "HP 37 → 30", "+Poisoned", "Emberblood used (0 → 2)", "1st-level slot used", "STR 17 → 18", "Bless on", "Added Fireball", "Level 5 → 6, …".
- **Toolbar**: Undo button (tooltip names the change; Ctrl/Cmd+Z, Ctrl+Shift+Z or Ctrl+Y to redo outside text fields) and ▾ Recent changes: the last 12 with how long ago; tapping one undoes it and everything after it; Redo at the top. A level-up undone this way also clears its banner.
- **Kept** in the browser (`grimsheet.history.v1`, 40 steps per character, about 400 kB in all); a new change clears redo.

### Built in v2.7: Campaign notes
Decisions: a party journal anyone can edit; its own view; typed entries.
- **Notes view** for everyone: Sheet / (Encounter) / Notes in the toolbar. One campaign per Owlbear room (or one locally outside Owlbear), with a name anyone can change.
- **Typed notes**: NPC (status Friendly / Neutral / Hostile / Dead), Place, Quest (Open / Done / Failed), Item, Note; title, text (up to 8,000 characters), tags, pin. Links between notes with `[[Title]]`; a link to a missing title shows dotted.
- **Finding things**: search across titles, text, tags and status; filters by type and Pinned with counts; tag chips; an "Open quests" bar; cards grouped by type, newest first; a card opens full width with author, time and actions. Tapping a status chip moves it to the next status.
- **Sharing**: "The party" notes go to everyone in the room (`com.grimsheet/notes`: `up`, `del`, `name`, `hello`); anyone can edit; the newest edit wins; deletions are remembered (tombstones). "Only me" notes stay in that browser; for the GM they are "hidden from players" and can be revealed later ("Share with the party" for players). A player opening Grimsheet sends what they have; others (panel or background page) send anything newer after a short random wait, skipping what someone else already sent, so people who missed a session catch up.
- **Storage**: `grimsheet.campaign.v1` per room; background pages keep the journal up to date while panels are closed.
- **Export**: Markdown of all visible notes, a JSON backup, and import of a backup (shared notes in it are sent to the room).

### Built in v2.8: GM mode
- **When**: in Owlbear, for a GM who isn't playing a character. "I'm also playing a character" (Settings, GM only) switches it; until set, it is on when the browser has no character of its own (only the example).
- **Toolbar**: "Game Master", the campaign name and how many players have Grimsheet open; Adv/Dis, target, Undo, Encounter / Party / Notes, Size, Settings. No example character, no rests, Level up, Play/Edit or Characters; opens on Encounter. Nothing is published as the GM's status, so the GM never shows up in the party (an old status is cleared).
- **Party view**: a card per player: character, player, class and level, HP bar, temp HP, AC, Bloodied / Down (with death saves) / Dead, conditions, concentration; damage/heal box, View sheet, Ask for a save. Players in the room without Grimsheet are listed. Header actions: Ask for a save, Call a short rest, Call a long rest, Ask for initiative.
- **Group saving throw**: what it is, ability, DC, optional damage dice and type, half on success, which players. Each player gets the save prompt; a card (an area card without a map shape, targets `pc:<player>`) collects the results and applies full / half / none; the damage roll joins it.
- **Rest call**: players get a prompt (and a notification) with "Take a short/long rest", which runs their normal rest.
- **Encounter undo**: in GM mode Undo, Ctrl+Z and Recent changes work on the encounter (monsters added or removed, HP, conditions, initiative, turns, recharge and uses), including changes from the token menu.

### Built in v2.9: Several encounters
- **Storage**: `grimsheet.encounter.v1[room] = { multi: 1, active, order, list: { id: encounter } }`; each encounter has an id and a name. An old single encounter becomes "Encounter 1".
- **Tabs** above the Encounter view: every encounter with its monster count, a dot on the active one, "+ New". The open encounter can be renamed, duplicated (copy at full HP, no initiative, ready to run again) or deleted (tap twice; not the last one).
- **Active vs prepared**: only the active encounter drives the players' turn order, Owlbear's tracker and combat (Start combat / Next turn appear only there). A prepared one can be filled with monsters, edited and rolled for initiative in advance; a banner explains it, with "Make active" (ends combat in the old active one).
- **Tokens**: monsters keep their token links whichever encounter they're in (HP bubbles, damage from the token menu and attack/area cards find them anywhere). The token menu on unlinked tokens now offers "Link to monsters in <active encounter> without a token", grouped by kind, before "Make new monsters" (which adds to the active encounter).
- **Undo** in GM mode follows the encounter being viewed.

### Built in v2.10: Find tokens, fog of war, target buttons
- **Find on the map**: a ◎ button (and double-clicking the name) pans and zooms Owlbear to the linked token(s) and selects them: your character (header and Combat module), monster cards, initiative rows, party members (Party module and the GM's Party view). Uses `viewport.animateToBounds` around the tokens' bounds.
- **Fog of war**: for players, tokens under fog are left out of the target list, can't become the target by selecting them, and aren't counted or named in an area's "inside" list. A token is fogged when its centre is inside a visible item on the Fog layer (curves, shapes, and paths with cut-outs, even-odd); with the scene's fog "fill" on, it's the other way round (shapes reveal). Hidden tokens were already left out; the GM sees everything. Fog drawn by other extensions (dynamic fog) can't be read.
- **Target buttons**: entries with an attack, a damage save or an area show a small target button next to their dice ("◎ Goblin 1" / "◎ Target"); monster cards show one in their header. It opens the target list and updates with the current target.

### Built in v2.11: Prompts next to what they're about
- Cards still appear at the top, and now also inside the card they relate to, with the same buttons (whichever copy is used, both update):
  - **GM**: an attack card inside the target monster's card and the attacking monster's card (`srcMon` is sent with monster attacks and areas); a player target's attack card inside that player's card in the Party view; for an area or group save, a one-creature version (that creature's save controls and damage, plus Apply to all) inside each affected monster's or player's card.
  - **Players**: concentration checks and death save prompts inside the Combat module; the GM's save requests inside the Abilities module.
- Fixed: an attack card no longer shows "Waiting for the damage roll" once the damage has arrived.

### Built in v2.12: Monster spellcasting
- The stat block reader finds the Spellcasting trait or action (2024: "At will: …", "1/day each: …"; 2014: "Cantrips (at will): …", "1st level (4 slots): …"), the spell save DC, spell attack bonus (or the spellcasting ability + PB) and caster level.
- Each spell becomes a row on the monster card under "Spells · DC · to hit", grouped by frequency, with per-day boxes (or slot boxes per level for 2014 casters). Spells in the SRD get their attack, damage (cantrips scaled by caster level; "level N version" upcast), save with the monster's DC, area button and text; others show their name with a note to see the book.
- Monsters saved earlier get their spells read the first time they're shown.

### Built in v2.13: Search
- **Search** button in the toolbar (players and GM), Ctrl/Cmd+K, or "/" outside text fields. Type to see matches; arrows and Enter, or tap; Esc closes.
- **What it finds**: on your sheet: modules, every entry (name, description, text, spell school), abilities, skills, HP, death saves, conditions, spell slots; for the GM: encounters, monsters in any encounter, and their actions, traits, legendary actions and spells; party members; campaign notes (title, text, tags, status); and actions (Settings, Level up, rests, Characters, New note, Add monsters, Ask for a save, Undo).
- **Jumping there**: switches to the right view (sheet, encounter tab, Party, Notes), un-hides or expands the module, opens the entry or the monster action's text, scrolls to it and highlights it for a moment.
- Ranking: name starts with the words, then a word in the name, then the name, then the description or kind, then the full text; actions slightly ahead. Players can also "Search the SRD for …", which opens the SRD browser with that search.

### Built in v2.14: Rules automation and small additions
- **Resistances, immunities, vulnerabilities**: damage rolls keep their type per part (a modifier joins the dice before it), so damage travels as `byType`. Monsters' defences come from their stat block (Resistances / Immunities / Vulnerabilities; conditional ones like "from nonmagical attacks" are shown as a reminder, not applied). Characters' come from a new "Resistances" tag on entries (found in text such as "you have resistance to fire damage", in SRD features too, or set in the editor): features always, effects while on, items while equipped; Petrified resists everything. Attack, area and group-save cards apply the save's half first, then immunity / resistance / vulnerability type by type, and say so ("⛨ Shadow resists fire: 2 instead of 5").
- **Conditions that change rolls** (`condRules`): own attacks at disadvantage when Poisoned, Frightened, Blinded, Prone or Restrained (advantage when Invisible); checks at disadvantage when Poisoned or Frightened; DEX saves at disadvantage when Restrained; STR/DEX saves fail automatically when Paralyzed, Stunned, Unconscious or Petrified (the GM's card records a failure); attacks against Restrained, Stunned, Paralyzed, Unconscious, Petrified or Blinded targets have advantage, against Invisible disadvantage, against Prone advantage in melee and disadvantage at range; hits on Paralyzed or Unconscious targets in melee offer crit damage; Exhaustion takes 2 × level off d20 tests. Advantage and disadvantage cancel out (including the Adv/Dis buttons). The roll bar says why. Players learn a monster's conditions from its token (`com.grimsheet/monster.cond`); the GM's monster attacks and saves use their card's conditions.
- **Condition durations**: in combat, switching a condition on (player chips or a monster's "+ condition") offers "until removed / 1 round / 1 minute / N rounds". Timed conditions count down at the start of that creature's turn and end with a reminder; the remaining rounds show on the chip. Concentration on a 1-minute spell counts down 10 rounds and ends itself.
- **Token pictures**: the linked token's image beside the character name (and on monster cards and party cards); double-click finds the token.
- **Encounter difficulty**: a chip in the encounter header (Easy / Low / Moderate / High / Very high · total XP) from the 2024 XP budget for the party's levels (players in the room, or characters added outside Owlbear); its tooltip shows the budget. Ending combat tells the GM the XP of defeated monsters and the share per character.
- **Heroic Inspiration**: a toggle in the Combat module; the GM gives it from the Party view (players get a notification, even with the panel closed). While you have it, "Heroic Inspiration" is a reroll on any roll; using it clears it.

### Built in v2.15: Room homebrew
- **Only the GM shares.** Party view → **Room homebrew** (also "Manage room homebrew" in the Browse dialog for a GM who plays): share entries from the GM's library (visible, or **Add hidden**), or make new items, spells and features there (new ones start hidden). Each entry can be shown or hidden, edited, removed, or **Given** to a player.
- **Hidden entries** are never sent to players. Revealing one makes it appear for everyone, with a notification ("The GM shared … Browse → Room homebrew").
- **Give**: puts a copy straight onto the player's sheet in the module for its kind (items → Inventory, spells → Spells, features → Features & Traits, attacks → Attacks, creatures → Companions; the module is created or unhidden if needed), with a notification, even with the panel closed. Works for hidden entries (loot).
- **Players**: Browse (in any list) → **Room homebrew** tab, grouped by kind; tap a name to read it; **Add** (to the list you browsed from when it fits, otherwise the right module); save to your own library. The Browse button shows "N from GM".
- **Updates**: entries on a sheet remember their source (`e.hb = {id, v}`). When the GM edits a visible entry, players who have it get a **↻ GM update** button (and a toast); taking it keeps uses spent, quantity, equipped, on/off and companion HP, and replaces their own edits. Removing or hiding an entry never takes it off sheets.
- **Sync**: the pack lives in the GM's browser (`grimsheet.homebrew.v1[room]`); players keep a copy of the visible entries. Channel `com.grimsheet/homebrew`: `list` (visible ids and versions) after every GM change and when the GM joins, `up` (one entry), `hello` (a player's ids, sent on joining; the GM answers with `list` and the missing `up`s). The background page handles all of it when the panel is closed. Entries over ~14 KB are refused (shorten the text).

### Built in v2.16: Link a token from the Encounter view
- Each monster card without a token has a **Link token** button (and the card's edit row has "Link token" / "Link another token" / "Unlink token"). It opens a picker of the tokens on the Character and Mount layers, with their pictures: tap one, or **select the token on the map** while the picker is open (selecting doesn't set a target then). The token takes the monster's name, HP and AC bubbles, as with the right-click menu. Players' tokens are shown but can't be picked; a token linked to another monster can be moved over; hidden tokens are marked. The grid lists only tokens on the map the GM is looking at (the map under the middle of the view, since a scene can hold several maps; or what's on screen when there is no map); "Show N tokens elsewhere in the scene" lists the rest.

### Built in v2.17: After the first real-room test
- **Attack cards name the source** ("Brann · Longsword +1 → Goblin"). Damage with no roll of its own (Divine Smite, Sneak Attack, Hex: no attack and no save) rolled within 90 s of an attack against the same target joins that attack's card and adds up ("16: 6 slashing + 10 radiant (Longsword +1 6 + Divine Smite 10)"); each source keeps its own entry, so a reroll replaces only its part.
- **Roll damage on the card**: once the GM confirms a hit, the card offers "Roll damage (1d8 + 4)" (crit when it was a crit). Players' attacks carry their damage worked out to plain dice (`dmgF`); monster attacks use the stat block.
- **Apply damage automatically after a hit** (GM setting, off by default): after the GM taps Hit, the next damage roll for that card is applied at once with resistances, and riders joining the card within 2 minutes too. Cards with saving throws still wait.
- **Ask for a check** (Party view, header and each card): any skill or ability, optional DC and "what for", chosen players. Players get a prompt (and a notification), or simply roll that skill; the GM's card shows totals and passed / failed when there is a DC.
- **Edit a monster's stat block** (pencil → Edit stat block): the whole block as text, changed or added to (resistances, traits, actions) and read again. Applies to every monster of that kind in the room's encounters, keeping HP lost and conditions; SRD originals stay as they are (optionally saved to My monsters).
- **Stat block reading is position-tolerant** (v1.22.1): any "Name. text" line before the first section header counts as a trait, wherever it sits among the stat lines (before, it had to come after Challenge, so lines added elsewhere were dropped). The editor shows **Grimsheet reads** (traits, actions, bonus actions, reactions, resistances) live while typing, and an **Add to it** row (trait / action / bonus action / reaction / resistance / immunity / vulnerability / condition immunity) that inserts the line where it belongs. Monster cards list traits (tap a name for its text) above actions.
- **Paste a stat block from the token menu**: the GM's right-click menu on unlinked tokens offers "Paste a stat block…", which opens Grimsheet's paste dialog; the new monsters take those tokens.
- **Viewing a player's sheet**: a round ✕ stays in the top corner while scrolling, back to the GM screen.
- **Fixes**: monster saves rolled from a card follow conditions (Stunned, Paralyzed… fail STR and DEX saves automatically and say so; Restrained gives DEX disadvantage); turning on a condition in an Owlbear room always offers a duration; players' token bubbles are written as visible (`hide: false`), and the GM's panel also keeps players' linked tokens in step with their published HP and AC.

### Built in v2.18: Players end their own turn
- During their own turn (from the room's turn order), a player sees **End turn** in the turn banner and in the roll bar at the bottom. It sends `endTurn` (the turn key and round) to the GM, and turns into "Ending turn…" until the order moves on.
- The GM's panel moves to the next turn exactly as **Next turn** would (monster recharges, condition countdowns, reminders, the next player's notification) and shows "Brann ended their turn. Goblin's turn." It only acts if that turn and round are still current, so a late or repeated tap does nothing.
- With the GM's panel closed (the panel writes a heartbeat every 10 s and clears it when closed), the GM's background page moves the turn on in the stored encounter and the room's turn order, notifies the GM, and marks the new turn as pending; opening the panel runs that turn's start (recharges, countdowns) then.

### Built in v2.19: Small rules helpers
- **Reactions**: "⟲ Reaction ready / used" in the Combat module (and a ⟲ chip on each monster card's HP line). Tap when used; it comes back at the start of that creature's turn (players: when their turn comes up in the room's order; monsters: when their row starts) and on any rest.
- **Incapacitated ends concentration**: turning on Incapacitated, Stunned, Paralyzed, Petrified or Unconscious ends the character's concentration ("Bless ends: you are stunned."), and removes a monster's Concentrating. At 0 HP a character becomes **Unconscious** automatically, and the condition goes when they are healed (if they tap it off while at 0 HP, it stays off until then).
- **Legendary Resistance**: a monster with "Legendary Resistance (N/Day)" gets N boxes on its card. A failed save on an attack card or an area/group card (including automatic failures) offers "Legendary Resistance (N)", which marks a use and turns the result into a success (half damage becomes the suggested button).
- **Roll hit points**: "Roll each monster's hit points" in the Add monsters dialog (remembered); also used by the token menu's "make new monsters".
- **+1** on a monster card adds another of that kind to the same encounter, numbered, sharing initiative unless it rolls its own.
- **Unlinking** a token (panel, GM token menu, player menu) also removes its HP/AC bubbles.

### Built in v2.20: Conditions under tokens
- The GM's panel keeps a small label (an Owlbear Label item on the Attachment layer, attached to the token, locked, not clickable, metadata `com.grimsheet/condlabel`) under every linked token that has conditions: monsters from their card (with rounds left, e.g. "Prone (2) · Poisoned"), characters from what each player publishes (plus "Concentrating"). More than three show as "+N".
- Labels are added, changed or removed whenever conditions, links or the party change; they move, hide and delete with their token (Owlbear's attachment behaviour). Everyone at the table sees them.
- Settings → **Show conditions under tokens** (on by default); turning it off removes them. Updated while the GM's panel is open.
- **Names on tokens** (v1.23, Settings, on by default): the GM's panel writes each linked token's monster or character name as the token's own text, orange for monsters (#E8692C) and teal for characters (#1F9E8F), with a thin black outline; both colours can be changed in Settings ("Default colours" resets them). The token's previous text and colours are kept (`com.grimsheet/nametext`) and put back when the setting is turned off or the token is unlinked. Renaming a monster on its card renames its tokens.

### Built in v2.21: Backups across devices
- **Players' characters, kept by the GM** (no server): a minute after a change, and when Grimsheet opens, each changed character (not the example) is packed and sent in parts on `com.grimsheet/backup` (`pcb`); the GM's background page (or panel, when it isn't running) keeps the newest copy per player and character for the room (`grimsheet.pcbackup.v1[room][player].chars`) and acknowledges (`pcbAck`). A player whose character the GM holds no longer gets the "never backed up" reminder.
- **Restoring**: on a device with only the example character, Grimsheet asks the room (`pcbList` → `pcbIndex`) and shows "Your GM's Grimsheet has a backup of Brann Ashvale · Restore". Also Characters → **Restore from GM** and Settings → Backups. Restoring fetches the copy (`pcbGet` → `pcbData` parts), adds it or replaces an older copy (a newer copy on the device asks first), removes the example and opens it. Players are recognised by their Owlbear player ID.
- **GM: Save to Owlbear** (Settings → Backups, by hand only): uploads one small picture as a **Prop** to the GM's Owlbear library, named "Grimsheet backup · room name · date", carrying (packed, in its description) this room's encounters, campaign notes, room homebrew and players' backups, plus the GM's monsters, library, own characters and settings.
- **GM: Load from Owlbear**: Owlbear's library picker (filtered to "Grimsheet backup", props) → a summary → Load replaces this room's encounters, notes, homebrew and player backups, and merges monsters, library and characters (newer wins); panel size and view stay. On a device where the GM has nothing for this room, a banner offers "New device? Load your Grimsheet backup" (Not now hides it for the room).
- Unknown yet: how much text Owlbear keeps in an asset's description; a backup cut short is reported on load.

### Built in v2.22: Stat blocks from more sources
- **Clean-up before reading**: Homebrewery (v1 and v3 `{{monster}}`), GM Binder, Markdown and web copies are read like plain text: quote marks (`>`), bullets, headings, bold/italic, `::`, table pipes and divider rows, `___` rules, `\column`/`\page`, HTML tags and entities, non-breaking spaces, curly quotes and ligatures are removed first. D&D Beyond (2014, abilities one per line), PDF copies (wrapped lines, ALL-CAPS names) and the 2024 format were already read.
- **Names**: ALL-CAPS names become title case ("GNOLL PACK LORD" → "Gnoll Pack Lord"); spell names keep small words lower case ("Cone of Cold").
- **Check before adding**: the paste box shows **Grimsheet reads** live (name, AC, HP, CR, traits, actions, bonus actions, reactions, legendary, resistances, spells, alternative damage) with warnings: hit points, Armor Class or ability scores not found; no actions; an attack without its bonus; "Hit:" without damage; a saving throw without its DC. The stat block editor shows the same.
- **Several stat blocks in one paste**: each starts at the name line before its "Armor Class"/"AC" line (or before the size-and-type line). Reading lists them (AC, HP, CR, actions, first warning) with a count each, **Check** to open one alone, **Save all to my monsters** and **Save all and add**; from the token menu, the new monsters take the selected tokens in order.
- **Alternative damage**: "… or 8 (1d10 + 3) slashing damage if used with two hands" (any "or … if …") becomes a second damage button on the monster card ("1d10 + 3 2H"), rolled as "Longsword (two-handed)".

### Built in v2.23: Class importer
- **Characters → Classes** (also from the level-up wizard when a class is unknown): import from a **PDF** (read in the browser with pdf.js, page text in written order so columns stay together) or **pasted text** (PDF, Homebrewery, GM Binder, web; cleaned like stat blocks). A whole book works: every class in it is found.
- **What is read** (`CLASSIMP`):
  - **Class tables**: a "The Deva" title (any capitalisation, small caps included) followed by Level / Proficiency Bonus / Features headings and rows 1st–20th; rows that wrap are joined. Columns before and after the Features column are told apart by their values (numbers, dice, "—", "3rd", "20 ft."); column names come from the heading words, matched against names the text itself uses ("…the Sacred Fire Damage column") and common ones (Cantrips Known, Spell Slots, Slot Level…). Ability Score Improvement levels; spell slots from "1st…9th" columns or from "Spell Slots" + "Slot Level" (pact-style).
  - **Hit die** ("Hit Dice: 1d10 per … level"), **saving throws**, **spellcasting ability** ("Charisma is your spellcasting ability"), armour and weapons.
  - **Features**: every "3rd-level Deva feature" marker; the name is the line before it, the text runs to the next feature. Text stops at a subclass or class heading, a class table, a chapter's drop cap, a page header naming another chapter, lore labels (Age., Lair., Treasure.…), personality tables, spell lists and "Optional" sidebars. Page numbers and running headers are removed. "…feature, which replaces the X feature" is kept (the subclass feature replaces X).
  - **Subclasses**: markers naming anything other than a class ("6th-level Bronze Dragon feature") within that class's part of the text; the subclass level is the lowest of them.
- **Check before keeping**: each class found shows hit die (editable), name (editable), features, subclasses, spell slots, ability, ASI levels, and warnings (a table feature with no description, a description not in the table, very short texts); "Show levels" gives a 1–20 overview with subclass and ASI marks, slots and column values. Keep selected (a class with the same name is replaced).
- **Level-ups**: an imported class works like a built-in one: its hit die, the level's features added **with their full text** and everything Grimsheet recognises in them (dice, saves, uses per rest…), subclass choice at its level (or later if never chosen) with the subclass's features, "X improvement" table entries listed as reminders, ASIs, and spell slots from the table. A feature that mentions a table column picks it up: dice columns become the feature's damage (`d(table(LEVEL, …), 8)`), number columns its uses.
- **Catch up**: Classes → My classes offers, for the open character, the subclass choice if due and every feature up to their level that isn't on the sheet ("Add them").
- **Sharing**: GMs tap **Share** on a class (or Room homebrew → Share a class…); it appears in players' Browse → Room homebrew under Classes with **Add to my classes** / **Update my copy**. Entries too big for one message travel packed in parts (`upz`).
- **Racial traits** (v1.27; monster classes are a race and a class at once): after "…you have the following (additional) racial traits:", the "Name. Text." entries up to the end of that page, a heading, a class feature or "Class Features"/"Hit Points"/"Equipment". Names must look like names ("Celestial Body", "Gift of the Forest"), so sentences that happen to start a line aren't taken for traits. Age, Alignment and Ability Score Increase are left out (applied when the character is made); a name repeated in the same list is merged. They belong to whoever owns the next feature: the class's become level-1 features, a subclass's arrive at its first level (when it's chosen). A trait cut by a page break ends with "…". They're marked "(trait)" in the level overview and go through the same recognition, so "resistance to radiant damage" becomes a resistance.
- **Subclasses for the basic classes** (v1.28; books like Tasha's Cauldron of Everything): a subclass whose features are marked "3rd-level Path of the Beast feature" but that belongs to none of the classes in the text becomes a subclass of a basic class. Its class comes from, in order: the section it sits in (a heading like "BARBARIAN", or the class's own features marked "3rd-level barbarian feature", within 500 lines), its name ("Path of", "College of", "… Domain", "Circle of", "Way of", "Oath of", "School of"/"Order of", "… Sorcery"/"Bloodline", "… Patron"), or, for a subclass pasted on its own, the words in its text ("your fighter level", Rage, Ki, Channel Divinity…; a strong lead is needed, and the review says it was guessed). When nothing decides, the review asks for the class. The class is a list in the review: the twelve basic classes and the user's imported classes; a subclass for an imported class goes inside that class.
- **Optional class features**: features marked with the class's own name in lower case ("7th-level barbarian feature") are that class's optional features. They're kept as one entry per class ("Barbarian optional features").
- Each subclass is kept on its own (id `sub:<class>:<name>`, with `parent`, `addon: true`); optional features as `opt:<class>`. Keeping one again replaces it.
- **In the level-up**: the subclass list for a basic class adds the book's subclasses. Choosing one adds its features for that level with the full text, and its features from earlier levels too (a domain from level 1 picked at the 2024 cleric's level 3). The basic subclass's features are only added when it's the one chosen (before, typing another subclass still added them). Optional features at that level are offered unticked, marked "optional"; one with the same name as a feature the class already gets at that level (the 2024 classes took some in) isn't offered.
- **Catch-up**: Classes shows a subclass pick for a basic-class character without a subclass when the book has some, and adds the chosen subclass's features up to the character's level. Shared through Room homebrew like classes.
- **Features that replace others** (v1.29; variant subclasses like the Ogre Mage, Tasha's optional features): "which replaces the Thick Skin feature" is read even when it runs onto the next line, and "A or B" names both. In the level-up a subclass's replacement is offered instead of the feature it replaces (from its level on), and taking it removes the replaced feature from the sheet (one undo puts it back); the level-up says "taken off your sheet" when that will happen. Catch-up does the same when a subclass is picked later (an ogre who becomes an Ogre Mage loses Thick Skin and Instinctual Tactics and gains Mystical Skin and Spellcasting).
- **Ability score improvements in imported classes** (v1.30): any table entry or feature ending in "Ability Score Improvement" counts ("Ogrish Ability Score Improvement"). The levels come from the class table, or else from the feature's own text ("When you reach 4th level, and again at 8th, 12th, 16th, and 19th level"), so classes imported before this version work without importing again. At those levels the level-up asks for +2 to one ability, +1 to two, or a feat, under the class's own name for it; the feature itself isn't added to the sheet. Imported classes follow their own levels: 19 is an improvement there, not the 2024 Epic Boon.
- **Ability maximums and automatic raises** (v1.31): read from the features on the sheet and from the character's imported classes up to their level (so they work even when the feature isn't on the sheet). "Your Strength score maximum is 24" sets the maximum; "your current and maximum Strength scores increase by 2 at 5th level, 9th level, 13th level, and 17th level" raises the score by itself at those class levels (shown in the level-up as "↑ Ogre Strength: Strength +2 (22 → 24), maximum 26") and lifts the maximum with it. The ability list shows the maximum at the level being gained; +2 is allowed whenever the score is below its maximum and stops there.
- **Variants aren't required**: a class whose only subclasses swap some of its features (every feature "replaces" one, like the Ogre Mage) doesn't make the level-up ask for one; it's picked in Classes when wanted.
- **A subclass's own spell table** ("Ogre Mage Spellcasting": Level, Cantrips Known, Spells Known, 1st–4th; rows may start past level 1 and leave empty slot columns off) gives that subclass its spell slots, and the spellcasting ability said nearby ("Strength is your spellcasting ability") becomes its ability. The level-up and catch-up then set the slots from it; the table's lines stay out of the feature text around it.
- **Scanned books**: marker lines with glued words are mended ("College ofEloquence", "WayofMercy", "Astral Selffeature", "1 1th-level"); an owner spelled differently on one line ("Rune KniSht") is matched to its usual spelling; letter-spaced capitals headings ("PRIMAL C O M PA NION") are joined into the book's own words and written in title case; a name taken from a table laid over the heading is replaced by the capitals heading above it; feature text stops at chapter footers, "… BUILDS" sidebars, Feats/Magic Items headings, and at a capitals heading once it's very long. Pasted text and PDFs no longer lose everything between a stray "<" and the next ">" (the tag remover now only removes tags).
- Not read: 2024-style "Level 3: Feature" headings without a "…-level X feature" line, option pickers (Fighting Styles, invocations).

### Roadmap
Ordered by when it gets built. Priority applies inside a goal.

**Current goal: Choose targets on the map**
- *Done (v2.1):* **Attacks against a target** (see above).
- *Done (v2.3):* **Spell areas on the map** (see above).
- *Done (v2.20):* **Conditions on tokens.** Small markers on tokens for conditions and concentration, kept in step with the sheet and the monster cards.
- *Done (v2.4):* **Combat prompts** (see above).
- *Done (v2.15):* **Shared homebrew** (see above).

**Mid goals**
- *Done (v2.5):* **Level-up wizard** (see above).
- *Done (v2.6):* **Undo button** (see above).

**Mid to long goal**
- *Done (v2.7):* **Campaign notes** (see above). The automatic session log and recap were dropped from the plan.

**Long goal**
- *First step done (v2.21):* backups held by the GM and GM saves to the Owlbear library (see above). *Still open:* automatic sync. **Keep characters safe across devices.** Characters are kept on a sync service instead of only in one browser, so they survive a new device, a cleared browser, or Owlbear keeping its own browser storage. Works offline and syncs when back online; existing characters move over on first sign-in.

**Later, not scheduled**
- Install as an app with offline use; condition durations on the initiative tracker; encounter difficulty from CR and party level.
- Print / PDF layout; importers (D&D Beyond JSON); themes, portraits, Discord webhook for shared rolls; help from an AI model for harder text recognition and summaries.


## Built in v1.32 (app 1.35)

- **Spells that repeat on later turns** get a second roll button (↻) next to the first hit's damage. The text reader finds sentences about later turns ("On each of your subsequent turns, you can take a Bonus Action to deal 1d12 Lightning damage", "As a Bonus Action on your later turns … repeat the attack", "Until the spell ends, you can take a Magic action to … again", "on each of your later turns to deal this damage again") and takes their dice out of the first hit. Witch Bolt: 2d12 on the hit, ↻ 1d12 as a bonus action with no attack roll. Spiritual Weapon and Vampiric Touch: ↻ rolls to hit again, then the same damage. Heat Metal and Call Lightning: ↻ deals the same damage again.
- The repeat grows with the slot the spell was last cast with, unless the upcast names only the first hit ("The initial damage increases…"); the button's tooltip says the level. It's marked BA when it takes a bonus action.
- Entries saved before 1.35 with the two rolls added together (Witch Bolt "2d12 + 1d12") are split when the sheet loads. The editor has an "Again on later turns" section (what it takes, dice and type, rolls to hit again, grows with the slot). SRD spells get it from their text too.
- "Takes Force damage equal to 1d8 plus your spellcasting ability modifier" is now read as damage.
- **Example character in the room**: the party status says when a player's open character is still the example. The Party module and the GM's Party view show an "example character" chip. In Owlbear, the player sees a warning instead of the usual example banner. It says the party sees the example and explains that Owlbear keeps its own characters, with Import and Characters buttons and "Keep this one". The Characters dialog explains, both in Owlbear and on the website, that Owlbear keeps its own characters and how to bring one over (Export there, Import here).


## Built in v1.33 (app 1.36)

- **The example character is gone.** Brann Ashvale is no longer created, and the "Add example character" button is gone. Any character still marked as the example is deleted when Grimsheet loads, on every device and in Owlbear. One that was kept with "Keep this one" stays, since it's no longer marked. If nothing is left, a simple character is created.
- **Simple character** (new installs start with one; Characters → Simple character adds another): for a player whose character lives elsewhere (paper, another app) who still wants the table features. Only the Combat module is shown. Its name, AC, initiative bonus and maximum HP can be changed right there without Edit mode. HP changes, temp HP, conditions, death saves, linking a token, and rolling initiative into the GM's tracker all work as usual, and the party sees its status. Proficiency and hit dice are left out. "Use the full sheet" brings back every module.
- **Not set up yet**: an untouched simple character (no name, AC, HP or initiative change yet) counts as a placeholder, like the old example did. The party shows "not set up" next to it, a GM with only a placeholder starts in GM mode, it isn't backed up to the GM, and a restore from the GM replaces it. Its banner explains what to fill in and that Owlbear and the website keep their own characters (Import, Start a full sheet).


## Built in v1.34 (app 1.37)

- **Guided tours**: walk-throughs that dim the screen, light up one thing at a time and explain it in a bubble beside it, with Back, Next and Skip tour, a progress bar, and arrow keys and Esc. The bubble flips above or below to where there's room and stays on screen at phone widths. Steps whose target isn't on this person's screen are skipped (no token link outside Owlbear, no End turn outside combat). The tour finds its target again when the sheet redraws.
- **Four tours**:
  - **The sheet**: your character, bringing one in (Import from PDF, Import) and homebrew classes and subclasses (Classes), both shown in the Characters dialog the tour opens, then rolling, advantage, HP, conditions, adding entries, the roll tray, Edit mode, level up and rests, search, Settings (14 steps, 1.37.2).
  - **Playing in Owlbear**: token link, initiative, targets, End turn, the party, room homebrew and GM backups (7).
  - **Running the game** (GM): the views, monsters and their cards, adding the party and asking for initiative, running combat, the Party view, notes, backups (9). It opens the views it talks about.
  - **The simple character**: name, AC and initiative, HP, the full sheet (4).
- **Small screens** (1.37.1): each step scrolls the page so the lit-up part and its bubble fit together; a part taller than the screen shows its top with the bubble at the bottom. Checked at 360×480, 400×620 and 1200×500, and in a 400×560 Owlbear panel. Settings rows now wrap on narrow screens (controls drop below their description; the Tours buttons sit under their text).
- **When**: a banner offers the tour that fits once (the GM tour in GM mode, the simple one for a simple character, otherwise the sheet tour); "No thanks" hides it for good. At the end of a tour, the next one that fits is offered (after the sheet or simple tour in Owlbear, the Owlbear tour). Settings has a Tours row to replay any of them, with ✓ for finished ones; tours that don't apply here are greyed out with the reason.


## Built in app 1.38

- **When the browser blocks storage** (cookies and site data turned off): Grimsheet works fully for the session but can't keep anything. As a player in an Owlbear room, the GM's Grimsheet becomes the place your character is kept:
  - changes go to the GM within about 3 seconds (instead of a minute), and again when the page is hidden or closed;
  - what was sent is remembered in memory;
  - on reopening, the newest character the GM holds is restored by itself, with no button to press.
  - The banner says storage is blocked, that the character is kept with the GM and comes back when you reopen, whether the GM has the latest changes, and that Characters → Export makes a copy of your own.
  - Outside Owlbear, or without a GM running Grimsheet, the banner suggests Export as before.
  - The tour offer isn't shown when storage is blocked, since "No thanks" couldn't be remembered.
  - Tested: a player with storage blocked set name, AC 17 and took 4 damage. The GM held the copy within seconds, and after a reload the player was back as Thorin, AC 17, 6 HP.


## Built in app 1.39

- **Create a character** (Characters dialog, the simple character's banner, the sheet tour): a step-by-step wizard following the 2024 rules in the SRD 5.2.
  - **Class**: the 12 basic classes with hit die, saves and whether they cast; a fighter picks a fighting style. Choose a starting level; above 1, the level-up wizard follows once per level.
  - **Species**: the 9 SRD species, with size, speed and traits. Choices: dragonborn ancestry (sets the breath weapon and resistance type), elven, gnomish and fiendish lineage, giant ancestry. An elf's Keen Senses skill; a human's Skillful skill and Versatile origin feat.
  - **Background**: Acolyte, Criminal, Sage or Soldier, or another one you name, with its three abilities, two skills, origin feat and tool. The bonus is +2/+1 (placed on the class's best abilities by default) or +1/+1/+1.
  - **Abilities**: standard array (assigned in the class's order), point buy (27 points, 8–15, with the running total) or 4d6 drop the lowest. Totals include the background's bonus; the class's key abilities are highlighted.
  - **Skills**: the class's number from its list; ones the background or species give are shown ticked and not counted.
  - **Equipment**: the class's starting armor, shield and weapons, changeable within its training, with the AC worked out (Unarmored Defense for barbarians and monks).
  - **Spells** (casters): cantrips and 1st-level spells from the class list, capped at what level 1 allows.
  - **Finish**: a summary, then the sheet. It has scores and saves, skills, HP (the hit die's maximum + CON, +1 for a dwarf), AC, speed, slots, weapons as attacks, armor and shield, class features (level-1 features the rules pack lacks get a short text), species traits and the origin feat. Notes cover training, size and languages. Spells are hidden for non-casters, and an untouched placeholder character is replaced.
- **Prepare spells** (a button in the Spells module, for bard, cleric, druid, paladin, ranger, sorcerer, warlock and wizard):
  - It shows the class's SRD 5.2 spell list up to the highest spell level its slots reach, with a running count against the 2024 prepared-spells and cantrips-known tables for its level.
  - Ticking adds the spell with its full SRD entry; unticking takes it off (undo puts it back).
  - Spells from elsewhere (subclass, feats) are listed separately and not counted. Multiclass casters switch between classes. Going over the limit is allowed, with a warning, for features that grant extra spells.
- **After a level-up**: the level-up dialog shows the new prepared and cantrip counts (with the increase). Prepare spells opens by itself when the count, cantrips or highest spell level went up, and after the last level of a higher starting level.
- **Fix**: adding a spell from the built-in rules failed in 1.35–1.38 (an error when reading its repeat damage); fixed.


## Built in app 1.40

- **Homebrew in the character wizard**:
  - **Classes**: classes imported in Characters → Classes appear under "Your homebrew classes". They use the class's hit die, saves, spellcasting ability and spell table (no spell step, since there's no list). Any two skills and all armor and weapons are offered, and its stated training goes into the notes. Its level-1 features (racial traits included) are added with their full text.
  - **Subclasses at level 1**: a subclass that starts at level 1 is picked on the class step (required, or optional when its subclasses only swap features, like the Ogre Mage). A higher starting level runs the level-up wizard as for any imported class.
  - **Species from the class**: for a class with racial traits (monster classes), "<Class> (from the class)" uses the class's own Size and Speed traits, with nothing added twice.
  - **Another species**: name, size and speed, and its traits pasted as "Name. Text." paragraphs. Each becomes a feature, scanned for dice, saves and uses (e.g. "a number of times equal to your proficiency bonus per long rest" becomes a counter). The step shows what it found.


## Built in app 1.41

- **Maximum HP**:
  - In Play mode, the maximum after the slash is a button: tap it, type the new maximum and press Enter.
  - In Edit mode, the field is labelled "max HP".
  - Current HP is capped at the new maximum.
- **Features that raise maximum HP per level**: Tough (2 per level), Dwarven Toughness (1), and any feature whose text says "hit point maximum increases by an amount equal to twice your character level", "by 1 … whenever you gain a level" or "increases by an additional 2 … whenever you gain a level".
  - Level-ups add their amount, as before.
  - When one is on the sheet but its bonus for the levels already gained hasn't been counted (a feat taken, a character imported from a PDF), a banner asks: "Tough raises your maximum HP by 2 for every level: +10 at level 5. Is it in your maximum yet?" It offers **Add +10** and **Already counted**, and each choice is remembered per feature.
  - The character wizard counts Dwarven Toughness itself.


## Store preparation (app 1.41.1)

- **No third-party requests from the site**: the GitHub Pages build serves the fonts (Alegreya SC, Alegreya Sans, IBM Plex Mono, OFL, from Fontsource) from `fonts/` and pdf.js 3.11.174 from `vendor/pdfjs/`, instead of Google Fonts and cdnjs. Checked: loading the app and importing a PDF make no requests outside the site. The claude.ai copy keeps the Google Fonts link and cdnjs (the build swaps them).
- The wizard's AC sum no longer uses `Function` (plain addition of the numbers).
- Manifest author **Ben Fassler**, with a new description.
- README rewritten at the top: install without the old `?v=` step, a **Privacy** section (what stays in the browser, what's shared in a room and with whom, PDFs read locally, clipboard only on Copy, the claude.ai-only "Read with Claude"), the new features, and licences for pdf.js and the fonts.
- Store page `store/grimsheet.md` (frontmatter for Owlbear's store) with `store/hero.png` (1200×630), `store/icon.png` (256×256) and screenshots (sheet, wizard, prepare spells, encounter, tour).

## HP bars on tokens (app 1.42.0)

- The background page draws an **HP bar and AC** on every CHARACTER/MOUNT token that carries the HP/AC metadata Grimsheet writes (the Stat Bubbles format, `com.owlbear-rodeo-bubbles-extension/metadata`), so no other extension is needed (Owlbear verification: "requires no other extensions").
- Drawn as **local items** (`OBR.scene.local`), attached to the token, on each person's own screen: the GM sees all; players see tokens whose `hide` is off. Monsters with `hide` on show players **Healthy / Bloodied / Down** when the GM's "Monster HP for players" is *Healthy / Bloodied* (the GM's panel writes `hpShow` into the monster link), and nothing when it's *Hidden*.
- Bar: dark track, fill green over 50%, amber to 25%, red below, grey at 0; "hp/max +temp" text; a thin blue strip for temp HP; AC in a circle at the bar's left end. Only tokens whose values, size or visibility changed are redrawn.
- **Settings → HP bars on tokens** (each person, in Owlbear) turns them off. If Stat Bubbles is drawing in the room (its local items `<id>-health-background` / `<id>-ac-background`), Grimsheet removes its own bars and leaves it to Stat Bubbles.

- 1.42.1: manifest description shortened to fit Owlbear's 128-character limit (the longer one in 1.41.1 stopped the extension loading).

## Names and HP bars (app 1.44.0, replaces 1.43.0)

- HP bar and AC always sit along the **bottom** of the token.
- **Names on tokens** (GM): the GM's panel writes `com.grimsheet/nametext` = `{ orig, text, color, pos }` on each linked token and **clears the token's own text** (kept in `orig`, put back when names are turned off or the token is unlinked).
- Each person's background page draws the name as a **local label** attached to the token: **under the token** (default) or **above it**, chosen by the GM in Settings → Names on tokens → *Name* dropdown. Names are drawn even when HP bars are off or Stat Bubbles draws the bars; players don't get names of hidden tokens.
- Conditions labels move down below the name when names are under tokens (`under: 'name'` on the label; relaid when the setting changes).
- 1.44.1: the name tag is drawn in **map units** (a dark rectangle plus text, not an Owlbear label), so it zooms with the map instead of staying the same size on screen. It's never wider than 90% of the token: the text shrinks to fit, and a long name goes onto two lines (split at the space nearest the middle) when that keeps it noticeably bigger. Conditions under a named token sit a little lower to clear a two-line name.
- 1.45.0: **conditions** are drawn the same way. The GM's panel writes `com.grimsheet/cond` = `{ text }` on each linked token (and deletes the shared condition labels earlier versions made); each person's background page draws a red tag in map units under the name (or under the token when the name is above), at most 90% of the token's width, wrapping long lists onto two lines at a " · ". Players don't get tags for hidden tokens.

## Test version and releases (1.46.0)

Every change goes to a **test extension** first; players only get it after it's been tried.

- **Test extension:** `https://benfass.github.io/grimsheet/test/manifest.json`, named **Grimsheet TEST**, with an orange flask on its icon. Add it to Owlbear next to (or instead of) the main one.
- **Kept apart from the main extension:**
  - Every saved key is stored under a `test:` prefix (a small script at the top of each page wraps `localStorage`, and translates `storage` events back), so the test version never reads or writes the main version's characters, settings or homebrew.
  - All Owlbear names (`com.grimsheet/...` metadata keys, broadcast channels, context-menu ids, local drawings) become `com.grimsheet-test/...`, so the two don't see or disturb each other even in the same room. Tokens have to be linked again in the test version.
  - Stat Bubbles' HP/AC data on tokens is shared (same format, same values).
- **Settings → Test version → Copy my characters from Grimsheet** replaces the test version's data with a copy of the main version's (the main version is untouched), then reloads.
- **Build** (`/home/claude/sheet/build.py`; sources are `index.html` and `ext/` — `background.html`, `gm.html`, `shared.js`):
  - `build.py dev` → `/home/claude/gdev` (local copy the automated tests run against).
  - `build.py test` → `grimsheet/test/`, and records the source fingerprint in `test/build.json`.
  - `build.py release` → the site root. It refuses unless the source is exactly what was last built with `test` (`--force` overrides, for emergencies only).
  - Both manifests are generated, and the build checks Owlbear's limits (name 45 characters, description 128).
- **Process:** change → `dev` + automated tests → `test` + push → the user tries **Grimsheet TEST** in Owlbear → when they say it's good, `release` + push.
- **Main pauses while TEST runs (1.47.0):** Grimsheet TEST's background page writes its heartbeat (`test:grimsheet.bg.v1`, with the room id) every 15 s. The main extension checks it every 5 s (`GS.testRunning(room)`; fresh = under 40 s, same room). While it's fresh, the main extension is **paused on that computer**: its background page removes its token drawings and right-click menus and ignores messages and turn reminders, and its panel shows "Grimsheet is paused in this room". When TEST is turned off for the room, the heartbeat goes stale and the main extension comes back by itself (the panel reloads).
- **TEST takes over tokens (GM):** when the GM's Grimsheet TEST starts, and whenever a scene opens, it copies every `com.grimsheet/...` key on items onto the matching `com.grimsheet-test/...` key where that's missing (links, monsters, names, conditions, area templates), and the room's initiative. The main extension's data stays as it was, so going back to the main extension picks up where it left off. Players should use Settings → Test version → Copy my characters so their character ids match their token links.
- 1.48.0: **Names on tokens → Size** (Small 0.75×, Medium, Large 1.3×, Extra large 1.6×), next to the colours. Written as `size` in `com.grimsheet/nametext`; the tag still never gets wider than 90% of the token (bigger names shrink back or wrap to fit).
- 1.48.1: **one device keeps the tokens up to date.** With Grimsheet open on two devices (a phone in the background, say), each panel wrote its own settings and data onto the tokens and they fought, so names flashed. Now each panel has a device id (`grimsheet.device.v1`), and the room metadata holds a lease per GM (`com.grimsheet/drive.gm`) or per player (`com.grimsheet/drive.<player id>`): `{ dev, at }`. Only the device holding it writes tokens automatically (names, conditions, monster and character HP/AC, Owlbear initiative tracker). Using a device (any tap or key in its panel) takes the lease; the holder renews it every 10 s; a lease older than 30 s is free. When a device takes over it brings the tokens in line with its own data. Things done by hand (linking, applying damage, rolling initiative) still go through from any device.
- 1.49.0: **PDF import reads the 2024-style two-page fillable sheet** directly (no Claude needed). It's recognised by its field names (`score str`, `Check Boxath`, `Atk BonusDCRow0`, `can 1`, `lvl 1 - 1`). Read: name, class + level, species, background, scores, saves, skills (the sheet prints 16 skills; Investigation and Persuasion go on the blank lines, matched forgivingly by name), proficiency bonus, AC, initiative, speed, HP, hit dice (max and spent; class hit die added when only a number is written), death saves, attack rows (bonus, damage and notes matched by position on the same line), spellcasting DC and attack, cantrips and spells by level, slots per level (total and expended, found above each level's first line), both features columns, inventory, coins; subclass, size, languages, resistances, conditions, armor/weapon/tool training, attunements, spell resources and heroic inspiration go into notes. The import dialog lists both supported sheets.
- 1.49.1: **update check.** Owlbear keeps the panel and background page running until the room is reloaded, and GitHub Pages lets browsers keep files for up to 10 minutes, so new versions didn't show up until a reload. Now both fetch their own `manifest.json` (same folder, so the test build checks `test/manifest.json`; `cache: 'no-store'`) 4 s after loading, every 5 minutes, and when the panel becomes visible. If its version is newer, the panel shows "Grimsheet X is ready · Reload" at the top, and the background page reloads itself. Only our own site is contacted.
- 1.50.0: **PDF import reads the official 2024 character sheet** (Player's Handbook, © 2024 Wizards), including copies saved "flat" with no form fields. It's read by position: every text item, filled field value and comment (sticky note) is placed on the page, and each field of the sheet is a box in the coordinates of a 603×774 copy, mapped onto the actual page from two labels (`character name` + `PASSIVE PERCEPTION` on page 1, `spellcasting ability` + `APPEARANCE` on page 2); printed labels are ignored. The sheet's checkboxes can't be read once flattened, so **save and skill proficiency come from the numbers written beside them** (modifier + proficiency bonus = proficient, + twice = expertise). Ability boxes: the bigger unsigned number is the score. Weapons and spell tables are read row by row by column. Comments go into Notes, named after the box they sit on, with a warning to apply them by hand.
- 1.50.0: **Claude for other PDFs works anywhere.** The import step for unknown PDFs now offers *Copy the prompt* (instructions plus the sheet's text, for any Claude chat) and a box to paste Claude's reply, which is read as JSON (code fences and extra text around it are ignored). *Read with Claude* stays as an extra option where it's available (claude.ai).
- 1.51.0: **PDF import reads four more sheets** by their field names (checked against two real D&D Beyond exports, and against blank copies of the others filled with test values):
  - **D&D Beyond "Export to PDF".** Its fields sit on the pages without a PDF form, so the importer now also collects every page's widgets (`getAnnotations`) and merges them with the form's fields (`{ name, value, page, rect, type, items }`; the same name can repeat on several pages). Reads class & level (multiclass "Rogue 5 / Warlock 8" becomes level 13, original kept in notes), scores, save dots, skill P/E (H noted), HP, hit dice, death saves, up to 8 attacks with notes, every spell with level from the nearest "=== 1st LEVEL ===" header and its time/range/components/duration (used for spells not in the SRD), slots from the slot headers, features (the three columns run on, so they're joined and split per "* Name • Source"; "| choice" lines and "| 1 / Short Rest • 1 Action" usage stay with their feature), inventory by row order (attuned items not repeated), coins, proficiencies, senses, defenses, actions and the personality page into notes.
  - **MPMB's character record sheet (v13, 2014).** "Class and Levels", scores, ST Prof, skill Prof/Exp, AC, "Initiative bonus", HP, HD1–3, death saves, Attack.1–6, spells from the sheet's spawned spell pages (`…spells.name.N`, levels from `spellsdiv` dividers; DC only when there are spells, since the sheet always fills one), Class Features, Racial Traits, feats, background feature, gear rows with amounts, magic items, limited features, languages, tools, training.
  - **"Class Character Sheet" series** (Front_/Back_ fields). The class isn't a field, so it's worked out from the class-specific field names (Arcane Tradition → Wizard, Domain → Cleric, Rage → Barbarian…), with a note to check. Class feature boxes become features ("Arcane Tradition (level 2)"); number-only boxes ("Rage Total") go into notes.
  - **Calculating Charsheet 1.7 (StatBig Multiclass).** Two class/level dropdowns, scores, save/skill PROF and EXP boxes, attacks, spells by fixed line ranges per level, slots.
  - Dropdowns that store a number show their label ("7" → "Elf (Wood)"); "◆"-style bullets are trimmed from feature names.

## 1.52.0 (from the 12 Nov 2026 plan; each item checked against the code first)

- **Version in Settings:** the Settings header shows "Grimsheet 1.x.y", with a red **TEST** in the test build.
- **Verification:** every text style under 12px (0.62–0.74rem) raised to 0.75rem. Colour contrast checked with axe-core (WCAG AA) on the sheet, edit mode, Settings, Characters and Encounter, light and dark: no problems. A room with no scene open (every scene call failing, as in Owlbear) was tested for GM and player, panel and background: no errors.
- **Short rest dialog:** Short rest opens a dialog showing HP and hit dice left; *Spend a hit die* rolls one (die + CON), heals and lists it; *Finish short rest* restores short-rest uses (listed in the dialog). Long rest unchanged. (The separate *Spend hit die* button already existed.)
- **Multiclassing in level-up** (choosing "A new class" already existed): shows the multiclass prerequisites (13+ in the class's abilities) for the new class and the classes you have, with a warning if not met (not a block, for house rules), what the new class brings (armor/weapon/tool training, written into Notes) and, for Bard, Ranger and Rogue, a skill to choose.
- **GM notes on monsters:** a "GM note" field in a monster's edit row, shown on its card. Kept in the GM's encounter only; never put on tokens or in the shared turn order.
- **Session log:** a new "Session" note type ("Session log" tab), first in the campaign notes, newest first, titled "Session N · date" automatically. Party notes were already shared with the room.
- **D&D Beyond character data:** Import character accepts the JSON from `character-service.dndbeyond.com/character/v5/character/<id>` (public characters), with steps in the dialog. Tested on five real characters. Scores = base + every bonus modifier (chosen ones are flagged `isGranted: false` but count) + bonus stats, overrides win; saves/skills/expertise from modifiers; HP = base + bonus + (CON + per-level bonuses like Tough) × level − removed; AC from equipped armor type and shield (+ magic), Unarmored Defense for Monk/Barbarian; attacks from equipped weapons (finesse/ranged pick DEX); spells from class lists and other sources with time/range/duration/components; slots from the classes with the used ones; class, subclass, species, feat and background features with their text; inventory; coins; languages, proficiencies, senses, defenses and the personality page into notes. Shown in the import preview with a warning to check AC, HP and attack bonuses.
- **Problem reports:** errors in the panel are collected (message and stack, no character data); the first one shows a bar "Something went wrong" with *Report it* (opens a GitHub issue with version, browser and errors filled in) and *Copy details*. Settings has *Report a problem* too. Nothing is sent unless the person submits the issue.
- Checked and left as is: the character portrait (the linked token's image is already on the sheet header and party cards in Owlbear; on the website it would mean loading images from another site), and load time (pdf.js already loads only when used; the panel opens in about 2.8 s on a simulated slow 3G phone, then it's cached; splitting out the importers would save about 0.3 s).

## Co-DMs (1.53.0)

- **Roles.** Room metadata `com.grimsheet/dms` = `{ main, mainName, co: { playerId: name }, table, at }`. An Owlbear GM who opens Grimsheet becomes the **main DM** when the room has none or the main DM isn't in the room (two GMs at once: the lower player id claims). Every other Owlbear GM is a **co-DM** automatically; the main DM can also make players co-DMs (Settings → DMs → *Make co-DM*), hand over (*Make main DM*), and an Owlbear GM co-DM can *Become the main DM*.
- **Effective role.** Grimsheet treats a co-DM as GM everywhere (`OBRX.me.role` is the effective role, `OBRX.realRole` Owlbear's): panel, party lists, background page (its token menu is offered to a player co-DM too). A change of DMs reloads the affected panel and background. A player co-DM needs Owlbear's permission to change others' tokens for token writes to work.
- **One shared encounter.** The room's encounters and the attack/save queue are kept in step between DM devices over `com.grimsheet/dmsync`: every save works out path-level edits against the last synced copy (objects by key, arrays of things with ids by id plus their order, so two DMs adding monsters both keep theirs), stamps them `[time, device]` and sends them (packed and split into 12,000-character parts when large). Each device takes an edit when it's newer than what it has for that value (or anything around it), so all DMs end up the same whatever order messages arrive in. A DM opening the panel says hello and the others answer with their copy and stamps; values nobody has stamped yet come from the main DM. Sync state: `grimsheet.dmsync.v1` per room.
- **Table settings are the main DM's** (names on tokens and their colour/size/position, condition tags, monster HP for players, monster rolls, Owlbear's tracker): published to the room on every change, applied by co-DMs, locked in their Settings with a note.
- **Handled once.** Player requests that change the encounter (end of turn, automatic damage) are handled only by the DM device holding the token-update lease (`com.grimsheet/drive.gm`, shared by all DMs); a background page acts only when it holds the lease, or nobody does and it's the main DM's.

## Target glow (1.54.0)
- **What**: the token a player (or DM) is targeting gets a soft grey glow and a thin ring. It is drawn as local items (`OBR.scene.local`), so only the person targeting sees it; other players and the DM don't.
- **Look**: four mid-grey discs (`#9a9a9a`, 30% each) behind the token on the Prop layer, stacking to strongest next to it, out to max(0.07 grid, 0.16 × token radius), so it sits just outside the token (made smaller in 1.54.1); a soft dark edge (`#3a3a3a`, 55%) at the outside of the glow; on the Attachment layer, a dark ring (`#202020`) outside a light ring (`#e8e8e8`) hugging the token, so at least one of them stands out. Checked on dark dungeon, parchment, grass, snow, grey stone, lava, water and wood maps.
- **Behaviour**: attached to the target token (moves and scales with it; not hit-testable; metadata `com.grimsheet/tglow = { for }`). Redrawn when the target changes, removed by Clear target or when the room/scene resets; any glow left over from an earlier session is removed when the panel starts.
