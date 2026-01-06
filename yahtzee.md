---
title: Yahtzee Tracker
subtitle: Mehrspieler-Tracker + Würfel + 3 Spielmodi
description: Yahtzee-Variante mit Runter/Rauf/Durcheinander, Serviert-Punkten und Bonus ab 63 im oberen Block.
show_sidebar: false
layout: page
---

<div class="shb-main-container yazzee-wrap">

  <h1 class="shb-main-title">Yazzee Tracker</h1>
  <p class="shb-main-description">
    Spieler eintragen, Modus wählen, würfeln (bis zu 3 Würfe) und dann eine Zeile eintragen.
    <br>
    <strong>Serviert</strong> zählt automatisch, wenn du die Zeile nach dem <strong>1. Wurf</strong> einträgst.
  </p>

  <!-- ─────────────────────────────────────────────
       SETUP
  ───────────────────────────────────────────── -->
  <div class="y-card">
    <h2 class="y-h2">Spiel-Setup</h2>

    <div class="y-grid">
      <div class="y-field">
        <label class="y-label" for="playerInput">Spieler (mit Komma trennen)</label>
        <input id="playerInput" class="y-input" type="text" placeholder="Maxx, Moni, Mia">
        <div class="y-help">Tipp: Du kannst auch später neu starten und Spieler ändern.</div>
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

  <!-- ─────────────────────────────────────────────
       DICE AREA
  ───────────────────────────────────────────── -->
  <div class="y-card" id="gameArea" style="display:none;">
    <div class="y-topbar">
      <div class="y-turn">
        <div class="y-turn-title">Am Zug:</div>
        <div class="y-turn-player" id="activePlayerName">–</div>
        <div class="y-turn-sub" id="turnInfo">Wurf: 0 / 3</div>
      </div>

      <div class="y-controls">
        <button class="y-btn y-btn-primary" id="btnRoll">Würfeln</button>
        <button class="y-btn" id="btnNewTurn">Zug beenden (ohne Eintrag)</button>
      </div>
    </div>

    <div class="y-dice" id="diceRow"></div>

    <div class="y-hint">
      <strong>So geht’s:</strong> Würfeln → Würfel anklicken zum „Behalten“ → ggf. nochmal würfeln → Zeile anklicken zum Eintragen.
      <br>
      Im Modus <em>runter/rauf</em> ist jeweils nur die „nächste“ Zeile erlauben (damit niemand schummelt 😇).
    </div>
  </div>

  <!-- ─────────────────────────────────────────────
       SCORE TABLE
  ───────────────────────────────────────────── -->
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

<style>
  /* Grundlayout – neutral, passt meist gut zu bestehenden Themes */
  .yazzee-wrap { margin-top: 1rem; }

  .y-card{
    background: rgba(0,0,0,0.25);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    padding: 16px;
    margin: 14px 0;
    backdrop-filter: blur(6px);
  }

  .y-h2{
    margin: 0 0 12px 0;
    font-size: 1.2rem;
    letter-spacing: 0.2px;
  }

  .y-grid{
    display: grid;
    grid-template-columns: 1.2fr 1fr auto;
    gap: 12px;
    align-items: end;
  }
  @media (max-width: 900px){
    .y-grid{ grid-template-columns: 1fr; }
  }

  .y-field{ display: flex; flex-direction: column; gap: 6px; }
  .y-label{ font-weight: 700; font-size: 0.95rem; opacity: 0.95; }
  .y-help{ font-size: 0.85rem; opacity: 0.75; }

  .y-input{
    width: 100%;
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.14);
    background: rgba(0,0,0,0.35);
    color: #fff;
    outline: none;
  }
  .y-input:focus{
    border-color: rgba(255,255,255,0.28);
    box-shadow: 0 0 0 3px rgba(255,255,255,0.06);
  }

  .y-mode{ display: flex; flex-wrap: wrap; gap: 10px; }
  .y-radio{
    display:flex; gap: 8px; align-items:center;
    padding: 8px 10px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.10);
    background: rgba(0,0,0,0.25);
    cursor: pointer;
    user-select: none;
  }
  .y-radio input{ transform: translateY(1px); }

  .y-actions{ display: flex; gap: 10px; justify-content: flex-end; }
  @media (max-width: 900px){
    .y-actions{ justify-content: flex-start; }
  }

  .y-btn{
    border: 1px solid rgba(255,255,255,0.14);
    background: rgba(0,0,0,0.35);
    color: #fff;
    border-radius: 10px;
    padding: 10px 12px;
    cursor: pointer;
    transition: transform .05s ease, border-color .15s ease, background .15s ease;
    white-space: nowrap;
  }
  .y-btn:hover{
    border-color: rgba(255,255,255,0.30);
    background: rgba(255,255,255,0.06);
  }
  .y-btn:active{ transform: scale(0.98); }
  .y-btn-primary{
    border-color: rgba(255,255,255,0.28);
    background: rgba(255,255,255,0.08);
    font-weight: 800;
  }

  .y-note{
    margin-top: 10px;
    padding: 10px 12px;
    border-radius: 10px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.10);
  }

  .y-topbar{
    display:flex;
    justify-content: space-between;
    align-items: center;
    gap: 14px;
    flex-wrap: wrap;
  }

  .y-turn{ display:flex; flex-direction: column; gap: 2px; }
  .y-turn-title{ font-size: 0.9rem; opacity: 0.75; }
  .y-turn-player{ font-size: 1.2rem; font-weight: 900; letter-spacing: 0.2px; }
  .y-turn-sub{ font-size: 0.9rem; opacity: 0.8; }

  .y-controls{ display:flex; gap: 10px; flex-wrap: wrap; }

  .y-dice{
    display:flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 12px;
  }

  .y-die{
    width: 64px;
    height: 64px;
    border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.14);
    background: rgba(0,0,0,0.35);
    display:flex;
    align-items:center;
    justify-content:center;
    font-size: 1.6rem;
    font-weight: 900;
    cursor: pointer;
    position: relative;
    user-select: none;
  }

  .y-die.locked{
    border-color: rgba(255,255,255,0.35);
    background: rgba(255,255,255,0.10);
  }
  .y-die.locked::after{
    content: "✓";
    position: absolute;
    right: 10px;
    bottom: 8px;
    font-size: 0.9rem;
    opacity: 0.85;
  }

  .y-hint{
    margin-top: 12px;
    padding: 10px 12px;
    border-radius: 10px;
    background: rgba(0,0,0,0.25);
    border: 1px solid rgba(255,255,255,0.08);
    font-size: 0.92rem;
    opacity: 0.95;
    line-height: 1.4;
  }

  .y-table-wrap{ overflow:auto; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08); }
  .y-table{
    width: 100%;
    border-collapse: collapse;
    min-width: 760px;
    background: rgba(0,0,0,0.25);
  }
  .y-table th, .y-table td{
    padding: 10px 10px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    border-right: 1px solid rgba(255,255,255,0.06);
    text-align: center;
    vertical-align: middle;
    font-size: 0.95rem;
  }
  .y-table th:first-child, .y-table td:first-child{
    text-align: left;
    position: sticky;
    left: 0;
    background: rgba(0,0,0,0.55);
    backdrop-filter: blur(6px);
    z-index: 2;
    min-width: 220px;
  }
  .y-table thead th{
    position: sticky;
    top: 0;
    background: rgba(0,0,0,0.65);
    backdrop-filter: blur(6px);
    z-index: 3;
  }

  .y-rowhint{
    font-size: 0.85rem;
    opacity: 0.75;
    display:block;
    margin-top: 2px;
  }

  .y-cell{
    cursor: pointer;
    transition: background .15s ease, border-color .15s ease;
  }
  .y-cell:hover{ background: rgba(255,255,255,0.06); }
  .y-cell.filled{
    cursor: default;
    opacity: 0.75;
    background: rgba(255,255,255,0.04);
  }
  .y-cell.disabled{
    cursor: not-allowed;
    opacity: 0.35;
  }
  .y-cell.active{
    outline: 2px solid rgba(255,255,255,0.22);
    outline-offset: -2px;
  }

  .y-sumrow td, .y-sumrow th{
    font-weight: 900;
    background: rgba(255,255,255,0.03);
  }

  .y-foot{
    display:flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 10px;
  }
  .y-badge{
    display:inline-block;
    padding: 3px 10px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.06);
    font-weight: 800;
    margin-right: 8px;
  }
</style>

<script>
(() => {
  const STORAGE_KEY = "shb_yazzee_tracker_v1";

  // Kategorien in der Reihenfolge, wie du sie beschrieben hast
  const categories = [
    { key: "ones",   label: "1 – alle 1 zählen", type: "upper", face: 1 },
    { key: "twos",   label: "2 – alle 2 zählen", type: "upper", face: 2 },
    { key: "threes", label: "3 – alle 3 zählen", type: "upper", face: 3 },
    { key: "fours",  label: "4 – alle 4 zählen", type: "upper", face: 4 },
    { key: "fives",  label: "5 – alle 5 zählen", type: "upper", face: 5 },
    { key: "sixes",  label: "6 – alle 6 zählen", type: "upper", face: 6 },

    { key: "pair1",  label: "1 Paar – alle Augen zählen", type: "kind" },
    { key: "pair2",  label: "2 Paare – alle Augen zählen", type: "kind" },
    { key: "three",  label: "3 Gleiche – alle Augen zählen", type: "kind" },
    { key: "four",   label: "4 Gleiche – alle Augen zählen", type: "kind" },

    { key: "full",   label: "Full House", type: "fixed", base: 25, served: 30 },
    { key: "small",  label: "Kleine Straße", type: "fixed", base: 30, served: 35 },
    { key: "large",  label: "Große Straße", type: "fixed", base: 40, served: 45 },

    { key: "chance", label: "Chance – alle Augen zählen", type: "sum" },
    { key: "yazzee", label: "Yazzee", type: "fixed", base: 50, served: 100 },
  ];

  const el = (id) => document.getElementById(id);

  // UI Elements
  const playerInput = el("playerInput");
  const btnStart = el("btnStart");
  const btnResetAll = el("btnResetAll");
  const btnRoll = el("btnRoll");
  const btnNewTurn = el("btnNewTurn");
  const btnSave = el("btnSave");

  const setupNote = el("setupNote");
  const gameArea = el("gameArea");
  const tableArea = el("tableArea");
  const diceRow = el("diceRow");
  const scoreTable = el("scoreTable");
  const activePlayerName = el("activePlayerName");
  const turnInfo = el("turnInfo");

  // State
  let state = {
    mode: "runter", // runter | rauf | frei
    players: [],    // [{name, scores: {key: number|null}, lockedIndex: number}]
    active: 0,
    dice: [0,0,0,0,0],
    locked: [false,false,false,false,false],
    rollCount: 0,  // 0..3
  };

  // ─────────────────────────────────────────────
  // Helpers – Dice & Scoring
  // ─────────────────────────────────────────────
  const rand1to6 = () => Math.floor(Math.random()*6) + 1;

  const counts = (dice) => {
    const c = new Map();
    for (const d of dice) c.set(d, (c.get(d) || 0) + 1);
    return c;
  };

  const sumAll = (dice) => dice.reduce((a,b)=>a+b, 0);

  const hasAtLeast = (cmap, n) => {
    for (const v of cmap.values()) if (v >= n) return true;
    return false;
  };

  const numPairs = (cmap) => {
    let p = 0;
    for (const v of cmap.values()) if (v >= 2) p++;
    return p;
  };

  const isFullHouse = (cmap) => {
    const vals = Array.from(cmap.values()).sort((a,b)=>a-b);
    // Full house in 5 dice: [2,3]
    return vals.length === 2 && vals[0] === 2 && vals[1] === 3;
  };

  const isSmallStraight = (dice) => {
    const s = new Set(dice);
    const a = [1,2,3,4].every(x => s.has(x));
    const b = [2,3,4,5].every(x => s.has(x));
    const c = [3,4,5,6].every(x => s.has(x));
    return a || b || c;
  };

  const isLargeStraight = (dice) => {
    const s = new Set(dice);
    const a = [1,2,3,4,5].every(x => s.has(x));
    const b = [2,3,4,5,6].every(x => s.has(x));
    return a || b;
  };

  const calcScore = (catKey, dice, rollCount) => {
    const cmap = counts(dice);
    const total = sumAll(dice);
    const served = (rollCount === 1);

    const cat = categories.find(x => x.key === catKey);
    if (!cat) return 0;

    if (cat.type === "upper") {
      const face = cat.face;
      let s = 0;
      for (const d of dice) if (d === face) s += face;
      return s;
    }

    if (catKey === "pair1") return (numPairs(cmap) >= 1) ? total : 0;
    if (catKey === "pair2") return (numPairs(cmap) >= 2) ? total : 0;
    if (catKey === "three") return (hasAtLeast(cmap, 3)) ? total : 0;
    if (catKey === "four")  return (hasAtLeast(cmap, 4)) ? total : 0;

    if (catKey === "full")  return isFullHouse(cmap) ? (served ? cat.served : cat.base) : 0;
    if (catKey === "small") return isSmallStraight(dice) ? (served ? cat.served : cat.base) : 0;
    if (catKey === "large") return isLargeStraight(dice) ? (served ? cat.served : cat.base) : 0;

    if (catKey === "chance") return total;

    if (catKey === "yazzee") {
      const ok = Array.from(cmap.values()).some(v => v === 5);
      return ok ? (served ? cat.served : cat.base) : 0;
    }

    return 0;
  };

  const upperKeys = ["ones","twos","threes","fours","fives","sixes"];

  const getUpperSum = (player) => {
    return upperKeys.reduce((acc, k) => acc + (player.scores[k] ?? 0), 0);
  };

  const getBonus = (player) => (getUpperSum(player) >= 63 ? 35 : 0);

  const getTotal = (player) => {
    let sum = 0;
    for (const cat of categories) sum += (player.scores[cat.key] ?? 0);
    return sum + getBonus(player);
  };

  // ─────────────────────────────────────────────
  // Mode restrictions: runter / rauf / frei
  // ─────────────────────────────────────────────
  const getOrder = () => {
    const keys = categories.map(c => c.key);
    if (state.mode === "runter") return keys;
    if (state.mode === "rauf") return keys.slice().reverse();
    return keys; // frei nutzt Order nur fürs "Next", aber wir erlauben alles
  };

  const getNextRequiredKey = (player) => {
    const order = getOrder();
    for (const k of order) {
      if (player.scores[k] == null) return k;
    }
    return null;
  };

  const isCellAllowed = (playerIndex, catKey) => {
    const player = state.players[playerIndex];
    if (!player) return false;
    if (player.scores[catKey] != null) return false;         // schon belegt
    if (playerIndex !== state.active) return false;          // nicht am Zug
    if (state.mode === "frei") return true;

    const next = getNextRequiredKey(player);
    return next === catKey;
  };

  // ─────────────────────────────────────────────
  // Render UI
  // ─────────────────────────────────────────────
  const renderDice = () => {
    diceRow.innerHTML = "";
    state.dice.forEach((val, i) => {
      const die = document.createElement("div");
      die.className = "y-die" + (state.locked[i] ? " locked" : "");
      die.textContent = val === 0 ? "–" : String(val);
      die.title = state.rollCount === 0 ? "Erst würfeln" : "Klicken = Würfel behalten / freigeben";
      die.addEventListener("click", () => {
        if (state.rollCount === 0) return;
        state.locked[i] = !state.locked[i];
        renderDice();
      });
      diceRow.appendChild(die);
    });
  };

  const renderTopbar = () => {
    const p = state.players[state.active];
    activePlayerName.textContent = p ? p.name : "–";
    turnInfo.textContent = `Wurf: ${state.rollCount} / 3`;
    btnRoll.disabled = (state.rollCount >= 3);
  };

  const renderTable = () => {
    // Header
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

    // Body rows
    const tbody = document.createElement("tbody");

    categories.forEach((cat) => {
      const tr = document.createElement("tr");

      const tdLabel = document.createElement("td");
      tdLabel.innerHTML = `<strong>${cat.label}</strong>${
        (cat.type === "fixed" && cat.served)
          ? `<span class="y-rowhint">${cat.base}P (serviert ${cat.served}P)</span>`
          : `<span class="y-rowhint">&nbsp;</span>`
      }`;
      tr.appendChild(tdLabel);

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

          // Vorschau-Score anzeigen (nur beim aktiven Spieler), damit man nicht raten muss
          if (pIdx === state.active && state.rollCount > 0) {
            const preview = calcScore(cat.key, state.dice, state.rollCount);
            td.textContent = (allowed ? `${preview}` : "–");
            td.title = allowed ? "Klicken zum Eintragen" : "In diesem Modus gerade nicht erlaubt";
          } else {
            td.textContent = "–";
          }

          td.addEventListener("click", () => {
            if (!isCellAllowed(pIdx, cat.key)) return;

            // Eintragen
            const score = (state.rollCount > 0) ? calcScore(cat.key, state.dice, state.rollCount) : 0;
            p.scores[cat.key] = score;

            // Nächster Spieler
            nextPlayer();
            save();
            renderAll();
          });
        }

        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });

    // Summary rows
    const sumRows = [
      { label: "Summe 1–6", calc: (p) => getUpperSum(p) },
      { label: "Bonus (≥63 → +35)", calc: (p) => getBonus(p) },
      { label: "Gesamt", calc: (p) => getTotal(p), strong: true },
    ];

    sumRows.forEach(r => {
      const tr = document.createElement("tr");
      tr.className = "y-sumrow";
      const tdL = document.createElement("td");
      tdL.innerHTML = r.strong ? `<strong>${r.label}</strong>` : r.label;
      tr.appendChild(tdL);

      state.players.forEach(p => {
        const td = document.createElement("td");
        const v = r.calc(p);
        td.innerHTML = r.strong ? `<strong>${v}</strong>` : String(v);
        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });

    // Mount
    scoreTable.innerHTML = "";
    scoreTable.appendChild(thead);
    scoreTable.appendChild(tbody);
  };

  const renderAll = () => {
    renderTopbar();
    renderDice();
    renderTable();
  };

  // ─────────────────────────────────────────────
  // Turn flow
  // ─────────────────────────────────────────────
  const resetDiceForTurn = () => {
    state.dice = [0,0,0,0,0];
    state.locked = [false,false,false,false,false];
    state.rollCount = 0;
  };

  const nextPlayer = () => {
    resetDiceForTurn();
    state.active = (state.active + 1) % state.players.length;
  };

  // ─────────────────────────────────────────────
  // Storage
  // ─────────────────────────────────────────────
  const save = () => {
    try{
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      setupNote.style.display = "block";
      setupNote.textContent = "✓ Gespeichert (Browser-Speicher).";
      setTimeout(()=> setupNote.style.display="none", 1400);
    }catch(e){}
  };

  const load = () => {
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return false;
      const parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.players)) return false;
      state = parsed;

      // Backwards-safe defaults
      state.mode ??= "runter";
      state.active ??= 0;
      state.dice ??= [0,0,0,0,0];
      state.locked ??= [false,false,false,false,false];
      state.rollCount ??= 0;

      return true;
    }catch(e){
      return false;
    }
  };

  // ─────────────────────────────────────────────
  // Setup / Init
  // ─────────────────────────────────────────────
  const startGame = (names, mode) => {
    const clean = names
      .map(n => n.trim())
      .filter(n => n.length > 0);

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
    resetDiceForTurn();

    gameArea.style.display = "block";
    tableArea.style.display = "block";
    save();
    renderAll();
  };

  // Event handlers
  btnStart.addEventListener("click", () => {
    const names = playerInput.value.split(",");
    const mode = document.querySelector('input[name="mode"]:checked')?.value || "runter";
    startGame(names, mode);
  });

  btnResetAll.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    // minimal reset
    state = {
      mode: "runter",
      players: [],
      active: 0,
      dice: [0,0,0,0,0],
      locked: [false,false,false,false,false],
      rollCount: 0
    };
    gameArea.style.display = "none";
    tableArea.style.display = "none";
    setupNote.style.display = "block";
    setupNote.textContent = "Alles gelöscht. Ein neues Spiel kann starten.";
  });

  btnRoll.addEventListener("click", () => {
    if (state.players.length === 0) return;
    if (state.rollCount >= 3) return;

    // Roll (only unlocked dice)
    for (let i=0;i<5;i++){
      if (!state.locked[i]) state.dice[i] = rand1to6();
    }
    state.rollCount += 1;

    save();
    renderAll();
  });

  btnNewTurn.addEventListener("click", () => {
    if (state.players.length === 0) return;
    // Zug beenden ohne Eintrag -> nächster Spieler
    nextPlayer();
    save();
    renderAll();
  });

  btnSave.addEventListener("click", save);

  // Load on init
  const loaded = load();
  if (loaded && state.players.length > 0) {
    gameArea.style.display = "block";
    tableArea.style.display = "block";
    playerInput.value = state.players.map(p => p.name).join(", ");
    // set radio
    const r = document.querySelector(`input[name="mode"][value="${state.mode}"]`);
    if (r) r.checked = true;
    renderAll();
  } else {
    renderDice();
  }
})();
</script>
