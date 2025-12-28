---
title: ICS SUMMARY Mapper
subtitle: Altes Jahr vs. Neues Jahr – Bezeichnungen stabil halten
description: Vergleiche zwei ICS-Dateien und mappe SUMMARY-Bezeichnungen, damit Home Assistant Müll-Erinnerungen weiterhin funktionieren.
show_sidebar: false
layout: page
---

<div class="shb-main-container">

  <h1 class="shb-main-title">ICS SUMMARY Mapper</h1>

  <h2 class="shb-section-title-center">
    Alten und neuen Müllkalender vergleichen & Bezeichnungen angleichen
  </h2>

  <p class="shb-main-description">
    Viele Entsorger ändern im neuen Jahr die <code>SUMMARY</code>-Bezeichnungen
    (z.B. <em>„Restabfall“</em> statt <em>„Restmüll“</em>).
    Dieses Tool ersetzt die <code>SUMMARY</code>-Werte im <strong>neuen</strong>
    Kalender passend zu deinen <strong>alten</strong> Bezeichnungen.
  </p>

  <!-- Upload -->
  <section class="content-section">

    <h3 class="shb-section-title-center">ICS-Dateien hochladen</h3>

    <div class="shb-form-group-container ics-compare-file-container">
      <div class="shb-form-group ics-compare-file-group">
        <label for="oldFile">ICS Alt (Referenz)</label>
        <input type="file" id="oldFile" accept=".ics">
        <div class="muted" id="oldStats"></div>
      </div>

      <div class="shb-form-group ics-compare-file-group">
        <label for="newFile">ICS Neu (wird angepasst)</label>
        <input type="file" id="newFile" accept=".ics">
        <div class="muted" id="newStats"></div>
      </div>
    </div>

    <div class="shb-center-container">
      <button type="button"
              class="shb-button shb-button-blue"
              onclick="analyzeICS()">
        ANALYSIEREN & MAPPING ERSTELLEN
      </button>
    </div>

  </section>

  <!-- Mapping -->
  <section class="content-section" id="mapping-section" style="display:none;">

    <h3 class="shb-section-title-center">Mapping: Neu → Alt</h3>

    <div id="mappingTableContainer"
         class="shb-error-table-container"
         style="display:none;"></div>

    <div class="shb-center-container">
      <div class="shb-button-container">
        <button class="shb-button shb-button-yellow"
                onclick="copyMappingJson()">
          MAPPING ALS JSON KOPIEREN
        </button>
        <button class="shb-button shb-button-blue"
                onclick="applyMapping()">
          ÄNDERUNGEN ANWENDEN
        </button>
      </div>
    </div>

  </section>

  <!-- Output -->
  <section class="content-section" id="output-section" style="display:none;">

    <h3 class="shb-section-title-center">
      Bearbeitete ICS-Datei (Neu, angepasst)
    </h3>

    <div class="shb-text-output">
      <textarea class="shb-text-code-output"
                id="patchedOutput"
                rows="20"
                readonly></textarea>
    </div>

    <div class="shb-center-container">
      <div class="shb-button-container">
        <button class="shb-button shb-button-yellow"
                onclick="copyPatchedToClipboard()">
          IN ZWISCHENABLAGE KOPIEREN
        </button>
        <button class="shb-button shb-button-green"
                onclick="downloadPatchedICS()">
          ICS HERUNTERLADEN
        </button>
      </div>
    </div>

  </section>

  <footer class="shb-footer">
    <p>
      Damit bleiben deine Home Assistant Sensoren stabil –
      auch wenn der Entsorger wieder kreativ war 😄
    </p>
    <h2>Viel Erfolg! 🎉</h2>
  </footer>

  {% include support_note.html %}
</div>

<style>
.ics-compare-file-container {
  display:flex; flex-wrap:wrap; gap:20px; justify-content:space-between;
}
.ics-compare-file-group { flex:1 1 calc(45% - 20px); }
.muted { color:#b6b6b6; font-size:.9em; margin-top:6px; }
.shb-map-table {
  width:100%; border:4px solid #1ab5d5; border-collapse:collapse;
}
.shb-map-table th {
  background:#1ab5d5; color:#000; padding:8px; text-transform:uppercase;
}
.shb-map-table td { padding:8px; border-left:2px solid #1ab5d5; }
.summary-cell { background:rgba(184,243,255,.6); font-weight:bold; }
.count-cell { background:rgba(255,247,204,.6); font-weight:bold; }
</style>

<script>
  // ---------- Alert helper ----------
  function shbAlert(title, msg) {
    if (typeof showSHBcustomAlert === "function") {
      showSHBcustomAlert(title, msg);
      return;
    }
    alert(title + "\n\n" + msg);
  }

  // ---------- Core helpers ----------
  function normalizeNewlines(text) {
    return text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  }

  // RFC5545 unfolding: newline + space/tab => continuation
  function unfoldIcs(text) {
    const n = normalizeNewlines(text);
    return n.replace(/\n[ \t]/g, "");
  }

  // Normalize SUMMARY strings (NBSP, different dashes, multiple spaces)
  function normSummary(s) {
    return String(s || "")
      .trim()
      .replace(/\u00A0/g, " ")
      .replace(/[‐-‒–—]/g, "-")
      .replace(/\s+/g, " ");
  }

  function extractVevents(unfoldedText) {
    const events = [];
    const lines = unfoldedText.split("\n");
    let inEvent = false;
    let buf = [];

    for (const rawLine of lines) {
      const line = rawLine.trim();

      if (line === "BEGIN:VEVENT") {
        inEvent = true;
        buf = [rawLine];
        continue;
      }

      if (line === "END:VEVENT") {
        if (inEvent) {
          buf.push(rawLine);
          events.push(buf.join("\n"));
        }
        inEvent = false;
        buf = [];
        continue;
      }

      if (inEvent) buf.push(rawLine);
    }

    return events;
  }

  function getSummaryFromEvent(eventBlock) {
    const lines = eventBlock.split("\n");
    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (line.startsWith("SUMMARY")) {
        const idx = line.indexOf(":");
        if (idx !== -1) return line.slice(idx + 1).trim();
      }
    }
    return null;
  }

  function replaceSummaryInEvent(eventBlock, newSummary) {
    const lines = eventBlock.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const trimmed = lines[i].trim();
      if (trimmed.startsWith("SUMMARY")) {
        const idx = lines[i].indexOf(":");
        if (idx >= 0) {
          const left = lines[i].slice(0, idx); // keep params / spaces
          lines[i] = left + ":" + newSummary;
        } else {
          lines[i] = "SUMMARY:" + newSummary;
        }
        break;
      }
    }
    return lines.join("\n");
  }

  function summarizeIcs(text) {
    const unfolded = unfoldIcs(text);
    const events = extractVevents(unfolded);

    const map = new Map(); // summaryNorm -> { rawSet:Set, count, samples[] }
    for (const ev of events) {
      const raw = getSummaryFromEvent(ev);
      if (!raw) continue;

      const key = normSummary(raw);
      const dt = (ev.match(/^DTSTART.*:(.+)$/m) || [])[1] || "";

      if (!map.has(key)) map.set(key, { rawSet: new Set(), count: 0, samples: [] });
      const obj = map.get(key);
      obj.rawSet.add(raw);
      obj.count++;
      if (dt && obj.samples.length < 3) obj.samples.push(dt);
    }

    return { unfolded, events, summaryMap: map };
  }

  // simple similarity
  function similarity(a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();
    if (a === b) return 1;
    let best = 0;
    for (let i = 0; i < a.length; i++) {
      for (let j = i + 2; j <= a.length; j++) {
        const sub = a.slice(i, j);
        if (b.includes(sub)) best = Math.max(best, sub.length);
      }
    }
    return best / Math.max(a.length, b.length);
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, m => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[m]));
  }

  // ---------- App State ----------
  let OLD_TEXT = "";
  let NEW_TEXT = "";
  let analysis = null;
  let patchedIcs = "";

  const elOldFile = document.getElementById("oldFile");
  const elNewFile = document.getElementById("newFile");
  const elOldStats = document.getElementById("oldStats");
  const elNewStats = document.getElementById("newStats");
  const elMappingSection = document.getElementById("mapping-section");
  const elOutputSection = document.getElementById("output-section");
  const elMappingTableContainer = document.getElementById("mappingTableContainer");
  const elPatchedOutput = document.getElementById("patchedOutput");

  // ---------- File Reading ----------
  elOldFile.addEventListener("change", async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    OLD_TEXT = await f.text();
    updateStats();
  });

  elNewFile.addEventListener("change", async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    NEW_TEXT = await f.text();
    updateStats();
  });

  function updateStats() {
    try {
      if (OLD_TEXT) {
        const s = summarizeIcs(OLD_TEXT);
        elOldStats.textContent = `VEVENTS: ${s.events.length} | SUMMARY eindeutig: ${s.summaryMap.size}`;
      } else elOldStats.textContent = "";
    } catch {
      elOldStats.textContent = "Konnte Alt-ICS nicht parsen.";
    }

    try {
      if (NEW_TEXT) {
        const s = summarizeIcs(NEW_TEXT);
        elNewStats.textContent = `VEVENTS: ${s.events.length} | SUMMARY eindeutig: ${s.summaryMap.size}`;
      } else elNewStats.textContent = "";
    } catch {
      elNewStats.textContent = "Konnte Neu-ICS nicht parsen.";
    }
  }

  // ---------- Analyze & Render Mapping ----------
  window.analyzeICS = function analyzeICS() {
    if (!OLD_TEXT || !NEW_TEXT) {
      shbAlert("Achtung!", "Bitte beide ICS-Dateien hochladen (Alt und Neu).");
      return;
    }

    let oldSum, newSum;
    try {
      oldSum = summarizeIcs(OLD_TEXT);
      newSum = summarizeIcs(NEW_TEXT);
    } catch (err) {
      shbAlert("Fehler!", "Beim Parsen der ICS-Dateien ist etwas schief gelaufen.");
      return;
    }

    const oldKeys = [...oldSum.summaryMap.keys()].sort((a,b)=>a.localeCompare(b));
    const newKeys = [...newSum.summaryMap.keys()].sort((a,b)=>a.localeCompare(b));

    const rows = newKeys.map(nk => {
      let bestKey = "";
      let bestScore = 0;
      for (const ok of oldKeys) {
        const sc = similarity(nk, ok);
        if (sc > bestScore) { bestScore = sc; bestKey = ok; }
      }
      const suggested = bestScore >= 0.35 ? bestKey : "";
      const meta = newSum.summaryMap.get(nk);

      return {
        newKey: nk,
        oldKey: suggested,
        count: meta.count,
        samples: meta.samples || [],
        auto: !!suggested
      };
    });

    analysis = { oldSum, newSum, oldKeys, newKeys, rows };

    renderMappingTable();
    elMappingSection.style.display = "block";
    elOutputSection.style.display = "none";
    patchedIcs = "";
  };

  function renderMappingTable() {
    elMappingTableContainer.style.display = "block";

    const oldOptions = analysis.oldKeys;

    const optionsHtml = (selected) => `
      <option value="" ${selected==="" ? "selected" : ""}>— keine Änderung —</option>
      ${oldOptions.map(k => `<option value="${escapeHtml(k)}" ${k===selected ? "selected" : ""}>${escapeHtml(k)}</option>`).join("")}
    `;

    const table = `
      <table class="shb-map-table">
        <thead>
          <tr>
            <th>SUMMARY Neu</th>
            <th>→ SUMMARY Alt</th>
            <th>Events</th>
            <th>Beispiele DTSTART</th>
          </tr>
        </thead>
        <tbody>
          ${analysis.rows.map((r, idx) => `
            <tr>
              <td class="summary-cell">${escapeHtml(r.newKey)} ${r.auto ? '<div class="muted">Auto-Vorschlag ✓</div>' : '<div class="muted">Kein Auto-Match</div>'}</td>
              <td>
                <select class="shb-map-select" data-idx="${idx}">
                  ${optionsHtml(r.oldKey)}
                </select>
              </td>
              <td class="count-cell">${r.count}</td>
              <td class="preview-cell">${(r.samples || []).map(s => escapeHtml(s)).join("<br>")}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;

    elMappingTableContainer.innerHTML = table;

    elMappingTableContainer.querySelectorAll("select[data-idx]").forEach(sel => {
      sel.addEventListener("change", (e) => {
        const i = Number(e.target.getAttribute("data-idx"));
        analysis.rows[i].oldKey = e.target.value;
        patchedIcs = "";
      });
    });
  }

  // ---------- Apply Mapping ----------
  window.applyMapping = function applyMapping() {
    if (!analysis) {
      shbAlert("Oh Jeh!", "Bitte zuerst analysieren.");
      return;
    }

    const dict = new Map();
    for (const r of analysis.rows) {
      if (r.oldKey && r.oldKey !== r.newKey) dict.set(normSummary(r.newKey), r.oldKey.trim());
    }

    const unfolded = unfoldIcs(NEW_TEXT);

    let replaced = 0;
    const out = unfolded.replace(/BEGIN:VEVENT[\s\S]*?END:VEVENT/g, (block) => {
      const s = normSummary(getSummaryFromEvent(block));
      if (s && dict.has(s)) {
        replaced++;
        return replaceSummaryInEvent(block, dict.get(s));
      }
      return block;
    });

    patchedIcs = out.replace(/\n/g, "\r\n");
    elPatchedOutput.value = out;
    elOutputSection.style.display = "block";
    shbAlert("Super!", `Fertig! SUMMARY wurde in ${replaced} VEVENT(s) angepasst.`);
  };

  // ---------- Export / Copy ----------
  window.copyPatchedToClipboard = function copyPatchedToClipboard() {
    if (!elPatchedOutput.value) {
      shbAlert("Oh Jeh!", "Keine bearbeitete ICS verfügbar. Bitte erst anwenden.");
      return;
    }
    elPatchedOutput.select();
    document.execCommand("copy");
    shbAlert("Perfekt!", "Die bearbeitete ICS wurde kopiert.");
  };

  window.downloadPatchedICS = function downloadPatchedICS() {
    if (!patchedIcs) {
      shbAlert("Oh Jeh!", "Keine bearbeitete ICS verfügbar. Bitte erst anwenden.");
      return;
    }
    const blob = new Blob([patchedIcs], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "kalender_neu_gemappt.ics";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  window.copyMappingJson = function copyMappingJson() {
    if (!analysis) {
      shbAlert("Hinweis", "Bitte erst analysieren.");
      return;
    }
    const obj = {};
    analysis.rows.forEach(r => {
      if (r.oldKey && r.oldKey !== r.newKey) obj[r.newKey] = r.oldKey;
    });
    const json = JSON.stringify(obj, null, 2);

    const tmp = document.createElement("textarea");
    tmp.value = json;
    document.body.appendChild(tmp);
    tmp.select();
    document.execCommand("copy");
    tmp.remove();

    shbAlert("Nice!", "Mapping-JSON wurde in die Zwischenablage kopiert.");
  };
</script>

