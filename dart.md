---
title: Dart Scoreboard
subtitle: 501 • Cricket • TicTacToe
description: Dart-Tracker mit Popups, Endstand, Historie und Druck-Export.
show_sidebar: false
layout: page
---

<style>
  /* ─────────────────────────────────────────────
     SmartHomeBastler-ish Dark UI (ohne externe Abhängigkeiten)
     ───────────────────────────────────────────── */
  :root{
    --shb-bg: #0f1115;
    --shb-panel: #151a22;
    --shb-panel-2: #10141b;
    --shb-border: rgba(255,255,255,.08);
    --shb-text: rgba(255,255,255,.92);
    --shb-muted: rgba(255,255,255,.65);
    --shb-accent: #1598b3;
    --shb-danger: #ff5c7a;
    --shb-good: #5dffb0;
    --shb-warn: #ffc857;
    --shb-radius: 14px;
  }

  .shb-wrap{
    max-width: 1100px;
    margin: 0 auto;
    padding: 1.0rem 0.75rem 2.0rem;
    color: var(--shb-text);
  }

  .shb-hero{
    background: linear-gradient(135deg, rgba(21,26,34,.9), rgba(16,20,27,.9));
    border: 1px solid var(--shb-border);
    border-radius: var(--shb-radius);
    padding: 1.1rem 1.1rem;
    box-shadow: 0 12px 30px rgba(0,0,0,.25);
  }

  .shb-title{
    font-size: 1.55rem;
    font-weight: 800;
    letter-spacing: .2px;
    margin: 0 0 .2rem 0;
  }
  .shb-sub{
    margin: 0;
    color: var(--shb-muted);
  }

  .shb-grid{
    display: grid;
    grid-template-columns: 1fr;
    gap: .9rem;
    margin-top: .9rem;
  }
  @media(min-width: 980px){
    .shb-grid{ grid-template-columns: 420px 1fr; }
  }

  .shb-card{
    background: var(--shb-panel);
    border: 1px solid var(--shb-border);
    border-radius: var(--shb-radius);
    padding: 1rem;
    box-shadow: 0 10px 22px rgba(0,0,0,.22);
  }
  .shb-card h3{
    margin: 0 0 .65rem 0;
    font-size: 1.05rem;
  }

  .shb-row{ display:flex; gap:.6rem; flex-wrap:wrap; align-items:center; }
  .shb-row > *{ flex: 1 1 auto; }

  .shb-label{
    font-size: .9rem;
    color: var(--shb-muted);
    margin-bottom: .25rem;
  }

  .shb-input, .shb-select{
    width: 100%;
    padding: .65rem .7rem;
    background: var(--shb-panel-2);
    color: var(--shb-text);
    border: 1px solid var(--shb-border);
    border-radius: 12px;
    outline: none;
  }
  .shb-input:focus, .shb-select:focus{
    border-color: rgba(21,152,179,.6);
    box-shadow: 0 0 0 3px rgba(21,152,179,.18);
  }

  .shb-btn{
    cursor:pointer;
    border: 1px solid var(--shb-border);
    border-radius: 12px;
    padding: .65rem .85rem;
    background: rgba(255,255,255,.04);
    color: var(--shb-text);
    font-weight: 700;
    transition: transform .06s ease, background .15s ease, border-color .15s ease;
    user-select:none;
    white-space: nowrap;
  }
  .shb-btn:hover{ background: rgba(255,255,255,.06); }
  .shb-btn:active{ transform: translateY(1px); }

  .shb-btn.primary{
    background: rgba(21,152,179,.18);
    border-color: rgba(21,152,179,.55);
  }
  .shb-btn.primary:hover{ background: rgba(21,152,179,.24); }

  .shb-btn.danger{
    background: rgba(255,92,122,.12);
    border-color: rgba(255,92,122,.45);
  }
  .shb-btn.good{
    background: rgba(93,255,176,.12);
    border-color: rgba(93,255,176,.45);
  }

  .shb-chipbar{ display:flex; flex-wrap:wrap; gap:.45rem; }
  .shb-chip{
    cursor:pointer;
    padding: .45rem .55rem;
    border-radius: 999px;
    border: 1px solid var(--shb-border);
    background: rgba(255,255,255,.03);
    color: var(--shb-text);
    font-weight: 700;
    font-size: .88rem;
  }
  .shb-chip:hover{ background: rgba(255,255,255,.06); }
  .shb-chip.accent{
    border-color: rgba(21,152,179,.55);
    background: rgba(21,152,179,.14);
  }

  .shb-players{
    display:flex; flex-direction:column; gap:.5rem;
    margin-top: .55rem;
  }
  .shb-player{
    display:flex; gap:.5rem; align-items:center;
    padding:.6rem;
    border:1px solid var(--shb-border);
    border-radius: 12px;
    background: rgba(0,0,0,.12);
  }
  .shb-player .name{ font-weight: 800; }
  .shb-player .meta{ color: var(--shb-muted); font-size:.9rem; }
  .shb-player .right{ margin-left:auto; display:flex; gap:.45rem; }

  .shb-livehead{
    display:flex; align-items:flex-start; justify-content:space-between;
    gap: .75rem;
    border-bottom: 1px dashed rgba(255,255,255,.08);
    padding-bottom: .75rem;
    margin-bottom: .75rem;
  }
  .shb-livehead .kicker{ color: var(--shb-muted); font-size:.92rem; }
  .shb-livehead .big{ font-size:1.25rem; font-weight:900; margin: .1rem 0; }

  .shb-table{
    width: 100%;
    border-collapse: collapse;
    overflow:hidden;
    border-radius: 12px;
    border:1px solid var(--shb-border);
  }
  .shb-table th, .shb-table td{
    padding: .6rem .6rem;
    border-bottom: 1px solid rgba(255,255,255,.06);
    text-align: left;
    vertical-align: middle;
    font-size: .95rem;
  }
  .shb-table th{
    background: rgba(255,255,255,.03);
    color: rgba(255,255,255,.85);
    font-weight: 900;
  }
  .shb-table tr:last-child td{ border-bottom: none; }

  .pill{
    display:inline-block;
    padding:.25rem .55rem;
    border-radius:999px;
    font-size:.85rem;
    font-weight:800;
    border:1px solid var(--shb-border);
    background: rgba(255,255,255,.03);
    color: rgba(255,255,255,.88);
    white-space:nowrap;
  }
  .pill.turn{ border-color: rgba(21,152,179,.55); background: rgba(21,152,179,.14); }
  .pill.win{ border-color: rgba(93,255,176,.45); background: rgba(93,255,176,.12); }
  .pill.bad{ border-color: rgba(255,92,122,.45); background: rgba(255,92,122,.12); }

  /* ───────────────────────── Modal ───────────────────────── */
  .shb-modal{
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,.55);
    display:none;
    align-items:center;
    justify-content:center;
    padding: 1rem;
    z-index: 9999;
  }
  .shb-modal.active{ display:flex; }
  .shb-modal .box{
    width: min(920px, 100%);
    background: linear-gradient(135deg, rgba(21,26,34,.98), rgba(16,20,27,.98));
    border: 1px solid var(--shb-border);
    border-radius: var(--shb-radius);
    box-shadow: 0 22px 60px rgba(0,0,0,.55);
    overflow:hidden;
  }
  .shb-modal .head{
    padding: .9rem 1rem;
    border-bottom: 1px solid rgba(255,255,255,.08);
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap: .75rem;
  }
  .shb-modal .head .ttl{
    font-weight: 900;
    font-size: 1.05rem;
  }
  .shb-modal .body{ padding: 1rem; }
  .shb-modal .foot{
    padding: .9rem 1rem;
    border-top: 1px solid rgba(255,255,255,.08);
    display:flex;
    gap:.6rem;
    justify-content:flex-end;
    flex-wrap: wrap;
  }

  .shb-hint{
    color: var(--shb-muted);
    font-size: .92rem;
    margin-top: .4rem;
  }

  /* ───────────────────────── Print ───────────────────────── */
  @media print{
    body *{ visibility: hidden !important; }
    #shb-print-area, #shb-print-area *{ visibility: visible !important; }
    #shb-print-area{
      position: fixed;
      inset: 0;
      padding: 12mm;
      background: #fff !important;
      color: #000 !important;
    }
    #shb-print-area table{
      width: 100%;
      border-collapse: collapse;
      border: 1px solid #000;
    }
    #shb-print-area th, #shb-print-area td{
      border: 1px solid #000;
      padding: 6px;
    }
  }
</style>

<div class="shb-wrap" id="darts-app">

  <div class="shb-hero">
    <h1 class="shb-title">🎯 Dart Scoreboard</h1>
    <p class="shb-sub">501 (Normal / Double In / Double Out) • Cricket • TicTacToe (Dart-Variante) • Historie + Druck</p>
  </div>

  <div class="shb-grid">
    <!-- LEFT: Setup -->
    <div class="shb-card">
      <h3>Spiel Setup</h3>

      <div class="shb-row">
        <div>
          <div class="shb-label">Spiel</div>
          <select id="gameType" class="shb-select">
            <option value="501">501</option>
            <option value="cricket">Cricket</option>
            <option value="tictactoe">TicTacToe</option>
          </select>
        </div>

        <div id="opt501Wrap">
          <div class="shb-label">501 Optionen</div>
          <select id="opt501" class="shb-select">
            <option value="normal">Normal</option>
            <option value="doublein">Double In</option>
            <option value="doubleout">Double Out</option>
            <option value="doublein_doubleout">Double In + Double Out</option>
          </select>
        </div>
      </div>

      <div class="shb-row" style="margin-top:.75rem;">
        <div>
          <div class="shb-label">Spielername</div>
          <input id="playerName" class="shb-input" placeholder="z.B. Maxx" />
          <div class="shb-hint">Reihenfolge hier = Sitzreihenfolge. (Damit der Gameflow nicht weint 😄)</div>
        </div>
        <div style="flex:0 0 auto;">
          <div class="shb-label">&nbsp;</div>
          <button id="addPlayer" class="shb-btn">+ Spieler</button>
        </div>
      </div>

      <div class="shb-players" id="playerList"></div>

      <div class="shb-row" style="margin-top:.9rem;">
        <button id="startGame" class="shb-btn primary" style="flex:1 1 auto;">▶ Spiel starten</button>
        <button id="openHistory" class="shb-btn" style="flex:0 0 auto;">📜 Historie</button>
      </div>

      <div class="shb-row" style="margin-top:.6rem;">
        <button id="exportHistory" class="shb-btn" style="flex:1 1 auto;">⬇ Export JSON</button>
        <button id="importHistory" class="shb-btn" style="flex:1 1 auto;">⬆ Import JSON</button>
        <input id="importFile" type="file" accept="application/json" style="display:none;" />
      </div>
    </div>

    <!-- RIGHT: Live -->
    <div class="shb-card">
      <div class="shb-livehead">
        <div>
          <div class="kicker" id="liveKicker">Bereit.</div>
          <div class="big" id="liveTitle">Noch kein Spiel aktiv</div>
          <div class="shb-hint" id="liveHint">Starte ein Spiel – dann kommt hier die Live-Übersicht.</div>
        </div>
        <div class="shb-row" style="justify-content:flex-end;">
          <button id="enterThrows" class="shb-btn primary" disabled>🎯 Treffer eingeben</button>
          <button id="undo" class="shb-btn" disabled>↩ Undo</button>
          <button id="endGame" class="shb-btn danger" disabled>⛔ Spiel beenden</button>
        </div>
      </div>

      <div id="liveArea"></div>
    </div>
  </div>
</div>

<!-- ───────────────────────── Scoring Modal ───────────────────────── -->
<div class="shb-modal" id="scoreModal" aria-hidden="true">
  <div class="box">
    <div class="head">
      <div>
        <div class="ttl" id="scoreModalTitle">Treffer eingeben</div>
        <div class="shb-hint" id="scoreModalSub">3 Darts pro Runde</div>
      </div>
      <button class="shb-btn" id="closeScoreModal">✕</button>
    </div>

    <div class="body">
      <div class="shb-card" style="padding:.9rem; background: rgba(0,0,0,.10);">
        <div class="shb-row" style="align-items:flex-start;">
          <div style="flex:1 1 auto;">
            <div class="shb-label">Aktueller Spieler</div>
            <div style="font-size:1.15rem; font-weight:900;" id="currentPlayerName">–</div>
            <div class="shb-hint" id="currentPlayerInfo">–</div>
          </div>
          <div style="flex:1 1 auto;">
            <div class="shb-label">Schnelleingabe</div>
            <div class="shb-chipbar" id="quickChips"></div>
            <div class="shb-hint">Klick → fügt einen Dart hinzu. (S/D/T + Zahl wird automatisch zu S20/D16/T19 zusammengebaut.)</div>
          </div>
        </div>
      </div>

      <div class="shb-row" style="margin-top:.9rem;">
        <div>
          <div class="shb-label">Dart 1</div>
          <input class="shb-input dartInput" id="dart1" placeholder="z.B. T20, D16, 20, 25, BULL, 0" />
        </div>
        <div>
          <div class="shb-label">Dart 2</div>
          <input class="shb-input dartInput" id="dart2" placeholder="z.B. S19, D10, MISS" />
        </div>
        <div>
          <div class="shb-label">Dart 3</div>
          <input class="shb-input dartInput" id="dart3" placeholder="z.B. 17, T19" />
        </div>
      </div>

      <div class="shb-hint" id="modalHelp" style="margin-top:.6rem;"></div>

      <div class="shb-card" style="margin-top:.9rem;">
        <h3 style="margin-bottom:.55rem;">Vorschau / Regelcheck</h3>
        <div id="scorePreview" class="shb-hint">–</div>
      </div>
    </div>

    <div class="foot">
      <button class="shb-btn" id="clearDarts">🧹 Leeren</button>
      <button class="shb-btn primary" id="applyDarts">✅ Anwenden</button>
    </div>
  </div>
</div>

<!-- ───────────────────────── End Modal ───────────────────────── -->
<div class="shb-modal" id="endModal" aria-hidden="true">
  <div class="box">
    <div class="head">
      <div>
        <div class="ttl">🏁 Spiel beendet</div>
        <div class="shb-hint" id="endMeta">–</div>
      </div>
      <button class="shb-btn" id="closeEndModal">✕</button>
    </div>
    <div class="body" id="endBody"></div>
    <div class="foot">
      <button class="shb-btn" id="printEnd">🖨 Drucken</button>
      <button class="shb-btn primary" id="okEnd">✅ OK</button>
    </div>
  </div>
</div>

<!-- ───────────────────────── History Modal ───────────────────────── -->
<div class="shb-modal" id="historyModal" aria-hidden="true">
  <div class="box">
    <div class="head">
      <div>
        <div class="ttl">📜 Historie</div>
        <div class="shb-hint">Gespeicherte Spiele (localStorage). Export/Import macht’s “portabel”.</div>
      </div>
      <button class="shb-btn" id="closeHistory">✕</button>
    </div>
    <div class="body" id="historyBody"></div>
    <div class="foot">
      <button class="shb-btn" id="printHistory">🖨 Drucken</button>
      <button class="shb-btn danger" id="clearHistory">🧨 Alles löschen</button>
      <button class="shb-btn primary" id="closeHistory2">✅ Schließen</button>
    </div>
  </div>
</div>

<!-- Print area (hidden on screen) -->
<div id="shb-print-area" style="display:none;"></div>

<script>
(() => {
  /* ───────────────────────── Utilities ───────────────────────── */
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
  const uid = () => Math.random().toString(16).slice(2) + Date.now().toString(16);
  const nowISO = () => new Date().toISOString();
  const fmtDate = (iso) => {
    try{
      const d = new Date(iso);
      return d.toLocaleString('de-AT', { year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit' });
    } catch { return iso; }
  };
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

  const LS_KEY_HISTORY = "shb_darts_history_v1";
  const LS_KEY_ACTIVE  = "shb_darts_active_v1";

  function loadHistory(){
    try { return JSON.parse(localStorage.getItem(LS_KEY_HISTORY) || "[]"); }
    catch { return []; }
  }
  function saveHistory(list){
    localStorage.setItem(LS_KEY_HISTORY, JSON.stringify(list));
  }
  function loadActive(){
    try { return JSON.parse(localStorage.getItem(LS_KEY_ACTIVE) || "null"); }
    catch { return null; }
  }
  function saveActive(state){
    localStorage.setItem(LS_KEY_ACTIVE, JSON.stringify(state));
  }
  function clearActive(){
    localStorage.removeItem(LS_KEY_ACTIVE);
  }

  /* ───────────────────────── Dart parsing ─────────────────────────
     Accepts:
       - "T20", "D16", "S19"
       - "20" (single), "25" (outer bull), "BULL" (50)
       - "MISS", "0"
     Returns: { raw, kind, mult, value, isDouble, isTriple, base? }
  */
  function parseDartToken(token){
    let raw = (token || "").trim().toUpperCase();
    
    // erlaubt Eingaben wie "S 5", "D 16", "T 20"
    raw = raw.replace(/^([SDT])\s+(\d{1,2})$/i, "$1$2");
    raw = raw.replace(/\s+/g, " ");
    if(!raw) return { raw:"", kind:"empty", mult:0, value:0, isDouble:false, isTriple:false };

    if(raw === "MISS" || raw === "0") return { raw, kind:"score", mult:0, value:0, isDouble:false, isTriple:false };
    if(raw === "BULL") return { raw, kind:"score", mult:1, value:50, isDouble:false, isTriple:false };

    if(/^\d+$/.test(raw)){
      const v = parseInt(raw, 10);
      if(v === 25) return { raw, kind:"score", mult:1, value:25, isDouble:false, isTriple:false };
      if(v >= 1 && v <= 60) return { raw, kind:"score", mult:1, value:v, isDouble:false, isTriple:false };
      return { raw, kind:"invalid", mult:0, value:0, isDouble:false, isTriple:false };
    }

    const m = raw.match(/^([SDT])(\d{1,2})$/);
    if(m){
      const mult = (m[1] === "S") ? 1 : (m[1] === "D") ? 2 : 3;
      const base = parseInt(m[2], 10);
      if(base >= 1 && base <= 20){
        return { raw, kind:"score", mult, base, value: base * mult, isDouble: mult===2, isTriple: mult===3 };
      }
      return { raw, kind:"invalid", mult:0, value:0, isDouble:false, isTriple:false };
    }

    if(raw === "DBULL") return { raw, kind:"score", mult:2, value:50, isDouble:true, isTriple:false };

    return { raw, kind:"invalid", mult:0, value:0, isDouble:false, isTriple:false };
  }

  function parseThreeDarts(inputs){
    const darts = inputs.map(parseDartToken);
    const invalid = darts.filter(d => d.kind === "invalid");
    return { darts, invalid };
  }
/* ───────────────────────── 501 Checkout Suggestions ───────────────────────── */

const _ALL_DARTS = (() => {
  const darts = [];

  // Singles, Doubles, Triples 1..20
  for (let n = 1; n <= 20; n++) {
    darts.push({ label: `S${n}`, score: n, out: false, t: "S" });
    darts.push({ label: `D${n}`, score: 2*n, out: true,  t: "D" });
    darts.push({ label: `T${n}`, score: 3*n, out: false, t: "T" });
  }

  // Bulls
  darts.push({ label: "25",   score: 25, out: false, t: "SB" });
  darts.push({ label: "BULL", score: 50, out: true,  t: "DB" }); // counts as double-out

  return darts;
})();

function _comboScore(combo) {
  // Ranking: prefer fewer darts, then more triples, then higher first dart
  const darts = combo;
  const len = darts.length;

  const tripleCount = darts.filter(d => d.t === "T").length;
  const firstScore = darts[0]?.score || 0;

  // fewer darts -> bigger base
  let s = 0;
  s += (4 - len) * 100000;      // 1 dart best, then 2, then 3
  s += tripleCount * 1000;      // prefer triples
  s += firstScore * 10;         // prefer big first dart
  return s;
}

function getCheckoutSuggestion501(rest, { requiresDoubleOut = true } = {}) {
  // Standard: show only for <=170 (classic 3-dart checkouts)
  if (rest <= 1) return null;
  if (rest > 170) return null;

  const outs = requiresDoubleOut ? _ALL_DARTS.filter(d => d.out) : _ALL_DARTS;

  let best = null;
  let bestS = -Infinity;

  // 1 dart
  for (const d3 of outs) {
    if (d3.score === rest) {
      const cand = [d3];
      const sc = _comboScore(cand);
      if (sc > bestS) { bestS = sc; best = cand; }
    }
  }

  // 2 darts
  for (const d1 of _ALL_DARTS) {
    for (const d3 of outs) {
      if (d1.score + d3.score === rest) {
        const cand = [d1, d3];
        const sc = _comboScore(cand);
        if (sc > bestS) { bestS = sc; best = cand; }
      }
    }
  }

  // 3 darts
  for (const d1 of _ALL_DARTS) {
    for (const d2 of _ALL_DARTS) {
      const partial = d1.score + d2.score;
      if (partial >= rest) continue;
      const need = rest - partial;

      for (const d3 of outs) {
        if (d3.score === need) {
          const cand = [d1, d2, d3];
          const sc = _comboScore(cand);
          if (sc > bestS) { bestS = sc; best = cand; }
        }
      }
    }
  }

  if (!best) return null;

  // output like: T20–T20–D20
  return best.map(d => d.label).join("–");
}

  /* ───────────────────────── Game Builders ───────────────────────── */
  function build501(players, opt){
    return {
      gameType: "501",
      opt501: opt,
      startScore: 501,
      players: players.map(p => ({
        id: uid(), name: p,
        score: 501,
        hasIn: (opt === "normal" || opt === "doubleout"),
        lastTurn: null
      })),
      turnIndex: 0,
      log: [],
      createdAt: nowISO(),
      finishedAt: null,
      winnerId: null
    };
  }

  function buildCricket(players){
    const targets = ["20","19","18","17","16","15","BULL"];
    return {
      gameType: "cricket",
      targets,
      players: players.map(p => ({
        id: uid(), name: p,
        points: 0,
        marks: Object.fromEntries(targets.map(t => [t, 0])),
        lastTurn: null
      })),
      turnIndex: 0,
      log: [],
      createdAt: nowISO(),
      finishedAt: null,
      winnerId: null
    };
  }

  // TicTacToe Dart Variante:
  // - Mitte immer BULL
  // - Außen: 8 unique Random-Zahlen aus 1..20
  // - Pro Feld 4 Marks zum Claim
  function buildTicTacToe(twoPlayers){
    const pool = Array.from({length:20}, (_,i)=>i+1);
    for(let i=pool.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    const outer = pool.slice(0,8);
    const positions = [1,2,3,4,6,7,8,9]; // ohne center(5)

    const players = twoPlayers.map((p, idx) => ({
      id: uid(),
      name: p,
      symbol: idx === 0 ? "❌" : "⭕"
    }));

    const board = Array.from({length:9}, (_,i) => {
      const idx = i+1;
      const isCenter = idx === 5;
      const value = isCenter ? "BULL" : outer[positions.indexOf(idx)];
      return {
        idx,
        value,         // number 1..20 oder "BULL"
        ownerId: null, // sobald geclaimed
        marks: {}      // { [playerId]: 0..4 }
      };
    });

    return {
      gameType: "tictactoe",
      players,
      board,
      turnIndex: 0,
      log: [],
      createdAt: nowISO(),
      finishedAt: null,
      winnerId: null
    };
  }

  /* ───────────────────────── Rules Engines ───────────────────────── */

  // 501 apply: double-in/out, bust, win
  function apply501Turn(state, playerId, darts){
    const opt = state.opt501;
    const p = state.players.find(x => x.id === playerId);
    const startScore = p.score;
    const startHasIn = p.hasIn;

    let delta = 0;
    let hasIn = p.hasIn;

    for(const d of darts){
      if(d.kind === "invalid") continue;

      if(!hasIn && (opt === "doublein" || opt === "doublein_doubleout")){
        if(d.isDouble){
          hasIn = true;
          delta += d.value;
        }
        continue;
      }

      delta += d.value;
    }

    const tentative = startScore - delta;
    const needsDoubleOut = (opt === "doubleout" || opt === "doublein_doubleout");

    let bust = false;
    let win = false;

    if(tentative < 0) bust = true;
    if(needsDoubleOut && tentative === 1) bust = true;

    if(!bust){
      if(tentative === 0){
        if(needsDoubleOut){
          const last = [...darts].reverse().find(d => d.kind === "score" && d.value > 0);
          if(last && last.isDouble) win = true;
          else bust = true;
        } else {
          win = true;
        }
      }
    }

    const result = {
      kind: "501",
      playerId,
      startScore,
      endScore: bust ? startScore : tentative,
      delta: bust ? 0 : (startScore - tentative),
      bust,
      win,
      hasInStart: startHasIn,
      hasInEnd: bust ? startHasIn : hasIn
    };

    p.score = result.endScore;
    p.hasIn = result.hasInEnd;
    p.lastTurn = { darts: darts.map(d => d.raw), ...result };

    if(win){
      state.winnerId = p.id;
      state.finishedAt = nowISO();
    }

    return result;
  }

  // Cricket helpers
  function dartToCricketHit(d){
    if(d.kind !== "score") return null;

    if(d.raw === "25") return { target:"BULL", marks:1 };
    if(d.raw === "BULL" || d.raw === "DBULL") return { target:"BULL", marks:2 };

    if(typeof d.base === "number"){
      if(d.base >= 15 && d.base <= 20){
        return { target:String(d.base), marks: d.mult };
      }
      return null;
    }

    if(/^\d+$/.test(d.raw)){
      const v = parseInt(d.raw,10);
      if(v >= 15 && v <= 20) return { target:String(v), marks:1 };
    }

    return null;
  }

  function allOppClosed(state, playerId, target){
    return state.players
      .filter(x => x.id !== playerId)
      .every(x => (x.marks[target] || 0) >= 3);
  }

  function applyCricketTurn(state, playerId, darts){
    const p = state.players.find(x => x.id === playerId);
    const before = {
      points: p.points,
      marks: structuredClone(p.marks)
    };

    let gained = 0;
    const actions = [];

    for(const d of darts){
      if(d.kind === "invalid") continue;
      const hit = dartToCricketHit(d);
      if(!hit) continue;

      let remainingMarks = hit.marks;
      const tgt = hit.target;

      while(remainingMarks > 0){
        const pm = p.marks[tgt] || 0;

        if(pm < 3){
          p.marks[tgt] = pm + 1;
          actions.push({ target:tgt, type:"mark" });
        } else {
          if(!allOppClosed(state, playerId, tgt)){
            const val = (tgt === "BULL") ? 25 : parseInt(tgt,10);
            p.points += val;
            gained += val;
            actions.push({ target:tgt, type:"score", value: val });
          } else {
            actions.push({ target:tgt, type:"dead" });
          }
        }

        remainingMarks--;
      }
    }

    const targets = state.targets;
    const allClosed = targets.every(t => (p.marks[t] || 0) >= 3);
    const maxPoints = Math.max(...state.players.map(x => x.points));
    const win = allClosed && (p.points === maxPoints);

    const result = {
      kind:"cricket",
      playerId,
      gained,
      actions,
      before,
      after: { points: p.points, marks: structuredClone(p.marks) },
      win
    };

    p.lastTurn = { darts: darts.map(d => d.raw), ...result };

    if(win){
      state.winnerId = p.id;
      state.finishedAt = nowISO();
    }

    return result;
  }

  // TicTacToe Dart Variante apply:
  // Single=1, Double=2, Triple=3, 25=1 auf Bull, BULL/50=2 auf Bull
  // ab 4 Marks -> Feld gehört dir
  // 3 in Reihe (ownerId) -> win
  function applyTicTacToeTurn(state, playerId, darts){
    const before = structuredClone(state.board);
    const hits = [];
    const claimed = [];

    const addMarks = (cell, add) => {
      if(cell.ownerId) return; // bereits geclaimed -> dead
      const cur = clamp((cell.marks[playerId] || 0) + add, 0, 4);
      cell.marks[playerId] = cur;

      if(cur >= 4){
        cell.ownerId = playerId;
        claimed.push(cell.idx);
      }
    };

    for(const d of darts){
      if(d.kind !== "score") continue;

      let targetValue = null; // number oder "BULL"
      let marksAdd = 0;

      if(d.raw === "25"){
        targetValue = "BULL";
        marksAdd = 1;
      } else if(d.raw === "BULL" || d.raw === "DBULL"){
        targetValue = "BULL";
        marksAdd = 2;
      } else {
        if(typeof d.base === "number"){
          targetValue = d.base;
          marksAdd = d.mult; // S=1 D=2 T=3
        } else if(/^\d+$/.test(d.raw)){
          targetValue = parseInt(d.raw, 10);
          marksAdd = 1;
        }
      }

      if(targetValue === null || marksAdd <= 0) continue;

      const cell = state.board.find(c => c.value === targetValue);
      if(!cell) continue; // Zahl ist nicht am Board

      addMarks(cell, marksAdd);
      hits.push({ value: targetValue, add: marksAdd, cell: cell.idx });
    }

    const winLine = getTicTacToeWinner(state.board, playerId);
    const fullClaimed = state.board.every(c => !!c.ownerId);

    const win = !!winLine;
    const draw = !win && fullClaimed;

    if(win){
      state.winnerId = playerId;
      state.finishedAt = nowISO();
    } else if(draw){
      state.winnerId = "DRAW";
      state.finishedAt = nowISO();
    }

    return {
      kind:"tictactoe",
      playerId,
      hits,
      claimed,
      win,
      draw,
      winLine,
      before
    };
  }

  function getTicTacToeWinner(board, playerId){
    const b = board.map(c => c.ownerId);
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    for(const L of lines){
      if(L.every(i => b[i] === playerId)) return L.map(i => i+1);
    }
    return null;
  }

  /* ───────────────────────── Undo Support ───────────────────────── */
  function pushLog(state, snapshot){
    state.log.push(snapshot);
  }
  function undo(state){
    const last = state.log.pop();
    if(!last) return false;
    Object.assign(state, last);
    return true;
  }
  function snapshotState(state){
    return structuredClone(state);
  }

  /* ───────────────────────── Rendering ───────────────────────── */
  const ui = {
    gameType: $("#gameType"),
    opt501Wrap: $("#opt501Wrap"),
    opt501: $("#opt501"),
    playerName: $("#playerName"),
    addPlayer: $("#addPlayer"),
    playerList: $("#playerList"),
    startGame: $("#startGame"),
    openHistory: $("#openHistory"),
    exportHistory: $("#exportHistory"),
    importHistory: $("#importHistory"),
    importFile: $("#importFile"),

    liveKicker: $("#liveKicker"),
    liveTitle: $("#liveTitle"),
    liveHint: $("#liveHint"),
    liveArea: $("#liveArea"),
    enterThrows: $("#enterThrows"),
    undo: $("#undo"),
    endGame: $("#endGame"),

    scoreModal: $("#scoreModal"),
    closeScoreModal: $("#closeScoreModal"),
    currentPlayerName: $("#currentPlayerName"),
    currentPlayerInfo: $("#currentPlayerInfo"),
    quickChips: $("#quickChips"),
    dartInputs: $$(".dartInput"),
    modalHelp: $("#modalHelp"),
    scorePreview: $("#scorePreview"),
    clearDarts: $("#clearDarts"),
    applyDarts: $("#applyDarts"),

    endModal: $("#endModal"),
    endMeta: $("#endMeta"),
    endBody: $("#endBody"),
    closeEndModal: $("#closeEndModal"),
    okEnd: $("#okEnd"),
    printEnd: $("#printEnd"),

    historyModal: $("#historyModal"),
    historyBody: $("#historyBody"),
    closeHistory: $("#closeHistory"),
    closeHistory2: $("#closeHistory2"),
    clearHistory: $("#clearHistory"),
    printHistory: $("#printHistory"),

    printArea: $("#shb-print-area"),
  };

  let setupPlayers = [];
  let active = loadActive();

  function escapeHtml(s){
    return String(s).replace(/[&<>"']/g, m => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
    }[m]));
  }

  function typeLabel(type){
    if(type === "501") return "501";
    if(type === "cricket") return "Cricket";
    return "TicTacToe";
  }

  function getTurnPlayer(state){
    if(state.gameType === "tictactoe"){
      return state.players[state.turnIndex % 2];
    }
    return state.players[state.turnIndex % state.players.length];
  }

  function nextTurn(state){
    state.turnIndex = (state.turnIndex + 1);
  }

  function renderSetupPlayers(){
    ui.playerList.innerHTML = "";

    setupPlayers.forEach((name, idx) => {
      const row = document.createElement("div");
      row.className = "shb-player";
      row.innerHTML = `
        <div>
          <div class="name">${escapeHtml(name)}</div>
          <div class="meta">Position ${idx+1}</div>
        </div>
        <div class="right">
          <button class="shb-btn" data-act="up" data-idx="${idx}">↑</button>
          <button class="shb-btn" data-act="down" data-idx="${idx}">↓</button>
          <button class="shb-btn danger" data-act="del" data-idx="${idx}">🗑</button>
        </div>
      `;
      ui.playerList.appendChild(row);
    });

    $$(".shb-player button", ui.playerList).forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.idx, 10);
        const act = btn.dataset.act;
        if(act === "del") setupPlayers.splice(idx, 1);
        if(act === "up" && idx > 0){
          [setupPlayers[idx-1], setupPlayers[idx]] = [setupPlayers[idx], setupPlayers[idx-1]];
        }
        if(act === "down" && idx < setupPlayers.length - 1){
          [setupPlayers[idx+1], setupPlayers[idx]] = [setupPlayers[idx], setupPlayers[idx+1]];
        }
        enforceTicTacToeLimit();
        renderSetupPlayers();
      });
    });
  }

  function enforceTicTacToeLimit(){
    if(ui.gameType.value === "tictactoe" && setupPlayers.length > 2){
      setupPlayers = setupPlayers.slice(0,2);
    }
  }

  function renderLive(){
    const state = active;
    if(!state){
      ui.liveKicker.textContent = "Bereit.";
      ui.liveTitle.textContent = "Noch kein Spiel aktiv";
      ui.liveHint.textContent = "Starte ein Spiel – dann kommt hier die Live-Übersicht.";
      ui.enterThrows.disabled = true;
      ui.undo.disabled = true;
      ui.endGame.disabled = true;
      ui.liveArea.innerHTML = "";
      return;
    }

    const type = state.gameType;
    const turnPlayer = getTurnPlayer(state);

    ui.liveKicker.textContent = `Aktiv seit ${fmtDate(state.createdAt)}`;
    ui.liveTitle.textContent = `${typeLabel(type)} – ${turnPlayer.name} ist dran`;
    ui.liveHint.textContent = (state.finishedAt)
      ? `Beendet am ${fmtDate(state.finishedAt)}`
      : `Zug: ${turnPlayer.name} • Klick auf “Treffer eingeben”`;

    ui.enterThrows.disabled = !!state.finishedAt;
    ui.undo.disabled = state.log.length === 0;
    ui.endGame.disabled = false;

    if(type === "501"){
      ui.liveArea.innerHTML = render501Table(state);
    } else if(type === "cricket"){
      ui.liveArea.innerHTML = renderCricketTable(state);
    } else {
      ui.liveArea.innerHTML = renderTicTacToe(state);
    }
  }

  function render501Table(state){
    const turnId = getTurnPlayer(state).id;
    const opt = state.opt501;
    const optText = (opt === "normal") ? "Normal"
      : (opt === "doublein") ? "Double In"
      : (opt === "doubleout") ? "Double Out"
      : "Double In + Double Out";

    const rows = state.players.map(p => {
      const tag = (p.id === state.winnerId) ? `<span class="pill win">🏆 Win</span>`
        : (p.id === turnId && !state.finishedAt) ? `<span class="pill turn">Am Zug</span>`
        : ``;

      const inText = (opt.includes("doublein") ? (p.hasIn ? "IN ✅" : "noch nicht IN") : "IN (frei)");
      const last = p.lastTurn?.darts ? p.lastTurn.darts.join(", ") : "–";
      const bust = p.lastTurn?.bust ? ` <span class="pill bad">BUST</span>` : "";

      return `
        <tr>
          <td><strong>${escapeHtml(p.name)}</strong> ${tag}</td>
          <td><span class="pill">${p.score}</span></td>
          <td>${escapeHtml(inText)}${bust}</td>
          <td>${escapeHtml(last)}</td>
        </tr>
      `;
    }).join("");

    return `
      <div class="shb-hint" style="margin-bottom:.6rem;">
        Modus: <span class="pill">${optText}</span> • Start: 501
      </div>
      <table class="shb-table">
        <thead>
          <tr>
            <th>Spieler</th>
            <th>Rest</th>
            <th>Status</th>
            <th>Letzter Zug</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  }

  function renderCricketTable(state){
    const turnId = getTurnPlayer(state).id;
    const t = state.targets;

    const head = `
      <tr>
        <th>Spieler</th>
        <th>Punkte</th>
        ${t.map(x => `<th>${x}</th>`).join("")}
        <th>Letzter Zug</th>
        <th>Checkout</th>
      </tr>
    `;

    const rows = state.players.map(p => {
      const tag = (p.id === state.winnerId) ? `<span class="pill win">🏆 Win</span>`
        : (p.id === turnId && !state.finishedAt) ? `<span class="pill turn">Am Zug</span>`
        : ``;

      const marks = t.map(x => {
        const m = p.marks[x] || 0;
        const sym = m >= 3 ? "✔✔✔" : (m === 2 ? "✔✔" : (m === 1 ? "✔" : "–"));
        return `<td><span class="pill">${sym}${m>3 ? " +" + (m-3) : ""}</span></td>`;
      }).join("");

      const last = p.lastTurn?.darts ? p.lastTurn.darts.join(", ") : "–";
        
      const needsDoubleOut = (opt === "doubleout" || opt === "doublein_doubleout");
      const canSuggest = p.hasIn; // wenn Double-In aktiv, erst nach IN sinnvoll
      const co = (canSuggest && !state.finishedAt)
        ? getCheckoutSuggestion501(p.score, { requiresDoubleOut: needsDoubleOut })
        : null;
    
      const coText = !canSuggest && opt.includes("doublein")
        ? "Double-In nötig"
        : (co || "–");
      return `
        <tr>
          <td><strong>${escapeHtml(p.name)}</strong> ${tag}</td>
          <td><span class="pill">${p.points}</span></td>
          ${marks}
          <td>${escapeHtml(last)}</td>
          <td>${escapeHtml(coText)}</td>
        </tr>
      `;
    }).join("");

    return `
      <div class="shb-hint" style="margin-bottom:.6rem;">
        Cricket: Targets <span class="pill">20–15</span> + <span class="pill">BULL</span>.
        Punkte wenn du “closed” bist und Gegner nicht.
      </div>
      <table class="shb-table">
        <thead>${head}</thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  }

  function renderTicTacToe(state){
    const turnP = getTurnPlayer(state);
    const p1 = state.players[0], p2 = state.players[1];

    const winner = state.winnerId && state.winnerId !== "DRAW"
      ? state.players.find(p => p.id === state.winnerId)?.name
      : null;

    const boardText = state.board
      .map(c => (c.idx === 5 ? "BULL" : c.value))
      .reduce((acc, v, i) => {
        const row = Math.floor(i/3);
        acc[row] = acc[row] || [];
        acc[row].push(v);
        return acc;
      }, [])
      .map(r => r.join("  "))
      .join("\n");

    const legend = `
      <div class="shb-row" style="margin-bottom:.7rem;">
        <div><span class="pill accent">${escapeHtml(p1.name)} = ❌</span></div>
        <div><span class="pill">${escapeHtml(p2.name)} = ⭕</span></div>
        <div style="text-align:right; color: var(--shb-muted);">
          ${state.finishedAt
            ? (winner ? `🏆 Gewinner: <strong>${escapeHtml(winner)}</strong>` : `🤝 Unentschieden`)
            : `Am Zug: <strong>${escapeHtml(turnP.name)}</strong>`}
        </div>
      </div>
      <div class="shb-hint" style="white-space:pre; margin-top:-.2rem; margin-bottom:.6rem;">
${escapeHtml(boardText)}
      </div>
    `;

    const symFor = (playerId) => (playerId === p1.id ? "❌" : "⭕");

    const grid = state.board.map((c) => {
      const owner = c.ownerId;
      const big = owner ? symFor(owner) : (c.value === "BULL" ? "BULL" : String(c.value));

      const m1 = clamp(c.marks[p1.id] || 0, 0, 4);
      const m2 = clamp(c.marks[p2.id] || 0, 0, 4);

      const isWinCell = (state.finishedAt && state.winnerId && state.winnerId !== "DRAW")
        ? (getTicTacToeWinner(state.board, state.winnerId) || []).includes(c.idx)
        : false;

      return `
        <button class="shb-ttt-cell ${owner ? "owned" : ""} ${isWinCell ? "win" : ""}" disabled>
          <div class="marks top">${"❌".repeat(m1)}</div>
          <div class="big">${escapeHtml(big)}</div>
          <div class="marks bottom">${"⭕".repeat(m2)}</div>
        </button>
      `;
    }).join("");

    return `
      ${legend}
      <style>
        .shb-ttt{
          display:grid;
          grid-template-columns: repeat(3, 1fr);
          gap:.55rem;
          max-width: 460px;
        }
        .shb-ttt-cell{
          position: relative;
          border:1px solid var(--shb-border);
          background: rgba(255,255,255,.03);
          border-radius: 14px;
          padding: .55rem .5rem;
          min-height: 92px;
          box-shadow: 0 10px 20px rgba(0,0,0,.18);
          color: rgba(255,255,255,.92);
        }
        .shb-ttt-cell.owned{ background: rgba(255,255,255,.06); }
        .shb-ttt-cell.win{
          border-color: rgba(93,255,176,.55);
          box-shadow: 0 0 0 3px rgba(93,255,176,.18);
        }
        .shb-ttt-cell .marks{
          font-weight: 1000;
          letter-spacing: .04em;
          font-size: .95rem;
          line-height: 1.1;
          opacity: .95;
          min-height: 1.1em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: clip;
        }
        .shb-ttt-cell .marks.top{ color: rgba(255,92,122,.95); }
        .shb-ttt-cell .marks.bottom{ color: rgba(255,255,255,.90); }
        .shb-ttt-cell .big{
          display:flex;
          align-items:center;
          justify-content:center;
          font-size: 1.55rem;
          font-weight: 1100;
          height: 44px;
        }
      </style>

      <div class="shb-ttt">${grid}</div>

      <div class="shb-hint" style="margin-top:.8rem;">
        TicTacToe (Dart): Single=1 Mark, Double=2, Triple=3. <strong>25=1 Mark Bull</strong>, <strong>BULL=2 Marks Bull</strong>.
        <br><strong>4 Marks</strong> → Feld gehört dir. <strong>3 Felder in Reihe</strong> → Win.
      </div>
    `;
  }

  /* ───────────────────────── Modals ───────────────────────── */
  function openModal(el){
    el.classList.add("active");
    el.setAttribute("aria-hidden","false");
  }
  function closeModal(el){
    el.classList.remove("active");
    el.setAttribute("aria-hidden","true");
  }

  /* ───────────────────────── Scoring Modal Logic ───────────────────────── */
  function buildQuickChipsForState(state){
    ui.quickChips.innerHTML = "";

    const addChip = (label, val, accent=false) => {
      const b = document.createElement("button");
      b.className = "shb-chip" + (accent ? " accent" : "");
      b.textContent = label;
      b.addEventListener("click", () => pushTokenToFirstEmpty(val));
      ui.quickChips.appendChild(b);
    };

    const type = state.gameType;

    if(type === "tictactoe"){
      // TicTacToe: show the actual random board values
      addChip("MISS", "0");
      addChip("25", "25");
      addChip("BULL", "BULL", true);

      // Multipliers are useful
      addChip("S", "S", true);
      addChip("D", "D", true);
      addChip("T", "T", true);

      const nums = state.board
        .filter(c => c.value !== "BULL")
        .map(c => c.value);

      nums.forEach(n => addChip(String(n), String(n), n === 20 || n === 19));
      return;
    }

    // Common chips for 501/Cricket
    addChip("MISS", "0");
    addChip("BULL", "BULL", true);
    addChip("25", "25");

    addChip("S", "S", true);
    addChip("D", "D", true);
    addChip("T", "T", true);

    [20,19,18,17,16,15,14,13,12,11,10].forEach(n => addChip(String(n), String(n)));
  }

  function pushTokenToFirstEmpty(token){
    const inputs = ui.dartInputs;
    for(const inp of inputs){
      if(!inp.value.trim()){
        inp.value = token;
        previewModal();
        return;
      }
    }
    inputs[inputs.length-1].value = inputs[inputs.length-1].value + " " + token;
    previewModal();
  }

  function normalizeInputsForSdt(){
    // 1) innerhalb eines Feldes "S 5" -> "S5"
    ui.dartInputs.forEach(inp => {
      const v = inp.value.trim();
      inp.value = v.replace(/^([SDT])\s+(\d{1,2})$/i, "$1$2");
    });

    // 2) über zwei Felder "S" + "5" -> "S5"
    const vals = ui.dartInputs.map(i => i.value.trim());
    for(let i=0;i<vals.length-1;i++){
      const a = ui.dartInputs[i].value.trim().toUpperCase();
      const b = ui.dartInputs[i+1].value.trim().toUpperCase();

      if((a==="S" || a==="D" || a==="T") && /^\d{1,2}$/.test(b)){
        ui.dartInputs[i].value = a + b;   // S5
        ui.dartInputs[i+1].value = "";   // nächstes Feld leeren
      }
    }
  }

  function openScoreModal(){
    if(!active || active.finishedAt) return;

    const p = getTurnPlayer(active);
    ui.currentPlayerName.textContent = p.name;

    if(active.gameType === "501"){
      const opt = active.opt501;
      const needsIn = (opt === "doublein" || opt === "doublein_doubleout");
      const needsOut = (opt === "doubleout" || opt === "doublein_doubleout");
      ui.currentPlayerInfo.textContent =
        `Rest: ${p.score} • ${needsIn ? (p.hasIn ? "IN ✅" : "Double In nötig") : "IN frei"} • ${needsOut ? "Double Out nötig" : "Out frei"}`;

      ui.modalHelp.textContent = `Beispiele: T20, D16, 20, 0, 25, BULL. Double In/Out wird automatisch geprüft.`;
    }
    else if(active.gameType === "cricket"){
      ui.currentPlayerInfo.textContent =
        `Punkte: ${p.points} • Targets: 20–15 + BULL • Treffer: S/D/T + Zahl oder 25/BULL`;

      ui.modalHelp.textContent =
        `Cricket: S20=1 Mark, D20=2, T20=3. BULL zählt als 2 Marks (25 zählt als 1).`;
    }
    else{
      // TicTacToe Dart Variante
      const board = active.board
        .map(c => (c.idx === 5 ? "BULL" : c.value))
        .reduce((acc, v, i) => {
          const row = Math.floor(i/3);
          acc[row] = acc[row] || [];
          acc[row].push(v);
          return acc;
        }, [])
        .map(r => r.join("  "))
        .join(" | ");

      ui.currentPlayerInfo.textContent =
        `Board: ${board} • 4 Marks → Feld gehört dir • 3 in Reihe → Win`;

      ui.modalHelp.textContent =
        `TicTacToe: Wirf auf eine Board-Zahl. Single=1, Double=2, Triple=3 Marks. 25=1 Bull, BULL=2 Bull.`;
    }

    buildQuickChipsForState(active);
    ui.dartInputs.forEach(i => i.value = "");
    ui.scorePreview.textContent = "–";
    openModal(ui.scoreModal);
    ui.dartInputs[0].focus();
  }

  function previewModal(){
    if(!active) return;
    normalizeInputsForSdt();

    const inputs = ui.dartInputs.map(i => i.value);
    const { darts, invalid } = parseThreeDarts(inputs);

    if(invalid.length){
      ui.scorePreview.innerHTML = `<span class="pill bad">Ungültig: ${invalid.map(x=>escapeHtml(x.raw)).join(", ")}</span>`;
      return;
    }

    if(active.gameType === "501"){
      const sim = structuredClone(active);
      const simP = getTurnPlayer(sim);
      const res = apply501Turn(sim, simP.id, darts);
      const txt = res.bust
        ? `BUST → bleibt bei ${res.startScore}`
        : (res.win ? `Finish! ${res.startScore} → 0 🏆` : `${res.startScore} → ${res.endScore} (−${res.delta})`);
      ui.scorePreview.innerHTML = `<span class="pill">${escapeHtml(txt)}</span>`;
      return;
    }

    if(active.gameType === "cricket"){
      const sim = structuredClone(active);
      const p = getTurnPlayer(sim);
      const res = applyCricketTurn(sim, p.id, darts);
      const txt = `Aktionen: ${res.actions.length ? res.actions.map(a => a.type==="score" ? `+${a.value}` : `${a.target}:${a.type}`).join(" • ") : "–"} | Punkte +${res.gained}`;
      ui.scorePreview.innerHTML = `<span class="pill">${escapeHtml(txt)}</span>`;
      return;
    }

    // TicTacToe
    const sim = structuredClone(active);
    const p = getTurnPlayer(sim);
    const res = applyTicTacToeTurn(sim, p.id, darts);
    const txt = res.win ? `Gewinnlinie: ${res.winLine.join("-")} 🏆`
      : res.draw ? `Unentschieden 🤝`
      : `Treffer: ${res.hits.length ? res.hits.map(h => `${h.value} (+${h.add})`).join(", ") : "–"} | Geclaimed: ${res.claimed.length ? res.claimed.join(", ") : "–"}`;
    ui.scorePreview.innerHTML = `<span class="pill">${escapeHtml(txt)}</span>`;
  }

  function applyModal(){
    if(!active || active.finishedAt) return;
    normalizeInputsForSdt();

    const inputs = ui.dartInputs.map(i => i.value);
    const { darts, invalid } = parseThreeDarts(inputs);

    if(invalid.length){
      ui.scorePreview.innerHTML = `<span class="pill bad">Bitte korrigieren: ${invalid.map(x=>escapeHtml(x.raw)).join(", ")}</span>`;
      return;
    }

    pushLog(active, snapshotState(active));

    const p = getTurnPlayer(active);
    if(active.gameType === "501"){
      apply501Turn(active, p.id, darts);
    } else if(active.gameType === "cricket"){
      applyCricketTurn(active, p.id, darts);
    } else {
      applyTicTacToeTurn(active, p.id, darts);
    }

    if(!active.finishedAt){
      nextTurn(active);
    }

    saveActive(active);
    closeModal(ui.scoreModal);
    renderLive();

    if(active.finishedAt){
      showEndModal(active);
    }
  }

  /* ───────────────────────── End + History ───────────────────────── */
  function computeFinalStandings(state){
    if(state.gameType === "501"){
      const list = [...state.players].sort((a,b) => {
        if(a.id === state.winnerId) return -1;
        if(b.id === state.winnerId) return 1;
        return a.score - b.score;
      });
      return list.map((p, i) => ({
        rank: i+1,
        name: p.name,
        value: (p.id === state.winnerId) ? "Win" : `Rest: ${p.score}`
      }));
    }

    if(state.gameType === "cricket"){
      const list = [...state.players].sort((a,b) => {
        if(a.id === state.winnerId) return -1;
        if(b.id === state.winnerId) return 1;
        return b.points - a.points;
      });
      return list.map((p,i) => ({
        rank: i+1,
        name: p.name,
        value: `Punkte: ${p.points}`
      }));
    }

    // TicTacToe
    if(state.winnerId === "DRAW"){
      return state.players.map((p,i) => ({ rank: i+1, name:p.name, value:"Draw" }));
    }
    const winner = state.players.find(p => p.id === state.winnerId);
    const loser = state.players.find(p => p.id !== state.winnerId);
    return [
      { rank: 1, name: winner?.name || "–", value: "Win" },
      { rank: 2, name: loser?.name || "–", value: "–" }
    ];
  }

  function finalizeGame(state){
    if(!state.finishedAt){
      state.finishedAt = nowISO();
    }

    const hist = loadHistory();
    const entry = {
      id: uid(),
      createdAt: state.createdAt,
      finishedAt: state.finishedAt,
      gameType: state.gameType,
      opt501: state.opt501 || null,
      players: state.players.map(p => p.name),
      winner:
        (state.winnerId === "DRAW") ? "Unentschieden"
        : state.winnerId ? (state.players.find(p => p.id === state.winnerId)?.name || null) : null,
      standings: computeFinalStandings(state),
      raw: state
    };
    hist.unshift(entry);
    saveHistory(hist);
    clearActive();
    active = null;
    renderLive();

    showEndModal(entry.raw);
  }

  function showEndModal(state){
    const meta = `${typeLabel(state.gameType)} • Start: ${fmtDate(state.createdAt)} • Ende: ${fmtDate(state.finishedAt)}`;
    ui.endMeta.textContent = meta;

    const standings = computeFinalStandings(state);

    const rows = standings.map(s => {
      const medal = (s.rank === 1) ? "🥇" : (s.rank === 2) ? "🥈" : (s.rank === 3) ? "🥉" : "•";
      return `<tr><td>${medal} #${s.rank}</td><td><strong>${escapeHtml(s.name)}</strong></td><td>${escapeHtml(s.value)}</td></tr>`;
    }).join("");

    ui.endBody.innerHTML = `
      <div class="shb-card">
        <h3>Endstand</h3>
        <table class="shb-table">
          <thead><tr><th>Platz</th><th>Spieler</th><th>Wert</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;
    openModal(ui.endModal);
  }

  function renderHistory(){
    const hist = loadHistory();
    if(hist.length === 0){
      ui.historyBody.innerHTML = `<div class="shb-hint">Noch keine Spiele gespeichert.</div>`;
      return;
    }

    const rows = hist.map(h => {
      const title = `${typeLabel(h.gameType)}${h.opt501 ? " • " + h.opt501 : ""}`;
      const players = h.players.join(", ");
      const winner = h.winner ? h.winner : "–";
      return `
        <tr>
          <td><strong>${escapeHtml(title)}</strong><div class="shb-hint">${fmtDate(h.finishedAt)}</div></td>
          <td>${escapeHtml(players)}</td>
          <td><span class="pill">${escapeHtml(winner)}</span></td>
          <td style="text-align:right;">
            <button class="shb-btn" data-act="detail" data-id="${h.id}">Details</button>
          </td>
        </tr>
      `;
    }).join("");

    ui.historyBody.innerHTML = `
      <table class="shb-table">
        <thead>
          <tr><th>Spiel</th><th>Spieler</th><th>Winner</th><th></th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <div class="shb-hint" style="margin-top:.75rem;">
        Export/Import ist perfekt für Tablet/Handy/anderen Browser.
      </div>
    `;

    $$("button[data-act='detail']", ui.historyBody).forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const entry = loadHistory().find(x => x.id === id);
        if(!entry) return;

        const det = document.createElement("div");
        det.className = "shb-card";
        det.style.marginTop = ".85rem";
        det.innerHTML = `
          <h3>Details</h3>
          <div class="shb-hint">Spiel: <span class="pill">${escapeHtml(typeLabel(entry.gameType))}</span>
            ${entry.opt501 ? ` <span class="pill">${escapeHtml(entry.opt501)}</span>` : ""}
          </div>
          <div class="shb-hint">Von ${fmtDate(entry.createdAt)} bis ${fmtDate(entry.finishedAt)}</div>
          <div class="shb-hint">Spieler: ${escapeHtml(entry.players.join(", "))}</div>
          <div class="shb-hint">Winner: <strong>${escapeHtml(entry.winner || "–")}</strong></div>
          <div style="margin-top:.7rem;">
            <button class="shb-btn" data-act="printOne">🖨 Drucken (dieses Spiel)</button>
          </div>
        `;
        $$(".shb-card", ui.historyBody).forEach(x => x.remove());
        ui.historyBody.appendChild(det);

        $("button[data-act='printOne']", det).addEventListener("click", () => {
          setPrintAreaForHistoryEntry(entry);
          window.print();
        });
      });
    });
  }

  function setPrintAreaForGameState(state){
    const standings = computeFinalStandings(state);
    const title = `${typeLabel(state.gameType)}${state.opt501 ? " • " + state.opt501 : ""}`;

    const rows = standings.map(s => `<tr><td>#${s.rank}</td><td>${escapeHtml(s.name)}</td><td>${escapeHtml(s.value)}</td></tr>`).join("");

    ui.printArea.style.display = "block";
    ui.printArea.innerHTML = `
      <h2>Dart Scoreboard – ${escapeHtml(title)}</h2>
      <p>Start: ${fmtDate(state.createdAt)}<br>Ende: ${fmtDate(state.finishedAt)}</p>
      <h3>Endstand</h3>
      <table>
        <thead><tr><th>Platz</th><th>Spieler</th><th>Wert</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  }

  function setPrintAreaForHistoryEntry(entry){
    setPrintAreaForGameState(entry.raw);
  }

  function setPrintAreaForHistoryList(){
    const hist = loadHistory();
    const rows = hist.map(h => {
      const title = `${typeLabel(h.gameType)}${h.opt501 ? " • " + h.opt501 : ""}`;
      return `<tr><td>${fmtDate(h.finishedAt)}</td><td>${escapeHtml(title)}</td><td>${escapeHtml(h.players.join(", "))}</td><td>${escapeHtml(h.winner || "–")}</td></tr>`;
    }).join("");

    ui.printArea.style.display = "block";
    ui.printArea.innerHTML = `
      <h2>Dart Scoreboard – Historie</h2>
      <p>Stand: ${new Date().toLocaleString("de-AT")}</p>
      <table>
        <thead><tr><th>Datum</th><th>Spiel</th><th>Spieler</th><th>Winner</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  }

  /* ───────────────────────── Wire UI ───────────────────────── */
  ui.gameType.addEventListener("change", () => {
    ui.opt501Wrap.style.display = (ui.gameType.value === "501") ? "" : "none";
    enforceTicTacToeLimit();
    renderSetupPlayers();
  });

  ui.addPlayer.addEventListener("click", () => {
    const name = ui.playerName.value.trim();
    if(!name) return;

    setupPlayers.push(name);
    ui.playerName.value = "";
    enforceTicTacToeLimit();
    renderSetupPlayers();
    ui.playerName.focus();
  });

  ui.playerName.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
      e.preventDefault();
      ui.addPlayer.click();
    }
  });

  ui.startGame.addEventListener("click", () => {
    const type = ui.gameType.value;

    if(type === "tictactoe" && setupPlayers.length !== 2){
      alert("TicTacToe benötigt genau 2 Spieler.");
      return;
    }
    if(type !== "tictactoe" && setupPlayers.length < 2){
      alert("Bitte mindestens 2 Spieler hinzufügen.");
      return;
    }

    if(type === "501"){
      active = build501(setupPlayers, ui.opt501.value);
    } else if(type === "cricket"){
      active = buildCricket(setupPlayers);
    } else {
      active = buildTicTacToe(setupPlayers.slice(0,2));
    }

    saveActive(active);
    renderLive();
  });

  ui.enterThrows.addEventListener("click", openScoreModal);

  ui.undo.addEventListener("click", () => {
    if(!active) return;
    const ok = undo(active);
    if(ok){
      saveActive(active);
      renderLive();
    }
  });

  ui.endGame.addEventListener("click", () => {
    if(!active) return;
    active.finishedAt = nowISO();
    finalizeGame(active);
  });

  ui.closeScoreModal.addEventListener("click", () => closeModal(ui.scoreModal));
  ui.clearDarts.addEventListener("click", () => {
    ui.dartInputs.forEach(i => i.value = "");
    ui.scorePreview.textContent = "–";
    ui.dartInputs[0].focus();
  });
  ui.applyDarts.addEventListener("click", applyModal);
  ui.dartInputs.forEach(inp => inp.addEventListener("input", previewModal));

  ui.closeEndModal.addEventListener("click", () => closeModal(ui.endModal));
  ui.okEnd.addEventListener("click", () => closeModal(ui.endModal));
  ui.printEnd.addEventListener("click", () => {
    const hist = loadHistory();
    const entry = hist[0];
    if(entry?.raw){
      setPrintAreaForGameState(entry.raw);
      window.print();
    }
  });

  ui.openHistory.addEventListener("click", () => {
    renderHistory();
    openModal(ui.historyModal);
  });
  ui.closeHistory.addEventListener("click", () => closeModal(ui.historyModal));
  ui.closeHistory2.addEventListener("click", () => closeModal(ui.historyModal));

  ui.printHistory.addEventListener("click", () => {
    setPrintAreaForHistoryList();
    window.print();
  });

  ui.clearHistory.addEventListener("click", () => {
    if(!confirm("Wirklich die gesamte Historie löschen?")) return;
    saveHistory([]);
    renderHistory();
  });

  ui.exportHistory.addEventListener("click", () => {
    const hist = loadHistory();
    const blob = new Blob([JSON.stringify(hist, null, 2)], { type:"application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `darts_history_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  });

  ui.importHistory.addEventListener("click", () => ui.importFile.click());
  ui.importFile.addEventListener("change", async () => {
    const f = ui.importFile.files?.[0];
    if(!f) return;
    try{
      const txt = await f.text();
      const data = JSON.parse(txt);
      if(!Array.isArray(data)) throw new Error("Ungültiges Format");
      saveHistory(data);
      alert("Import erfolgreich ✅");
    } catch(e){
      alert("Import fehlgeschlagen: " + e.message);
    } finally {
      ui.importFile.value = "";
    }
  });

  /* ───────────────────────── Boot ───────────────────────── */
  function boot(){
    ui.opt501Wrap.style.display = (ui.gameType.value === "501") ? "" : "none";
    renderSetupPlayers();

    if(active){
      if(active.finishedAt){
        finalizeGame(active);
        active = null;
      } else {
        renderLive();
      }
    } else {
      renderLive();
    }
  }

  boot();
})();
</script>
