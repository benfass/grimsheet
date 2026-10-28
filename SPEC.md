# D&D Character Sheet App — Product Spec (v1.19)

*Working name: Grimsheet. v0.2 recorded the platform decision and first build; v0.3 added the SRD 5.2 content pack and locked skill proficiency to Edit mode; v0.4 expanded the pack; v0.5 added PDF import and documented the saved character format; v0.6 replaced the grid with a row-and-column layout; v0.7 added dice animation and a Settings panel; v0.8 added the Owlbear Rodeo extension and a backup reminder; v0.9 added panel sizes and compact mode; v1.0 added the background page and token linking; v1.1 added GM tools; v1.2 added monsters, the Encounter view and initiative; v1.3 added attacks against a target on the map; v1.4 added rerolls; v1.5 added spell areas on the map; v1.6 added combat prompts; v1.7 added the level-up wizard; v1.8 added undo; v1.9 added campaign notes; v1.10 added GM mode; v1.11 added several encounters; v1.12 added finding tokens, fog-aware targets and target buttons; v1.13 showed prompts next to what they're about; v1.14 read monster spellcasting; v1.15 added search; v1.16 adds rules automation (resistances, conditions, durations), token pictures, encounter difficulty and Heroic Inspiration; v1.17 added room homebrew; v1.18 linked monsters to tokens from the Encounter view; v1.19 adds fixes and GM conveniences from the first real-room test.*

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
- **Paste a stat block from the token menu**: the GM's right-click menu on unlinked tokens offers "Paste a stat block…", which opens Grimsheet's paste dialog; the new monsters take those tokens.
- **Viewing a player's sheet**: a round ✕ stays in the top corner while scrolling, back to the GM screen.
- **Fixes**: monster saves rolled from a card follow conditions (Stunned, Paralyzed… fail STR and DEX saves automatically and say so; Restrained gives DEX disadvantage); turning on a condition in an Owlbear room always offers a duration; players' token bubbles are written as visible (`hide: false`), and the GM's panel also keeps players' linked tokens in step with their published HP and AC.

### Roadmap
Ordered by when it gets built. Priority applies inside a goal.

**Current goal: Choose targets on the map**
- *Done (v2.1):* **Attacks against a target** (see above).
- *Done (v2.3):* **Spell areas on the map** (see above).
- *Low:* **Conditions on tokens.** Small markers on tokens for conditions and concentration, kept in step with the sheet and the monster cards.
- *Done (v2.4):* **Combat prompts** (see above).
- *Done (v2.15):* **Shared homebrew** (see above).

**Mid goals**
- *Done (v2.5):* **Level-up wizard** (see above).
- *Done (v2.6):* **Undo button** (see above).

**Mid to long goal**
- *Done (v2.7):* **Campaign notes** (see above). The automatic session log and recap were dropped from the plan.

**Long goal**
- **Keep characters safe across devices.** Characters are kept on a sync service instead of only in one browser, so they survive a new device, a cleared browser, or Owlbear keeping its own browser storage. Works offline and syncs when back online; existing characters move over on first sign-in.

**Later, not scheduled**
- Install as an app with offline use; condition durations on the initiative tracker; encounter difficulty from CR and party level.
- Print / PDF layout; importers (D&D Beyond JSON); themes, portraits, Discord webhook for shared rolls; help from an AI model for harder text recognition and summaries.
