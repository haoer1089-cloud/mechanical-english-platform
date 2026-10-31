/* Interactive terminology tree for the Mechanical English platform.
   A three-level teaching classification tree (Metal -> Ferrous / Non-ferrous
   -> materials). Nodes are draggable; edges are derived from parentId. */
(function (root) {
  'use strict';

  var GRAPH = (root.termGraph && typeof root.termGraph === 'object') ? root.termGraph : {};

  function graphFor(unit, reading) { return GRAPH[unit + '/' + reading] || null; }
  function hasData(unit, reading) { return !!graphFor(unit, reading); }

  var PAD = 24, ROW_GAP = 60, SIB_GAP = 14, GROUP_GAP = 48, MIN_CANVAS = 900;

  var state = null;

  function el(tag, cls) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    return e;
  }

  function reduceMotion() {
    return root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function sizeClass(node) {
    if (!node.parentId) return 'term-node--root';
    var p = state.nodeById[node.parentId];
    return (p && !p.parentId) ? 'term-node--group' : 'term-node--leaf';
  }

  function measureSizes() {
    state.sizes = {};
    state.data.nodes.forEach(function (n) {
      var e = state.nodeEls[n.id];
      state.sizes[n.id] = { w: e.offsetWidth, h: e.offsetHeight };
    });
  }

  function defaultLayout() {
    var containerW = state.container.getBoundingClientRect().width;
    var data = state.data, byId = state.nodeById, sizes = state.sizes, pos = {};
    var root = data.nodes.filter(function (n) { return !n.parentId; })[0];
    var rootSize = sizes[root.id];

    var groups = data.nodes.filter(function (n) { return n.parentId === root.id; });
    var leaves = {};
    groups.forEach(function (g) { leaves[g.id] = data.nodes.filter(function (n) { return n.parentId === g.id; }); });

    var extent = {};
    groups.forEach(function (g) {
      var lw = leaves[g.id].reduce(function (s, n) { return s + sizes[n.id].w; }, 0) + SIB_GAP * Math.max(0, leaves[g.id].length - 1);
      extent[g.id] = Math.max(sizes[g.id].w, lw);
    });
    var totalW = groups.reduce(function (s, g) { return s + extent[g.id]; }, 0) + GROUP_GAP * Math.max(0, groups.length - 1);
    var W = Math.max(MIN_CANVAS, containerW - PAD * 2, totalW + PAD * 2);

    var rootY = PAD;
    var groupH = groups.reduce(function (m, g) { return Math.max(m, sizes[g.id].h); }, 0);
    var groupY = rootY + rootSize.h + ROW_GAP;
    var leafY = groupY + groupH + ROW_GAP;

    pos[root.id] = { x: (W - rootSize.w) / 2, y: rootY };
    var cx = (W - totalW) / 2;

    groups.forEach(function (g) {
      var kids = leaves[g.id];
      var lw = kids.reduce(function (s, n) { return s + sizes[n.id].w; }, 0) + SIB_GAP * Math.max(0, kids.length - 1);
      var ext = extent[g.id];
      pos[g.id] = { x: cx + (ext - sizes[g.id].w) / 2, y: groupY };
      var lx = cx + (ext - lw) / 2;
      kids.forEach(function (n) {
        pos[n.id] = { x: lx, y: leafY };
        lx += sizes[n.id].w + SIB_GAP;
      });
      cx += ext + GROUP_GAP;
    });
    return { pos: pos, W: W };
  }

  function canvasSize(pos, W) {
    var bottom = PAD;
    state.data.nodes.forEach(function (n) { bottom = Math.max(bottom, pos[n.id].y + state.sizes[n.id].h); });
    return { w: W + PAD * 2, h: bottom + PAD };
  }

  function applyLayout() {
    measureSizes();
    var res = defaultLayout();
    state.pos = res.pos;
    state.bounds = canvasSize(res.pos, res.W);
    state.canvas.style.width = state.bounds.w + 'px';
    state.canvas.style.height = state.bounds.h + 'px';
    state.svg.setAttribute('width', state.bounds.w);
    state.svg.setAttribute('height', state.bounds.h);
    state.data.nodes.forEach(function (n) { applyPos(n.id); });
    drawEdges();
  }

  function applyPos(id) {
    var p = state.pos[id], nodeEl2 = state.nodeEls[id];
    nodeEl2.style.left = p.x + 'px';
    nodeEl2.style.top = p.y + 'px';
  }

  function drawEdges() {
    var svg = state.svg, data = state.data, byId = state.nodeById;
    svg.innerHTML = '';
    data.nodes.forEach(function (n) {
      if (!n.parentId) return;
      var p = byId[n.parentId];
      if (!p) return;
      var a = state.pos[p.id], b = state.pos[n.id];
      var ma = state.sizes[p.id], mb = state.sizes[n.id];
      var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', a.x + ma.w / 2);
      line.setAttribute('y1', a.y + ma.h);
      line.setAttribute('x2', b.x + mb.w / 2);
      line.setAttribute('y2', b.y);
      line.setAttribute('class', 'term-edge');
      svg.appendChild(line);
    });
  }

  // ---------------------------------------------------------------- dragging
  var drag = null, suppressClick = false;
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  function moveTo(id, x, y) {
    var m = state.sizes[id];
    var nx = clamp(x, 0, Math.max(0, state.bounds.w - m.w));
    var ny = clamp(y, 0, Math.max(0, state.bounds.h - m.h));
    state.pos[id] = { x: nx, y: ny };
    applyPos(id);
    drawEdges();
  }

  function onNodePointerDown(id, e) {
    if (e.button !== undefined && e.button !== 0) return;
    e.preventDefault();
    suppressClick = false;
    drag = { id: id, sx: e.clientX, sy: e.clientY, ox: state.pos[id].x, oy: state.pos[id].y, moved: false };
    try { state.nodeEls[id].setPointerCapture(e.pointerId); } catch (err) {}
    state.nodeEls[id].classList.add('dragging');
  }
  function onNodePointerMove(id, e) {
    if (!drag || drag.id !== id) return;
    var dx = e.clientX - drag.sx, dy = e.clientY - drag.sy;
    if (!drag.moved && (Math.abs(dx) > 4 || Math.abs(dy) > 4)) drag.moved = true;
    if (!drag.moved) return;
    moveTo(id, drag.ox + dx, drag.oy + dy);
  }
  function onNodePointerUp(id) {
    if (!drag || drag.id !== id) return;
    suppressClick = drag.moved;
    state.nodeEls[id].classList.remove('dragging');
    drag = null;
  }
  function onNodeKeyDown(id, e) {
    var delta = { ArrowLeft: [-20, 0], ArrowRight: [20, 0], ArrowUp: [0, -20], ArrowDown: [0, 20] }[e.key];
    if (!delta) return;
    e.preventDefault();
    moveTo(id, state.pos[id].x + delta[0], state.pos[id].y + delta[1]);
  }

  // ---------------------------------------------------------------- detail
  function lessonTextOf(blockId) {
    var units = (typeof lessons !== 'undefined') ? lessons : [];
    for (var i = 0; i < units.length; i++) {
      var blocks = [].concat(units[i].blocks || [], (units[i].readings || []).reduce(function (a, r) { return a.concat(r.blocks || []); }, []));
      for (var j = 0; j < blocks.length; j++) {
        if (blocks[j].id === blockId) return blocks[j].text;
      }
    }
    return null;
  }

  function categoryOf(node) {
    if (node.kind === 'group') return '教学分组 Teaching group';
    if (!node.parentId) return (state.data && state.data.title) || '核心主题 Core theme';
    var p = state.nodeById[node.parentId];
    return (p && p.term) || '';
  }

  function termLabel(id) {
    var n = state.nodeById[id];
    return n ? (n.term + ' · ' + n.cn) : id;
  }

  function renderProcessOrder(detail) {
    var order = state.data.processOrder;
    if (!order || !order.length) return;
    var box = el('div', 'term-detail-process');
    var h = el('h3', 'term-detail-subhead'); h.textContent = '局部顺序 Process order';
    box.appendChild(h);
    var names = order.map(function (id) { return state.nodeById[id] ? state.nodeById[id].term : id; });
    var p = el('p', 'term-detail-process-line'); p.textContent = names.join(' → ');
    box.appendChild(p);
    detail.appendChild(box);
  }

  function renderDetailRelations(detail) {
    var rels = state.data.detailRelations;
    if (!rels || !rels.length) return;
    var box = el('div', 'term-detail-relations');
    var h = el('h3', 'term-detail-subhead'); h.textContent = '补充关系 Related';
    box.appendChild(h);
    rels.forEach(function (r) {
      var item = el('p', 'term-detail-relation'); item.textContent = r.cn || '';
      box.appendChild(item);
    });
    detail.appendChild(box);
  }

  function renderDetail(id) {
    var node = state.nodeById[id], detail = state.detailEl;
    detail.replaceChildren();
    if (!node) return;
    var isGroup = node.kind === 'group';

    var head = el('div', 'term-detail-head');
    var title = el('h2', 'term-detail-title'); title.textContent = node.term;
    var cn = el('span', 'term-detail-cn'); cn.textContent = node.cn;
    head.appendChild(title); head.appendChild(cn);
    detail.appendChild(head);

    var def = el('p', 'term-detail-def'); def.textContent = node.definition || 'No definition available.';
    detail.appendChild(def);
    if (node.definitionCn) {
      var defCn = el('p', 'term-detail-def-cn'); defCn.textContent = node.definitionCn;
      detail.appendChild(defCn);
    }

    var meta = el('dl', 'term-detail-meta');
    var dt = el('dt'); dt.textContent = isGroup ? '节点类型 Node type' : '所属分类 Category';
    var dd = el('dd'); dd.textContent = categoryOf(node);
    meta.appendChild(dt); meta.appendChild(dd);
    detail.appendChild(meta);

    if (!isGroup) {
      var src = el('div', 'term-detail-source');
      var text = lessonTextOf(node.sourceBlock);
      if (text === null) {
        if (root.console) console.warn('[term-view] source block missing:', node.sourceBlock);
        var miss = el('span', 'term-source-missing'); miss.textContent = 'Source paragraph unavailable';
        src.appendChild(miss);
      } else {
        var btn = el('button', 'term-goto-button'); btn.type = 'button'; btn.textContent = '查看课文原句 →';
        btn.addEventListener('click', function () { if (state.hooks.onGotoBlock) state.hooks.onGotoBlock(node.sourceBlock); });
        src.appendChild(btn);
      }
      detail.appendChild(src);
    }

    renderProcessOrder(detail);
    renderDetailRelations(detail);
  }

  // ---------------------------------------------------------------- selection
  function revealNode(id) {
    var nodeEl2 = state.nodeEls[id];
    if (!nodeEl2 || !nodeEl2.scrollIntoView) return;
    nodeEl2.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reduceMotion() ? 'auto' : 'smooth' });
  }

  function select(id) {
    if (!state.nodeById[id]) return;
    state.selectedId = id;
    Object.keys(state.nodeEls).forEach(function (k) {
      var b = state.nodeEls[k], on = k === id;
      b.classList.toggle('selected', on);
      b.setAttribute('aria-pressed', String(on));
    });
    renderDetail(id);
    revealNode(id);
  }

  // ---------------------------------------------------------------- build
  function buildNodes() {
    state.nodeById = {};
    state.data.nodes.forEach(function (n) { state.nodeById[n.id] = n; });
    state.data.nodes.forEach(function (n) {
      var cls = 'term-node ' + sizeClass(n);
      if (n.kind === 'group') cls += ' term-node--kind-group';
      var b = el('button', cls);
      b.type = 'button';
      b.dataset.node = n.id;
      var en = el('span', 'term-node-en'); en.textContent = n.term;
      var cn = el('span', 'term-node-cn'); cn.textContent = n.cn;
      b.appendChild(en); b.appendChild(cn);
      if (n.subtitle) {
        var sub = el('span', 'term-node-sub'); sub.textContent = n.subtitle;
        b.appendChild(sub);
      }
      b.setAttribute('aria-pressed', 'false');
      b.setAttribute('aria-label', n.term + ' · ' + n.cn);
      b.addEventListener('pointerdown', function (e) { onNodePointerDown(n.id, e); });
      b.addEventListener('pointermove', function (e) { onNodePointerMove(n.id, e); });
      b.addEventListener('pointerup', function (e) { onNodePointerUp(n.id); });
      b.addEventListener('pointercancel', function (e) { onNodePointerUp(n.id); });
      b.addEventListener('click', function () { if (suppressClick) { suppressClick = false; return; } select(n.id); });
      b.addEventListener('keydown', function (e) { onNodeKeyDown(n.id, e); });
      state.nodeEls[n.id] = b;
      state.canvas.appendChild(b);
    });
  }

  function buildToolbar() {
    var bar = state.toolbar;
    bar.replaceChildren();
    var btn = el('button', 'term-reset'); btn.type = 'button'; btn.textContent = '恢复默认布局 Reset layout';
    btn.addEventListener('click', function () { applyLayout(); });
    bar.appendChild(btn);
  }

  function bindResize() {
    var ro = (typeof ResizeObserver !== 'undefined') ? new ResizeObserver(function () { applyLayout(); }) : null;
    if (ro) ro.observe(state.container);
    var onResize = function () { applyLayout(); };
    root.addEventListener('resize', onResize);
    state.ro = ro;
    state.cleanup = function () {
      if (ro) ro.disconnect();
      root.removeEventListener('resize', onResize);
    };
  }

  function destroy() {
    if (state && state.cleanup) state.cleanup();
    if (state && state.container) state.container.replaceChildren();
    state = null;
  }

  function mount(container, detailEl, unit, reading, hooks) {
    var data = graphFor(unit, reading);
    if (!data) { destroy(); return; }
    destroy();
    state = { container: container, detailEl: detailEl, data: data, hooks: hooks || {}, selectedId: null, nodeEls: {}, nodeById: {}, sizes: {}, pos: {}, bounds: { w: 0, h: 0 }, ro: null, cleanup: null };

    state.canvas = el('div', 'term-canvas');
    state.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    state.svg.setAttribute('class', 'term-edges');
    state.toolbar = el('div', 'term-toolbar');
    state.canvas.appendChild(state.svg);
    container.replaceChildren(state.toolbar, state.canvas);

    buildNodes();
    buildToolbar();
    applyLayout();
    var first = (state.data.rootId && state.nodeById[state.data.rootId]) ? state.data.rootId : (state.data.nodes[0] && state.data.nodes[0].id);
    if (first) select(first);
    bindResize();
  }

  root.TermView = { hasData: hasData, mount: mount, destroy: destroy, select: select };
})(globalThis);