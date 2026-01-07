---
title: Yahtzee Scoreboard
subtitle: Mehrspieler-Yahtzee-Scoreboard mit 3 verschiedenen Spiel-Varianten
description: Punkte manuell eintragen (echte Würfel), Modi runter/rauf/durcheinander, Fixziele per Klick (Normal/Serviert/Streichen), Bonus ab 63, Treffer-Eingabe für 1–6, Chance als Fixziel (außer Modus 3). Mit Historie + Druck-Export + schönerem End-Popup.
show_sidebar: false
layout: page
---

<div class="shb-main-container yazzee-wrap">

  <h1 class="shb-main-title">Yahtzee Scoreboard</h1>
  <p class="shb-main-description">
    Gewürfelt wird am Tisch – hier wird nur eingetragen 🙂
    <br>
    Ziele: Erziele so viele Punkte wie möglich 🎲🎲🎲🎲🎲
  </p>

  <!-- Setup -->
  <div class="y-card">
    <div class="y-headrow">
      <h2 class="y-h2" style="margin:0;">Spiel-Setup</h2>
      <div class="y-head-actions">
        <button class="y-btn" id="btnHistoryTop">📚 Historie</button>
      </div>
    </div>

    <div class="y-grid" style="margin-top:12px;">
      <div class="y-field">
        <label class="y-label" for="playerInput">Spieler (mit Komma trennen)</label>
        <input id="playerInput" class="y-input" type="text" placeholder="Maxx, Moni, Mia">
        <div class="y-help">Du kannst jederzeit neu starten und Spieler ändern.</div>
      </div>

      <div class="y-field">
        <label class="y-label">Spielmodus</label>
        <div class="y-mode">
          <label class="y-radio"><input type="radio" name="mode" value="runter" checked> Spiel ⬇️</label>
          <label class="y-radio"><input type="radio" name="mode" value="rauf"> Spiel ⬆️</label>
          <label class="y-radio"><input type="radio" name="mode" value="frei"> Spiel ↕️</label>
        </div>
      </div>

      <div class="y-field y-actions">
        <button class="y-btn y-btn-primary" id="btnStart">Spiel starten / neu starten</button>
        <button class="y-btn" id="btnResetAll" title="Aktuelles Spiel löschen (Historie bleibt)">Alles löschen</button>
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
    <div class="y-headrow">
      <h2 class="y-h2" style="margin:0;">Punkte</h2>
      <div class="y-head-actions">
        <button class="y-btn" id="btnHistory">📚 Historie</button>
      </div>
    </div>

    <div class="y-table-wrap" style="margin-top:12px;">
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

<!-- Modal: Score Input -->
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
      <div class="y-field" id="chanceSelectWrap">
        <label class="y-label" for="chanceSelect">Chance-Wertung</label>
        <select id="chanceSelect" class="y-input">
          <option value="chance_manual">Chance (manuell Punkte)</option>
          <option value="full">Full House (Fixziel)</option>
          <option value="small">Kleine Straße (Fixziel)</option>
          <option value="large">Große Straße (Fixziel)</option>
          <option value="yazzee">Yazzee (Fixziel)</option>
        </select>
        <div class="y-help">Hausregel: Chance darf auch als Fixziel verwendet werden (außer Modus 3).</div>
      </div>

      <div id="chanceManualInner" style="display:none; margin-top:10px;">
        <div class="y-field">
          <label class="y-label" for="chanceManualScore">Augensumme</label>
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

<!-- Modal: Final Results (schicker) -->
<div class="y-modal" id="finalModal" style="display:none;">
  <div class="y-modal-backdrop" id="finalBackdrop"></div>

  <div class="y-modal-card y-modal-card-wide">
    <div class="y-modal-title">🏁 Endergebnis</div>
    <div class="y-modal-sub" id="finalSub">–</div>

    <div class="y-podium" id="podiumTop"></div>

    <div class="y-section-title">Alle Platzierungen</div>
    <div class="y-ranklist" id="finalBody"></div>

    <div class="y-modal-actions y-modal-actions-split">
      <div class="y-left-actions">
        <button class="y-btn y-btn-primary" id="btnNewRoundSame">🔁 Neue Runde (gleich)</button>
        <button class="y-btn y-btn-primary" id="btnNewRoundLoser">🧊 Verlierer beginnt</button>
      </div>
      <div class="y-right-actions">
        <button class="y-btn" id="btnFinalHistory">📚 Historie</button>
        <button class="y-btn" id="btnFinalClose">Schließen</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal: History -->
<div class="y-modal" id="historyModal" style="display:none;">
  <div class="y-modal-backdrop" id="historyBackdrop"></div>

  <div class="y-modal-card y-modal-card-wide">
    <div class="y-modal-title">📚 Historie</div>
    <div class="y-modal-sub" id="historySub">–</div>

    <div class="y-history-grid">
      <div class="y-history-card">
        <div class="y-section-title" style="margin-top:0;">🏆 Siege</div>
        <div class="y-smallhint">Gleichstand zählt als Sieg für alle Gewinner.</div>
        <div id="historyWins"></div>
      </div>

      <div class="y-history-card">
        <div class="y-section-title" style="margin-top:0;">🗂️ Spiele</div>
        <div class="y-smallhint">Neueste oben.</div>
        <div class="y-history-list" id="historyList"></div>
      </div>
    </div>

    <div class="y-modal-actions y-modal-actions-split">
      <div class="y-left-actions">
        <button class="y-btn y-btn-primary" id="btnHistoryPrint">🖨️ Drucken / Export (PDF)</button>
      </div>
      <div class="y-right-actions">
        <button class="y-btn y-btn-danger" id="btnHistoryClear">🗑️ Historie löschen</button>
        <button class="y-btn" id="btnHistoryClose">Schließen</button>
      </div>
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

  .y-headrow{
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:12px;
    flex-wrap:wrap;
  }
  .y-head-actions{ display:flex; gap:10px; }

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
  .y-btn-danger{ border-color: rgba(255,90,90,0.35); background: rgba(255,90,90,0.10); }
  .y-btn-danger:hover{ border-color: rgba(255,90,90,0.55); background: rgba(255,90,90,0.14); }

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
    min-width: 720px;
    background: rgba(0,0,0,0.25);
  }
  .y-table th, .y-table td{
    padding: 8px 8px;
    border-bottom:1px solid rgba(255,255,255,0.08);
    border-right:1px solid rgba(255,255,255,0.06);
    text-align:center;
    vertical-align:middle;
    font-size:0.92rem;
  }
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

  .y-cell{ cursor:pointer; transition: background .15s ease; }
  .y-cell:hover{ background: rgba(255,255,255,0.06); }
  .y-cell.filled{ cursor:default; opacity:0.75; background: rgba(255,255,255,0.04); }
  .y-cell.disabled{ cursor:not-allowed; opacity:0.35; }
  .y-cell.active{ outline: 2px solid rgba(255,255,255,0.22); outline-offset:-2px; }

  .y-midrow td, .y-midrow th{ font-weight: 900; background: rgba(255,255,255,0.06); }
  .y-bottomrow td, .y-bottomrow th{ font-weight: 900; background: rgba(255,255,255,0.09); }
  .y-bottomrow.total td, .y-bottomrow.total th{ background: rgba(255,255,255,0.13); font-size: 1.02rem; }

  @media (max-width: 820px){
    .y-table{ min-width: 640px; }
    .y-table th, .y-table td{ padding: 7px 6px; font-size: 0.9rem; }
    .y-table th:first-child, .y-table td:first-child{ min-width: 175px; max-width: 220px; }
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

  /* Modals */
  .y-modal{ position:fixed; inset:0; z-index:9999; display:flex; align-items:center; justify-content:center; padding:16px; }
  .y-modal-backdrop{ position:absolute; inset:0; background: rgba(0,0,0,0.55); backdrop-filter: blur(4px); }
  .y-modal-card{
    position:relative;
    width:min(650px, 100%);
    border-radius:14px;
    border:1px solid rgba(255,255,255,0.12);
    background: rgba(0,0,0,0.78);
    padding:16px;
    box-shadow: 0 20px 70px rgba(0,0,0,0.55);
  }
  .y-modal-card-wide{ width:min(980px, 100%); }
  .y-modal-title{ font-size:1.1rem; font-weight:900; margin-bottom:4px; }
  .y-modal-sub{ font-size:0.92rem; opacity:0.8; margin-bottom:12px; }

  .y-modal-actions{ display:flex; gap:10px; justify-content:flex-end; margin-top:12px; flex-wrap:wrap; }
  .y-modal-actions-split{ justify-content:space-between; }
  .y-left-actions, .y-right-actions{ display:flex; gap:10px; flex-wrap:wrap; }

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
    line-height: 1.5;
  }
  .y-fixed-actions{
    display:flex;
    gap:10px;
    justify-content:flex-end;
    flex-wrap:wrap;
    margin-top: 12px;
  }

  /* Final / Podium */
  .y-section-title{
    margin-top:14px;
    font-weight:900;
    opacity:0.95;
    letter-spacing:0.2px;
  }

  .y-podium{
    display:grid;
    grid-template-columns: repeat(3, 1fr);
    gap:12px;
    margin-top:10px;
  }
  @media (max-width: 860px){
    .y-podium{ grid-template-columns: 1fr; }
  }
  .y-podium-card{
    border-radius:14px;
    border:1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.06);
    padding:12px;
  }
  .y-podium-rank{
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:10px;
    font-weight:900;
    font-size:1.05rem;
  }
  .y-podium-name{ font-size:1.1rem; font-weight:900; margin-top:8px; }
  .y-podium-score{ font-size:1.3rem; font-weight:900; margin-top:2px; }
  .y-podium-sub{ opacity:0.78; font-size:0.9rem; margin-top:2px; }

  .y-ranklist{
    margin-top:8px;
    border-radius:14px;
    border:1px solid rgba(255,255,255,0.10);
    overflow:hidden;
  }
  .y-rankrow{
    display:flex;
    justify-content:space-between;
    gap:12px;
    padding:10px 12px;
    border-bottom:1px solid rgba(255,255,255,0.08);
    background: rgba(0,0,0,0.20);
  }
  .y-rankrow:last-child{ border-bottom:none; }
  .y-rankleft{ display:flex; gap:10px; align-items:center; }
  .y-chip{
    display:inline-flex;
    align-items:center;
    gap:6px;
    padding:3px 10px;
    border-radius:999px;
    border:1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.06);
    font-weight:900;
    font-size:0.9rem;
    white-space:nowrap;
  }
  .y-rankmeta{ opacity:0.8; font-size:0.9rem; margin-top:2px; }

  /* History */
  .y-history-grid{
    display:grid;
    grid-template-columns: 320px 1fr;
    gap:12px;
  }
  @media (max-width: 920px){
    .y-history-grid{ grid-template-columns: 1fr; }
  }
  .y-history-card{
    border-radius:14px;
    border:1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.06);
    padding:12px;
  }
  .y-smallhint{ opacity:0.75; font-size:0.9rem; margin-top:4px; }

  .y-winrow{
    display:flex;
    justify-content:space-between;
    gap:10px;
    padding:8px 0;
    border-bottom:1px solid rgba(255,255,255,0.10);
  }
  .y-winrow:last-child{ border-bottom:none; }

  .y-history-list{ display:flex; flex-direction:column; gap:10px; margin-top:10px; }
  .y-gamecard{
    border-radius:14px;
    border:1px solid rgba(255,255,255,0.12);
    background: rgba(0,0,0,0.20);
    padding:12px;
  }
  .y-gamehead{
    display:flex;
    justify-content:space-between;
    gap:10px;
    flex-wrap:wrap;
    font-weight:900;
  }
  .y-gamemeta{ opacity:0.78; font-size:0.9rem; margin-top:4px; }
  .y-gamerows{ margin-top:10px; border-top:1px solid rgba(255,255,255,0.10); padding-top:10px; }
  .y-gamerow{
    display:flex;
    justify-content:space-between;
    gap:10px;
    padding:6px 0;
    border-bottom:1px solid rgba(255,255,255,0.08);
  }
  .y-gamerow:last-child{ border-bottom:none; }
</style>

<script>
(() => {
  // --- Storage keys
  const STORAGE_KEY = "shb_yazzee_manual_v6";
  const STORAGE_HISTORY_KEY = "shb_yazzee_history_v1";

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

  // UI
  const playerInput = el("playerInput");
  const btnStart = el("btnStart");
  const btnResetAll = el("btnResetAll");
  const btnSave = el("btnSave");
  const setupNote = el("setupNote");

  const btnHistory = el("btnHistory");
  const btnHistoryTop = el("btnHistoryTop");

  const turnArea = el("turnArea");
  const tableArea = el("tableArea");
  const activePlayerName = el("activePlayerName");
  const modeInfo = el("modeInfo");
  const btnPrev = el("btnPrev");
  const btnNext = el("btnNext");
  const scoreTable = el("scoreTable");

  // Score modal
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
  const chanceSelectWrap = el("chanceSelectWrap");
  const chanceSelect = el("chanceSelect");
  const chanceManualInner = el("chanceManualInner");
  const chanceManualScore = el("chanceManualScore");
  const chanceFixedInner = el("chanceFixedInner");
  const chanceFixedInfo = el("chanceFixedInfo");
  const btnChanceFixedBase = el("btnChanceFixedBase");
  const btnChanceFixedServed = el("btnChanceFixedServed");
  const btnChanceFixedStrike = el("btnChanceFixedStrike");

  // Final modal
  const finalModal = el("finalModal");
  const finalBackdrop = el("finalBackdrop");
  const finalSub = el("finalSub");
  const podiumTop = el("podiumTop");
  const finalBody = el("finalBody");
  const btnFinalClose = el("btnFinalClose");
  const btnNewRoundSame = el("btnNewRoundSame");
  const btnNewRoundLoser = el("btnNewRoundLoser");
  const btnFinalHistory = el("btnFinalHistory");

  // History modal
  const historyModal = el("historyModal");
  const historyBackdrop = el("historyBackdrop");
  const historySub = el("historySub");
  const historyWins = el("historyWins");
  const historyList = el("historyList");
  const btnHistoryClose = el("btnHistoryClose");
  const btnHistoryPrint = el("btnHistoryPrint");
  const btnHistoryClear = el("btnHistoryClear");

  let modalCtx = { playerIndex: null, catKey: null };

  let state = {
    mode: "runter",
    players: [],
    active: 0,
    finalShown: false,
    gameId: null
  };

  // --- helpers
  const clampInt = (n, min, max) => {
    n = Number(n);
    if (!Number.isFinite(n)) n = 0;
    n = Math.round(n);
    if (n < min) n = min;
    if (n > max) n = max;
    return n;
  };

  const normalizeName = (s) => String(s ?? "")
    .trim()
    .replace(/\s+/g, " ");

  const makeGameId = () => String(Date.now()) + "_" + Math.random().toString(16).slice(2);

  // --- history storage
  const loadHistory = () => {
    try { return JSON.parse(localStorage.getItem(STORAGE_HISTORY_KEY) || "[]"); }
    catch { return []; }
  };
  const saveHistory = (arr) => localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(arr));

  // --- save/load current state
  const save = () => {
    try{
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      setupNote.style.display = "block";
      setupNote.textContent = "✓ Gespeichert.";
      setTimeout(()=> setupNote.style.display="none", 900);
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
      state.finalShown ??= false;
      state.gameId ??= makeGameId();
      return true;
    }catch(e){ return false; }
  };

  // Mode ordering
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

  // Sums
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

  const allFieldsFilled = () => {
    if (!state.players.length) return false;
    for (const p of state.players) {
      for (const cat of categories) {
        if (p.scores[cat.key] == null) return false;
      }
    }
    return true;
  };

  // rank helper: returns sorted rows with displayedRank
  const computeRankingRows = () => {
    const rows = state.players.map(p => ({
      name: p.name,
      upper: getUpperWithBonus(p),
      lower: getLowerSum(p),
      total: getTotal(p)
    })).sort((a,b) => b.total - a.total);

    let prev = null;
    let shownRank = 0;
    rows.forEach((r, idx) => {
      const rank = idx + 1;
      if (prev === null || r.total !== prev) shownRank = rank;
      r.rank = rank;
      r.shownRank = shownRank;
      prev = r.total;
    });

    return rows;
  };

  const medalForRank = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return "🏅";
  };

  // --- add finished game to history (idempotent)
  const addFinishedGameToHistory = () => {
    const history = loadHistory();
    if (history.some(g => g.gameId === state.gameId)) return;

    const rows = computeRankingRows();
    const maxTotal = Math.max(...rows.map(r => r.total));
    const winners = rows.filter(r => r.total === maxTotal).map(r => r.name);

    history.unshift({
      gameId: state.gameId,
      finishedAt: new Date().toISOString(),
      mode: state.mode,
      winners,
      results: rows.map(r => ({ name: r.name, total: r.total, upper: r.upper, lower: r.lower, rank: r.shownRank }))
    });

    if (history.length > 300) history.length = 300;
    saveHistory(history);
  };

  // --- Final modal rendering
  const showFinalModal = () => {
    const rows = computeRankingRows();

    finalSub.textContent = `Spiel beendet – ${state.players.length} Spieler · Modus: ${state.mode}`;

    // Podium (Top 3 unique ranks)
    const topRanks = [];
    for (const r of rows) {
      if (!topRanks.includes(r.shownRank)) topRanks.push(r.shownRank);
      if (topRanks.length === 3) break;
    }

    const podiumCards = topRanks.map(rank => {
      const group = rows.filter(x => x.shownRank === rank);
      const names = group.map(x => x.name).join(", ");
      const points = group[0]?.total ?? 0;
      const sub = group.length > 1 ? `Gleichstand · oben ${group[0].upper} · unten ${group[0].lower}` : `oben ${group[0].upper} · unten ${group[0].lower}`;

      return `
        <div class="y-podium-card">
          <div class="y-podium-rank">
            <span>${medalForRank(rank)} Platz ${rank}</span>
            <span class="y-chip">${points} P</span>
          </div>
          <div class="y-podium-name">${names}</div>
          <div class="y-podium-sub">${sub}</div>
        </div>
      `;
    }).join("");

    podiumTop.innerHTML = podiumCards || `<div class="y-fixed-info">Keine Daten.</div>`;

    // Full list
    finalBody.innerHTML = rows.map(r => {
      const chip = `<span class="y-chip">${medalForRank(r.shownRank)} #${r.shownRank}</span>`;
      return `
        <div class="y-rankrow">
          <div>
            <div class="y-rankleft">
              ${chip}
              <div>
                <div style="font-weight:900;">${r.name}</div>
                <div class="y-rankmeta">oben ${r.upper} · unten ${r.lower}</div>
              </div>
            </div>
          </div>
          <div style="font-weight:900; font-size:1.05rem;">${r.total} P</div>
        </div>
      `;
    }).join("");

    finalModal.style.display = "flex";
  };

  const closeFinalModal = () => { finalModal.style.display = "none"; };

  // --- History modal
  const formatMode = (m) => (m === "runter" ? "⬇️ runter" : m === "rauf" ? "⬆️ rauf" : "↕️ durcheinander");

  const fmtDateTime = (iso) => {
    try{
      const d = new Date(iso);
      return d.toLocaleString(undefined, { year:"numeric", month:"2-digit", day:"2-digit", hour:"2-digit", minute:"2-digit" });
    } catch {
      return iso;
    }
  };

  const openHistoryModal = () => {
    const history = loadHistory();
    historySub.textContent = history.length ? `${history.length} gespeicherte Spiele` : "Noch keine gespeicherten Spiele.";

    // wins
    const winMap = new Map();
    for (const g of history) {
      (g.winners || []).forEach(w => winMap.set(w, (winMap.get(w) || 0) + 1));
    }
    const winsArr = [...winMap.entries()].map(([name, wins]) => ({ name, wins }))
      .sort((a,b) => b.wins - a.wins || a.name.localeCompare(b.name));

    historyWins.innerHTML = winsArr.length
      ? winsArr.map((w, idx) => `
          <div class="y-winrow">
            <div><strong>#${idx+1}</strong> ${w.name}</div>
            <div class="y-chip">${w.wins} Sieg${w.wins===1?"":"e"}</div>
          </div>
        `).join("")
      : `<div class="y-fixed-info" style="margin-top:10px;">Noch keine Daten. Erst ein Spiel fertig spielen 😄</div>`;

    // game list
    historyList.innerHTML = history.length
      ? history.map(g => {
          const winners = (g.winners || []).join(", ") || "–";
          const res = (g.results || []).slice().sort((a,b)=> (a.rank||999)-(b.rank||999) || (b.total||0)-(a.total||0));
          const top = res.slice(0, Math.min(6, res.length)).map(r => `
            <div class="y-gamerow">
              <div>${medalForRank(r.rank)} #${r.rank} <strong>${r.name}</strong></div>
              <div><strong>${r.total}</strong> P</div>
            </div>
          `).join("");
          return `
            <div class="y-gamecard">
              <div class="y-gamehead">
                <div>${fmtDateTime(g.finishedAt)} · ${formatMode(g.mode)}</div>
                <div class="y-chip">🏆 ${winners}</div>
              </div>
              <div class="y-gamemeta">Game-ID: ${g.gameId}</div>
              <div class="y-gamerows">${top}</div>
            </div>
          `;
        }).join("")
      : `<div class="y-fixed-info" style="margin-top:10px;">Keine Spiele gespeichert.</div>`;

    historyModal.style.display = "flex";
  };

  const closeHistoryModal = () => { historyModal.style.display = "none"; };

  const printHistory = () => {
    const history = loadHistory();
    const now = new Date().toLocaleString();
    const title = "Yahtzee – Historie";

    const winsHtml = historyWins.innerHTML || "";
    const listHtml = historyList.innerHTML || "";

    const html = `
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <style>
    body{ font-family: Arial, sans-serif; color:#111; padding:24px; }
    h1{ margin:0 0 6px 0; }
    .sub{ color:#444; margin-bottom:18px; }
    .grid{ display:grid; grid-template-columns: 280px 1fr; gap:16px; align-items:start; }
    @media print { .grid{ grid-template-columns: 1fr; } }
    .card{ border:1px solid #ddd; border-radius:12px; padding:12px; }
    .chip{ display:inline-block; border:1px solid #ddd; border-radius:999px; padding:3px 10px; font-weight:700; }
    .winrow, .gamerow{ display:flex; justify-content:space-between; gap:10px; padding:6px 0; border-bottom:1px solid #eee; }
    .winrow:last-child, .gamerow:last-child{ border-bottom:none; }
    .gamecard{ border:1px solid #ddd; border-radius:12px; padding:12px; margin-bottom:12px; }
    .gamehead{ display:flex; justify-content:space-between; gap:10px; flex-wrap:wrap; font-weight:800; }
    .meta{ color:#666; font-size:12px; margin-top:4px; }
    .rows{ margin-top:10px; border-top:1px solid #eee; padding-top:10px; }
    .small{ color:#555; font-size:13px; margin-top:4px; }
  </style>
</head>
<body>
  <h1>${title}</h1>
  <div class="sub">Stand: ${now} · gespeicherte Spiele: ${history.length}</div>

  <div class="grid">
    <div class="card">
      <div style="font-weight:900; margin-bottom:6px;">🏆 Siege</div>
      <div class="small">Gleichstand zählt als Sieg für alle Gewinner.</div>
      <div style="margin-top:10px;">${winsHtml}</div>
    </div>

    <div class="card">
      <div style="font-weight:900; margin-bottom:6px;">🗂️ Spiele</div>
      <div class="small">Neueste oben.</div>
      <div style="margin-top:10px;">${listHtml}</div>
    </div>
  </div>
</body>
</html>`;

    const w = window.open("", "_blank");
    if (!w) {
      alert("Popup wurde blockiert. Bitte Popups für diese Seite erlauben, dann erneut versuchen.");
      return;
    }
    w.document.open();
    w.document.write(html);
    w.document.close();
    w.focus();
    w.print();
  };

  const clearHistory = () => {
    if (!confirm("Historie wirklich löschen? Das kann nicht rückgängig gemacht werden.")) return;
    localStorage.removeItem(STORAGE_HISTORY_KEY);
    openHistoryModal(); // re-render empty state
  };

  // --- Render helpers
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

  const afterScoreChange = () => {
    if (!state.finalShown && allFieldsFilled()) {
      state.finalShown = true;

      // ✅ save to history once
      addFinishedGameToHistory();

      save();
      showFinalModal();
    }
  };

  const applyScoreAndNext = (playerIndex, catKey, scoreVal) => {
    const p = state.players[playerIndex];
    p.scores[catKey] = clampInt(scoreVal, 0, 9999);

    state.active = (state.active + 1) % state.players.length;
    save();
    closeModal();
    renderAll();
    afterScoreChange();
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
      btnChanceFixedBase.textContent = `Normal (${fixedCat.base}P)`;
      btnChanceFixedServed.textContent = `Serviert (${fixedCat.served}P)`;
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
      chanceWrap.style.display = "block";

      // Modus 3 (frei): nur Augensumme
      if (state.mode === "frei") {
        modalSub.textContent = "Chance: nur Augensumme eintragen (Modus ↕️)";
        chanceSelectWrap.style.display = "none";
        chanceFixedInner.style.display = "none";
        chanceManualInner.style.display = "block";
        modalActions.style.display = "flex";
        chanceManualScore.value = "";
        scoreModal.style.display = "flex";
        chanceManualScore.focus();
        return;
      }

      // andere Modi: Hausregel erlaubt
      modalSub.textContent = "Chance: manuell eintragen oder (Hausregel) als Fixziel verwenden";
      chanceSelectWrap.style.display = "block";
      chanceSelect.value = "chance_manual";
      chanceManualInner.style.display = "block";
      chanceFixedInner.style.display = "none";
      modalActions.style.display = "flex";

      setChanceInnerMode();
      chanceSelect.onchange = setChanceInnerMode;

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

    // manual category
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
      if (state.mode !== "frei" && chanceSelect.value !== "chance_manual") return;
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

  // Final modal events
  finalBackdrop.addEventListener("click", closeFinalModal);
  btnFinalClose.addEventListener("click", closeFinalModal);

  btnFinalHistory.addEventListener("click", () => {
    closeFinalModal();
    openHistoryModal();
  });

  // History modal events
  historyBackdrop.addEventListener("click", closeHistoryModal);
  btnHistoryClose.addEventListener("click", closeHistoryModal);
  btnHistoryPrint.addEventListener("click", printHistory);
  btnHistoryClear.addEventListener("click", clearHistory);

  // History buttons
  btnHistory.addEventListener("click", openHistoryModal);
  btnHistoryTop.addEventListener("click", openHistoryModal);

  // Setup
  const startGame = (names, mode) => {
    const clean = names.map(normalizeName).filter(n=>n.length>0);
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
    state.finalShown = false;
    state.gameId = makeGameId();

    turnArea.style.display = "block";
    tableArea.style.display = "block";

    // Update input display
    playerInput.value = clean.join(", ");

    save();
    renderAll();
  };

  const restartRoundWithOrder = (orderNames) => {
    const mode = state.mode; // keep same mode as finished game
    startGame(orderNames, mode);

    // reflect mode radio
    const r = document.querySelector(`input[name="mode"][value="${mode}"]`);
    if (r) r.checked = true;

    closeFinalModal();
  };

  btnNewRoundSame.addEventListener("click", () => {
    const order = state.players.map(p => p.name);
    restartRoundWithOrder(order);
  });

  btnNewRoundLoser.addEventListener("click", () => {
    const rows = computeRankingRows();
    const minTotal = Math.min(...rows.map(r => r.total));

    // loser group in CURRENT player order (variant 2: all last players to front)
    const nameToTotal = new Map(rows.map(r => [r.name, r.total]));
    const currentOrder = state.players.map(p => p.name);

    const losers = currentOrder.filter(n => (nameToTotal.get(n) ?? 0) === minTotal);
    const others = currentOrder.filter(n => (nameToTotal.get(n) ?? 0) !== minTotal);

    restartRoundWithOrder([...losers, ...others]);
  });

  btnStart.addEventListener("click", () => {
    const names = playerInput.value.split(",");
    const mode = document.querySelector('input[name="mode"]:checked')?.value || "runter";
    startGame(names, mode);
  });

  btnResetAll.addEventListener("click", () => {
    // deletes only current game state, history remains
    localStorage.removeItem(STORAGE_KEY);
    state = { mode: "runter", players: [], active: 0, finalShown: false, gameId: null };
    turnArea.style.display = "none";
    tableArea.style.display = "none";
    setupNote.style.display = "block";
    setupNote.textContent = "Aktuelles Spiel gelöscht. Historie bleibt erhalten.";
  });

  btnSave.addEventListener("click", save);

  // Init
  const loaded = load();
  if (loaded && state.players.length > 0) {
    turnArea.style.display = "block";
    tableArea.style.display = "block";

    playerInput.value = state.players.map(p=>p.name).join(", ");
    const r = document.querySelector(`input[name="mode"][value="${state.mode}"]`);
    if (r) r.checked = true;

    renderAll();

    // Falls fertiger Stand geladen wurde:
    if (!state.finalShown && allFieldsFilled()) {
      state.finalShown = true;
      addFinishedGameToHistory();
      save();
      showFinalModal();
    }
  }
})();
</script>
