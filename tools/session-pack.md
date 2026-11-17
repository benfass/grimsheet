# Grimsheet session pack (format)

One JSON file the GM imports from **Notes → Import**. Everything arrives GM only; importing a newer version of the
same pack (same `id`) updates the same notes, monsters and encounters instead of adding copies. An encounter that is
in combat right now is never changed.

```json
{
  "grimsheetSession": 1,
  "id": "lmop-ch1",                 // fixed for this pack; letters, digits, - and _
  "name": "Session 3: Cragmaw Hideout",
  "notes": [
    { "id": "outline", "type": "session", "title": "...", "body": "...", "pinned": true },
    { "id": "sildar", "type": "npc", "title": "...", "icon": "🧔", "status": "Friendly", "tags": ["phandalin"], "body": "..." },
    { "id": "letter", "type": "item", "title": "...", "icon": "📜", "handout": true, "body": "text the players see" }
  ],
  "monsters": [ { "id": "klarg", "statblock": "full stat block text, name on the first line" } ],
  "encounters": [
    { "id": "cave-1", "name": "Goblin blind", "note": "GM notes: tactics, morale, treasure",
      "monsters": [ { "monster": "klarg", "count": 1 }, { "monster": "srd:goblin", "count": 3 }, { "monster": "Wolf", "count": 2 } ] }
  ]
}
```

- **Note types:** session, npc, place, quest, item, note. `status`: npc Friendly / Neutral / Hostile / Dead, quest Open / Done / Failed.
  Link notes with `[[Title]]`. The pack name is added as a tag. `handout: true` → tagged "handout", stays hidden until Show to players.
- **Monsters:** stat block text in the usual 5e layout (the same text "Paste a stat block" reads). Saved to the GM's monsters as `pk:pk-<pack>-<id>`.
- **Encounter monsters:** a pack monster id, an SRD id (`srd:` + name in lower case with dashes) or a monster name from the catalog. Up to 30 of each.
- Notes up to 8000 characters. Problems (unreadable stat block, unknown monster) are listed in the preview before anything is imported.
- Example: `tools/obrhost/sample-pack.json`; test: `tools/obrhost/packtest.js`.
