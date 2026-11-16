/* Grimsheet's stand-in for Owlbear Rodeo, used by the tests in tools/obrhost.
   Grimsheet runs here on the real Owlbear SDK (vendor/owlbear-sdk-3.1.0.js); this file plays Owlbear's side of the
   SDK's message protocol: it keeps a room (players, room metadata, scene items, grid) and checks every request.
   - The message names are the SDK's own list (taken from @owlbear-rodeo/sdk 3.1.0).
   - The checks on what each message may carry are written by hand from the SDK's type definitions, plus the limits
     Owlbear documents (16 kB for room metadata and for a broadcast message). They are NOT Owlbear's own code:
     when a real room turns out to be stricter, the rule is added here.
   Pure JSON in, JSON out: runs in Node (one world shared by several players) or in the page (one player). */
(function (root, factory) { if (typeof module === 'object' && module.exports) module.exports = factory(); else root.ObrWorld = factory(); })(typeof self !== 'undefined' ? self : this, function () {
  const IDS = new Set(["OBR_ACTION_CLOSE","OBR_ACTION_GET_BADGE_BACKGROUND_COLOR","OBR_ACTION_GET_BADGE_TEXT","OBR_ACTION_GET_HEIGHT","OBR_ACTION_GET_ICON","OBR_ACTION_GET_IS_OPEN","OBR_ACTION_GET_TITLE","OBR_ACTION_GET_WIDTH","OBR_ACTION_IS_OPEN_EVENT_CHANGE","OBR_ACTION_IS_OPEN_SUBSCRIBE","OBR_ACTION_OPEN","OBR_ACTION_SET_BADGE_BACKGROUND_COLOR","OBR_ACTION_SET_BADGE_TEXT","OBR_ACTION_SET_HEIGHT","OBR_ACTION_SET_ICON","OBR_ACTION_SET_TITLE","OBR_ACTION_SET_WIDTH","OBR_ASSETS_DOWNLOAD_IMAGES","OBR_ASSETS_DOWNLOAD_SCENES","OBR_ASSETS_UPLOAD_IMAGES","OBR_ASSETS_UPLOAD_SCENES","OBR_BROADCAST_SEND_MESSAGE","OBR_BROADCAST_SUBSCRIBE","OBR_BROADCAST_UNSUBSCRIBE","OBR_CONTEXT_MENU_CREATE","OBR_CONTEXT_MENU_EVENT_CLICK","OBR_CONTEXT_MENU_REMOVE","OBR_INTERACTION_START_ITEM_INTERACTION","OBR_INTERACTION_STOP_ITEM_INTERACTION","OBR_INTERACTION_UPDATE_ITEM_INTERACTION","OBR_IS_OPEN_ACTION_UNSUBSCRIBE","OBR_METADATA_ROOM_UNSUBSCRIBE","OBR_MODAL_CLOSE","OBR_MODAL_OPEN","OBR_NOTIFICATION_CLOSE","OBR_NOTIFICATION_SHOW","OBR_PARTY_EVENT_CHANGE","OBR_PARTY_GET_PLAYERS","OBR_PARTY_SUBSCRIBE","OBR_PARTY_UNSUBSCRIBE","OBR_PERMISSIONS_ROOM_UNSUBSCRIBE","OBR_PLAYER_DESELECT","OBR_PLAYER_EVENT_CHANGE","OBR_PLAYER_GET_COLOR","OBR_PLAYER_GET_CONNECTION_ID","OBR_PLAYER_GET_ID","OBR_PLAYER_GET_METADATA","OBR_PLAYER_GET_NAME","OBR_PLAYER_GET_ROLE","OBR_PLAYER_GET_SELECTION","OBR_PLAYER_GET_SYNC_VIEW","OBR_PLAYER_SELECT","OBR_PLAYER_SET_COLOR","OBR_PLAYER_SET_METADATA","OBR_PLAYER_SET_NAME","OBR_PLAYER_SET_SYNC_VIEW","OBR_PLAYER_SUBSCRIBE","OBR_PLAYER_UNSUBSCRIBE","OBR_POPOVER_CLOSE","OBR_POPOVER_GET_HEIGHT","OBR_POPOVER_GET_WIDTH","OBR_POPOVER_OPEN","OBR_POPOVER_SET_HEIGHT","OBR_POPOVER_SET_WIDTH","OBR_READY","OBR_ROOM_GET_METADATA","OBR_ROOM_GET_PERMISSIONS","OBR_ROOM_METADATA_EVENT_CHANGE","OBR_ROOM_METADATA_SUBSCRIBE","OBR_ROOM_PERMISSIONS_EVENT_CHANGE","OBR_ROOM_PERMISSIONS_SUBSCRIBE","OBR_ROOM_SET_METADATA","OBR_SCENE_EVENT_READY_CHANGE","OBR_SCENE_FOG_EVENT_CHANGE","OBR_SCENE_FOG_GET_COLOR","OBR_SCENE_FOG_GET_FILLED","OBR_SCENE_FOG_GET_STROKE_WIDTH","OBR_SCENE_FOG_SET_COLOR","OBR_SCENE_FOG_SET_FILLED","OBR_SCENE_FOG_SET_STROKE_WIDTH","OBR_SCENE_FOG_SUBSCRIBE","OBR_SCENE_FOG_UNSUBSCRIBE","OBR_SCENE_GET_METADATA","OBR_SCENE_GRID_EVENT_CHANGE","OBR_SCENE_GRID_GET_COLOR","OBR_SCENE_GRID_GET_DISTANCE","OBR_SCENE_GRID_GET_DPI","OBR_SCENE_GRID_GET_LINE_TYPE","OBR_SCENE_GRID_GET_LINE_WIDTH","OBR_SCENE_GRID_GET_MEASUREMENT","OBR_SCENE_GRID_GET_OPACITY","OBR_SCENE_GRID_GET_SCALE","OBR_SCENE_GRID_GET_TYPE","OBR_SCENE_GRID_SET_COLOR","OBR_SCENE_GRID_SET_LINE_TYPE","OBR_SCENE_GRID_SET_LINE_WIDTH","OBR_SCENE_GRID_SET_MEASUREMENT","OBR_SCENE_GRID_SET_OPACITY","OBR_SCENE_GRID_SET_SCALE","OBR_SCENE_GRID_SET_TYPE","OBR_SCENE_GRID_SNAP_POSITION","OBR_SCENE_GRID_SUBSCRIBE","OBR_SCENE_GRID_UNSUBSCRIBE","OBR_SCENE_HISTORY_CAN_REDO","OBR_SCENE_HISTORY_CAN_UNDO","OBR_SCENE_HISTORY_REDO","OBR_SCENE_HISTORY_UNDO","OBR_SCENE_IS_READY","OBR_SCENE_ITEMS_ADD_ITEMS","OBR_SCENE_ITEMS_DELETE_ITEMS","OBR_SCENE_ITEMS_EVENT_CHANGE","OBR_SCENE_ITEMS_GET_ALL_ITEMS","OBR_SCENE_ITEMS_GET_ITEMS","OBR_SCENE_ITEMS_GET_ITEM_ATTACHMENTS","OBR_SCENE_ITEMS_GET_ITEM_BOUNDS","OBR_SCENE_ITEMS_SUBSCRIBE","OBR_SCENE_ITEMS_UNSUBSCRIBE","OBR_SCENE_ITEMS_UPDATE_ITEMS","OBR_SCENE_LOCAL_ADD_ITEMS","OBR_SCENE_LOCAL_DELETE_ITEMS","OBR_SCENE_LOCAL_EVENT_CHANGE","OBR_SCENE_LOCAL_GET_ALL_ITEMS","OBR_SCENE_LOCAL_GET_ITEMS","OBR_SCENE_LOCAL_GET_ITEM_ATTACHMENTS","OBR_SCENE_LOCAL_GET_ITEM_BOUNDS","OBR_SCENE_LOCAL_SUBSCRIBE","OBR_SCENE_LOCAL_UNSUBSCRIBE","OBR_SCENE_LOCAL_UPDATE_ITEMS","OBR_SCENE_METADATA_EVENT_CHANGE","OBR_SCENE_METADATA_SUBSCRIBE","OBR_SCENE_METADATA_UNSUBSCRIBE","OBR_SCENE_READY_SUBSCRIBE","OBR_SCENE_READY_UNSUBSCRIBE","OBR_SCENE_SET_METADATA","OBR_THEME_EVENT_CHANGE","OBR_THEME_GET_THEME","OBR_THEME_SUBSCRIBE","OBR_THEME_UNSUBSCRIBE","OBR_TOOL_ACTION_CREATE","OBR_TOOL_ACTION_EVENT_CLICK","OBR_TOOL_ACTION_REMOVE","OBR_TOOL_ACTIVATE","OBR_TOOL_ACTIVE_EVENT_CHANGE","OBR_TOOL_ACTIVE_SUBSCRIBE","OBR_TOOL_ACTIVE_UNSUBSCRIBE","OBR_TOOL_CREATE","OBR_TOOL_EVENT_CLICK","OBR_TOOL_GET_ACTIVE","OBR_TOOL_GET_METADATA","OBR_TOOL_MODE_ACTIVATE","OBR_TOOL_MODE_ACTIVE_EVENT_CHANGE","OBR_TOOL_MODE_ACTIVE_SUBSCRIBE","OBR_TOOL_MODE_ACTIVE_UNSUBSCRIBE","OBR_TOOL_MODE_CREATE","OBR_TOOL_MODE_EVENT_ACTIVATE","OBR_TOOL_MODE_EVENT_CLICK","OBR_TOOL_MODE_EVENT_DEACTIVATE","OBR_TOOL_MODE_EVENT_KEY_DOWN","OBR_TOOL_MODE_EVENT_KEY_UP","OBR_TOOL_MODE_EVENT_TOOL_CLICK","OBR_TOOL_MODE_EVENT_TOOL_DOUBLE_CLICK","OBR_TOOL_MODE_EVENT_TOOL_DOWN","OBR_TOOL_MODE_EVENT_TOOL_DRAG_CANCEL","OBR_TOOL_MODE_EVENT_TOOL_DRAG_END","OBR_TOOL_MODE_EVENT_TOOL_DRAG_MOVE","OBR_TOOL_MODE_EVENT_TOOL_DRAG_START","OBR_TOOL_MODE_EVENT_TOOL_MOVE","OBR_TOOL_MODE_EVENT_TOOL_UP","OBR_TOOL_MODE_GET_ACTIVE","OBR_TOOL_MODE_REMOVE","OBR_TOOL_REMOVE","OBR_TOOL_SET_METADATA","OBR_VIEWPORT_ANIMATE_TO","OBR_VIEWPORT_ANIMATE_TO_BOUNDS","OBR_VIEWPORT_GET_HEIGHT","OBR_VIEWPORT_GET_POSITION","OBR_VIEWPORT_GET_SCALE","OBR_VIEWPORT_GET_WIDTH","OBR_VIEWPORT_INVERSE_TRANSFORM_POINT","OBR_VIEWPORT_RESET","OBR_VIEWPORT_SET_POSITION","OBR_VIEWPORT_SET_SCALE","OBR_VIEWPORT_TRANSFORM_POINT"]);
  const LAYERS = ['MAP', 'GRID', 'DRAWING', 'PROP', 'MOUNT', 'CHARACTER', 'ATTACHMENT', 'NOTE', 'TEXT', 'RULER', 'FOG', 'POINTER', 'POST_PROCESS', 'CONTROL', 'POPOVER'];
  const ASSET_TYPES = ['MAP', 'PROP', 'MOUNT', 'CHARACTER', 'ATTACHMENT', 'NOTE'];
  const ITEM_TYPES = ['IMAGE', 'TEXT', 'LABEL', 'SHAPE', 'CURVE', 'LINE', 'PATH', 'POINTER', 'RULER', 'BILLBOARD', 'EFFECT', 'LIGHT', 'WALL'];
  const LIMIT = 16384; // bytes, as JSON: Owlbear's documented limit for room metadata and for one broadcast message
  const size = v => { const s = JSON.stringify(v === undefined ? null : v); let n = 0; for (let i = 0; i < s.length; i++) { const c = s.charCodeAt(i); n += c < 128 ? 1 : c < 2048 ? 2 : 3; } return n; };
  const isObj = v => !!v && typeof v === 'object' && !Array.isArray(v);
  const isNum = v => typeof v === 'number' && isFinite(v);
  const isVec = v => isObj(v) && isNum(v.x) && isNum(v.y);
  const opt = (v, f) => v === undefined || f(v);
  const oneOf = list => v => list.includes(v);
  const isStr = v => typeof v === 'string';
  const isBool = v => typeof v === 'boolean';

  /* ---- checks: return a message when the request is wrong, nothing when it's fine ---- */
  function textContent(t, at) {
    if (!isObj(t)) return at + ' must be an object';
    if (!isStr(t.plainText)) return at + '.plainText must be a string';
    if (!oneOf(['PLAIN', 'RICH'])(t.type)) return at + '.type must be PLAIN or RICH';
    if (!isObj(t.style)) return at + '.style must be an object';
    for (const k of ['fillOpacity', 'strokeOpacity', 'strokeWidth', 'fontSize', 'fontWeight', 'lineHeight', 'padding']) if (!isNum(t.style[k])) return at + '.style.' + k + ' must be a number';
    for (const k of ['fillColor', 'strokeColor', 'fontFamily']) if (!isStr(t.style[k])) return at + '.style.' + k + ' must be a string';
    if (!oneOf(['LEFT', 'CENTER', 'RIGHT'])(t.style.textAlign)) return at + '.style.textAlign is not LEFT, CENTER or RIGHT';
    if (!oneOf(['BOTTOM', 'MIDDLE', 'TOP'])(t.style.textAlignVertical)) return at + '.style.textAlignVertical is not BOTTOM, MIDDLE or TOP';
    for (const k of ['width', 'height']) if (!(t[k] === 'AUTO' || isNum(t[k]))) return at + '.' + k + ' must be a number or AUTO';
  }
  function itemPart(k, v, it, at) { // one field of an item (used for whole items and for updates)
    switch (k) {
      case 'name': case 'createdUserId': return isStr(v) ? null : at + k + ' must be a string';
      case 'visible': case 'locked': return isBool(v) ? null : at + k + ' must be true or false';
      case 'zIndex': case 'rotation': return isNum(v) ? null : at + k + ' must be a number';
      case 'position': case 'scale': return isVec(v) ? null : at + k + ' must be {x, y} numbers';
      case 'metadata': return isObj(v) ? null : at + 'metadata must be an object';
      case 'layer': return LAYERS.includes(v) ? null : at + 'layer "' + v + '" is not an Owlbear layer';
      case 'attachedTo': return opt(v, isStr) ? null : at + 'attachedTo must be an item id';
      case 'disableHit': case 'disableAutoZIndex': return opt(v, isBool) ? null : at + k + ' must be true or false';
      case 'disableAttachmentBehavior': return opt(v, a => Array.isArray(a) && a.every(oneOf(['VISIBLE', 'SCALE', 'ROTATION', 'POSITION', 'DELETE', 'LOCKED', 'COPY']))) ? null : at + 'disableAttachmentBehavior has an unknown value';
      case 'description': return opt(v, isStr) ? null : at + 'description must be a string';
      case 'image': return it.type !== 'IMAGE' ? null : isObj(v) && isNum(v.width) && isNum(v.height) && v.width > 0 && v.height > 0 && isStr(v.mime) && isStr(v.url) && v.url ? null : at + 'image must be {width, height, mime, url}';
      case 'grid': return it.type !== 'IMAGE' ? null : isObj(v) && isNum(v.dpi) && v.dpi > 0 && isVec(v.offset) ? null : at + 'grid must be {dpi, offset: {x, y}}';
      case 'textItemType': return it.type !== 'IMAGE' ? null : oneOf(['LABEL', 'TEXT'])(v) ? null : at + 'textItemType must be LABEL or TEXT';
      case 'text': return ['IMAGE', 'TEXT', 'LABEL'].includes(it.type) ? textContent(v, at + 'text') || null : null;
      case 'style': return it.type === 'LABEL' ? (isObj(v) && isStr(v.backgroundColor) && isNum(v.backgroundOpacity) && isNum(v.cornerRadius) ? null : at + 'style must have backgroundColor, backgroundOpacity, cornerRadius') : null;
    }
    return null;
  }
  function wholeItem(it, at) {
    if (!isObj(it)) return at + 'is not an item';
    if (!isStr(it.id) || !it.id) return at + 'has no id';
    if (!ITEM_TYPES.includes(it.type)) return at + 'type "' + it.type + '" is not an Owlbear item type';
    const need = ['name', 'visible', 'locked', 'createdUserId', 'zIndex', 'position', 'rotation', 'scale', 'metadata', 'layer'];
    if (it.type === 'IMAGE') need.push('image', 'grid', 'text', 'textItemType');
    if (it.type === 'TEXT') need.push('text'); if (it.type === 'LABEL') need.push('text', 'style');
    for (const k of need) if (it[k] === undefined) return at + 'is missing ' + k;
    for (const k of Object.keys(it)) { const e = itemPart(k, it[k], it, at); if (e) return e; }
  }
  function keyFilters(list, at) {
    if (!Array.isArray(list)) return at + ' must be a list';
    for (const f of list) {
      if (!isObj(f) || !(isStr(f.key) || (Array.isArray(f.key) && f.key.every(isStr)))) return at + ' needs key (a string or list of strings)';
      if (!('value' in f)) return at + ' needs value';
      if (!opt(f.operator, oneOf(['==', '!=']))) return at + ' operator must be == or !=';
      if (!opt(f.coordinator, oneOf(['&&', '||']))) return at + ' coordinator must be && or ||';
    }
  }
  const origin = (o, at) => o === undefined ? null : isObj(o) && oneOf(['CENTER', 'LEFT', 'RIGHT'])(o.horizontal) && oneOf(['BOTTOM', 'CENTER', 'TOP'])(o.vertical) ? null : at + ' must be {horizontal: CENTER|LEFT|RIGHT, vertical: BOTTOM|CENTER|TOP}';
  function check(id, d) {
    if (!IDS.has(id)) return 'Unknown message ' + id;
    d = d || {};
    switch (id) {
      case 'OBR_SCENE_ITEMS_ADD_ITEMS': case 'OBR_SCENE_LOCAL_ADD_ITEMS': {
        if (!Array.isArray(d.items)) return 'items must be a list';
        for (let i = 0; i < d.items.length; i++) { const e = wholeItem(d.items[i], 'item ' + i + ' '); if (e) return e; }
        const ids = d.items.map(x => x.id); if (new Set(ids).size !== ids.length) return 'two items share an id';
        return;
      }
      case 'OBR_SCENE_ITEMS_UPDATE_ITEMS': case 'OBR_SCENE_LOCAL_UPDATE_ITEMS': {
        if (!Array.isArray(d.updates)) return 'updates must be a list';
        for (const u of d.updates) {
          if (!isObj(u) || !isStr(u.id)) return 'an update has no id';
          for (const k of Object.keys(u)) { if (k === 'id' || k === 'type') continue; if (u[k] === undefined && ['attachedTo', 'description', 'disableHit', 'disableAutoZIndex', 'disableAttachmentBehavior'].includes(k)) continue; const e = itemPart(k, u[k], u, 'update of ' + u.id + ': '); if (e) return e; }
        }
        return;
      }
      case 'OBR_SCENE_ITEMS_DELETE_ITEMS': case 'OBR_SCENE_LOCAL_DELETE_ITEMS': case 'OBR_SCENE_ITEMS_GET_ITEMS': case 'OBR_SCENE_LOCAL_GET_ITEMS':
      case 'OBR_SCENE_ITEMS_GET_ITEM_BOUNDS': case 'OBR_SCENE_LOCAL_GET_ITEM_BOUNDS': case 'OBR_SCENE_ITEMS_GET_ITEM_ATTACHMENTS': case 'OBR_SCENE_LOCAL_GET_ITEM_ATTACHMENTS':
        return Array.isArray(d.ids) && d.ids.every(isStr) ? null : 'ids must be a list of item ids';
      case 'OBR_ROOM_SET_METADATA': case 'OBR_PLAYER_SET_METADATA': case 'OBR_SCENE_SET_METADATA': return isObj(d.update) ? null : 'the metadata update must be an object';
      case 'OBR_BROADCAST_SEND_MESSAGE':
        if (!isStr(d.channel) || !d.channel) return 'channel must be a string';
        if (d.options !== undefined && !(isObj(d.options) && opt(d.options.destination, oneOf(['REMOTE', 'LOCAL', 'ALL'])))) return 'destination must be REMOTE, LOCAL or ALL';
        if (size(d.data) > LIMIT) return 'the message is ' + size(d.data) + ' bytes; Owlbear\'s limit is ' + LIMIT;
        return;
      case 'OBR_BROADCAST_SUBSCRIBE': case 'OBR_BROADCAST_UNSUBSCRIBE': return isStr(d.channel) && d.channel ? null : 'channel must be a string';
      case 'OBR_NOTIFICATION_SHOW': return !isStr(d.message) ? 'message must be a string' : opt(d.variant, oneOf(['DEFAULT', 'ERROR', 'INFO', 'SUCCESS', 'WARNING'])) ? null : 'variant "' + d.variant + '" is not DEFAULT, ERROR, INFO, SUCCESS or WARNING';
      case 'OBR_POPOVER_OPEN':
        if (!isStr(d.id) || !d.id) return 'the popover needs an id';
        if (!isStr(d.url) || !/^https?:\/\//.test(d.url)) return 'the popover url must be a full http(s) address';
        if (!isNum(d.width) || !isNum(d.height) || d.width <= 0 || d.height <= 0) return 'the popover width and height must be numbers above 0 (got ' + d.width + ' × ' + d.height + ')';
        if (!opt(d.anchorReference, oneOf(['ELEMENT', 'POSITION']))) return 'anchorReference must be ELEMENT or POSITION';
        if (d.anchorReference === 'POSITION' && !(isObj(d.anchorPosition) && isNum(d.anchorPosition.left) && isNum(d.anchorPosition.top))) return 'anchorPosition must be {left, top} numbers';
        if (!opt(d.anchorElementId, isStr)) return 'anchorElementId must be a string';
        for (const k of ['hidePaper', 'disableClickAway']) if (!opt(d[k], isBool)) return k + ' must be true or false';
        if (!opt(d.marginThreshold, isNum)) return 'marginThreshold must be a number';
        return origin(d.anchorOrigin, 'anchorOrigin') || origin(d.transformOrigin, 'transformOrigin');
      case 'OBR_POPOVER_CLOSE': case 'OBR_MODAL_CLOSE': case 'OBR_CONTEXT_MENU_REMOVE': case 'OBR_NOTIFICATION_CLOSE': return isStr(d.id) ? null : 'id must be a string';
      case 'OBR_POPOVER_SET_WIDTH': return isStr(d.id) && isNum(d.width) && d.width > 0 ? null : 'needs id and a width above 0';
      case 'OBR_POPOVER_SET_HEIGHT': return isStr(d.id) && isNum(d.height) && d.height > 0 ? null : 'needs id and a height above 0';
      case 'OBR_MODAL_OPEN':
        if (!isStr(d.id) || !d.id) return 'the modal needs an id';
        if (!isStr(d.url) || !/^https?:\/\//.test(d.url)) return 'the modal url must be a full http(s) address';
        for (const k of ['width', 'height']) if (!opt(d[k], isNum)) return k + ' must be a number';
        for (const k of ['fullScreen', 'hideBackdrop', 'hidePaper', 'disablePointerEvents']) if (!opt(d[k], isBool)) return k + ' must be true or false';
        return;
      case 'OBR_ACTION_SET_WIDTH': return isNum(d.width) && d.width > 0 ? null : 'the action width must be a number above 0 (got ' + d.width + ')';
      case 'OBR_ACTION_SET_HEIGHT': return isNum(d.height) && d.height > 0 ? null : 'the action height must be a number above 0 (got ' + d.height + ')';
      case 'OBR_ACTION_SET_BADGE_TEXT': return d.badgeText === undefined || isStr(d.badgeText) ? null : 'badgeText must be a string';
      case 'OBR_CONTEXT_MENU_CREATE':
        if (!isStr(d.id) || !d.id) return 'the context menu needs an id';
        if (!Array.isArray(d.icons) || !d.icons.length) return 'the context menu needs at least one icon';
        for (const ic of d.icons) {
          if (!isObj(ic) || !isStr(ic.icon) || !isStr(ic.label)) return 'each icon needs icon and label';
          const f = ic.filter; if (f === undefined) continue; if (!isObj(f)) return 'filter must be an object';
          for (const k of Object.keys(f)) if (!['min', 'max', 'permissions', 'roles', 'every', 'some'].includes(k)) return 'filter has an unknown key "' + k + '"';
          if (!opt(f.min, isNum) || !opt(f.max, isNum)) return 'filter min and max must be numbers';
          if (!opt(f.roles, r => Array.isArray(r) && r.every(oneOf(['GM', 'PLAYER'])))) return 'filter roles must be GM and/or PLAYER';
          if (!opt(f.permissions, r => Array.isArray(r) && r.every(isStr))) return 'filter permissions must be a list';
          for (const k of ['every', 'some']) if (f[k] !== undefined) { const e = keyFilters(f[k], 'filter.' + k); if (e) return e; }
        }
        if (d.embed !== undefined && !(isObj(d.embed) && isStr(d.embed.url) && /^https?:\/\//.test(d.embed.url) && opt(d.embed.height, isNum))) return 'embed must be {url, height}';
        if (!opt(d.shortcut, isStr)) return 'shortcut must be a string';
        return;
      case 'OBR_ASSETS_DOWNLOAD_IMAGES':
        if (!opt(d.multiple, isBool)) return 'multiple must be true or false';
        if (!opt(d.defaultSearch, isStr)) return 'defaultSearch must be a string';
        if (d.defaultSearch === '') return '"defaultSearch" is not allowed to be empty'; // seen in a real room, 1.62.0
        return opt(d.typeHint, oneOf(ASSET_TYPES)) ? null : 'typeHint "' + d.typeHint + '" is not one of ' + ASSET_TYPES.join(', ');
      case 'OBR_ASSETS_UPLOAD_IMAGES':
        if (!Array.isArray(d.images) || !d.images.length) return 'images must be a list with at least one image';
        for (const im of d.images) {
          if (!isObj(im)) return 'an image upload is not an object';
          if (!(isObj(im.file) && im.file.__file)) return 'an image upload has no file';
          if (!/^image\//.test(im.file.type || '')) return 'the file is not an image (' + (im.file.type || 'unknown type') + ')';
          if (!isStr(im.name) || !im.name) return 'an image upload needs a name';
          if (!(isObj(im.grid) && isNum(im.grid.dpi) && im.grid.dpi > 0 && isVec(im.grid.offset))) return 'an image upload needs grid {dpi, offset}';
          if (!isVec(im.scale) || !isNum(im.rotation) || !isBool(im.visible) || !isBool(im.locked)) return 'an image upload needs scale, rotation, visible and locked';
          if (!oneOf(['LABEL', 'TEXT'])(im.textItemType)) return 'textItemType must be LABEL or TEXT';
          const e = textContent(im.text, 'text'); if (e) return e;
        }
        return opt(d.typeHint, oneOf(ASSET_TYPES)) ? null : 'typeHint "' + d.typeHint + '" is not one of ' + ASSET_TYPES.join(', ');
      case 'OBR_PLAYER_SELECT': return Array.isArray(d.items) && d.items.every(isStr) && opt(d.replace, isBool) ? null : 'select needs a list of item ids';
      case 'OBR_PLAYER_DESELECT': return opt(d.items, a => Array.isArray(a) && a.every(isStr)) ? null : 'deselect needs a list of item ids';
      case 'OBR_PLAYER_SET_NAME': return isStr(d.name) ? null : 'name must be a string';
      case 'OBR_PLAYER_SET_COLOR': return isStr(d.color) ? null : 'color must be a string';
      case 'OBR_VIEWPORT_ANIMATE_TO_BOUNDS': return isObj(d.bounds) && isVec(d.bounds.min) && isVec(d.bounds.max) && isNum(d.bounds.width) && isNum(d.bounds.height) && isVec(d.bounds.center) ? null : 'bounds must be {min, max, width, height, center}';
      case 'OBR_VIEWPORT_TRANSFORM_POINT': case 'OBR_VIEWPORT_INVERSE_TRANSFORM_POINT': return isVec(d.point) ? null : 'point must be {x, y}';
      case 'OBR_VIEWPORT_SET_POSITION': return isVec(d.position) ? null : 'position must be {x, y}';
      case 'OBR_VIEWPORT_SET_SCALE': return isNum(d.scale) ? null : 'scale must be a number';
      case 'OBR_SCENE_GRID_SNAP_POSITION': return isVec(d.position) && opt(d.snappingSensitivity, isNum) && opt(d.useCorners, isBool) && opt(d.useCenter, isBool) ? null : 'snapPosition needs position {x, y}';
      case 'OBR_SCENE_GRID_GET_DISTANCE': return isVec(d.from) && isVec(d.to) ? null : 'getDistance needs from and to {x, y}';
    }
  }

  /* ---- the room ---- */
  function createWorld(opts) {
    opts = opts || {};
    const st = { roomId: opts.roomId || 'room1', players: {}, room: {}, sceneReady: opts.sceneReady !== false, sceneMeta: {}, items: [],
      grid: { dpi: opts.dpi || 150, type: 'SQUARE', measurement: 'CHEBYSHEV', scale: { raw: '5ft', parsed: { multiplier: 5, unit: 'ft', digits: 0 } }, style: { lineType: 'SOLID', lineOpacity: 0.4, lineColor: 'DARK', lineWidth: 2 } },
      fog: { filled: false }, log: [], violations: [] };
    const clone = v => v === undefined ? undefined : JSON.parse(JSON.stringify(v));
    const pub = p => ({ id: p.id, connectionId: p.connectionId, role: p.role, selection: p.selection.length ? p.selection.slice() : undefined, name: p.name, color: p.color, syncView: false, metadata: clone(p.metadata) });
    const party = seat => Object.values(st.players).filter(p => p.id !== seat).map(pub);
    const merge = (into, up) => { for (const k of Object.keys(up)) { if (up[k] === undefined) delete into[k]; else into[k] = clone(up[k]); } };
    function bounds(list, ids) {
      const its = list.filter(i => ids.includes(i.id)); if (!its.length) throw new Error('No items found for bounds');
      let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
      for (const it of its) {
        let w = st.grid.dpi, h = st.grid.dpi, ox = w / 2, oy = h / 2;
        if (it.type === 'IMAGE') { const k = st.grid.dpi / it.grid.dpi; w = it.image.width * k * Math.abs(it.scale.x); h = it.image.height * k * Math.abs(it.scale.y); ox = it.grid.offset.x * k * Math.abs(it.scale.x); oy = it.grid.offset.y * k * Math.abs(it.scale.y); }
        x0 = Math.min(x0, it.position.x - ox); y0 = Math.min(y0, it.position.y - oy); x1 = Math.max(x1, it.position.x - ox + w); y1 = Math.max(y1, it.position.y - oy + h);
      }
      return { min: { x: x0, y: y0 }, max: { x: x1, y: y1 }, width: x1 - x0, height: y1 - y0, center: { x: (x0 + x1) / 2, y: (y0 + y1) / 2 } };
    }
    const attachments = (list, ids) => { const out = new Map(); const add = id => { for (const i of list) if ((i.id === id || i.attachedTo === id) && !out.has(i.id)) { out.set(i.id, i); if (i.id !== id) add(i.id); } }; ids.forEach(add); return [...out.values()]; };
    /* items: the same rules for the shared scene and for a player's own local items */
    function itemsOp(list, op, d, seat) {
      const now = new Date().toISOString();
      switch (op) {
        case 'GET_ITEMS': return { items: clone(list.filter(i => d.ids.includes(i.id))) };
        case 'GET_ALL_ITEMS': return { items: clone(list) };
        case 'GET_ITEM_BOUNDS': return { bounds: bounds(list, d.ids) };
        case 'GET_ITEM_ATTACHMENTS': return { items: clone(attachments(list, d.ids)) };
        case 'ADD_ITEMS':
          for (const it of d.items) { if (list.some(x => x.id === it.id)) throw new Error('An item with id ' + it.id + ' already exists'); }
          for (const it of d.items) list.push(Object.assign(clone(it), { lastModified: now, lastModifiedUserId: seat }));
          return { changed: true };
        case 'UPDATE_ITEMS': {
          let ch = false;
          for (const u of d.updates) { const it = list.find(x => x.id === u.id); if (!it) continue; for (const k of Object.keys(u)) { if (k === 'id' || k === 'type') continue; if (u[k] === undefined) delete it[k]; else it[k] = clone(u[k]); } it.lastModified = now; it.lastModifiedUserId = seat; ch = true; }
          return { changed: ch };
        }
        case 'DELETE_ITEMS': {
          const gone = new Set(d.ids); let more = true;
          while (more) { more = false; for (const i of list) if (!gone.has(i.id) && i.attachedTo && gone.has(i.attachedTo) && !(i.disableAttachmentBehavior || []).includes('DELETE')) { gone.add(i.id); more = true; } }
          const n = list.length; for (let i = list.length - 1; i >= 0; i--) if (gone.has(list[i].id)) list.splice(i, 1);
          return { changed: list.length !== n };
        }
      }
    }
    /* one request from one player; returns { result, events: [{ to: '*' | seat | '!seat', ev, data }] } or throws */
    function handle(seat, id, d) {
      d = d || {}; const ev = []; const me = st.players[seat];
      if (!me) throw new Error('Player ' + seat + ' is not in the room');
      const bad = check(id, d); if (bad) throw new Error(bad);
      const out = result => ({ result: result === undefined ? {} : result, events: ev });
      const meChanged = () => { ev.push({ to: seat, ev: 'OBR_PLAYER_EVENT_CHANGE', data: { player: pub(me) } }); for (const p of Object.values(st.players)) if (p.id !== seat) ev.push({ to: p.id, ev: 'OBR_PARTY_EVENT_CHANGE', data: { players: party(p.id) } }); };
      const m = /^OBR_SCENE_ITEMS_(.+)$/.exec(id);
      if (m && !/SUBSCRIBE|EVENT/.test(m[1])) {
        if (!st.sceneReady) throw new Error('No scene found');
        const r = itemsOp(st.items, m[1], d, seat);
        if (r.changed !== undefined) { if (r.changed) ev.push({ to: '*', ev: 'OBR_SCENE_ITEMS_EVENT_CHANGE', data: { items: clone(st.items) } }); return out(); }
        return out(r);
      }
      switch (id) {
        case 'OBR_PLAYER_GET_ID': return out({ id: me.id });
        case 'OBR_PLAYER_GET_NAME': return out({ name: me.name });
        case 'OBR_PLAYER_GET_ROLE': return out({ role: me.role });
        case 'OBR_PLAYER_GET_COLOR': return out({ color: me.color });
        case 'OBR_PLAYER_GET_CONNECTION_ID': return out({ connectionId: me.connectionId });
        case 'OBR_PLAYER_GET_SYNC_VIEW': return out({ syncView: false });
        case 'OBR_PLAYER_GET_METADATA': return out({ metadata: clone(me.metadata) });
        case 'OBR_PLAYER_GET_SELECTION': return out({ selection: me.selection.length ? me.selection.slice() : undefined });
        case 'OBR_PLAYER_SET_METADATA': merge(me.metadata, d.update); meChanged(); return out();
        case 'OBR_PLAYER_SET_NAME': me.name = d.name; meChanged(); return out();
        case 'OBR_PLAYER_SET_COLOR': me.color = d.color; meChanged(); return out();
        case 'OBR_PLAYER_SELECT': me.selection = d.replace ? d.items.slice() : [...new Set(me.selection.concat(d.items))]; meChanged(); return out();
        case 'OBR_PLAYER_DESELECT': me.selection = d.items ? me.selection.filter(x => !d.items.includes(x)) : []; meChanged(); return out();
        case 'OBR_PARTY_GET_PLAYERS': return out({ players: party(seat) });
        case 'OBR_ROOM_GET_METADATA': return out({ metadata: clone(st.room) });
        case 'OBR_ROOM_GET_PERMISSIONS': return out({ permissions: ['CHARACTER_CREATE', 'CHARACTER_UPDATE', 'CHARACTER_DELETE', 'CHARACTER_OWNER_ONLY', 'NOTE_CREATE', 'NOTE_UPDATE', 'NOTE_DELETE', 'POINTER_CREATE', 'RULER_CREATE'] });
        case 'OBR_ROOM_SET_METADATA': {
          const next = clone(st.room); merge(next, d.update);
          if (size(next) > LIMIT) throw new Error('Room metadata would be ' + size(next) + ' bytes; Owlbear\'s limit is ' + LIMIT);
          st.room = next; ev.push({ to: '*', ev: 'OBR_ROOM_METADATA_EVENT_CHANGE', data: { metadata: clone(st.room) } }); return out();
        }
        case 'OBR_SCENE_IS_READY': return out({ ready: st.sceneReady });
        case 'OBR_SCENE_GET_METADATA': if (!st.sceneReady) throw new Error('No scene found'); return out({ metadata: clone(st.sceneMeta) });
        case 'OBR_SCENE_SET_METADATA': if (!st.sceneReady) throw new Error('No scene found'); merge(st.sceneMeta, d.update); ev.push({ to: '*', ev: 'OBR_SCENE_METADATA_EVENT_CHANGE', data: { metadata: clone(st.sceneMeta) } }); return out();
        case 'OBR_SCENE_GRID_GET_DPI': return out({ dpi: st.grid.dpi });
        case 'OBR_SCENE_GRID_GET_SCALE': return out({ scale: clone(st.grid.scale) });
        case 'OBR_SCENE_GRID_GET_TYPE': return out({ type: st.grid.type });
        case 'OBR_SCENE_GRID_GET_MEASUREMENT': return out({ measurement: st.grid.measurement });
        case 'OBR_SCENE_GRID_GET_COLOR': return out({ color: st.grid.style.lineColor });
        case 'OBR_SCENE_GRID_GET_OPACITY': return out({ opacity: st.grid.style.lineOpacity });
        case 'OBR_SCENE_GRID_GET_LINE_TYPE': return out({ lineType: st.grid.style.lineType });
        case 'OBR_SCENE_GRID_GET_LINE_WIDTH': return out({ lineWidth: st.grid.style.lineWidth });
        case 'OBR_SCENE_GRID_SNAP_POSITION': {
          const g = st.grid.dpi, c = []; const p = d.position;
          if (d.useCorners !== false) c.push({ x: Math.round(p.x / g) * g, y: Math.round(p.y / g) * g });
          if (d.useCenter !== false) c.push({ x: (Math.floor(p.x / g) + 0.5) * g, y: (Math.floor(p.y / g) + 0.5) * g });
          c.sort((a, b) => Math.hypot(a.x - p.x, a.y - p.y) - Math.hypot(b.x - p.x, b.y - p.y));
          const near = c[0], sens = d.snappingSensitivity === undefined ? 1 : d.snappingSensitivity;
          return out({ position: near && Math.hypot(near.x - p.x, near.y - p.y) <= g * sens ? near : { x: p.x, y: p.y } });
        }
        case 'OBR_SCENE_GRID_GET_DISTANCE': return out({ distance: Math.round(Math.max(Math.abs(d.from.x - d.to.x), Math.abs(d.from.y - d.to.y)) / st.grid.dpi) });
        case 'OBR_SCENE_FOG_GET_FILLED': return out({ filled: st.fog.filled });
        case 'OBR_BROADCAST_SEND_MESSAGE': {
          const dest = (d.options && d.options.destination) || 'REMOTE', data = { data: clone(d.data), connectionId: me.connectionId }, e = 'OBR_BROADCAST_MESSAGE_' + d.channel;
          if (dest === 'LOCAL' || dest === 'ALL') ev.push({ to: seat, ev: e, data });
          if (dest === 'REMOTE' || dest === 'ALL') ev.push({ to: '!' + seat, ev: e, data });
          return out();
        }
      }
      throw new Error('This stand-in for Owlbear does not answer ' + id + ' yet (tools/obrhost/world.js)');
    }
    function join(p) {
      st.players[p.id] = { id: p.id, connectionId: 'conn-' + p.id, role: p.role === 'GM' ? 'GM' : 'PLAYER', name: p.name || p.id, color: p.color || '#9966ff', metadata: {}, selection: [] };
      return Object.values(st.players).filter(x => x.id !== p.id).map(x => ({ to: x.id, ev: 'OBR_PARTY_EVENT_CHANGE', data: { players: party(x.id) } }));
    }
    function leave(seat) { delete st.players[seat]; return Object.values(st.players).map(x => ({ to: x.id, ev: 'OBR_PARTY_EVENT_CHANGE', data: { players: party(x.id) } })); }
    return { state: st, handle, join, leave, check, itemsOp, bounds: (list, ids) => bounds(list, ids) };
  }
  return { createWorld, check, IDS, LAYERS, ASSET_TYPES, LIMIT, size };
});
