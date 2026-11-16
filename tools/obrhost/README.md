# Owlbear stand-in (test tool, not part of the extension)

Runs Grimsheet on the **real Owlbear SDK** without Owlbear Rodeo: `host.html` plays Owlbear's frame (background page,
action panel, popovers, modals, image picker, right-click menus) and `world.js` plays the room (players, room metadata,
scene items, grid, broadcasts). Every request Grimsheet sends is checked; a refused request is answered with an error,
the way Owlbear would, and listed.

What is real: the SDK and its message protocol, the message names (the SDK's own list), Grimsheet's pages unchanged.
What is not: the checks are written by hand from the SDK's type definitions plus Owlbear's documented 16 kB limits.
When a real room turns out stricter (see Settings → Copy debug report in Grimsheet), add the rule to `world.js`.

- By hand: serve a Grimsheet build with `host.html` copied in as `obrhost.html` and `world.js` as `obrworld.js`, then open
  `obrhost.html?seat=g1&name=Dana&role=GM`. One player; the image picker and uploads are clickable.
- In tests: `room.js` puts several players in one room (`hosttest.js` is the example and the regression test).
