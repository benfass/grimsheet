# Grimsheet

A modular D&D 5e / 5.5e character sheet that works as well with homebrew as with official content. Paste any feature, spell or house rule, attach dice, saves and limited uses, arrange the sheet the way you like, and tap to roll.

It runs in any browser, and as an **Owlbear Rodeo extension**: rolls are shared with the room, and a Party panel shows everyone's HP, AC and conditions live.

## Use it

- **In a browser:** https://benfass.github.io/grimsheet/
- **In Owlbear Rodeo:** open your profile → **Add Extension**, paste
  `https://benfass.github.io/grimsheet/manifest.json`, then enable Grimsheet in your room. After an update, if Owlbear still shows the old version, remove the extension and add it again with `?v=<new version>` on the end of the link (for example `manifest.json?v=1.3.0`). A d20 button appears in the toolbar.

## Where characters are saved

Characters are saved in each player's own browser. Nothing is uploaded and this repository stores no player data. To move a character to another computer or browser, or to keep a backup, use **Characters → Export**, then **Import** on the other side. Grimsheet reminds you when a character hasn't been backed up for a while.

## Features

- Modules you arrange in rows and columns: Combat, Abilities, Skills, Quick Actions, Attacks, Spells, Features, Inventory, Companions, Notes, Party.
- Formulas linked to your scores (`STR + PROF`, `8 + PROF + WIS`, `table(LEVEL, …)`), with a breakdown of every roll.
- Paste text and get suggested dice, saves, uses and spell details.
- SRD 5.2 content: 309 spells, all weapons and armor, magic items, gear, class and subclass features, plus familiars, beasts and mounts.
- Import from the official fillable 5e character sheet PDF.
- Optional dice animation, short and long rests, counters, toggled buffs, a personal homebrew library.

## Owlbear Rodeo features

- **Level up** (button next to your level): pick the class (or multiclass into a new one), take average or roll hit points, get the new class and subclass features with their SRD text, choose an Ability Score Improvement, feat or Epic Boon, and see your spell slots update. One tap undoes the whole level. Works with homebrew classes too.
- **Search** (toolbar, Ctrl+K or /): find anything (an entry, a skill, a monster or its action, a party member, a note, a setting) and jump straight to it.
- **Rules handled for you:** resistances, immunities and vulnerabilities (from stat blocks and your features) adjust damage on the GM's cards; conditions give advantage or disadvantage (Poisoned, Prone, Restrained, Invisible…), make saves fail automatically when Stunned or Paralyzed, and Exhaustion lowers d20 rolls; the roll bar says why. In combat, conditions can last 1 round, 1 minute or N rounds and end on their own.
- **Heroic Inspiration** toggle (the GM can give it from the Party view) that works as a reroll. **Encounter difficulty** and XP in the encounter header. Your token's picture next to your name.
- **Undo:** the Undo button (or Ctrl+Z) takes back the last change: HP, a spent slot or use, a condition, an edit, a whole level-up. ▾ shows recent changes in plain words; tap one to go back to before it. Redo is there too.
- **Campaign notes** (Notes in the toolbar): a party journal for the room. NPCs, places, quests, items and notes with tags, statuses (open/done quests, friendly/hostile NPCs), search and `[[links]]` between notes. Party notes are shared with everyone in the room and anyone can edit them; "only me" notes stay private (the GM's are hidden from players until revealed). Players who missed a session catch up when they open Grimsheet. Export as Markdown or back up and import.
- **Share rolls** with everyone, with the GM only, or not at all (Settings). Notifications arrive even while your Grimsheet panel is closed.
- **Table** tab in roll history with everyone's shared rolls.
- **Rerolls:** features like Lucky, Heroic Inspiration, Halfling Luck or Savage Attacker get a reroll tag (found automatically in pasted text, or set in the editor). After a matching roll, a reroll button appears on the dice and in the roll bar; it spends a use and recomputes the total. Rerolls are always announced, to the table or at least to the GM, and show up on the GM's attack cards.
- **Party** module with live HP, AC and conditions of everyone using Grimsheet in the room.
- **Link your token:** right-click your character token → **Link to my Grimsheet character**. The token's [Stat Bubbles for D&D](https://github.com/SeamusFinlayson/Bubbles-for-Owlbear-Rodeo) HP and AC follow your sheet, and rolling Initiative puts your total into Owlbear's initiative tracker. Right-click → **Unlink from Grimsheet** to undo.
- **Panel size** (Small, Medium, Large or custom) and a **Compact** mode.

### For the GM

- Right-click any character token → **Grimsheet**: link the token to any player's character, deal **damage** or **healing** (it goes straight to the player's sheet, temporary HP first), **open the player's sheet** read-only, or unlink.
- The **Party** module has a damage/heal box and a **View sheet** button for every player.
- Changes reach players who are in the room even if their Grimsheet panel is closed.
- **GM mode:** a GM who isn't playing a character gets GM tools instead of a sheet: Encounter, Party and Notes, and never shows up as a party member. The Party view shows every player's HP, AC, conditions, concentration and death saves, with damage/heal, View sheet, **Ask for a save** (for traps and effects that hit several players: DC, optional damage, half on success, results collected on a card) and **Call a short / long rest**. Undo covers the encounter. Playing a character as well? Turn on "I'm also playing a character" in Settings.
- **Encounter view** (Sheet / Encounter switch in the toolbar): add monsters from the SRD or your own (paste any stat block, 2014 or 2024 layout), at average HP you can edit or re-roll. Each monster gets a compact card: HP with a damage box, AC, conditions, every action as a roll button, recharge and per-day uses, legendary actions, and the full stat block on demand. Monster rolls stay on your screen unless you turn sharing on.
- **Several encounters:** prepare fights ahead of time in tabs above the Encounter view (+ New, rename, duplicate, delete). One encounter is active and drives initiative, the players' turn order and the tokens; when the next fight starts, open it and choose **Make active**, then right-click the tokens → Grimsheet → link them to the waiting monsters.
- **Monster tokens:** select one or more tokens → right-click → **Grimsheet** → pick a monster. They're numbered (Goblin 1, 2, 3), renamed on the map and linked. Selecting several linked tokens lets you damage or heal them all at once, characters and monsters together.
- **Initiative tracker:** monsters of the same kind share one roll by default (any monster can roll its own), **Ask for initiative** notifies players and their rolls arrive automatically, **Next turn** moves the turn, counts rounds, recharges abilities and resets legendary actions, and selects the token on the map. Players see the turn order and get "Your turn!" notifications. Owlbear's own initiative tracker is kept updated too.
- **Find a token:** the ◎ button, or double-clicking a name (your character, a monster card, an initiative row, a party member), moves the map to that token and selects it.
- **Attacks against a target:** select a token on the map (or tap the target button in the toolbar to pick from a list sorted by distance), then roll an attack. Grimsheet shows the distance and whether it's in reach or range, and sends the roll to the GM. The GM gets a card with the roll against the target's AC and taps Hit or Miss; once damage is rolled, Apply, Half or Miss. Monsters, players' sheets and plain tokens with HP bubbles are all updated, and the attacker sees the result. The GM's monster attacks work the same way: select the player's token, roll from the monster card. Cards also show up inside the monster's card (and the player's card in the Party view), so there's no scrolling back up to confirm. Attacks, save spells and areas have a small target button next to their dice. Tokens under fog of war don't show up in a player's target list.
- **Spell areas:** spells and monster actions with an area (Fireball's 20-ft sphere, a dragon's cone, a line, Spirit Guardians' emanation) get a button that draws the shape on the map from your token toward your target and lists who is inside. The GM gets a card: roll the monsters' saves, ask players for theirs (they get a "Roll DEX save" prompt), then apply full or half damage to everyone at once. Move or rotate the shape on the map and the list updates.
- **Combat prompts:** casting a concentration spell tracks it (casting another ends the first). Taking damage brings up a concentration check (CON save, DC 10 or half the damage); failing it, or dropping to 0 HP, ends the spell, switches its effect off and removes its area. Monsters can be marked Concentrating and roll automatically. When a downed player's turn comes, they get a death save prompt. Players' turn notifications and the GM's tracker remind you of what's going on: concentration, active effects, conditions, and lasting areas a creature starts its turn in.
- **GM settings:** monster HP for players (hidden, Healthy / Bloodied, or exact), sharing monster rolls, and updating Owlbear's tracker.
- Follows Owlbear's light or dark theme.

Stat Bubbles and the initiative tracker are separate extensions; add them to your room to see the HP rings and the turn order. Grimsheet writes their data even if they aren't installed, so turning them on later shows the current values.

## Legal

Grimsheet is compatible with fifth edition.

This work includes material from the System Reference Document 5.2 ("SRD 5.2") by Wizards of the Coast LLC, available at https://www.dndbeyond.com/srd. The SRD 5.2 is licensed under the Creative Commons Attribution 4.0 International License, available at https://creativecommons.org/licenses/by/4.0/legalcode.

Creature stat blocks include material taken from the System Reference Document 5.1 ("SRD 5.1") by Wizards of the Coast LLC and available at https://dnd.wizards.com/resources/systems-reference-document. The SRD 5.1 is licensed under the Creative Commons Attribution 4.0 International License available at https://creativecommons.org/licenses/by/4.0/legalcode.

`vendor/owlbear-sdk-3.1.0.js` is the Owlbear Rodeo SDK (MIT License, see `vendor/owlbear-sdk-LICENSE.txt`). The PDF reader (pdf.js, Apache 2.0) is loaded from cdnjs when you import a PDF.
