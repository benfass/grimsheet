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

- **Share rolls** with everyone, with the GM only, or not at all (Settings). Notifications arrive even while your Grimsheet panel is closed.
- **Table** tab in roll history with everyone's shared rolls.
- **Party** module with live HP, AC and conditions of everyone using Grimsheet in the room.
- **Link your token:** right-click your character token → **Link to my Grimsheet character**. The token's [Stat Bubbles for D&D](https://github.com/SeamusFinlayson/Bubbles-for-Owlbear-Rodeo) HP and AC follow your sheet, and rolling Initiative puts your total into Owlbear's initiative tracker. Right-click → **Unlink from Grimsheet** to undo.
- **Panel size** (Small, Medium, Large or custom) and a **Compact** mode.

### For the GM

- Right-click any character token → **Grimsheet**: link the token to any player's character, deal **damage** or **healing** (it goes straight to the player's sheet, temporary HP first), **open the player's sheet** read-only, or unlink.
- The **Party** module has a damage/heal box and a **View sheet** button for every player.
- Changes reach players who are in the room even if their Grimsheet panel is closed.
- Follows Owlbear's light or dark theme.

Stat Bubbles and the initiative tracker are separate extensions; add them to your room to see the HP rings and the turn order. Grimsheet writes their data even if they aren't installed, so turning them on later shows the current values.

## Legal

Grimsheet is compatible with fifth edition.

This work includes material from the System Reference Document 5.2 ("SRD 5.2") by Wizards of the Coast LLC, available at https://www.dndbeyond.com/srd. The SRD 5.2 is licensed under the Creative Commons Attribution 4.0 International License, available at https://creativecommons.org/licenses/by/4.0/legalcode.

Creature stat blocks include material taken from the System Reference Document 5.1 ("SRD 5.1") by Wizards of the Coast LLC and available at https://dnd.wizards.com/resources/systems-reference-document. The SRD 5.1 is licensed under the Creative Commons Attribution 4.0 International License available at https://creativecommons.org/licenses/by/4.0/legalcode.

`vendor/owlbear-sdk-3.1.0.js` is the Owlbear Rodeo SDK (MIT License, see `vendor/owlbear-sdk-LICENSE.txt`). The PDF reader (pdf.js, Apache 2.0) is loaded from cdnjs when you import a PDF.
