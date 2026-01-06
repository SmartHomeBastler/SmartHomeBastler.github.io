---
title: Runter Würfeln – Punkte Tracker
subtitle: 🎲 Punkte jagen · 🐟 Null halten · ❌ rausfliegen
description: Punkte-Tracker für „Runter Würfeln“ mit beliebig vielen Spielern. <30 = Differenzabzug, >30 = Überschuss trifft nächsten verfügbaren Spieler.
layout: page
show_sidebar: false
---

<div class="shb-main-container" id="app">
  <h1 class="shb-main-title">🎲 Runter Würfeln – Tracker</h1>

  <div class="rw-grid">
    <!-- LEFT: Setup / Controls -->
    <section class="rw-card">

      <!-- Header "Spiel" + kleiner Help Button -->
      <div class="rw-row rw-row-between" style="margin:0 0 10px 0;">
        <h2 class="rw-h2" style="margin:0;">Spiel</h2>
        <button class="rw-btn rw-btn-ghost rw-btn-small" id="btnHelp" title="Spielanleitung">❓</button>
      </div>

      <div class="rw-row">
        <button class="rw-btn" id="btnNewGame">🧼 Neues Spiel</button>
        <button class="rw-btn rw-btn-ghost" id="btnResetAll">🗑️ Alles löschen</button>
      </div>

      <div class="rw-sep"></div>

      <div id="setupBlock">
        <h3 class="rw-h3">Spieler hinzufügen</h3>

        <div class="rw-row">
          <input id="playerName" class="rw-input" type="text" placeholder="Name (z.B. Maxx)" maxlength="20" />
          <button class="rw-btn" id="btnAddPlayer">➕</button>
        </div>

        <div class="rw-row rw-row-wrap" id="playerChips"></div>

        <div class="rw-row">
          <button class="rw-btn rw-btn-primary" id="btnStartGame" disabled>▶️ Spiel starten</button>
        </div>

        <p class="rw-note">
          Startguthaben: <strong>30</strong> pro Spieler. <br/>
          Regel: Status: <strong>🎲</strong> = im Plus, <strong>🐟</strong> = 0, <strong>❌</strong> = RAUS (übersprungen). <strong>Negativ</strong> = wird übersprungen.
        </p>
      </div>

      <div id="playBlock" class="rw-hidden">
        <h3 class="rw-h3">Runde <span id="roundNo">1</span></h3>

        <div class="rw-callout">
          <div class="rw-callout-title">Dran ist:</div>
          <div class="rw-callout-big" id="currentPlayer">–</div>
        </div>

        <div class="rw-row rw-row-wrap">
          <label class="rw-label" for="sumInput">Geworfene Summe</label>
          <input id="sumInput" class="rw-input" type="number" min="0" max="999" inputmode="numeric" placeholder="z.B. 27 / 30 / 34" />
          <button class="rw-btn rw-btn-ghost" id="btnQuick30">=30</button>
        </div>

        <div id="overshootBlock" class="rw-hidden">
          <div class="rw-sep"></div>
          <div class="rw-callout rw-callout-warn">
            <div><strong>Überschuss:</strong> <span id="overshootValue">–</span></div>
            <div class="rw-note">Gib nur die <strong>Anzahl Trefferwürfel</strong> an. Abzug = Treffer × Überschuss.</div>
          </div>

          <div class="rw-row rw-row-wrap">
            <label class="rw-label">Trefferwürfel</label>
            <div class="rw-stepper">
              <button class="rw-btn rw-btn-ghost" id="hitsMinus">−</button>
              <input id="hitsInput" class="rw-input rw-input-small" type="number" min="0" max="999" value="0" inputmode="numeric" />
              <button class="rw-btn rw-btn-ghost" id="hitsPlus">+</button>
            </div>
          </div>

          <div class="rw-row rw-row-wrap">
            <div class="rw-note">
              Ziel: <strong id="targetPlayer">–</strong><br/>
              Abzug beim Ziel: <strong id="penaltyPreview">0</strong>
            </div>
          </div>
        </div>

        <div class="rw-row">
          <button class="rw-btn rw-btn-primary" id="btnSaveTurn">💾 Zug speichern</button>
          <button class="rw-btn rw-btn-ghost" id="btnUndo" disabled>↩️ Undo</button>
        </div>

        <div class="rw-sep"></div>

        <div class="rw-row">
          <button class="rw-btn" id="btnFinishGame">🏁 Spiel beenden & Auswertung</button>
        </div>
      </div>
    </section>

    <!-- RIGHT: Scoreboard / Rounds -->
    <section class="rw-card">
      <h2 class="rw-h2">Spielstand</h2>

      <div id="scoreboard"></div>

      <div class="rw-sep"></div>

      <h2 class="rw-h2">Runden</h2>
      <div id="rounds"></div>
    </section>
  </div>

  <!-- RESULT MODAL -->
  <div id="resultModal" class="rw-modal rw-hidden" role="dialog" aria-modal="true">
    <div class="rw-modal-backdrop" id="modalCloseBg"></div>
    <div class="rw-modal-card">
      <div class="rw-row">
        <h2 class="rw-h2" style="margin:0;">🏆 Auswertung</h2>
        <button class="rw-btn rw-btn-ghost" id="modalClose">✖</button>
      </div>

      <div id="finalRanking"></div>

      <div class="rw-sep"></div>

      <div class="rw-row rw-row-wrap">
        <button class="rw-btn" id="btnExportPdf">🖨️ PDF / Drucken</button>
        <button class="rw-btn" id="btnExportJson">📤 Export JSON</button>
        <button class="rw-btn rw-btn-ghost" id="btnCopySummary">📋 Summary kopieren</button>
      </div>

      <p class="rw-note">Tipp: Auf iPhone Safari → Teilen → „Zum Home-Bildschirm“ = fühlt sich an wie eine App 😉</p>
    </div>
  </div>

  <!-- HELP MODAL -->
  <div id="helpModal" class="rw-modal rw-hidden" role="dialog" aria-modal="true">
    <div class="rw-modal-backdrop" id="helpCloseBg"></div>
    <div class="rw-modal-card">
      <div class="rw-row">
        <h2 class="rw-h2" style="margin:0;">📖 Spielanleitung</h2>
        <button class="rw-btn rw-btn-ghost" id="helpClose">✖</button>
      </div>

      <div class="rw-callout" style="margin-top:10px; line-height:1.55;">
        <p><strong>Ziel:</strong> Wer am Ende als einziger <strong>nicht negativ</strong> ist, gewinnt. (Oder – falls mehrere überleben – der höchste Endstand.)</p>

        <p><strong>Start:</strong> Jeder Spieler startet mit <strong>30</strong>.</p>

        <ul style="margin:8px 0 0 18px;">
          <li><strong>Summe &lt; 30:</strong> Differenz wird bei dir abgezogen.<br/>
            Beispiel: 27 ⇒ −3 bei dir.</li>

          <li><strong>Summe = 30:</strong> Perfekt – keine Änderung.</li>

          <li><strong>Summe &gt; 30:</strong> <strong>Überschuss</strong> = Summe − 30.<br/>
            Du gibst <strong>Treffer</strong> an. Abzug = Treffer × Überschuss → trifft den <strong>nächsten verfügbaren Spieler</strong>.</li>

          <li><strong>Negativ:</strong> Spieler mit &lt; 0 ist <strong>❌ raus</strong> und wird übersprungen.</li>

          <li><strong>🐟 bei 0:</strong> bleibt spielbar.</li>
        </ul>

        <p style="margin-top:10px;">
          <strong>Bedienung:</strong><br/>
          💾 Zug speichern = Zug fixieren<br/>
          ↩️ Undo = letzten Zug rückgängig<br/>
          🏁 Spiel beenden = Auswertung + Export
        </p>

        <p class="rw-note" style="margin-top:12px;">
          Tipp: Mit <strong>ESC</strong> kannst du Popups schließen (Desktop).
        </p>
      </div>
    </div>
  </div>
</div>

<style>
  /* Fallback-Styles (harmonieren meist gut mit Bulma / SHB) */
  .rw-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
  @media (min-width: 900px){ .rw-grid { grid-template-columns: 380px 1fr; } }

  .rw-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 14px; }
  .rw-h2 { font-size: 1.2rem; margin: 0 0 10px 0; }
  .rw-h3 { font-size: 1.0rem; margin: 10px 0; opacity: 0.95; }
  .rw-row { display:flex; gap:10px; align-items:center; margin: 8px 0; }
  .rw-row-between { justify-content: space-between; }
  .rw-row-wrap { flex-wrap: wrap; }
  .rw-label { font-size: 0.9rem; opacity: 0.9; }
  .rw-input { padding: 10px 12px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.12); background: rgba(0,0,0,0.25); color: inherit; outline: none; min-width: 220px; }
  .rw-input-small { min-width: 90px; width: 90px; text-align:center; }
  .rw-btn { padding: 10px 12px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.06); color: inherit; cursor:pointer; }
  .rw-btn:hover { background: rgba(255,255,255,0.09); }
  .rw-btn:disabled { opacity: 0.5; cursor:not-allowed; }
  .rw-btn-primary { background: rgba(21,152,179,0.25); border-color: rgba(21,152,179,0.5); }
  .rw-btn-primary:hover { background: rgba(21,152,179,0.35); }
  .rw-btn-ghost { background: transparent; }
  .rw-btn-small { padding: 6px 10px; border-radius: 10px; font-size: 0.95rem; line-height: 1; }
  .rw-note { font-size: 0.9rem; opacity: 0.85; margin: 8px 0 0; }
  .rw-sep { height: 1px; background: rgba(255,255,255,0.08); margin: 12px 0; }

  .rw-chip { display:inline-flex; gap:8px; align-items:center; padding: 8px 10px; border: 1px solid rgba(255,255,255,0.12); border-radius: 999px; background: rgba(255,255,255,0.05); }
  .rw-chip button { padding: 6px 8px; border-radius: 999px; }

  .rw-callout { border-radius: 14px; padding: 12px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.10); }
  .rw-callout-warn { background: rgba(255,200,0,0.08); border-color: rgba(255,200,0,0.20); }
  .rw-callout-title { font-size: 0.9rem; opacity: 0.85; }
  .rw-callout-big { font-size: 1.4rem; font-weight: 700; margin-top: 2px; }

  .rw-stepper { display:flex; gap:8px; align-items:center; }

  .rw-table { width:100%; border-collapse: collapse; }
  .rw-table th, .rw-table td { padding: 10px 8px; border-bottom: 1px solid rgba(255,255,255,0.08); text-align:left; }
  .rw-table th { opacity: 0.85; font-weight: 600; }
  .rw-badge { display:inline-block; padding: 4px 8px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.12); opacity: 0.9; font-size: 0.85rem; }
  .rw-out { opacity: 0.6; }

  .rw-hidden { display:none !important; }

  .rw-modal { position: fixed; inset: 0; display:flex; align-items:center; justify-content:center; z-index: 9999; }
  .rw-modal-backdrop { position:absolute; inset:0; background: rgba(0,0,0,0.6); }
  .rw-modal-card { position: relative; width: min(820px, 94vw); max-height: 90vh; overflow:auto; background: rgba(15,15,15,0.92); border: 1px solid rgba(255,255,255,0.14); border-radius: 16px; padding: 14px; }
</style>

<script>
(() => {
  const STORAGE_KEY = "runter_wuerfeln_v1";

  const el = (id) => document.getElementById(id);

  const ui = {
    btnNewGame: el("btnNewGame"),
    btnResetAll: el("btnResetAll"),
    btnHelp: el("btnHelp"),

    playerName: el("playerName"),
    btnAddPlayer: el("btnAddPlayer"),
    playerChips: el("playerChips"),
    btnStartGame: el("btnStartGame"),
    setupBlock: el("setupBlock"),
    playBlock: el("playBlock"),

    roundNo: el("roundNo"),
    currentPlayer: el("currentPlayer"),
    sumInput: el("sumInput"),
    btnQuick30: el("btnQuick30"),
    overshootBlock: el("overshootBlock"),
    overshootValue: el("overshootValue"),
    hitsInput: el("hitsInput"),
    hitsMinus: el("hitsMinus"),
    hitsPlus: el("hitsPlus"),
    targetPlayer: el("targetPlayer"),
    penaltyPreview: el("penaltyPreview"),
    btnSaveTurn: el("btnSaveTurn"),
    btnUndo: el("btnUndo"),
    btnFinishGame: el("btnFinishGame"),

    scoreboard: el("scoreboard"),
    rounds: el("rounds"),

    resultModal: el("resultModal"),
    modalCloseBg: el("modalCloseBg"),
    modalClose: el("modalClose"),
    finalRanking: el("finalRanking"),
    btnExportJson: el("btnExportJson"),
    btnCopySummary: el("btnCopySummary"),
    btnExportPdf: el("btnExportPdf"),

    helpModal: el("helpModal"),
    helpCloseBg: el("helpCloseBg"),
    helpClose: el("helpClose"),
  };

  /** State */
  let state = load() ?? newGameState();

  state.players.forEach(p => p.balance = balanceNum(p.balance));
  save();

  function newGameState() {
    return {
      version: 1,
      started: false,
      createdAt: new Date().toISOString(),
      players: [], // {id, name, balance}
      currentPlayerId: null,
      round: 1,
      rounds: [], // {no, turns:[], endBalances:[{id,balance}]}
      currentRoundTurns: [], // turns for this round
      playedThisRound: [], // array of player ids who took a turn (for persistence)
      history: [], // snapshots for Undo
    };
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  function resetAll() {
    localStorage.removeItem(STORAGE_KEY);
    state = newGameState();
    renderAll();
  }

  function balanceNum(v) {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  }

  function statusIcon(balance) {
    const b = balanceNum(balance);
    if (b > 0) return "🎲";
    if (b === 0) return "🐟";
    return "❌";
  }

  function formatBalance(v) {
    return String(balanceNum(v)); // immer Zahl als Text (auch 0 und negativ)
  }

  function isAvailable(p) {
    return balanceNum(p.balance) >= 0; // 0 ist ok, negativ nicht
  }

  function getPlayer(id) {
    return state.players.find(p => p.id === id);
  }

  function availablePlayerIds() {
    return state.players.filter(isAvailable).map(p => p.id);
  }

  function nextAvailablePlayerId(fromId) {
    const idx = state.players.findIndex(p => p.id === fromId);
    if (idx < 0) return state.players.find(isAvailable)?.id ?? null;

    for (let step = 1; step <= state.players.length; step++) {
      const p = state.players[(idx + step) % state.players.length];
      if (p && isAvailable(p)) return p.id;
    }
    return null;
  }

  function computeOvershoot(sum) {
    if (sum > 30) return sum - 30;
    return 0;
  }

  function pushUndoSnapshot() {
    state.history.push(JSON.stringify(state));
    if (state.history.length > 50) state.history.shift();
  }

  function undo() {
    const last = state.history.pop();
    if (!last) return;
    state = JSON.parse(last);
    save();
    renderAll();
  }

  function addPlayer(name) {
    const trimmed = name.trim();
    if (!trimmed) return;

    const id = crypto?.randomUUID?.() ?? (Date.now().toString(36) + Math.random().toString(36).slice(2));
    state.players.push({ id, name: trimmed, balance: 30 });
    if (!state.currentPlayerId) state.currentPlayerId = id;
    save();
    renderAll();
  }

  function removePlayer(id) {
    state.players = state.players.filter(p => p.id !== id);
    if (state.currentPlayerId === id) {
      const next = state.players[0]?.id ?? null;
      state.currentPlayerId = next;
    }
    save();
    renderAll();
  }

  function startGame() {
    if (state.players.length < 2) return;
    state.started = true;
    const firstAvail = state.players.find(isAvailable)?.id ?? state.players[0].id;
    state.currentPlayerId = firstAvail;
    save();
    renderAll();
  }

  function maybeEndRound() {
    const currentAvail = availablePlayerIds();
    const playedSet = new Set(state.playedThisRound);
    const allPlayed = currentAvail.every(id => playedSet.has(id));

    if (currentAvail.length <= 1) {
      endGame(true);
      return;
    }

    if (allPlayed) {
      state.rounds.push({
        no: state.round,
        turns: state.currentRoundTurns,
        endBalances: state.players.map(p => ({ id: p.id, balance: p.balance })),
        endedAt: new Date().toISOString(),
      });
      state.round += 1;
      state.currentRoundTurns = [];
      state.playedThisRound = [];
      save();
    }
  }

  function saveTurn() {
    const current = getPlayer(state.currentPlayerId);
    if (!current || !isAvailable(current)) {
      const nxt = nextAvailablePlayerId(state.currentPlayerId);
      if (nxt) state.currentPlayerId = nxt;
      save();
      renderAll();
      return;
    }

    const sum = Number(ui.sumInput.value);
    if (!Number.isFinite(sum)) return;

    pushUndoSnapshot();

    let diff = 0;
    let overshoot = 0;
    let hits = 0;
    let penalty = 0;
    let targetId = null;

    if (sum < 30) {
      diff = 30 - sum;
      current.balance = balanceNum(current.balance) - diff;

    } else if (sum === 30) {
      // nothing

    } else { // sum > 30
      overshoot = sum - 30;
      hits = clampInt(Number(ui.hitsInput.value), 0, 999);
      penalty = hits * overshoot;

      targetId = nextAvailablePlayerId(current.id);

      if (!targetId || targetId === current.id) {
        targetId = null;
        penalty = 0;
      } else {
        const target = getPlayer(targetId);
        if (target) target.balance = balanceNum(target.balance) - penalty;
      }
    }

    const turn = {
      round: state.round,
      playerId: current.id,
      playerName: current.name,
      sum,
      diff,
      overshoot,
      hits,
      penalty,
      targetId,
      targetName: targetId ? (getPlayer(targetId)?.name ?? null) : null,
      time: new Date().toISOString()
    };

    state.currentRoundTurns.push(turn);
    if (!state.playedThisRound.includes(current.id)) state.playedThisRound.push(current.id);

    const nextId = nextAvailablePlayerId(current.id);
    if (nextId) state.currentPlayerId = nextId;

    ui.sumInput.value = "";
    ui.hitsInput.value = "0";
    ui.overshootBlock.classList.add("rw-hidden");

    maybeEndRound();
    save();
    renderAll();
  }

  function clampInt(v, min, max) {
    const x = Math.round(v);
    if (!Number.isFinite(x)) return min;
    return Math.max(min, Math.min(max, x));
  }

  function endGame(auto = false) {
    if (state.currentRoundTurns.length > 0) {
      state.rounds.push({
        no: state.round,
        turns: state.currentRoundTurns,
        endBalances: state.players.map(p => ({ id: p.id, balance: p.balance })),
        endedAt: new Date().toISOString(),
      });
      state.round += 1;
      state.currentRoundTurns = [];
      state.playedThisRound = [];
      save();
    }
    renderAll();
    showResultModal(auto);
  }

  function showResultModal(auto) {
    const ranking = computeRanking();
    const winner = ranking.find(r => balanceNum(r.balance) >= 0) ?? ranking[0];

    const html = `
      <div class="rw-callout">
        <div class="rw-callout-title">${auto ? "Spielende erkannt:" : "Spiel beendet:"}</div>
        <div class="rw-callout-big">🥇 ${winner ? winner.name : "–"}</div>
        <div class="rw-note">Platzierungen nach Endstand (🐟 = 0, negativ = raus)</div>
      </div>

      <table class="rw-table" style="margin-top:10px;">
        <thead>
          <tr><th>Platz</th><th>Spieler</th><th>Endstand</th><th>Status</th></tr>
        </thead>
        <tbody>
          ${ranking.map((r, idx) => {
            const bal = balanceNum(r.balance);
            const status = statusIcon(bal);
            const cls = bal < 0 ? "rw-out" : "";

            return `<tr class="${cls}">
              <td><span class="rw-badge">${idx+1}</span></td>
              <td>${escapeHtml(r.name)}</td>
              <td><strong>${formatBalance(bal)}</strong></td>
              <td>${status}</td>
            </tr>`;
          }).join("")}
        </tbody>
      </table>
    `;
    ui.finalRanking.innerHTML = html;
    ui.resultModal.classList.remove("rw-hidden");
  }

  function hideResultModal() {
    ui.resultModal.classList.add("rw-hidden");
  }

  function showHelpModal() {
    ui.helpModal.classList.remove("rw-hidden");
  }

  function hideHelpModal() {
    ui.helpModal.classList.add("rw-hidden");
  }

  function computeRanking() {
    const copy = state.players.map(p => ({ ...p }));

    copy.sort((a, b) => {
      const aBal = balanceNum(a.balance);
      const bBal = balanceNum(b.balance);

      const aAvail = aBal >= 0 ? 0 : 1;
      const bAvail = bBal >= 0 ? 0 : 1;
      if (aAvail !== bAvail) return aAvail - bAvail;

      if (aAvail === 0) return bBal - aBal; // verfügbar: höher zuerst
      return bBal - aBal; // negativ: weniger negativ zuerst
    });

    return copy;
  }

  function renderSetup() {
    ui.playerChips.innerHTML = state.players.map(p => `
      <span class="rw-chip">
        <strong>${escapeHtml(p.name)}</strong>
        <span class="rw-badge">${formatBalance(p.balance)} ${statusIcon(p.balance)}</span>
        ${state.started ? "" : `<button class="rw-btn rw-btn-ghost" data-remove="${p.id}">✖</button>`}
      </span>
    `).join("");

    ui.btnStartGame.disabled = state.players.length < 2 || state.started;
    ui.setupBlock.classList.toggle("rw-hidden", state.started);
    ui.playBlock.classList.toggle("rw-hidden", !state.started);

    ui.playerChips.querySelectorAll("[data-remove]").forEach(btn => {
      btn.addEventListener("click", () => removePlayer(btn.getAttribute("data-remove")));
    });
  }

  function renderPlay() {
    ui.roundNo.textContent = String(state.round);

    const current = getPlayer(state.currentPlayerId);
    ui.currentPlayer.textContent = current ? current.name : "–";

    ui.btnUndo.disabled = state.history.length === 0;

    const sum = Number(ui.sumInput.value);
    const showOver = Number.isFinite(sum) && sum > 30;
    ui.overshootBlock.classList.toggle("rw-hidden", !showOver);

    if (showOver) {
      const overshoot = computeOvershoot(sum);
      ui.overshootValue.textContent = String(overshoot);
      const hits = clampInt(Number(ui.hitsInput.value), 0, 999);
      ui.hitsInput.value = String(hits);

      let targetId = current ? nextAvailablePlayerId(current.id) : null;
      if (targetId === current?.id) targetId = null;

      const target = targetId ? getPlayer(targetId) : null;
      ui.targetPlayer.textContent = target ? `${target.name} (${formatBalance(target.balance)})` : "–";
      ui.penaltyPreview.textContent = String(hits * overshoot);
    }
  }

  function renderScoreboard() {
    if (state.players.length === 0) {
      ui.scoreboard.innerHTML = `<p class="rw-note">Noch keine Spieler. Erstmal Namen rein, dann geht’s los 🎲</p>`;
      return;
    }

    const rows = state.players.map(p => {
      const bal = balanceNum(p.balance);
      const isOut = bal < 0;
      const isCurrent = p.id === state.currentPlayerId && state.started;

      return `
        <tr class="${isOut ? "rw-out" : ""}">
          <td>${escapeHtml(p.name)} ${isCurrent ? "👉" : ""}</td>
          <td><strong>${bal}</strong></td>
          <td>${statusIcon(bal)}</td>
        </tr>
      `;
    }).join("");

    ui.scoreboard.innerHTML = `
      <table class="rw-table">
        <thead><tr><th>Spieler</th><th>Guthaben</th><th>Status</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <p class="rw-note">Regel: Kommst du ins <strong>Minus</strong> bist du raus. 🐟 schwimmt weiter.</p>
    `;
  }

  function renderRounds() {
    if (state.rounds.length === 0 && state.currentRoundTurns.length === 0) {
      ui.rounds.innerHTML = `<p class="rw-note">Noch keine Runde gespeichert. Sobald eine Runde „voll“ ist, landet sie hier.</p>`;
      return;
    }

    const roundCards = state.rounds.map(r => {
      const end = r.endBalances.map(x => {
        const p = getPlayer(x.id);
        const bal = balanceNum(x.balance);
        const name = p ? escapeHtml(p.name) : "?";
        return `${name}: <strong>${formatBalance(bal)}</strong> ${statusIcon(bal)}`;
      }).join(" · ");

      const turns = r.turns.map(t => {
        const parts = [];
        parts.push(`<strong>${escapeHtml(t.playerName)}</strong> → ${t.sum}`);
        if (t.sum < 30) parts.push(`(−${t.diff} selbst)`);
        if (t.sum === 30) parts.push(`(✓)`);
        if (t.sum > 30) parts.push(`(Ü ${t.overshoot}, Treffer ${t.hits} ⇒ −${t.penalty} an ${escapeHtml(t.targetName || "–")})`);
        return `<li>${parts.join(" ")}</li>`;
      }).join("");

      return `
        <details class="rw-callout" style="margin:10px 0;">
          <summary><strong>Runde ${r.no}</strong> <span class="rw-note">– Endstände: ${end}</span></summary>
          <ul style="margin:10px 0 0 18px;">${turns}</ul>
        </details>
      `;
    }).join("");

    const currentPreview = state.currentRoundTurns.length > 0 ? `
      <details class="rw-callout rw-callout-warn" style="margin:10px 0;">
        <summary><strong>Runde ${state.round} (läuft gerade)</strong> <span class="rw-note">– bisherige Züge: ${state.currentRoundTurns.length}</span></summary>
        <ul style="margin:10px 0 0 18px;">
          ${state.currentRoundTurns.map(t => {
            const parts = [];
            parts.push(`<strong>${escapeHtml(t.playerName)}</strong> → ${t.sum}`);
            if (t.sum < 30) parts.push(`(−${t.diff} selbst)`);
            if (t.sum === 30) parts.push(`(✓)`);
            if (t.sum > 30) parts.push(`(Ü ${t.overshoot}, Treffer ${t.hits} ⇒ −${t.penalty} an ${escapeHtml(t.targetName || "–")})`);
            return `<li>${parts.join(" ")}</li>`;
          }).join("")}
        </ul>
      </details>
    ` : "";

    ui.rounds.innerHTML = currentPreview + roundCards;
  }

  function renderAll() {
    renderSetup();
    renderScoreboard();
    renderRounds();
    if (state.started) renderPlay();
  }

  function escapeHtml(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "runter-wuerfeln.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function copySummary() {
    const ranking = computeRanking();
    const lines = [];
    lines.push(`Runter Würfeln – Summary`);
    lines.push(`Runden gespeichert: ${state.rounds.length}`);
    lines.push(`Stand:`);
    ranking.forEach((p, i) => {
      lines.push(`${i+1}. ${p.name}: ${formatBalance(p.balance)}`);
    });
    const text = lines.join("\n");
    navigator.clipboard?.writeText(text);
    alert("Summary kopiert ✅");
  }

  function exportPdf() {
    const ranking = computeRanking();

    const allRounds = [
      ...state.rounds,
      ...(state.currentRoundTurns.length > 0 ? [{
        no: state.round,
        turns: state.currentRoundTurns,
        endBalances: state.players.map(p => ({ id: p.id, balance: p.balance })),
        endedAt: null
      }] : [])
    ];

    const now = new Date();
    const dateStr = now.toLocaleString();

    const rankingRows = ranking.map((p, i) => {
      const bal = balanceNum(p.balance);
      return `
        <tr>
          <td>${i + 1}</td>
          <td>${escapeHtml(p.name)}</td>
          <td style="text-align:right;"><strong>${formatBalance(bal)}</strong></td>
          <td style="text-align:center;">${statusIcon(bal)}</td>
        </tr>
      `;
    }).join("");

    const roundsHtml = allRounds.map(r => {
      const end = (r.endBalances || []).map(x => {
        const pl = getPlayer(x.id);
        const bal = balanceNum(x.balance);
        return `${pl ? escapeHtml(pl.name) : "?"}: <strong>${formatBalance(bal)}</strong> ${statusIcon(bal)}`;
      }).join(" · ");

      const turnsRows = (r.turns || []).map(t => {
        const selfText =
          t.sum < 30 ? `−${t.diff} (selbst)` :
          t.sum === 30 ? `✓` :
          `Ü ${t.overshoot}`;

        const targetText =
          t.sum > 30 && t.penalty > 0
            ? `−${t.penalty} an ${escapeHtml(t.targetName || "–")}`
            : "–";

        return `
          <tr>
            <td>${escapeHtml(t.playerName)}</td>
            <td style="text-align:right;">${t.sum}</td>
            <td>${selfText}</td>
            <td style="text-align:right;">${t.hits ?? 0}</td>
            <td>${targetText}</td>
            <td style="font-size:12px; opacity:.8;">${new Date(t.time).toLocaleTimeString()}</td>
          </tr>
        `;
      }).join("");

      return `
        <div class="section">
          <h3>Runde ${r.no}${r.endedAt ? "" : " (läuft)"}</h3>
          <div class="muted">Endstände: ${end || "–"}</div>

          <table>
            <thead>
              <tr>
                <th>Spieler</th>
                <th style="text-align:right;">Summe</th>
                <th>Ergebnis</th>
                <th style="text-align:right;">Treffer</th>
                <th>Ziel-Abzug</th>
                <th>Zeit</th>
              </tr>
            </thead>
            <tbody>
              ${turnsRows || '<tr><td colspan="6" class="muted">Keine Züge</td></tr>'}
            </tbody>
          </table>
        </div>
      `;
    }).join("");

    const winner = ranking.find(r => balanceNum(r.balance) >= 0) ?? ranking[0];

    const html = `
<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Runter Würfeln – Export</title>
  <style>
    :root { color-scheme: light; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; margin: 22px; }
    h1 { margin: 0 0 6px 0; font-size: 22px; }
    .muted { color: #555; font-size: 13px; margin-top: 4px; }
    .meta { margin: 10px 0 16px 0; font-size: 13px; color: #333; }
    .card { border: 1px solid #ddd; border-radius: 12px; padding: 14px; margin: 14px 0; }
    .section { margin-top: 18px; page-break-inside: avoid; }
    h3 { margin: 12px 0 6px 0; font-size: 16px; }
    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    th, td { border-bottom: 1px solid #e5e5e5; padding: 8px; font-size: 13px; vertical-align: top; }
    th { text-align: left; background: #fafafa; }
    .right { text-align: right; }
    .center { text-align: center; }
    @media print {
      body { margin: 10mm; }
      .noprint { display: none !important; }
    }
  </style>
</head>
<body>
  <h1>🎲 Runter Würfeln – Spielbericht</h1>
  <div class="meta">
    Export: ${escapeHtml(dateStr)}<br>
    Spieler: ${state.players.map(p => escapeHtml(p.name)).join(", ")}<br>
    Sieger: <strong>${winner ? escapeHtml(winner.name) : "–"}</strong>
  </div>

  <div class="card">
    <h3>🏆 Endwertung</h3>
    <table>
      <thead><tr><th>Platz</th><th>Spieler</th><th class="right">Endstand</th><th class="center">Status</th></tr></thead>
      <tbody>${rankingRows}</tbody>
    </table>
  </div>

  <div class="card">
    <h3>📚 Runden</h3>
    ${roundsHtml || '<div class="muted">Keine Runden vorhanden.</div>'}
  </div>

  <div class="noprint muted">
    Tipp: Im Druckdialog „Als PDF sichern“ auswählen.
  </div>
</body>
</html>`;

    const w = window.open("", "_blank");
    if (!w) {
      alert("Pop-up blockiert 😅 Bitte Pop-ups erlauben oder Seite direkt drucken.");
      return;
    }
    w.document.open();
    w.document.write(html);
    w.document.close();

    setTimeout(() => w.print(), 250);
  }

  // Events
  ui.btnAddPlayer.addEventListener("click", () => {
    addPlayer(ui.playerName.value);
    ui.playerName.value = "";
    ui.playerName.focus();
  });
  ui.playerName.addEventListener("keydown", (e) => {
    if (e.key === "Enter") ui.btnAddPlayer.click();
  });

  ui.btnStartGame.addEventListener("click", startGame);

  ui.btnNewGame.addEventListener("click", () => {
    if (state.players.length === 0) return;
    pushUndoSnapshot();
    state.started = true;
    state.round = 1;
    state.rounds = [];
    state.currentRoundTurns = [];
    state.playedThisRound = [];
    state.players.forEach(p => p.balance = 30);
    state.currentPlayerId = state.players.find(isAvailable)?.id ?? state.players[0].id;
    save();
    renderAll();
  });

  ui.btnResetAll.addEventListener("click", () => {
    if (confirm("Wirklich ALLES löschen? (Spieler, Runden, Stand)")) resetAll();
  });

  ui.btnQuick30.addEventListener("click", () => {
    ui.sumInput.value = "30";
    ui.overshootBlock.classList.add("rw-hidden");
  });

  ui.sumInput.addEventListener("input", () => renderPlay());

  ui.hitsMinus.addEventListener("click", () => {
    ui.hitsInput.value = String(clampInt(Number(ui.hitsInput.value) - 1, 0, 999));
    renderPlay();
  });
  ui.hitsPlus.addEventListener("click", () => {
    ui.hitsInput.value = String(clampInt(Number(ui.hitsInput.value) + 1, 0, 999));
    renderPlay();
  });
  ui.hitsInput.addEventListener("input", () => {
    ui.hitsInput.value = String(clampInt(Number(ui.hitsInput.value), 0, 999));
    renderPlay();
  });

  ui.btnSaveTurn.addEventListener("click", saveTurn);
  ui.btnUndo.addEventListener("click", undo);
  ui.btnFinishGame.addEventListener("click", () => endGame(false));

  ui.modalCloseBg.addEventListener("click", hideResultModal);
  ui.modalClose.addEventListener("click", hideResultModal);
  ui.btnExportJson.addEventListener("click", exportJson);
  ui.btnCopySummary.addEventListener("click", copySummary);
  ui.btnExportPdf.addEventListener("click", exportPdf);

  // Help modal events
  ui.btnHelp.addEventListener("click", showHelpModal);
  ui.helpCloseBg.addEventListener("click", hideHelpModal);
  ui.helpClose.addEventListener("click", hideHelpModal);

  // ESC closes modals (desktop)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hideHelpModal();
      hideResultModal();
    }
  });

  // Init
  if (state.started && state.currentPlayerId) {
    const cp = getPlayer(state.currentPlayerId);
    if (cp && !isAvailable(cp)) {
      const nxt = nextAvailablePlayerId(cp.id);
      state.currentPlayerId = nxt;
      save();
    }
  }

  renderAll();
})();
</script>
