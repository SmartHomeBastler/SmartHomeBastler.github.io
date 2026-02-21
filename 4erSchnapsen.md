---
title: "Ana hod imma des Bummal!"
subtitle: "Karten geben, Spiele rufen – und nicht hängen 😉"
description: "Punkte-Tracker für 4er-Schnapsen (2 vs 2) nach unseren Hausregeln inkl. Schneider & Retour-Schneider"
layout: page
show_sidebar: false
---

<!-- Tracker Container (Theme: Bulma Clean -> content + box + columns) -->
<div class="box" style="border-radius: 18px;">
  <div id="shb-schnapsen-app"></div>
</div>

<style>

/* Schöne “Chip”-Optik statt Code-Klotz */
.shb-chip{
  display:inline-block;
  padding:2px 8px;
  border-radius:999px;
  background: rgba(0,0,0,.12);
  border: 1px solid rgba(0,0,0,.10);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace;
  font-size: 12px;
}
    
/* ====== Theme-freundlich: wir lassen Bulma, aber kapseln alles unter #shb-schnapsen-app ====== */
#shb-schnapsen-app{
  --bg:#0f1115;
  --card:#161a22;
  --card2:#1c2230;
  --text:#e7eaf0;
  --muted:#aab2c5;
  --line:#2b3242;
  --accent:#7fd18b;
  --danger:#ff5c5c;
  --warn:#ffcc66;
  --info:#6bb7ff;
  --shadow: 0 12px 30px rgba(0,0,0,.35);
  --radius: 18px;

  color: var(--text);
}

/* Layout */
#shb-schnapsen-app .wrap{
  background: radial-gradient(1200px 700px at 20% -10%, rgba(127,209,139,.15), transparent 60%),
              radial-gradient(900px 600px at 100% 0%, rgba(107,183,255,.12), transparent 55%),
              var(--bg);
  border-radius: var(--radius);
  padding: 16px;
  border: 1px solid rgba(255,255,255,.06);
  box-shadow: var(--shadow);
}

#shb-schnapsen-app h2{
  margin:0;
  font-size:16px;
  font-weight:800;
}

#shb-schnapsen-app .sub{
  margin-top:6px;
  color:var(--muted);
  font-size:13px;
}

#shb-schnapsen-app .grid2{
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap:14px;
}

#shb-schnapsen-app .mainGrid{
  display:grid;
  grid-template-columns: 1.4fr .6fr;
  gap:14px;
  margin-top:14px;
}

#shb-schnapsen-app .card{
  background: linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.02));
  border: 1px solid rgba(255,255,255,.08);
  border-radius: var(--radius);
  overflow:hidden;
}

#shb-schnapsen-app .cardHeader{
  padding:12px 14px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  border-bottom:1px solid rgba(255,255,255,.08);
  background: rgba(255,255,255,.03);
}

#shb-schnapsen-app .badge{
  font-size:12px;
  padding:6px 10px;
  border-radius:999px;
  border:1px solid rgba(255,255,255,.14);
  color:var(--muted);
}

#shb-schnapsen-app .contentPad{ padding:14px; }

#shb-schnapsen-app .teamRow{
  display:grid;
  grid-template-columns: 120px 1fr;
  gap:12px;
  align-items:center;
}
    
#shb-schnapsen-app .hangman{
  width:120px;
  height:120px;
  background: #ffffff;           /* <-- neu */
  border: 1px solid rgba(0,0,0,.15);
  border-radius: 14px;
  display:flex;
  align-items:center;
  justify-content:center;
  overflow:hidden;
}

#shb-schnapsen-app .hangman img{
  width:100%;
  height:100%;
  object-fit:contain;
}

#shb-schnapsen-app .tallyLine{
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace;
  font-size: 18px;
  background: rgba(0,0,0,.18);
  border: 1px solid rgba(255,255,255,.10);
  border-radius: 14px;
  padding:10px 12px;
  min-height: 46px;
  white-space: pre-wrap;
  word-break: break-word;
}

#shb-schnapsen-app .pillWrap{
  margin-top:10px;
  display:flex;
  flex-wrap:wrap;
  gap:8px;
  color:var(--muted);
  font-size:13px;
}
#shb-schnapsen-app .pill{
  padding:6px 10px;
  border-radius:999px;
  border:1px solid rgba(255,255,255,.12);
  background: rgba(255,255,255,.03);
}

#shb-schnapsen-app .scoreBox{
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap:10px;
}

#shb-schnapsen-app .score{
  padding:12px;
  border-radius: 16px;
  background: rgba(0,0,0,.18);
  border:1px solid rgba(255,255,255,.10);
}

#shb-schnapsen-app .score h3{
  margin:0 0 6px;
  font-size:12px;
  color:var(--muted);
  font-weight:800;
}

#shb-schnapsen-app .score .val{
  font-size:28px;
  font-weight:900;
  letter-spacing:.5px;
}

#shb-schnapsen-app .small{
  font-size:12px;
  color:var(--muted);
}

#shb-schnapsen-app .btnRow{
  display:flex;
  gap:10px;
  flex-wrap:wrap;
}

#shb-schnapsen-app button{
  appearance:none;
  border:1px solid rgba(255,255,255,.14);
  background: rgba(255,255,255,.06);
  color:var(--text);
  padding:10px 12px;
  border-radius: 14px;
  cursor:pointer;
  transition: transform .05s ease, background .15s ease, border-color .15s ease;
  font-weight:800;
  letter-spacing:.2px;
}

#shb-schnapsen-app button:hover{ background: rgba(255,255,255,.10); border-color: rgba(255,255,255,.20); }
#shb-schnapsen-app button:active{ transform: translateY(1px); }

#shb-schnapsen-app .btnPrimary{
  background: rgba(127,209,139,.18);
  border-color: rgba(127,209,139,.35);
}

#shb-schnapsen-app .btnDanger{
  background: rgba(255,92,92,.14);
  border-color: rgba(255,92,92,.30);
}

#shb-schnapsen-app .btnGhost{
  background: transparent;
}

#shb-schnapsen-app table{
  width:100%;
  border-collapse: collapse;
}

#shb-schnapsen-app thead th{
  text-align:left;
  font-size:12px;
  color:var(--muted);
  padding:10px 10px;
  border-bottom:1px solid rgba(255,255,255,.10);
}

#shb-schnapsen-app tbody td{
  padding:10px 10px;
  border-bottom:1px solid rgba(255,255,255,.06);
  font-size:14px;
}

#shb-schnapsen-app tbody tr{
  cursor:pointer;
  transition: background .12s ease;
}

#shb-schnapsen-app tbody tr:hover{
  background: rgba(255,255,255,.05);
}

#shb-schnapsen-app .right{ text-align:right; }

#shb-schnapsen-app .highlightRetourA td{
  box-shadow: inset 4px 0 0 rgba(107,183,255,.85);
  background: rgba(107,183,255,.08);
}
#shb-schnapsen-app .highlightRetourB td{
  box-shadow: inset 4px 0 0 rgba(255,204,102,.85);
  background: rgba(255,204,102,.08);
}

/* Modal */
#shb-schnapsen-app .modalOverlay{
  position:fixed;
  inset:0;
  background: rgba(0,0,0,.55);
  display:none;
  align-items:center;
  justify-content:center;
  padding:16px;
  z-index:1000;
}
#shb-schnapsen-app .modal{
  width:min(720px, 100%);
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03));
  border: 1px solid rgba(255,255,255,.12);
  box-shadow: 0 20px 60px rgba(0,0,0,.55);
  overflow:hidden;
}
#shb-schnapsen-app .modalHead{
  padding:14px 16px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  background: rgba(255,255,255,.04);
  border-bottom:1px solid rgba(255,255,255,.10);
}
#shb-schnapsen-app .modalBody{
  padding:16px;
  display:grid;
  gap:12px;
}
#shb-schnapsen-app .modal{
  display:block;
}    
#shb-schnapsen-app label{
  font-size:12px;
  color:var(--muted);
  display:block;
  margin:0 0 6px;
  font-weight:900;
}
#shb-schnapsen-app select,
#shb-schnapsen-app input[type="text"]{
  width:100%;
  padding:10px 10px;
  border-radius: 14px;
  border:1px solid rgba(255,255,255,.14);
  background: rgba(0,0,0,.18);
  color:var(--text);
  outline:none;
}
#shb-schnapsen-app .modalFoot{
  padding:14px 16px;
  display:flex;
  gap:10px;
  justify-content:flex-end;
  border-top:1px solid rgba(255,255,255,.10);
  background: rgba(255,255,255,.03);
}
#shb-schnapsen-app .note{
  font-size:12px;
  color:var(--muted);
  line-height:1.35;
  padding:10px 12px;
  border-radius:14px;
  border:1px dashed rgba(255,255,255,.18);
  background: rgba(0,0,0,.14);
}

/* Team-Name über den Bildern */
#shb-schnapsen-app .teamHeaderNames{
  font-weight: 900;
  font-size: 14px;
  color: rgba(255,255,255,.92);
  margin-bottom: 10px;
}

#shb-schnapsen-app .teamImagesRow{
  display:flex;
  gap: 12px;
  align-items:center;
  justify-content:flex-start;
  flex-wrap: nowrap; /* <- wichtig: nicht umbrechen, sonst wirkt’s wild */
  overflow: hidden;  /* <- nichts schiebt raus */
}

/* Gemeinsame Bildbox */
#shb-schnapsen-app .imgBox{
  background: #ffffff;                 /* wichtig: Hangman sichtbar */
  border-radius: 16px;
  border: 1px solid rgba(0,0,0,.15);
  box-shadow: 0 10px 24px rgba(0,0,0,.20);
  overflow: hidden;
  display:flex;
  align-items:center;
  justify-content:center;
}

#shb-schnapsen-app .imgBoxBig{
  height: 160px;
  width: clamp(220px, 40vw, 300px);  /* <- dynamisch, nie riesig */
}

/* Bilder sauber einpassen */
#shb-schnapsen-app .imgBox img{
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Responsive */
@media (max-width: 900px){
  #shb-schnapsen-app .grid2{ grid-template-columns: 1fr; }
  #shb-schnapsen-app .mainGrid{ grid-template-columns: 1fr; }
}

@media (max-width: 520px){
  #shb-schnapsen-app .teamImagesRow{
    flex-direction: column;
    align-items: flex-start;
  }
  #shb-schnapsen-app .imgBoxBig{
    width: 100%;
    height: 180px;
  }
}

@media (max-width: 650px){
  #shb-schnapsen-app .teamImagesRow{
    flex-wrap: wrap;
  }
  #shb-schnapsen-app .imgBoxBig{
    width: 100%;
    height: 180px;
  }
}
    
</style>

<div id="shb-schnapsen-app">
  <div class="wrap">
    <div style="text-align:center;">
      <h2 style="color: var(--accent); font-size:22px; margin-bottom:2px;">Ana hod imma des Bummal!</h2>
      <div class="sub">Schnapsen-Tracker (2 vs 2) · Schneider & Retour-Schneider · Hangman bis 13</div>
    </div>

    <div class="grid2" style="margin-top:14px;">
      <div class="card">
        <div class="cardHeader">
          <h2 id="teamAName">Team A (Spieler 1+2)</h2>
          <div class="badge" id="teamABadge">Bummerl: 0 / 13</div>
        </div>
        <div class="contentPad">
        <div class="teamHeaderNames" id="teamAPlayers">Spieler 1 + Spieler 2</div>
        
        <div class="teamImagesRow">
          <div class="imgBox imgBoxBig">
            <img id="teamAImg" alt="Hangman Team A" src="" />
          </div>
        
          <div class="imgBox imgBoxBig">
            <img id="teamAStricherlImg" alt="Stricherl Team A" src="" />
          </div>
        </div>
        </div>
      </div>

      <div class="card">
        <div class="cardHeader">
          <h2 id="teamBName">Team B (Spieler 3+4)</h2>
          <div class="badge" id="teamBBadge">Bummerl: 0 / 13</div>
        </div>
        <div class="contentPad">
        <div class="teamHeaderNames" id="teamBPlayers">Spieler 3 + Spieler 4</div>
        
        <div class="teamImagesRow">
          <div class="imgBox imgBoxBig">
            <img id="teamBImg" alt="Hangman Team B" src="" />
          </div>
        
          <div class="imgBox imgBoxBig">
            <img id="teamBStricherlImg" alt="Stricherl Team B" src="" />
          </div>
        </div>
        </div>
      </div>
    </div>

    <div class="mainGrid">
      <div class="card">
        <div class="cardHeader">
          <h2>Aktueller Bummerl</h2>
          <div class="badge" id="bummerlInfo">Bummerl #1</div>
        </div>
        <div class="contentPad">
          <div class="scoreBox">
            <div class="score">
              <h3>Team A – Restpunkte</h3>
              <div class="val" id="teamARest">24</div>
              <div class="small" id="teamARestSmall"></div>
            </div>
            <div class="score">
              <h3>Team B – Restpunkte</h3>
              <div class="val" id="teamBRest">24</div>
              <div class="small" id="teamBRestSmall"></div>
            </div>
          </div>

          <div style="height:12px"></div>

          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Geber</th>
                <th>Gewinner</th>
                <th>Ansage</th>
                <th>Schuss</th>
                <th>Trumpf</th>
                <th class="right">Punkte</th>
              </tr>
            </thead>
            <tbody id="roundTable"></tbody>
          </table>

          <div class="small" style="margin-top:10px;">
            Klicke auf eine Zeile zum Eintragen oder Bearbeiten. Gespeichert wird erst mit <b>„Fertig“</b>.
          </div>
        </div>
      </div>

      <div>
        <div class="card">
          <div class="cardHeader">
            <h2>Aktionen</h2>
            <div class="badge" id="dealerInfo">Geber: –</div>
          </div>
          <div class="contentPad">
            <div class="btnRow">
              <button class="btnPrimary" id="btnAddRound">Runde eintragen</button>
              <button class="btnGhost" id="btnHistory">History</button>
            </div>
            <div class="btnRow" style="margin-top:10px;">
              <button id="btnUndo">Letzte Runde zurück</button>
              <button class="btnDanger" id="btnReset">Alles löschen</button>
            </div>

            <div class="note" style="margin-top:12px;">
              <b>Retour-Schneider Markierung:</b><br/>
              Team steht noch bei <b>24</b>, Gegner hat schon Punkte ⇒ dieses Team ist “Retour-Kandidat”.  
              Verliert es danach eine Runde ⇒ Retour weg. Gewinnt es den Bummerl als Kandidat ⇒ <b>4 Bummerl</b> für Verlierer.
            </div>
          </div>
        </div>

        <div class="card" style="margin-top:14px;">
          <div class="cardHeader">
            <h2>Setup</h2>
            <div class="badge">Sitzordnung fix</div>
          </div>
          <div class="contentPad">
            <div class="btnRow">
              <button id="btnSetup">Spieler einstellen</button>
              <button id="btnNewBummerl">Neuer Bummerl</button>
            </div>
            <div class="small" style="margin-top:10px;">
              Uhrzeigersinn (Rundtisch): <b>1 → 3 → 2 → 4 → 1</b>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal: Runde -->
    <div class="modalOverlay" id="modalRound">
      <div class="shbModal">
        <div class="modalHead">
          <h2 id="modalRoundTitle">Runde eintragen</h2>
          <button class="btnGhost" id="btnCloseRound">Schließen</button>
        </div>
        <div class="modalBody">
          <div class="grid2">
            <div>
              <label>Gewinnerteam</label>
              <select id="selWinner">
                <option value="A">Team A (Spieler 1+2)</option>
                <option value="B">Team B (Spieler 3+4)</option>
              </select>
            </div>
            <div>
              <label>Trumpf (optional, für History)</label>
              <select id="selTrumpf">
                <option value="">–</option>
                <option>Herz</option>
                <option>Eichel</option>
                <option>Pik</option>
                <option>Schelle</option>
              </select>
            </div>
          </div>

          <div class="grid2">
            <div>
              <label>Ansage / Spiel</label>
              <select id="selGame"></select>
            </div>
            <div>
              <label>Schuss (doppelt für Gewinner)</label>
              <select id="selShot">
                <option value="0">Nein</option>
                <option value="1">Ja (x2)</option>
              </select>
            </div>
          </div>

          <div class="note" id="modalPreview">–</div>
        </div>
        <div class="modalFoot">
          <button id="btnCancelRound">Abbrechen</button>
          <button class="btnPrimary" id="btnSaveRound">Fertig – speichern</button>
        </div>
      </div>
    </div>

    <!-- Modal: Setup -->
    <div class="modalOverlay" id="modalSetup">
      <div class="shbModal">
        <div class="modalHead">
          <h2>Spieler & Start-Geber</h2>
          <button class="btnGhost" id="btnCloseSetup">Schließen</button>
        </div>
        <div class="modalBody">
          <div class="grid2">
            <div>
              <label>Spieler 1 (Süd)</label>
              <input type="text" id="p1" placeholder="z.B. Maxx" />
            </div>
            <div>
              <label>Spieler 2 (Nord)</label>
              <input type="text" id="p2" placeholder="z.B. Moni" />
            </div>
          </div>

          <div class="grid2">
            <div>
              <label>Spieler 3 (West)</label>
              <input type="text" id="p3" placeholder="z.B. Rene" />
            </div>
            <div>
              <label>Spieler 4 (Ost)</label>
              <input type="text" id="p4" placeholder="z.B. Rita" />
            </div>
          </div>

          <div class="grid2">
            <div>
              <label>Wer beginnt als Geber? (Bummerl #1)</label>
              <select id="selStartDealer">
                <option value="1">Spieler 1</option>
                <option value="2">Spieler 2</option>
                <option value="3">Spieler 3</option>
                <option value="4">Spieler 4</option>
              </select>
            </div>
            <div>
              <label>Hangman-Bilder Pfad</label>
              <input type="text" id="imgPath" placeholder="/img/hangman" />
            </div>
          </div>

          <div class="note">
            Teams fix: <b>(1+2)</b> vs <b>(3+4)</b><br/>
            Geber rotiert: <b>1 → 3 → 2 → 4</b><br/>
            Neuer Bummerl startet beim “nächsten nach dem vorherigen Anfangsgeber”.
          </div>
        </div>
        <div class="modalFoot">
          <button id="btnCancelSetup">Abbrechen</button>
          <button class="btnPrimary" id="btnSaveSetup">Speichern</button>
        </div>
      </div>
    </div>

    <!-- Modal: History -->
    <div class="modalOverlay" id="modalHistory">
      <div class="shbModal">
        <div class="modalHead">
          <h2>History</h2>
          <button class="btnGhost" id="btnCloseHistory">Schließen</button>
        </div>
        <div class="modalBody" id="historyBody">
          <div class="note">Noch keine Daten.</div>
        </div>
        <div class="modalFoot">
          <button id="btnExport">Export JSON</button>
          <button class="btnPrimary" id="btnCloseHistory2">Fertig</button>
        </div>
      </div>
    </div>

  </div>
</div>

<script>
/* ======= Spiele ======= */
const GAME_DEFS = [
  { key:"normal_3", label:"Normale Runde (3)", points:3 },
  { key:"normal_2", label:"Normale Runde (2)", points:2 },
  { key:"normal_1", label:"Normale Runde (1)", points:1 },
  { key:"bettler", label:"Bettler (4)", points:4 },
  { key:"ass_bettler", label:"Ass-Bettler (6)", points:6 },
  { key:"schnapser", label:"Schnapser (6)", points:6 },
  { key:"schnapser_partner", label:"Schnapser mit Partner (6)", points:6 },
  { key:"gang", label:"Gang (9)", points:9 },
  { key:"zehnerloch", label:"Zehnerloch (10)", points:10 },
  { key:"bauer", label:"Bauer (12)", points:12 },
  { key:"kontra_schnapser", label:"Kontra-Schnapser (12)", points:12 },
  { key:"kontra_bauer", label:"Kontra-Bauer (24)", points:24, noShot:true },
  { key:"farbenring_normal", label:"Farbenring normal (18)", points:18, noShot:true },
  { key:"farbenring_trumpf", label:"Farbenring Trumpf (24)", points:24, noShot:true }
];

const STORAGE_KEY = "shb_schnapsen_tracker_v1";

/* ======= Dealer Rotation (clockwise): 1 → 3 → 2 → 4 ======= */
const CLOCKWISE = [1,3,2,4];
function nextDealer(d){
  const i = CLOCKWISE.indexOf(d);
  return CLOCKWISE[(i+1)%CLOCKWISE.length];
}
function nextStartDealer(d){ return nextDealer(d); }

function freshState(){
  return {
    settings:{
      players:{1:"Spieler 1",2:"Spieler 2",3:"Spieler 3",4:"Spieler 4"},
      imgPath:"/img/hangman",
      startDealer:1
    },
    match:{
      bummerlToWin:13,
      teamA_bummerl:0,
      teamB_bummerl:0,
      bummerlIndex:1,
      current:{
        restA:24,
        restB:24,
        rounds:[],
        dealer:1,
        bummerlStartDealer:1,
        retourCandidate:null
      },
      history:[]
    }
  };
}

function loadState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  }catch(e){
    console.warn("loadState failed", e);
    return null;
  }
}
function saveState(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function clamp(n,min,max){ return Math.max(min, Math.min(max,n)); }

function tallyString(n){
  let out = "";
  let full = Math.floor(n/5);
  let rest = n%5;
  for(let i=0;i<full;i++) out += "||||/\\n";
  out += "|".repeat(rest);
  return out.trim();
}

let state = loadState() ?? freshState();

/* ======= UI ======= */
const el = {
  teamAName: document.getElementById("teamAName"),
  teamBName: document.getElementById("teamBName"),
  teamABadge: document.getElementById("teamABadge"),
  teamBBadge: document.getElementById("teamBBadge"),
  teamAImg: document.getElementById("teamAImg"),
  teamBImg: document.getElementById("teamBImg"),

  bummerlInfo: document.getElementById("bummerlInfo"),
  dealerInfo: document.getElementById("dealerInfo"),
  teamARest: document.getElementById("teamARest"),
  teamBRest: document.getElementById("teamBRest"),
  teamARestSmall: document.getElementById("teamARestSmall"),
  teamBRestSmall: document.getElementById("teamBRestSmall"),
  roundTable: document.getElementById("roundTable"),

  modalRound: document.getElementById("modalRound"),
  modalSetup: document.getElementById("modalSetup"),
  modalHistory: document.getElementById("modalHistory"),
  historyBody: document.getElementById("historyBody"),

  selWinner: document.getElementById("selWinner"),
  selTrumpf: document.getElementById("selTrumpf"),
  selGame: document.getElementById("selGame"),
  selShot: document.getElementById("selShot"),
  modalPreview: document.getElementById("modalPreview"),
  modalRoundTitle: document.getElementById("modalRoundTitle"),

  p1: document.getElementById("p1"),
  p2: document.getElementById("p2"),
  p3: document.getElementById("p3"),
  p4: document.getElementById("p4"),
  selStartDealer: document.getElementById("selStartDealer"),
  imgPath: document.getElementById("imgPath"),
  
  teamAStricherlImg: document.getElementById("teamAStricherlImg"),
  teamBStricherlImg: document.getElementById("teamBStricherlImg"),
  teamAPlayers: document.getElementById("teamAPlayers"),
  teamBPlayers: document.getElementById("teamBPlayers"),
  };

function openModal(m){ m.style.display="flex"; }
function closeModal(m){ m.style.display="none"; }

function dealerName(n){
  const p = state.settings.players;
  return `${p[n]} (Spieler ${n})`;
}
function teamLabel(team){
  const p = state.settings.players;
  return team==="A"
    ? `Team A (${p[1]} + ${p[2]})`
    : `Team B (${p[3]} + ${p[4]})`;
}
function hangmanImg(team){
  const rawPath = (state.settings.imgPath || "/img/hangman");
  const path = rawPath.endsWith("/") ? rawPath.slice(0, -1) : rawPath;

  const b = team==="A" ? state.match.teamA_bummerl : state.match.teamB_bummerl;
  const step = clamp(b, 0, state.match.bummerlToWin);

  return `${path}/Bummerl_${step}.png`;
}

function stricherlImg(team){
  const rawPath = (state.settings.imgPath || "/img/hangman");
  const path = rawPath.endsWith("/") ? rawPath.slice(0, -1) : rawPath;

  const b = team==="A" ? state.match.teamA_bummerl : state.match.teamB_bummerl;
  const step = clamp(b, 0, state.match.bummerlToWin);

  return `${path}/Stricherl_${step}.png`;
}
  
function buildGameSelect(){
  el.selGame.innerHTML = "";
  for(const g of GAME_DEFS){
    const opt = document.createElement("option");
    opt.value = g.key;
    opt.textContent = g.label;
    el.selGame.appendChild(opt);
  }
}
buildGameSelect();

/* ======= Retour-Schneider Logic ======= */
function refreshRetourCandidate(){
  const {restA, restB} = state.match.current;
  let cand = null;
  if(restA===24 && restB<24) cand = "A";
  if(restB===24 && restA<24) cand = "B";
  if(!state.match.current.retourCandidate){
    state.match.current.retourCandidate = cand;
  }
}

function applyRound(round){
  const c = state.match.current;
  const g = GAME_DEFS.find(x=>x.key===round.gameKey);
  const base = g?.points ?? 0;

  if(g?.noShot) round.shot = 0;

  refreshRetourCandidate();

  const mult = round.shot ? 2 : 1;
  const pts = base * mult;

  if(round.winner==="A") c.restA = clamp(c.restA - pts, 0, 24);
  else c.restB = clamp(c.restB - pts, 0, 24);

  if(c.retourCandidate && c.retourCandidate !== round.winner){
    c.retourCandidate = null;
  }

  c.dealer = nextDealer(c.dealer);

  round.points = pts;
  return pts;
}

function recomputeCurrent(){
  const start = state.match.current.bummerlStartDealer;
  const rounds = state.match.current.rounds.map(r=>({...r}));

  state.match.current.restA = 24;
  state.match.current.restB = 24;
  state.match.current.dealer = start;
  state.match.current.retourCandidate = null;

  for(const r of rounds){
    applyRound(r);
  }
  state.match.current.rounds = rounds;
}

function awardBummerl(winnerTeam){
  const c = state.match.current;
  const loser = winnerTeam==="A" ? "B" : "A";

  const loserHadNoPoints = (loser==="A" ? c.restA : c.restB) === 24;
  const winnerIsRetour = c.retourCandidate === winnerTeam;

  let add = 1;
  let reason = "Bummerl";

  if(loserHadNoPoints){
    add = 2;
    reason = "Schneider";
  } else if(winnerIsRetour){
    add = 4;
    reason = "Retour-Schneider";
  }

  if(loser==="A") state.match.teamA_bummerl += add;
  else state.match.teamB_bummerl += add;

  state.match.history.push({
    type:"bummerl_end",
    bummerlIndex: state.match.bummerlIndex,
    winner: winnerTeam,
    loser,
    addBummerlToLoser: add,
    reason,
    rounds: c.rounds.map(r=>({...r})),
    endRestA: c.restA,
    endRestB: c.restB,
    startedBy: c.bummerlStartDealer
  });

  const nextStart = nextStartDealer(c.bummerlStartDealer);
  state.match.bummerlIndex += 1;
  state.match.current = {
    restA:24, restB:24,
    rounds:[],
    dealer: nextStart,
    bummerlStartDealer: nextStart,
    retourCandidate:null
  };

  saveState();
  render();

  alert(`${reason}! Verlierer bekommt ${add} Bummerl. (Neuer Bummerl gestartet)`);
}

/* ======= Modals ======= */
let pendingRoundIndex = null;

function updateRoundPreview(){
  const winner = el.selWinner.value;
  const g = GAME_DEFS.find(x=>x.key===el.selGame.value);
  const shot = Number(el.selShot.value);

  if(g?.noShot) el.selShot.value = "0";

  const base = g?.points ?? 0;
  const mult = shot ? 2 : 1;
  const pts = base * mult;

  const restA = state.match.current.restA;
  const restB = state.match.current.restB;

  const newRestA = winner==="A" ? clamp(restA - pts, 0, 24) : restA;
  const newRestB = winner==="B" ? clamp(restB - pts, 0, 24) : restB;

  el.modalPreview.innerHTML = `
    Vorschau: <b>${teamLabel(winner)}</b> gewinnt <b>${g?.label ?? "?"}</b>
    ${shot ? "(geschossen ⇒ x2)" : ""}<br/>
    Punkte: <b>${pts}</b><br/>
    Restpunkte danach: Team A <b>${newRestA}</b> · Team B <b>${newRestB}</b>
  `;
}

function openRoundModal(index=null){
  pendingRoundIndex = index;
  el.modalRoundTitle.textContent = index===null ? "Runde eintragen" : `Runde #${index+1} bearbeiten`;
  const last = state.match.current.rounds[index ?? state.match.current.rounds.length-1];
  el.selWinner.value = last?.winner ?? "A";
  el.selGame.value = last?.gameKey ?? "normal_3";
  el.selShot.value = String(last?.shot ?? 0);
  el.selTrumpf.value = last?.trumpf ?? "";
  updateRoundPreview();
  openModal(el.modalRound);
}

function openSetupModal(){
  const p = state.settings.players;
  el.p1.value = p[1] ?? "";
  el.p2.value = p[2] ?? "";
  el.p3.value = p[3] ?? "";
  el.p4.value = p[4] ?? "";
  el.selStartDealer.value = String(state.settings.startDealer ?? 1);
  el.imgPath.value = state.settings.imgPath ?? "/img/hangman";
  openModal(el.modalSetup);
}

/* ======= Render ======= */
function render(){
  const p = state.settings.players;

  el.teamAName.textContent = `Team A (${p[1]} + ${p[2]})`;
  el.teamBName.textContent = `Team B (${p[3]} + ${p[4]})`;

  el.teamABadge.textContent = `Bummerl: ${state.match.teamA_bummerl} / ${state.match.bummerlToWin}`;
  el.teamBBadge.textContent = `Bummerl: ${state.match.teamB_bummerl} / ${state.match.bummerlToWin}`;

  el.teamAImg.src = hangmanImg("A");
  el.teamBImg.src = hangmanImg("B");

  // Header-Namen (ohne Süd/Nord usw.)
  el.teamAPlayers.textContent = `${p[1]} + ${p[2]}`;
  el.teamBPlayers.textContent = `${p[3]} + ${p[4]}`;
  
  // Hangman + Stricherl Bilder
  el.teamAImg.src = hangmanImg("A");
  el.teamBImg.src = hangmanImg("B");
  el.teamAStricherlImg.src = stricherlImg("A");
  el.teamBStricherlImg.src = stricherlImg("B");

  el.bummerlInfo.textContent = `Bummerl #${state.match.bummerlIndex}`;
  el.dealerInfo.textContent = `Geber: ${dealerName(state.match.current.dealer)}`;

  el.teamARest.textContent = String(state.match.current.restA);
  el.teamBRest.textContent = String(state.match.current.restB);

  const cand = state.match.current.retourCandidate;
  el.teamARestSmall.textContent = cand==="A" ? "Retour-Schneider Kandidat ✅" : "";
  el.teamBRestSmall.textContent = cand==="B" ? "Retour-Schneider Kandidat ✅" : "";

  el.roundTable.innerHTML = "";
  const rounds = state.match.current.rounds;

  for(let i=0;i<rounds.length;i++){
    const r = rounds[i];
    const tr = document.createElement("tr");

    if(cand==="A") tr.classList.add("highlightRetourA");
    if(cand==="B") tr.classList.add("highlightRetourB");

    const g = GAME_DEFS.find(x=>x.key===r.gameKey);
    tr.innerHTML = `
      <td>${i+1}</td>
      <td>${dealerName(r.dealer)}</td>
      <td>${r.winner==="A" ? "Team A" : "Team B"}</td>
      <td>${g?.label ?? r.gameKey}</td>
      <td>${r.shot ? "Ja" : "Nein"}</td>
      <td>${r.trumpf || "–"}</td>
      <td class="right"><b>${r.points ?? ""}</b></td>
    `;
    tr.addEventListener("click", ()=>openRoundModal(i));
    el.roundTable.appendChild(tr);
  }

  if(state.match.teamA_bummerl >= state.match.bummerlToWin) alert("🏆 Team A hat das Match gewonnen!");
  if(state.match.teamB_bummerl >= state.match.bummerlToWin) alert("🏆 Team B hat das Match gewonnen!");
}

/* ======= History ======= */
function renderHistory(){
  const hist = state.match.history;
  if(!hist.length){
    el.historyBody.innerHTML = `<div class="note">Noch keine abgeschlossenen Bummerl in der History.</div>`;
    return;
  }
  let html = "";
  for(let i=hist.length-1;i>=0;i--){
    const h = hist[i];
    const p = state.settings.players;
    const win = h.winner==="A" ? `Team A (${p[1]}+${p[2]})` : `Team B (${p[3]}+${p[4]})`;

    html += `
      <div class="note">
        <b>Bummerl #${h.bummerlIndex}</b> – ${h.reason}<br/>
        Gewinner: <b>${win}</b> · Verlierer bekommt <b>${h.addBummerlToLoser}</b> Bummerl<br/>
        Start-Geber: <b>${dealerName(h.startedBy)}</b> · Endstand Rest: A <b>${h.endRestA}</b> / B <b>${h.endRestB}</b>
      </div>
    `;

    html += `
      <table style="margin-top:8px;">
        <thead>
          <tr><th>#</th><th>Geber</th><th>Gewinner</th><th>Ansage</th><th>Schuss</th><th>Trumpf</th><th class="right">Punkte</th></tr>
        </thead>
        <tbody>
          ${h.rounds.map((r,idx)=>{
            const g = GAME_DEFS.find(x=>x.key===r.gameKey);
            return `
              <tr>
                <td>${idx+1}</td>
                <td>${dealerName(r.dealer)}</td>
                <td>${r.winner==="A"?"Team A":"Team B"}</td>
                <td>${g?.label ?? r.gameKey}</td>
                <td>${r.shot?"Ja":"Nein"}</td>
                <td>${r.trumpf || "–"}</td>
                <td class="right"><b>${r.points ?? ""}</b></td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
      <div style="height:12px"></div>
    `;
  }
  el.historyBody.innerHTML = html;
}

/* ======= Events ======= */
document.getElementById("btnAddRound").addEventListener("click", ()=>openRoundModal(null));
document.getElementById("btnCloseRound").addEventListener("click", ()=>closeModal(el.modalRound));
document.getElementById("btnCancelRound").addEventListener("click", ()=>closeModal(el.modalRound));

el.selWinner.addEventListener("change", updateRoundPreview);
el.selGame.addEventListener("change", updateRoundPreview);
el.selShot.addEventListener("change", updateRoundPreview);
el.selTrumpf.addEventListener("change", updateRoundPreview);

document.getElementById("btnSaveRound").addEventListener("click", ()=>{
  const c = state.match.current;
  const round = {
    winner: el.selWinner.value,
    gameKey: el.selGame.value,
    shot: Number(el.selShot.value),
    trumpf: el.selTrumpf.value || "",
    dealer: null,
    points: 0
  };

  if(pendingRoundIndex === null){
    round.dealer = c.dealer;
    c.rounds.push(round);
  } else {
    round.dealer = c.rounds[pendingRoundIndex].dealer;
    c.rounds[pendingRoundIndex] = round;
  }

  recomputeCurrent();
  saveState();
  closeModal(el.modalRound);
  render();

  if(state.match.current.restA === 0) awardBummerl("A");
  else if(state.match.current.restB === 0) awardBummerl("B");
});

document.getElementById("btnUndo").addEventListener("click", ()=>{
  const c = state.match.current;
  if(!c.rounds.length) return;
  c.rounds.pop();
  recomputeCurrent();
  saveState();
  render();
});

document.getElementById("btnReset").addEventListener("click", ()=>{
  if(!confirm("Wirklich ALLES löschen? (Match + History)")) return;
  state = freshState();
  saveState();
  render();
});

document.getElementById("btnSetup").addEventListener("click", openSetupModal);
document.getElementById("btnCloseSetup").addEventListener("click", ()=>closeModal(el.modalSetup));
document.getElementById("btnCancelSetup").addEventListener("click", ()=>closeModal(el.modalSetup));

document.getElementById("btnSaveSetup").addEventListener("click", ()=>{
  state.settings.players[1] = el.p1.value.trim() || "Spieler 1";
  state.settings.players[2] = el.p2.value.trim() || "Spieler 2";
  state.settings.players[3] = el.p3.value.trim() || "Spieler 3";
  state.settings.players[4] = el.p4.value.trim() || "Spieler 4";
  state.settings.startDealer = Number(el.selStartDealer.value);
  state.settings.imgPath = el.imgPath.value.trim() || "/img/hangman";

  if(state.match.bummerlIndex === 1 && state.match.current.rounds.length === 0){
    const sd = state.settings.startDealer;
    state.match.current.dealer = sd;
    state.match.current.bummerlStartDealer = sd;
  }

  saveState();
  closeModal(el.modalSetup);
  render();
});

document.getElementById("btnNewBummerl").addEventListener("click", ()=>{
  if(state.match.current.rounds.length){
    if(!confirm("Aktueller Bummerl hat bereits Runden. Trotzdem neuen Bummerl starten?")) return;
  }
  const c = state.match.current;
  const nextStart = nextStartDealer(c.bummerlStartDealer);
  state.match.bummerlIndex += 1;
  state.match.current = {
    restA:24, restB:24, rounds:[],
    dealer: nextStart,
    bummerlStartDealer: nextStart,
    retourCandidate:null
  };
  saveState();
  render();
});

document.getElementById("btnHistory").addEventListener("click", ()=>{
  renderHistory();
  openModal(el.modalHistory);
});
document.getElementById("btnCloseHistory").addEventListener("click", ()=>closeModal(el.modalHistory));
document.getElementById("btnCloseHistory2").addEventListener("click", ()=>closeModal(el.modalHistory));

document.getElementById("btnExport").addEventListener("click", ()=>{
  const data = JSON.stringify(state, null, 2);
  navigator.clipboard.writeText(data).then(()=>alert("JSON in Zwischenablage kopiert ✅"))
    .catch(()=>alert("Konnte nicht kopieren (Browser Rechte)."));
});

/* ======= Init ======= */
(function init(){
  if(!state.match.current.bummerlStartDealer){
    const sd = state.settings.startDealer ?? 1;
    state.match.current.bummerlStartDealer = sd;
    state.match.current.dealer = sd;
  }
  recomputeCurrent();
  saveState();
  render();
})();
</script>
