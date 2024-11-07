---
title: Müllerinnerung Sensoren Codegenerator
subtitle: Erstelle die Template-Codes für deine Müllerinnerung
description: Generiere die Templates für die Waste Collection Schedule Integration anhand der Angaben aus deinem Müllkalender.
show_sidebar: false
layout: page
---

<div class="custom-container-wide">
    <h2 class="custom-title">Müllkalender Import und Code-Generator</h2>

    <!-- File Upload and URL Input -->
    <div class="custom-form-group">
        <label for="icsFile" class="custom-label">ICS-Datei hochladen</label>
        <input type="file" id="icsFile" class="custom-input" accept=".ics" />
    </div>
    
    <div class="custom-form-group">
        <label for="calendarUrl" class="custom-label">oder ICS-URL eingeben</label>
        <input type="url" id="calendarUrl" class="custom-input" placeholder="https://example.com/kalender.ics" />
    </div>

    <button class="custom-button" onclick="extractEntries()">Kalendereinträge extrahieren</button>

    <h3 class="custom-subtitle">Kalendereinträge und Eigene Bezeichnungen</h3>
    <div id="entry-fields" class="custom-entry-fields">Lade Daten...</div>

    <!-- Selection for Code Template -->
    <h3 class="custom-subtitle">Template-Optionen</h3>
    <label for="templateOption" class="custom-label">Template auswählen:</label>
    <select id="templateOption" class="custom-input">
        <option value="configuration">configuration.yaml</option>
        <option value="templateFile">Template File</option>
        <option value="templateFolder">Template Folder</option>
    </select>

    <button class="custom-button" onclick="generateCode()">Code generieren</button>

    <h3 class="custom-subtitle">Generierter Code</h3>
    <pre id="generatedCode" class="custom-pre">Hier erscheint der generierte Code...</pre>
    <button class="custom-button" onclick="copyToClipboard()">Code kopieren</button>
</div>

<style>
    .custom-container-wide {
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        max-width: 90%;
        margin: auto;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    }
    .custom-title {
        text-align: center;
        font-weight: bold;
        font-size: 1.5em;
        margin-bottom: 1em;
    }
    .custom-form-group {
        margin-top: 15px;
    }
    .custom-label {
        display: block;
        font-weight: bold;
        margin-bottom: 5px;
    }
    .custom-input {
        width: 100%;
        padding: 8px;
        border-radius: 4px;
        border: 1px solid #ddd;
        box-sizing: border-box;
    }
    .custom-button {
        margin-top: 15px;
        padding: 10px;
        width: 100%;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    .custom-button:hover {
        background-color: #45a049;
    }
    .custom-subtitle {
        margin-top: 20px;
        font-weight: bold;
        font-size: 1.2em;
    }
    .custom-entry-fields {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 10px;
    }
    .entry-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .entry-summary {
        flex: 1;
        font-weight: bold;
    }
    .entry-input {
        flex: 1;
        padding: 8px;
        border-radius: 4px;
        border: 1px solid #ddd;
        box-sizing: border-box;
    }
    .custom-pre {
        margin-top: 10px;
        padding: 10px;
        background-color: #f7f7f7;
        border-radius: 4px;
        border: 1px solid #ddd;
        font-family: monospace;
        max-height: 300px;
        overflow-y: auto;
    }
</style>

<script>
    async function extractEntries() {
        const fileInput = document.getElementById('icsFile');
        const urlInput = document.getElementById('calendarUrl');
        const entryFields = document.getElementById('entry-fields');
        entryFields.textContent = "Lade und verarbeite Daten...";

        let icsData;
        
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            icsData = await file.text();
        } else if (urlInput.value) {
            try {
                const response = await fetch(urlInput.value);
                if (!response.ok) throw new Error("ICS-Datei konnte nicht geladen werden.");
                icsData = await response.text();
            } catch (error) {
                entryFields.textContent = `Fehler beim Laden der ICS-Datei: ${error.message}`;
                return;
            }
        } else {
            entryFields.textContent = "Bitte eine ICS-Datei hochladen oder eine URL eingeben.";
            return;
        }

        const summaryEntries = new Set();
        const lines = icsData.split("\n");
        for (let line of lines) {
            if (line.startsWith("SUMMARY:")) {
                summaryEntries.add(line.replace("SUMMARY:", "").trim());
            }
        }

        entryFields.innerHTML = "";
        summaryEntries.forEach(entry => {
            const entryRow = document.createElement("div");
            entryRow.className = "entry-row";
            
            const entrySummary = document.createElement("span");
            entrySummary.className = "entry-summary";
            entrySummary.textContent = entry;

            const entryInput = document.createElement("input");
            entryInput.className = "entry-input";
            entryInput.placeholder = "Eigene Bezeichnung";
            entryInput.dataset.original = entry;

            entryRow.appendChild(entrySummary);
            entryRow.appendChild(entryInput);
            entryFields.appendChild(entryRow);
        });
    }

    function generateCode() {
        const templateOption = document.getElementById("templateOption").value;
        const entryFields = document.getElementById("entry-fields");
        const generatedCode = document.getElementById("generatedCode");

        const entries = Array.from(entryFields.getElementsByClassName("entry-input"))
            .map(input => ({ original: input.dataset.original, custom: input.value || input.dataset.original }));

        let code = "";

        if (templateOption === "configuration") {
            code += `###---- Template Müllabholung Heute ----###\ntemplate:\n  - sensor:\n`;
        } else if (templateOption === "templateFile") {
            code += `###---- Template Müllabholung Heute ----###\n- sensor:\n`;
        } else if (templateOption === "templateFolder") {
            code += `###---- Template Müllabholung Heute ----###\nsensor:\n`;
        }

        entries.forEach(entry => {
            const sensorName = `sensor.${entry.custom.toLowerCase().replace(/\s+/g, "_")}`;
            code += `  - name: ${entry.custom}\n    unique_id: ${sensorName}_id\n    icon: mdi:trash-can-outline\n    state: >\n`;
            code += `      {% set ALTPAPIER = states.sensor.altpapier.state %}\n`;
            code += `      {% set LEICHTVERPACKUNG = states.sensor.leichtverpackung.state %}\n`;
            code += `      {% set BIOABFALL = states.sensor.bioabfall.state %}\n`;
            code += `      {% set RESTABFALL = states.sensor.restabfall.state %}\n`;
            code += `      ...\n\n`; // Placeholder for further template logic
        });

        generatedCode.textContent = code.trim();
    }

    function copyToClipboard() {
        const generatedCode = document.getElementById("generatedCode");
        navigator.clipboard.writeText(generatedCode.textContent).then(() => {
            alert("Code erfolgreich in die Zwischenablage kopiert!");
        }).catch(err => {
            alert("Fehler beim Kopieren des Codes: " + err);
        });
    }
</script>
