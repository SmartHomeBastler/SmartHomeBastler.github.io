---
title: Yazzee Tracker (Manuell)
subtitle: Mehrspieler-Scoreboard + 3 Modi + Bonus + Serviert + Hausregel-Chance
description: Punkte manuell eintragen (echte Würfel), Modi runter/rauf/durcheinander, Fixziele per Klick (Normal/Serviert/Streichen), Bonus ab 63, Treffer-Eingabe für 1–6, Chance als Fixziel.
show_sidebar: false
layout: page
---

<div class="shb-main-container yazzee-wrap">

  <h1 class="shb-main-title">Yazzee Tracker (manuell)</h1>
  <p class="shb-main-description">
    Gewürfelt wird am Tisch – hier wird nur eingetragen 🙂
    <br>
    Fixziele: <strong>Normal</strong> / <strong>Serviert</strong> / <strong>Streichen</strong>.
  </p>

  <!-- Setup -->
  <div class="y-card">
    <h2 class="y-h2">Spiel-Setup</h2>

    <div class="y-grid">
      <div class="y-field">
        <label class="y-label" for="playerInput">Spieler (mit Komma trennen)</label>
        <input id="playerInput" class="y-input" type="text" placeholder="Maxx, Moni, Mia">
        <div class="y-help">Du kannst jederzeit neu starten und Spieler ändern.</div>
      </div>

      <div class="y-field">
        <label class="y-label">Spielmodus</label>
        <div class="y-mode">
          <label class="y-radio"><input type="radio" name="mode" value="runter" checked> Mod1: runter</label>
          <label class="y-radio"><input type="radio" name="mode" value="rauf"> Mod2: rauf</label>
          <label class="y-radio"><input type="radio" name="mode" value="frei"> Mod3: durcheinander</label>
        </div>
      </div>

      <div class="y-field y-actions">
        <button class="y-btn y-btn-primary" id="btnStart">Spiel starten / neu starten</button>
        <button class="y-btn" id="btnResetAll" title="Alles löschen (inkl. Speicher)">Alles löschen</button>
      </div>
    </div>

    <div class="y-note" id="setupNote" style="display:none;"></div>
  </div>

  <!-- Turn controls -->
  <div class="y-card" id="turnArea" style="display:none;">
    <div class="y-topbar">
      <div class="y-turn">
        <div class="y-turn-title">Am Zug:</div>
        <div class="y-turn-player" id="activePlayerName">–</div>
        <div class="y-turn-sub" id="modeInfo">Modus: –</div>
      </div>

      <div class="y-controls">
        <button class="y-btn" id="btnPrev">◀ zurück</button>
        <button class="y-btn y-btn-primary" id="btnNext">Zug beenden ▶</button>
      </div>
    </div>

    <div class="y-hint">
      <strong>Eintragen:</strong> In der Tabelle beim aktiven Spieler auf eine Zeile klicken → auswählen/eingeben → speichern.
    </div>
  </div>

  <!-- Table -->
  <div class="y-card" id="tableArea" style="display:none;">
    <h2 class="y-h2">Punkte</h2>

    <div class="y-table-wrap">
      <table class="y-table" id="scoreTable"></table>
    </div>

    <div class="y-foot">
      <div class="y-foot-left">
        <span class="y-badge">Bonus</span> Wenn <strong>1–6</strong> zusammen <strong>≥ 63</strong>, dann <strong>+35 Punkte</strong>.
      </div>
      <div class="y-foot-right">
        <button class="y-btn" id="btnSave">Speichern</button>
      </div>
    </div>
  </div>

</div>

<!-- Modal -->
<div class="y-modal" id="scoreModal" style="display:none;">
  <div class="y-modal-backdrop" id="modalBackdrop"></div>

  <div class="y-modal-card">
    <div class="y-modal-title" id="modalTitle">–</div>
    <div class="y-modal-sub" id="modalSub">–</div>

    <!-- Upper (1–6): Treffer -->
    <div id="upperWrap" style="display:none;">
      <div class="y-field">
        <label class="y-label" for="upperHits">Anzahl Treffer (0–5)</label>
        <input id="upperHits" class="y-input" type="number" min="0" max="5" step="1" inputmode="numeric" value="0">
        <div class="y-help" id="upperCalcHint">–</div>
      </div>
      <div class="y-preview" id="upperPreview">0 Punkte</div>
    </div>

    <!-- Manual points -->
    <div id="manualWrap" style="display:none;">
      <div class="y-field">
        <label class="y-label" for="manualScore">Punkte</label>
        <input id="manualScore" class="y-input" type="number" min="0" step="1" inputmode="numeric" placeholder="z.B. 18">
        <div class="y-help">0 ist erlaubt (streichen).</div>
      </div>
    </div>

    <!-- Fixed: base / served / strike -->
    <div id="fixedWrap" style="display:none;">
      <div class="y-fixed-info" id="fixedInfo">–</div>
      <div class="y-fixed-actions">
        <button class="y-btn y-btn-primary" id="btnFixedBase">Normal</button>
        <button class="y-btn y-btn-primary" id="btnFixedServed">Serviert</button>
        <button class="y-btn" id="btnFixedStrike">Streichen (0P)</button>
      </div>
    </div>

    <!-- Chance special selector -->
    <div id="chanceWrap" style="display:none;">
      <div class="y-field">
        <label class="y-label" for="chanceSelect">Chance-Wertung</label>
        <select id="chanceSelect" class="y-input">
          <option value="chance_manual">Chance (manuell Punkte)</option>
          <option value="full">Full House (Fixziel)</option>
          <option value="small">Kleine Straße (Fixziel)</option>
          <option value="large">Große Straße (Fixziel)</option>
          <option value="yazzee">Yazzee (Fixziel)</option>
        </select>
        <div class="y-help">Hausregel: Chance darf auch als Fixziel verwendet werden.</div>
      </div>

      <div id="chanceManualInner" style="display:none; margin-top:10px;">
        <div class="y-field">
          <label class="y-label" for="chanceManualScore">Punkte</label>
          <input id="chanceManualScore" class="y-input" type="number" min="0" step="1" inputmode="numeric" placeholder="Summe aller Augen">
          <div class="y-help">0 ist erlaubt (streichen).</div>
        </div>
      </div>

      <div id="chanceFixedInner" style="display:none; margin-top:10px;">
        <div class="y-fixed-info" id="chanceFixedInfo">–</div>
        <div class="y-fixed-actions">
          <button class="y-btn y-btn-primary" id="btnChanceFixedBase">Normal</button>
          <button class="y-btn y-btn-primary" id="btnChanceFixedServed">Serviert</button>
          <button class="y-btn" id="btnChanceFixedStrike">Streichen (0P)</button>
        </div>
      </div>
    </div>

    <div class="y-modal-actions" id="modalActions">
      <button class="y-btn" id="btnCancel">Abbrechen</button>
      <button class="y-btn y-btn-primary" id="btnApply">Eintragen</button>
    </div>
  </div>
</div>

<style>
  .yazzee-wrap { margin-top: 1rem; }
  .y-card{
    background: rgba(0,0,0,0.25);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    padding: 16px;
    margin: 14px 0;
    backdrop-filter: blur(6px);
  }
  .y-h2{ margin: 0 0 12px 0; font-size: 1.2rem; letter-spacing: 0.2px; }
  .y-grid{ display:grid; grid-template-columns: 1.2fr 1fr auto; gap: 12px; align-items:end; }
  @media (max-width: 900px){ .y-grid{ grid-template-columns: 1fr; } }

  .y-field{ display:flex; flex-direction:column; gap:6px; }
  .y-label{ font-weight:700; font-size:0.95rem; opacity:0.95; }
  .y-help{ font-size:0.85rem; opacity:0.75; }

  .y-input{
    width:100%;
    padding:10px 12px;
    border-radius:10px;
    border:1px solid rgba(255,255,255,0.14);
    background: rgba(0,0,0,0.35);
    color:#fff;
    outline:none;
  }
  .y-input:focus{ border-color: rgba(255,255,255,0.28); box-shadow: 0 0 0 3px rgba(255,255,255,0.06); }
  select.y-input{ appearance: none; }

  .y-mode{ display:flex; flex-wrap:wrap; gap:10px; }
  .y-radio{
    display:flex; gap:8px; align-items:center;
    padding:8px 10px;
    border-radius:999px;
    border:1px solid rgba(255,255,255,0.10);
    background: rgba(0,0,0,0.25);
    cursor:pointer;
    user-select:none;
  }
  .y-radio input{ transform: translateY(1px); }

  .y-actions{ display:flex; gap:10px; justify-content:flex-end; }
  @media (max-width: 900px){ .y-actions{ justify-content:flex-start; } }

  .y-btn{
    border:1px solid rgba(255,255,255,0.14);
    background: rgba(0,0,0,0.35);
    color:#fff;
    border-radius:10px;
    padding:10px 12px;
    cursor:pointer;
    transition: transform .05s ease, border-color .15s ease, background .15s ease;
    white-space:nowrap;
  }
  .y-btn:hover{ border-color: rgba(255,255,255,0.30); background: rgba(255,255,255,0.06); }
  .y-btn:active{ transform: scale(0.98); }
  .y-btn-primary{ border-color: rgba(255,255,255,0.28); background: rgba(255,255,255,0.08); font-weight:800; }

  .y-note{
    margin-top:10px;
    padding:10px 12px;
    border-radius:10px;
    background: rgba(255,255,255,0.06);
    border:1px solid rgba(255,255,255,0.10);
  }

  .y-topbar{ display:flex; justify-content:space-between; align-items:center; gap:14px; flex-wrap:wrap; }
  .y-turn{ display:flex; flex-direction:column; gap:2px; }
  .y-turn-title{ font-size:0.9rem; opacity:0.75; }
  .y-turn-player{ font-size:1.2rem; font-weight:900; letter-spacing:0.2px; }
  .y-turn-sub{ font-size:0.9rem; opacity:0.8; }
  .y-controls{ display:flex; gap:10px; flex-wrap:wrap; }

  .y-hint{
    margin-top:12px;
    padding:10px 12px;
    border-radius:10px;
    background: rgba(0,0,0,0.25);
    border:1px solid rgba(255,255,255,0.08);
    font-size:0.92rem;
    opacity:0.95;
    line-height:1.4;
  }

  .y-table-wrap{ overflow:auto; border-radius:12px; border:1px solid rgba(255,255,255,0.08); }
  .y-table{
    width:100%;
    border-collapse:collapse;
    /* tabletfreundlicher */
    min-width: 720px;
    background: rgba(0,0,0,0.25);
  }
  .y-table th, .y-table td{
    padding: 8px 8px; /* weniger Platz = mehr Spalten sichtbar */
    border-bottom:1px solid rgba(255,255,255,0.08);
    border-right:1px solid rgba(255,255,255,0.06);
    text-align:center;
    vertical-align:middle;
    font-size:0.92rem;
  }

  /* Linke Spalte schmaler */
  .y-table th:first-child, .y-table td:first-child{
    text-align:left;
    position:sticky;
    left:0;
    background: rgba(0,0,0,0.55);
    backdrop-filter: blur(6px);
    z-index:2;
    min-width: 210px;
    max-width: 260px;
  }

  .y-table thead th{
    position:sticky;
    top:0;
    background: rgba(0,0,0,0.65);
    backdrop-filter: blur(6px);
    z-index:3;
  }

  .y-rowhint{ font-size:0.82rem; opacity:0.75; display:block; margin-top:2px; }

  .y-cell{ cursor:pointer; transition: background .15s ease; }
  .y-cell:hover{ background: rgba(255,255,255,0.06); }
  .y-cell.filled{ cursor:default; opacity:0.75; background: rgba(255,255,255,0.04); }
  .y-cell.disabled{ cursor:not-allowed; opacity:0.35; }
  .y-cell.active{ outline: 2px solid rgba(255,255,255,0.22); outline-offset:-2px; }

  .y-midrow td, .y-midrow th{ font-weight: 900; background: rgba(255,255,255,0.06); }
  .y-bottomrow td, .y-bottomrow th{ font-weight: 900; background: rgba(255,255,255,0.09); }
  .y-bottomrow.total td, .y-bottomrow.total th{ background: rgba(255,255,255,0.13); font-size: 1.02rem; }

  /* Extra fürs Tablet Hochformat */
  @media (max-width: 820px){
    .y-table{ min-width: 640px; }
    .y-table th, .y-table td{ padding: 7px 6px; font-size: 0.9rem; }
    .y-table th:first-child, .y-table td:first-child{ min-width: 175px; max-width: 220px; }
    .y-rowhint{ display:none; } /* optional: spart Höhe/Breite */
  }

  .y-foot{
    display:flex; justify-content:space-between; align-items:center;
    gap:10px; flex-wrap:wrap; margin-top:10px;
  }
  .y-badge{
    display:inline-block;
    padding:3px 10px;
    border-radius:999px;
    border:1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.06);
    font-weight:800;
    margin-right:8px;
  }

  /* Modal */
  .y-modal{ position:fixed; inset:0; z-index:9999; display:flex; align-items:center; justify-content:center; padding:16px; }
  .y-modal-backdrop{ position:absolute; inset:0; background: rgba(0,0,0,0.55); backdrop-filter: blur(4px); }
  .y-modal-card{
    position:relative;
    width:min(620px, 100%);
    border-radius:14px;
    border:1px solid rgba(255,255,255,0.12);
    background: rgba(0,0,0,0.78);
    padding:16px;
    box-shadow: 0 20px 70px rgba(0,0,0,0.55);
  }
  .y-modal-title{ font-size:1.1rem; font-weight:900; margin-bottom:4px; }
  .y-modal-sub{ font-size:0.92rem; opacity:0.8; margin-bottom:12px; }
  .y-modal-actions{ display:flex; gap:10px; justify-content:flex-end; margin-top:12px; }

  .y-preview{
    margin-top: 10px;
    padding: 10px 12px;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.06);
    font-weight: 900;
    text-align: center;
    font-size: 1.1rem;
  }

  .y-fixed-info{
    padding: 10px 12px;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.06);
    line-height: 1.35;
  }
  .y-fixed-actions{
    display:flex;
    gap:10px;
    justify-content:flex-end;
    flex-wrap:wrap;
    margin-top: 12px;
  }
</style>

<script>
(() => {
  const STORAGE_KEY = "shb_yazzee_manual_v4";

  const categories = [
    { key: "ones",   label: "1 – alle 1 zählen", type: "upper", face: 1 },
    { key: "twos",   label: "2 – alle 2 zählen", type: "upper", face: 2 },
    { key: "threes", label: "3 – alle 3 zählen", type: "upper", face: 3 },
    { key: "fours",  label: "4 – alle 4 zählen", type: "upper", face: 4 },
    { key: "fives",  label: "5 – alle 5 zählen", type: "upper", face: 5 },
    { key: "sixes",  label: "6 – alle 6 zählen", type: "upper", face: 6 },

    { key: "pair1",  label: "1 Paar – alle Augen zählen", type: "manual" },
    { key: "pair2",  label: "2 Paare – alle Augen zählen", type: "manual" },
    { key: "three",  label: "3 Gleiche – alle Augen zählen", type: "manual" },
    { key: "four",   label: "4 Gleiche – alle Augen zählen", type: "manual" },

    { key: "full",   label: "Full House", type: "fixed", base: 25, served: 30 },
    { key: "small",  label: "Kleine Straße", type: "fixed", base: 30, served: 35 },
    { key: "large",  label: "Große Straße", type: "fixed", base: 40, served: 45 },

    { key: "chance", label: "Chance – alle Augen zählen", type: "chance" },
    { key: "yazzee", label: "Yazzee", type: "fixed", base: 50, served: 100 },
  ];

  const upperKeys = ["ones","twos","threes","fours","fives","sixes"];

  const el = (id) => document.getElementById(id);

  // Setup UI
  const playerInput = el("playerInput");
  const btnStart = el("btnStart");
  const btnResetAll = el("btnResetAll");
  const btnSave = el("btnSave");
  const setupNote = el("setupNote");

  // Turn UI
  const turnArea = el("turnArea");
  const tableArea = el("tableArea");
  const activePlayerName = el("activePlayerName");
  const modeInfo = el("modeInfo");
  const btnPrev = el("btnPrev");
  const btnNext = el("btnNext");
  const scoreTable = el("scoreTable");

  // Modal UI
  const scoreModal = el("scoreModal");
  const modalBackdrop = el("modalBackdrop");
  const modalTitle = el("modalTitle");
  const modalSub = el("modalSub");
  const btnCancel = el("btnCancel");
  const btnApply = el("btnApply");
  const modalActions = el("modalActions");

  const upperWrap = el("upperWrap");
  const upperHits = el("upperHits");
  const upperCalcHint = el("upperCalcHint");
  const upperPreview = el("upperPreview");

  const manualWrap = el("manualWrap");
  const manualScore = el("manualScore");

  const fixedWrap = el("fixedWrap");
  const fixedInfo = el("fixedInfo");
  const btnFixedBase = el("btnFixedBase");
  const btnFixedServed = el("btnFixedServed");
  const btnFixedStrike = el("btnFixedStrike");

  const chanceWrap = el("chanceWrap");
  const chanceSelect = el("chanceSelect");
  const chanceManualInner = el("chanceManualInner");
  const chanceManualScore = el("chanceManualScore");
  const chanceFixedInner = el("chanceFixedInner");
  const chanceFixedInfo = el("chanceFixedInfo");
  const btnChanceFixedBase = el("btnChanceFixedBase");
  const btnChanceFixedServed = el("btnChanceFixedServed");
  const btnChanceFixedStrike = el("btnChanceFixedStrike");

  let modalCtx = { playerIndex: null, catKey: null };
  let state = { mode: "runter", players: [], active: 0 };

  const clampInt = (n, min, max) => {
    n = Number(n);
    if (!Number.isFinite(n)) n = 0;
    n = Math.round(n);
    if (n < min) n = min;
    if (n > max) n = max;
    return n;
  };

  // Storage
  const save = () => {
    try{
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      setupNote.style.display = "block";
      setupNote.textContent = "✓ Gespeichert.";
      setTimeout(()=> setupNote.style.display="none", 1100);
    }catch(e){}
  };

  const load = () => {
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return false;
      const parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.players)) return false;
      state = parsed;
      state.mode ??= "runter";
      state.active ??= 0;
      return true;
    }catch(e){ return false; }
  };

  // Mode order restriction
  const getOrder = () => {
    const keys = categories.map(c => c.key);
    if (state.mode === "runter") return keys;
    if (state.mode === "rauf") return keys.slice().reverse();
    return keys;
  };

  const getNextRequiredKey = (player) => {
    const order = getOrder();
    for (const k of order) {
      if (player.scores[k] == null) return k;
    }
    return null;
  };

  const isCellAllowed = (playerIndex, catKey) => {
    const p = state.players[playerIndex];
    if (!p) return false;
    if (p.scores[catKey] != null) return false;
    if (playerIndex !== state.active) return false;
    if (state.mode === "frei") return true;
    return getNextRequiredKey(p) === catKey;
  };

  // Summen
  const getUpperSum = (p) => upperKeys.reduce((acc,k)=> acc + (p.scores[k] ?? 0), 0);
  const getBonus = (p) => (getUpperSum(p) >= 63 ? 35 : 0);
  const getUpperWithBonus = (p) => getUpperSum(p) + getBonus(p);

  const getLowerSum = (p) => {
    let sum = 0;
    for (const cat of categories) {
      if (cat.type === "upper") continue;
      sum += (p.scores[cat.key] ?? 0);
    }
    return sum;
  };

  const getTotal = (p) => getUpperWithBonus(p) + getLowerSum(p);

  const addSummaryRow = (tbody, label, cls, calcFn) => {
    const tr = document.createElement("tr");
    tr.className = cls;
    const tdL = document.createElement("td");
    tdL.innerHTML = `<strong>${label}</strong>`;
    tr.appendChild(tdL);

    state.players.forEach(p => {
      const td = document.createElement("td");
      td.innerHTML = `<strong>${calcFn(p)}</strong>`;
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  };

  // Render
  const renderTop = () => {
    const p = state.players[state.active];
    activePlayerName.textContent = p ? p.name : "–";
    modeInfo.textContent = `Modus: ${state.mode}`;
  };

  const renderTable = () => {
    const thead = document.createElement("thead");
    const trh = document.createElement("tr");

    const thCat = document.createElement("th");
    thCat.textContent = "Zeile / Ziel";
    trh.appendChild(thCat);

    state.players.forEach((p, idx) => {
      const th = document.createElement("th");
      th.textContent = p.name + (idx === state.active ? " ★" : "");
      trh.appendChild(th);
    });

    thead.appendChild(trh);

    const tbody = document.createElement("tbody");

    categories.forEach(cat => {
      const tr = document.createElement("tr");

      const tdL = document.createElement("td");
      tdL.innerHTML = `<strong>${cat.label}</strong>`;
      tr.appendChild(tdL);

      state.players.forEach((p, pIdx) => {
        const td = document.createElement("td");
        const val = p.scores[cat.key];

        td.className = "y-cell";
        if (val != null) {
          td.classList.add("filled");
          td.textContent = String(val);
        } else {
          const allowed = isCellAllowed(pIdx, cat.key);
          if (!allowed) td.classList.add("disabled");
          if (pIdx === state.active) td.classList.add("active");
          td.textContent = allowed ? "Eintragen" : "–";

          td.addEventListener("click", () => {
            if (!isCellAllowed(pIdx, cat.key)) return;
            openModal(pIdx, cat.key);
          });
        }

        tr.appendChild(td);
      });

      tbody.appendChild(tr);

      if (cat.key === "sixes") {
        addSummaryRow(tbody, "Summe (1–6)", "y-midrow", (p) => getUpperSum(p));
        addSummaryRow(tbody, "Bonus", "y-midrow", (p) => getBonus(p));
        addSummaryRow(tbody, "Summe oben", "y-midrow", (p) => getUpperWithBonus(p));
      }
    });

    addSummaryRow(tbody, "Summe unten", "y-bottomrow", (p) => getLowerSum(p));
    addSummaryRow(tbody, "Summe oben", "y-bottomrow", (p) => getUpperWithBonus(p));
    addSummaryRow(tbody, "Gesamt", "y-bottomrow total", (p) => getTotal(p));

    scoreTable.innerHTML = "";
    scoreTable.appendChild(thead);
    scoreTable.appendChild(tbody);
  };

  const renderAll = () => {
    renderTop();
    renderTable();
  };

  // Modal helpers
  const hideAllModalSections = () => {
    upperWrap.style.display = "none";
    manualWrap.style.display = "none";
    fixedWrap.style.display = "none";
    chanceWrap.style.display = "none";
    modalActions.style.display = "flex";
  };

  const closeModal = () => { scoreModal.style.display = "none"; };

  const applyScoreAndNext = (playerIndex, catKey, scoreVal) => {
    const p = state.players[playerIndex];
    p.scores[catKey] = clampInt(scoreVal, 0, 9999);

    state.active = (state.active + 1) % state.players.length;
    save();
    closeModal();
    renderAll();
  };

  const updateUpperPreview = (face) => {
    const hits = clampInt(upperHits.value, 0, 5);
    upperHits.value = hits;
    const pts = hits * face;
    upperCalcHint.textContent = `${hits} Treffer → ${pts} Punkte`;
    upperPreview.textContent = `${pts} Punkte`;
  };

  const setChanceInnerMode = () => {
    const v = chanceSelect.value;

    if (v === "chance_manual") {
      chanceManualInner.style.display = "block";
      chanceFixedInner.style.display = "none";
      modalActions.style.display = "flex";
      chanceManualScore.value = "";
      chanceManualScore.focus();
    } else {
      chanceManualInner.style.display = "none";
      chanceFixedInner.style.display = "block";
      modalActions.style.display = "none";

      const fixedCat = categories.find(c => c.key === v);
      chanceFixedInfo.innerHTML =
        `<strong>${fixedCat.label}</strong><br>` +
        `Normal: <strong>${fixedCat.base}P</strong> · Serviert: <strong>${fixedCat.served}P</strong> · Streichen: <strong>0P</strong>`;
    }
  };

  const openModal = (playerIndex, catKey) => {
    const p = state.players[playerIndex];
    const cat = categories.find(c => c.key === catKey);

    modalCtx = { playerIndex, catKey };
    modalTitle.textContent = `${p.name} – ${cat.label}`;
    hideAllModalSections();

    if (cat.type === "upper") {
      modalSub.textContent = "Treffer-Anzahl eingeben (0–5) – Punkte werden automatisch berechnet";
      upperWrap.style.display = "block";
      upperHits.value = 0;
      updateUpperPreview(cat.face);
      upperHits.oninput = () => updateUpperPreview(cat.face);
      scoreModal.style.display = "flex";
      upperHits.focus();
      return;
    }

    if (cat.type === "fixed") {
      modalSub.textContent = "Fixziel auswählen";
      fixedWrap.style.display = "block";
      modalActions.style.display = "none";

      fixedInfo.innerHTML =
        `<strong>${cat.label}</strong><br>` +
        `Normal: <strong>${cat.base}P</strong> · Serviert: <strong>${cat.served}P</strong> · Streichen: <strong>0P</strong>`;

      btnFixedBase.textContent = `Normal (${cat.base}P)`;
      btnFixedServed.textContent = `Serviert (${cat.served}P)`;

      btnFixedBase.onclick = () => applyScoreAndNext(playerIndex, catKey, cat.base);
      btnFixedServed.onclick = () => applyScoreAndNext(playerIndex, catKey, cat.served);
      btnFixedStrike.onclick = () => applyScoreAndNext(playerIndex, catKey, 0);

      scoreModal.style.display = "flex";
      return;
    }

    if (cat.type === "chance") {
      modalSub.textContent = "Chance: manuell eintragen oder (Hausregel) als Fixziel verwenden";
      chanceWrap.style.display = "block";
      chanceSelect.value = "chance_manual";
      chanceManualInner.style.display = "block";
      chanceFixedInner.style.display = "none";
      modalActions.style.display = "flex";

      setChanceInnerMode();
      chanceSelect.onchange = setChanceInnerMode;

      // Buttons für Fixziel-in-Chance
      btnChanceFixedBase.onclick = () => {
        const fixedKey = chanceSelect.value;
        const fixedCat = categories.find(c => c.key === fixedKey);
        applyScoreAndNext(playerIndex, catKey, fixedCat.base);
      };
      btnChanceFixedServed.onclick = () => {
        const fixedKey = chanceSelect.value;
        const fixedCat = categories.find(c => c.key === fixedKey);
        applyScoreAndNext(playerIndex, catKey, fixedCat.served);
      };
      btnChanceFixedStrike.onclick = () => applyScoreAndNext(playerIndex, catKey, 0);

      scoreModal.style.display = "flex";
      chanceManualScore.focus();
      return;
    }

    // manual
    modalSub.textContent = "Punkte manuell eintragen (0 erlaubt = streichen)";
    manualWrap.style.display = "block";
    manualScore.value = "";
    scoreModal.style.display = "flex";
    manualScore.focus();
  };

  const applyModal = () => {
    const { playerIndex, catKey } = modalCtx;
    const cat = categories.find(c => c.key === catKey);
    if (!cat) return;

    if (cat.type === "upper") {
      const hits = clampInt(upperHits.value, 0, 5);
      applyScoreAndNext(playerIndex, catKey, hits * cat.face);
      return;
    }

    if (cat.type === "chance") {
      if (chanceSelect.value !== "chance_manual") return; // Fixfälle gehen per Buttons
      applyScoreAndNext(playerIndex, catKey, clampInt(chanceManualScore.value, 0, 9999));
      return;
    }

    applyScoreAndNext(playerIndex, catKey, clampInt(manualScore.value, 0, 9999));
  };

  // Turn buttons
  btnNext.addEventListener("click", () => {
    state.active = (state.active + 1) % state.players.length;
    save();
    renderAll();
  });
  btnPrev.addEventListener("click", () => {
    state.active = (state.active - 1 + state.players.length) % state.players.length;
    save();
    renderAll();
  });

  // Modal events
  modalBackdrop.addEventListener("click", closeModal);
  btnCancel.addEventListener("click", closeModal);
  btnApply.addEventListener("click", applyModal);

  // Setup
  const startGame = (names, mode) => {
    const clean = names.map(n=>n.trim()).filter(n=>n.length>0);
    if (clean.length < 1) {
      setupNote.style.display = "block";
      setupNote.textContent = "Bitte mindestens einen Spieler eingeben 🙂";
      return;
    }

    state.mode = mode;
    state.players = clean.map(name => ({
      name,
      scores: Object.fromEntries(categories.map(c => [c.key, null])),
    }));
    state.active = 0;

    turnArea.style.display = "block";
    tableArea.style.display = "block";

    save();
    renderAll();
  };

  btnStart.addEventListener("click", () => {
    const names = playerInput.value.split(",");
    const mode = document.querySelector('input[name="mode"]:checked')?.value || "runter";
    startGame(names, mode);
  });

  btnResetAll.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    state = { mode: "runter", players: [], active: 0 };
    turnArea.style.display = "none";
    tableArea.style.display = "none";
    setupNote.style.display = "block";
    setupNote.textContent = "Alles gelöscht. Neues Spiel kann starten.";
  });

  btnSave.addEventListener("click", save);

  // Load on init
  const loaded = load();
  if (loaded && state.players.length > 0) {
    turnArea.style.display = "block";
    tableArea.style.display = "block";
    playerInput.value = state.players.map(p=>p.name).join(", ");
    const r = document.querySelector(`input[name="mode"][value="${state.mode}"]`);
    if (r) r.checked = true;
    renderAll();
  }
})();
</script>
