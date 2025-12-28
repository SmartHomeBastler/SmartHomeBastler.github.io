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
/* ---------------- helpers ---------------- */

function shbAlert(t,m){ alert(t + "\\n\\n" + m); }

function normalizeNewlines(t){
  return t.replace(/\\r\\n/g,"\\n").replace(/\\r/g,"\\n");
}

function unfoldIcs(t){
  return normalizeNewlines(t).replace(/\\n[ \\t]/g,"");
}

function normSummary(s){
  return String(s||"")
    .trim()
    .replace(/\\u00A0/g," ")
    .replace(/[‐-‒–—]/g,"-")
    .replace(/\\s+/g," ");
}

/* ---------------- ICS parsing ---------------- */

function extractVevents(txt){
  const events=[];
  let inEvent=false, buf=[];
  txt.split("\\n").forEach(l=>{
    const t=l.trim();
    if(t==="BEGIN:VEVENT"){ inEvent=true; buf=[l]; return; }
    if(t==="END:VEVENT"){
      if(inEvent){ buf.push(l); events.push(buf.join("\\n")); }
      inEvent=false; buf=[]; return;
    }
    if(inEvent) buf.push(l);
  });
  return events;
}

function getSummaryFromEvent(block){
  return block.split("\\n")
    .map(l=>l.trim())
    .find(l=>l.startsWith("SUMMARY"))
    ?.split(":").slice(1).join(":").trim() || null;
}

function replaceSummaryInEvent(block,newSum){
  const lines=block.split("\\n");
  for(let i=0;i<lines.length;i++){
    if(lines[i].trim().startsWith("SUMMARY")){
      const idx=lines[i].indexOf(":");
      lines[i]=lines[i].slice(0,idx)+":"+newSum;
      break;
    }
  }
  return lines.join("\\n");
}

function summarizeIcs(txt){
  const ev=extractVevents(unfoldIcs(txt));
  const map=new Map();
  ev.forEach(e=>{
    const s=getSummaryFromEvent(e);
    if(!s) return;
    const k=normSummary(s);
    if(!map.has(k)) map.set(k,{count:0});
    map.get(k).count++;
  });
  return {events:ev, summaryMap:map};
}

/* ---------------- state ---------------- */

let OLD_TEXT="", NEW_TEXT="", analysis=null, patchedIcs="";

/* ---------------- file input ---------------- */

oldFile.onchange=async e=>{ OLD_TEXT=await e.target.files[0].text(); updateStats(); };
newFile.onchange=async e=>{ NEW_TEXT=await e.target.files[0].text(); updateStats(); };

function updateStats(){
  if(OLD_TEXT){
    const s=summarizeIcs(OLD_TEXT);
    oldStats.textContent=`VEVENTS: ${s.events.length} | SUMMARY eindeutig: ${s.summaryMap.size}`;
  }
  if(NEW_TEXT){
    const s=summarizeIcs(NEW_TEXT);
    newStats.textContent=`VEVENTS: ${s.events.length} | SUMMARY eindeutig: ${s.summaryMap.size}`;
  }
}

/* ---------------- analyze ---------------- */

function analyzeICS(){
  if(!OLD_TEXT||!NEW_TEXT){
    shbAlert("Achtung","Bitte beide ICS-Dateien hochladen.");
    return;
  }

  const oldS=summarizeIcs(OLD_TEXT);
  const newS=summarizeIcs(NEW_TEXT);

  analysis={
    old:[...oldS.summaryMap.keys()],
    rows:[...newS.summaryMap.entries()].map(([k,v])=>{
      const best=analysis?.old?.find(o=>o===k)||"";
      return {newKey:k, oldKey:best, count:v.count};
    })
  };

  renderMapping();
  mapping-section.style.display="block";
}

function renderMapping(){
  const rows=analysis.rows.map((r,i)=>`
    <tr>
      <td class="summary-cell">${r.newKey}</td>
      <td>
        <select onchange="analysis.rows[${i}].oldKey=this.value">
          <option value="">— keine Änderung —</option>
          ${analysis.old.map(o=>`<option ${o===r.oldKey?"selected":""}>${o}</option>`).join("")}
        </select>
      </td>
      <td class="count-cell">${r.count}</td>
    </tr>
  `).join("");

  mappingTableContainer.innerHTML=`
    <table class="shb-map-table">
      <tr><th>SUMMARY Neu</th><th>→ SUMMARY Alt</th><th>Events</th></tr>
      ${rows}
    </table>`;
  mappingTableContainer.style.display="block";
}

/* ---------------- apply ---------------- */

function applyMapping(){
  const dict=new Map();
  analysis.rows.forEach(r=>{
    if(r.oldKey) dict.set(normSummary(r.newKey), r.oldKey);
  });

  let replaced=0;
  let out=unfoldIcs(NEW_TEXT).replace(/BEGIN:VEVENT[\\s\\S]*?END:VEVENT/g,b=>{
    const s=normSummary(getSummaryFromEvent(b));
    if(dict.has(s)){ replaced++; return replaceSummaryInEvent(b,dict.get(s)); }
    return b;
  });

  patchedIcs=out.replace(/\\n/g,"\\r\\n");
  patchedOutput.value=out;
  output-section.style.display="block";
  shbAlert("Fertig",`SUMMARY ersetzt in ${replaced} Events`);
}

/* ---------------- export ---------------- */

function copyPatchedToClipboard(){
  patchedOutput.select(); document.execCommand("copy");
}

function downloadPatchedICS(){
  const b=new Blob([patchedIcs],{type:"text/calendar"});
  const a=document.createElement("a");
  a.href=URL.createObjectURL(b);
  a.download="kalender_neu_gemappt.ics";
  a.click();
}

function copyMappingJson(){
  const o={};
  analysis.rows.forEach(r=>{ if(r.oldKey) o[r.newKey]=r.oldKey; });
  navigator.clipboard.writeText(JSON.stringify(o,null,2));
}
</script>
