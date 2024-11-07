---
title: Müllerinnerung Sensoren Codegenerator
subtitle: Erstelle die Template-Codes für deine Müllerinnerung
description: Generiere die Templates für die Waste Collection Schedule Integration anhand der Angaben aus deinem Müllkalender.
show_sidebar: false
layout: page
---

<div class="custom-container-wide">
    <h2 class="custom-title">Müllkalender Import</h2>
    <div class="custom-form-group">
        <label for="icsFile" class="custom-label">ICS-Datei hochladen</label>
        <input type="file" id="icsFile" class="custom-input" accept=".ics" />
    </div>
    
    <div class="custom-form-group">
        <label for="calendarUrl" class="custom-label">oder ICS-URL eingeben</label>
        <input type="url" id="calendarUrl" class="custom-input" placeholder="https://example.com/kalender.ics" />
    </div>

    <button class="custom-button" onclick="extractEntries()">Einträge extrahieren</button>

    <h3 class="custom-subtitle">Kalendereinträge</h3>
    <div id="entry-fields" class="custom-entry-fields">Lade Daten...</div>
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
</style>

<script>
    async function extractEntries() {
        const fileInput = document.getElementById('icsFile');
        const urlInput = document.getElementById('calendarUrl');
        const entryFields = document.getElementById('entry-fields');
        entryFields.textContent = "Lade und verarbeite Daten...";

        let icsData;
        
        if (fileInput.files.length > 0) {
            // Datei-Upload
            const file = fileInput.files[0];
            icsData = await file.text();
        } else if (urlInput.value) {
            // URL-Eingabe
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

        // "SUMMARY"-Einträge extrahieren und duplizierte entfernen
        const summaryEntries = new Set();
        const lines = icsData.split("\n");
        for (let line of lines) {
            if (line.startsWith("SUMMARY:")) {
                summaryEntries.add(line.replace("SUMMARY:", "").trim());
            }
        }

        // Einträge anzeigen mit Eingabefeldern für eigene Bezeichnungen
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

            entryRow.appendChild(entrySummary);
            entryRow.appendChild(entryInput);
            entryFields.appendChild(entryRow);
        });
    }
</script>
