---
title: ICS SUMMARY Mapper
subtitle: Altes Jahr vs. Neues Jahr – Bezeichnungen stabil halten
description: Vergleiche zwei ICS-Dateien und mappe SUMMARY-Bezeichnungen, damit Home Assistant Müll-Erinnerungen weiterhin funktionieren.
show_sidebar: false
layout: page
---

<div class="shb-main-container">

  <h1 class="shb-main-title">ICS SUMMARY Mapper</h1>

  <h2 class="shb-section-title-center">Alten und neuen Müllkalender vergleichen & Bezeichnungen angleichen</h2>

  <p class="shb-main-description">
    Viele Entsorger ändern im neuen Jahr die <code>SUMMARY</code>-Bezeichnungen (z.B. <em>„Restabfall“</em> statt <em>„Restmüll“</em>).
    Dieses Tool vergleicht zwei ICS-Dateien und ersetzt die <code>SUMMARY</code>-Werte im <strong>neuen</strong> Kalender passend zu deinen <strong>alten</strong> Bezeichnungen.
  </p>

  <div id="shb-custom-alert" style="display: none;">
    <div id="shb-custom-alert-content">
      <h4 id="shb-custom-alert-title"></h4>
      <p id="shb-custom-alert-message"></p>
      <button id="shb-close-alert">OK</button>
    </div>
  </div>

  <!-- Upload Section -->
  <section class="content-section" id="upload-section">

    <h3 class="shb-section-title-center">ICS-Dateien hochladen</h3>

    <div class="shb-center-container">
      <p>
        <strong>Alt</strong> = Referenz (Bezeichnungen, die du in HA bereits verwendest)<br>
        <strong>Neu</strong> = Kalender fürs nächste Jahr (wird angepasst)
      </p>
    </div>

    <div class="shb-form-group-container ics-compare-file-container">
      <div class="shb-form-group ics-compare-file-group">
        <label for="oldFile">ICS Alt (Referenz):</label>
        <input type="file" id="oldFile" accept=".ics">
        <div class="muted" id="oldStats"></div>
      </div>

      <div class="shb-form-group ics-compare-file-group">
        <label for="newFile">ICS Neu (wird gemappt):</label>
        <input type="file" id="newFile" accept=".ics">
        <div class="muted" id="newStats"></div>
      </div>
    </div>

    <div class="shb-center-container">
      <div class="shb-button-container">
        <button class="shb-button shb-button-blue" onclick="analyzeICS()">Analysieren & Mapping erstellen</button>
      </div>
    </div>

  </section>

  <!-- Mapping Section -->
  <section class="content-section" id="mapping-section" style="display:none;">

    <h3 class="shb-section-title-center">Mapping: Neu → Alt</h3>

    <div class="shb-center-container">
      <p>
        Wähle für jede Bezeichnung aus dem neuen Kalender die passende alte Bezeichnung aus.
        <br>
        Wenn du „— keine Änderung —“ auswählst, bleibt der Eintrag im neuen Kalender so wie er ist.
      </p>
    </div>

    <div id="mappingTableContainer" class="shb-error-table-container" style="display:none;"></div>

    <div class="shb-center-container">
      <div class="shb-button-container">
        <button class="shb-button shb-button-yellow" onclick="copyMappingJson()">Mapping als JSON kopieren</button>
        <button class="shb-button shb-button-blue" onclick="applyMapping()">Änderungen anwenden</button>
      </div>
    </div>

  </section>

  <!-- Output Section -->
  <section class="content-section" id="output-section" style="display:none;">

    <h3 class="shb-section-title-center">Bearbeitete ICS-Datei (Neu, angepasst)</h3>

    <div class="shb-center-container">
      <p>
        Hier ist dein neuer Kalender mit angepassten <code>SUMMARY</code>-Bezeichnungen.
        Du kannst ihn kopieren oder direkt herunterladen.
      </p>
    </div>

    <div class="shb-text-output">
      <textarea class="shb-text-code-output" id="patchedOutput" rows="20" readonly></textarea>
    </div>

    <div class="shb-center-container">
      <div class="shb-button-container">
        <button class="shb-button shb-button-yellow" onclick="copyPatchedToClipboard()">In Zwischenablage kopieren</button>
        <button class="shb-button shb-button-green" onclick="downloadPatchedICS()">ICS herunterladen</button>
      </div>
    </div>

  </section>

  <footer class="shb-footer">
    <p>Damit bleiben deine Home Assistant Sensoren stabil – auch wenn der Entsorger wieder kreativ war 😄</p>
    <h2>Viel Erfolg! 🎉</h2>
  </footer>

  {% include support_note.html %}
</div>

<style>
  .ics-compare-file-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-between;
  }
  .ics-compare-file-container .ics-compare-file-group {
    flex: 1 1 calc(45% - 20px);
    box-sizing: border-box;
  }
  .ics-compare-file-container .ics-compare-file-group input {
    width: 100%;
    padding: 8px;
    background-color: #1ab5d5;
    border-radius: 5px;
    border: 1px solid #ffffff;
    font-size: 14px;
  }
  .muted { color:#b6b6b6; font-size: 0.9em; margin-top: 6px; }

  /* Mapping Table uses your shb-error-table look */
  .shb-map-table {
    width: 100%;
    border: 4px solid #1ab5d5;
    border-collapse: collapse;
    font-family: Arial, sans-serif;
    text-align: left;
    margin: 20px 0;
  }
  .shb-map-table thead th {
    background-color: #1ab5d5;
    color: #000000 !important;
    padding: 8px 10px;
    font-weight: bold;
    text-transform: uppercase;
    border-left: 2px solid #000000 !important;
  }
  .shb-map-table thead th:first-child { border-left: none; }
  .shb-map-table tbody tr:nth-child(odd) { background-color: #fffdf0 !important; }
  .shb-map-table tbody tr:nth-child(even) { background-color: #fff7cc !important; }
  .shb-map-table tbody td {
    padding: 10px;
    vertical-align: top;
    border-left: 2px solid #1ab5d5;
  }
  .shb-map-table tbody td:first-child { border-left:none; }

  .summary-cell {
    background-color: rgba(184, 243, 255, 0.6);
    color: #000;
    font-weight: bold;
  }
  .count-cell {
    background-color: rgba(255, 247, 204, 0.6);
    color:#000;
    font-weight: bold;
    width: 110px;
  }
  .preview-cell { color:#333; font-size: 0.9em; }

  select.shb-map-select {
    width: 100%;
    padding: 8px;
    border-radius: 6px;
    border: 2px solid #1ab5d5;
    background: #fff;
    font-size: 14px;
  }
</style>

<script>
  // ---------- Alert helper (falls showSHBcustomAlert nicht global existiert) ----------
  function shbAlert(title, msg) {
    if (typeof showSHBcustomAlert === "function") {
      showSHBcustomAlert(title, msg);
      return;
    }
    alert(title + "\\n\\n" + msg);
  }

  // ---------- Core ICS helpers ----------
  function normalizeNewlines(text) {
    return text.replace(/\\r\\n/g, "\\n").replace(/\\r/g, "\\n");
  }

  // RFC5545 unfolding: newline + space/tab => continuation
  function unfoldIcs(text) {
    const n = normalizeNewlines(text);
    return n.replace(/\\n[ \\t]/g, "");
  }

  function extractVevents(unfoldedText) {
    const events = [];
    const lines = unfoldedText.split("\\n");
    let inEvent = false;
    let buf = [];

    for (const line of lines) {
      if (line === "BEGIN:VEVENT") {
        inEvent = true;
        buf = [line];
        continue;
      }
      if (line === "END:VEVENT") {
        if (inEvent) {
          buf.push(line);
          events.push(buf.join("\\n"));
        }
        inEvent = false;
        buf = [];
        continue;
      }
      if (inEvent) buf.push(line);
    }
    return events;
  }

  function getSummaryFromEvent(eventBlock) {
    const lines = eventBlock.split("\\n");
    for (const l of lines) {
      if (l.startsWith("SUMMARY")) {
        const idx = l.indexOf(":");
        if (idx >= 0) return l.slice(idx + 1);
      }
    }
    return null;
  }

  function replaceSummaryInEvent(eventBlock, newSummary) {
    const lines = eventBlock.split("\\n");
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith("SUMMARY")) {
        const idx = lines[i].indexOf(":");
        if (idx >= 0) {
          const left = lines[i].slice(0, idx); // preserve params
          lines[i] = left + ":" + newSummary;
          break;
        }
      }
    }
    return lines.join("\\n");
  }

  function summarizeIcs(text) {
    const unfolded = unfoldIcs(text);
    const events = extractVevents(unfolded);

    const map = new Map(); // summary -> {count, samples[]}
    for (const ev of events) {
      const s = getSummaryFromEvent(ev);
      if (!s) continue;

      const dt = (ev.match(/^DTSTART.*:(.+)$/m) || [])[1] || "";
      if (!map.has(s)) map.set(s, { count: 0, samples: [] });
      const obj = map.get(s);
      obj.count++;
      if (dt && obj.samples.length < 3) obj.samples.push(dt);
    }
    return { unfolded, events, summaryMap: map };
  }

  // Very light similarity heuristic (good enough for Restmüll vs Restabfall etc.)
  function similarity(a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();
    if (a === b) return 1;

    // common substring heuristic
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
      "&":"&amp;","<":"&lt;",">":"&gt;","\\"":"&quot;","'":"&#039;"
    }[m]));
  }

  // ---------- App State ----------
  let OLD_TEXT = "";
  let NEW_TEXT = "";
  let analysis = null;
  let patchedIcs = "";

  // ---------- File Reading ----------
  document.getElementById("oldFile").addEventListener("change", async (e) => {
    const f = e.target.files[0];
    if (!f) return;
    OLD_TEXT = await f.text();
    updateStats();
  });

  document.getElementById("newFile").addEventListener("change", async (e) => {
    const f = e.target.files[0];
    if (!f) return;
    NEW_TEXT = await f.text();
    updateStats();
  });

  function updateStats() {
    try {
      if (OLD_TEXT) {
        const s = summarizeIcs(OLD_TEXT);
        document.getElementById("oldStats").textContent = `VEVENTs: ${s.events.length} | SUMMARY eindeutig: ${s.summaryMap.size}`;
      } else document.getElementById("oldStats").textContent = "";
    } catch {
      document.getElementById("oldStats").textContent = "Konnte Alt-ICS nicht parsen.";
    }

    try {
      if (NEW_TEXT) {
        const s = summarizeIcs(NEW_TEXT);
        document.getElementById("newStats").textContent = `VEVENTs: ${s.events.length} | SUMMARY eindeutig: ${s.summaryMap.size}`;
      } else document.getElementById("newStats").textContent = "";
    } catch {
      document.getElementById("newStats").textContent = "Konnte Neu-ICS nicht parsen.";
    }
  }

  // ---------- Analyze & Render Mapping ----------
  function analyzeICS() {
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

    // Build mapping rows
    const rows = newKeys.map(nk => {
      let bestKey = "";
      let bestScore = 0;
      for (const ok of oldKeys) {
        const s = similarity(nk, ok);
        if (s > bestScore) { bestScore = s; bestKey = ok; }
      }
      const suggested = bestScore >= 0.35 ? bestKey : ""; // threshold
      const meta = newSum.summaryMap.get(nk);

      return {
        newKey: nk,
        oldKey: suggested,
        count: meta.count,
        samples: meta.samples || [],
        auto: suggested ? true : false
      };
    });

    analysis = { oldSum, newSum, oldKeys, newKeys, rows };

    renderMappingTable();
    document.getElementById("mapping-section").style.display = "block";
    document.getElementById("output-section").style.display = "none";
    patchedIcs = "";
  }

  function renderMappingTable() {
    const c = document.getElementById("mappingTableContainer");
    c.style.display = "block";

    const oldOptions = analysis.oldKeys;

    const optionsHtml = (selected) => {
      return `
        <option value="" ${selected==="" ? "selected" : ""}>— keine Änderung —</option>
        ${oldOptions.map(k => `<option value="${escapeHtml(k)}" ${k===selected ? "selected" : ""}>${escapeHtml(k)}</option>`).join("")}
      `;
    };

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

    c.innerHTML = table;

    c.querySelectorAll("select[data-idx]").forEach(sel => {
      sel.addEventListener("change", (e) => {
        const i = Number(e.target.getAttribute("data-idx"));
        analysis.rows[i].oldKey = e.target.value; // "" means no change
        patchedIcs = "";
      });
    });
  }

  // ---------- Apply Mapping ----------
  function applyMapping() {
    if (!analysis) {
      shbAlert("Oh Jeh!", "Bitte zuerst analysieren.");
      return;
    }

    const dict = new Map(); // newSummary -> oldSummary
    for (const r of analysis.rows) {
      if (r.oldKey && r.oldKey !== r.newKey) dict.set(r.newKey, r.oldKey);
    }

    const unfolded = unfoldIcs(NEW_TEXT);
    const events = extractVevents(unfolded);

    let replaced = 0;
    const newEvents = events.map(ev => {
      const s = getSummaryFromEvent(ev);
      if (s && dict.has(s)) {
        replaced++;
        return replaceSummaryInEvent(ev, dict.get(s));
      }
      return ev;
    });

    // Reconstruct by sequential replacement (safe enough because we replace exact blocks)
    let out = unfolded;
    for (let i = 0; i < events.length; i++) {
      out = out.replace(events[i], newEvents[i]);
    }

    // Export as CRLF
    patchedIcs = out.replace(/\\n/g, "\\r\\n");
    document.getElementById("patchedOutput").value = out; // display unfolded is fine

    document.getElementById("output-section").style.display = "block";
    shbAlert("Super!", `Fertig! SUMMARY wurde in ${replaced} VEVENT(s) angepasst.`);
  }

  // ---------- Export / Copy ----------
  function copyPatchedToClipboard() {
    const t = document.getElementById("patchedOutput");
    if (!t.value) {
      shbAlert("Oh Jeh!", "Keine bearbeitete ICS verfügbar. Bitte erst anwenden.");
      return;
    }
    t.select();
    document.execCommand("copy");
    shbAlert("Perfekt!", "Die bearbeitete ICS wurde kopiert.");
  }

  function downloadPatchedICS() {
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
  }

  function copyMappingJson() {
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
  }
</script>
