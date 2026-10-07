/* Interactive terminology tree for the Mechanical English platform.
   A three-level teaching classification tree (Metal -> Ferrous / Non-ferrous
   -> materials). Nodes are draggable; edges are derived from parentId. */
(function (root) {
  'use strict';

  var GRAPH = (root.termGraph && typeof root.termGraph === 'object') ? root.termGraph : {};

  function graphFor(unit, reading) { return GRAPH[unit + '/' + reading] || null; }
  function hasData(unit, reading) { return !!graphFor(unit, reading); }

  var PAD = 24, ROW_GAP = 84, SIB_GAP = 12, GROUP_GAP = 48, MIN_CANVAS = 900;
  var SIZE = {
    root: { w: 210, h: 100 },
    group: { w: 200, h: 88 },
    leaf: { w: 124, h: 70 }
  };

  var state = null;

  function el(tag, cls) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    return e;
  }

  function reduceMotion() {
    return root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function sizeOf(node) {
    if (!node.parentId) return SIZE.root;
    var p = state.nodeById[node.parentId];
    return (p && !p.parentId) ? SIZE.group : SIZE.leaf;
  }
  function sizeClass(node) {
    if (!node.parentId) return 'term-node--root';
    var p = state.nodeById[node.parentId];
    return (p && !p.parentId) ? 'term-node--group' : 'term-node--leaf';
  }

  function groupWidth(ids) {
    var w = 0;
    ids.forEach(function (id) { w += sizeOf(state.nodeById[id]).w; });
    return w + SIB_GAP * Math.max(0, ids.length - 1);
  }

  function defaultLayout() {
    var containerW = state.container.getBoundingClientRect().width;
    var data = state.data, byId = state.nodeById, pos = {};
    var root = data.nodes.filter(function (n) { return !n.parentId; })[0];
    var rootSize = sizeOf(root);

    var groups = data.nodes.filter(function (n) { return n.parentId === root.id; });
    var leaves = {};
    groups.forEach(function (g) { leaves[g.id] = data.nodes.filter(function (n) { return n.parentId === g.id; }); });

    var totalLeaf = groups.reduce(function (s, g) { return s + groupWidth(leaves[g.id].map(function (n) { return n.id; })); }, 0)
      + GROUP_GAP * Math.max(0, groups.length - 1);
    var W = Math.max(MIN_CANVAS, containerW - PAD * 2, totalLeaf + PAD * 2);

    pos[root.id] = { x: (W - rootSize.w) / 2, y: PAD };
    var leafY = PAD + rootSize.h + ROW_GAP + SIZE.group.h + ROW_GAP;
    var cx = (W - totalLeaf) / 2;

    groups.forEach(function (g) {
      var kids = leaves[g.id];
      var lw = groupWidth(kids.map(function (n) { return n.id; }));
      var gSize = sizeOf(g);
      pos[g.id] = { x: cx + lw / 2 - gSize.w / 2, y: PAD + rootSize.h + ROW_GAP };
      var lx = cx;
      kids.forEach(function (n) {
        pos[n.id] = { x: lx, y: leafY };
        lx += sizeOf(n).w + SIB_GAP;
      });
      cx += lw + GROUP_GAP;
    });
    return { pos: pos, W: W };
  }

  function canvasSize(pos, W) {
    var bottom = PAD;
    state.data.nodes.forEach(function (n) { bottom = Math.max(bottom, pos[n.id].y + sizeOf(n).h); });
    return { w: W + PAD * 2, h: bottom + PAD };
  }

  function applyLayout() {
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
      var ma = sizeOf(p), mb = sizeOf(n);
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
    var m = sizeOf(state.nodeById[id]);
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
    if (!node.parentId) return '金属 Metal';
    var p = state.nodeById[node.parentId];
    if (p && !p.parentId) return '金属分类 Metal classification';
    return (p && p.term) || '';
  }

  function renderDetail(id) {
    var node = state.nodeById[id], detail = state.detailEl;
    detail.replaceChildren();
    if (!node) return;

    var head = el('div', 'term-detail-head');
    var title = el('h2', 'term-detail-title'); title.textContent = node.term;
    var cn = el('span', 'term-detail-cn'); cn.textContent = node.cn;
    head.appendChild(title); head.appendChild(cn);
    detail.appendChild(head);

    var def = el('p', 'term-detail-def'); def.textContent = node.definition || 'No definition available.';
    detail.appendChild(def);

    var meta = el('dl', 'term-detail-meta');
    var dt = el('dt'); dt.textContent = '所属类别 Category';
    var dd = el('dd'); dd.textContent = categoryOf(node);
    meta.appendChild(dt); meta.appendChild(dd);
    detail.appendChild(meta);

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
      var b = el('button', 'term-node ' + sizeClass(n));
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
    state = { container: container, detailEl: detailEl, data: data, hooks: hooks || {}, selectedId: null, nodeEls: {}, nodeById: {}, pos: {}, bounds: { w: 0, h: 0 }, ro: null, cleanup: null };

    state.canvas = el('div', 'term-canvas');
    state.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    state.svg.setAttribute('class', 'term-edges');
    state.toolbar = el('div', 'term-toolbar');
    state.canvas.appendChild(state.svg);
    container.replaceChildren(state.toolbar, state.canvas);

    buildNodes();
    buildToolbar();
    applyLayout();
    var first = state.nodeById['metal'] ? 'metal' : (state.data.nodes[0] && state.data.nodes[0].id);
    if (first) select(first);
    bindResize();
  }

  root.TermView = { hasData: hasData, mount: mount, destroy: destroy, select: select };
})(globalThis);