---
title: Müllerinnerung Sensoren Codegenerator
subtitle: Erstelle die Template-Codes für deine Müllerinnerung
description: Generiere die Templates für die Waste Collection Schedule Integration anhand der Angaben aus deinem Müllkalender.
show_sidebar: false
layout: page
---

<div class="custom-container">
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

    <h3 class="custom-subtitle">Extrahierte Einträge</h3>
    <pre id="entry-list" class="custom-pre">Hier erscheinen die "Summary"-Einträge...</pre>
</div>

<style>
    .custom-container {
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        max-width: 500px;
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
        const entryList = document.getElementById('entry-list');
        entryList.textContent = "Lade und verarbeite Daten...";

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
                entryList.textContent = `Fehler beim Laden der ICS-Datei: ${error.message}`;
                return;
            }
        } else {
            entryList.textContent = "Bitte eine ICS-Datei hochladen oder eine URL eingeben.";
            return;
        }

        // "SUMMARY"-Einträge extrahieren
        const summaryEntries = [];
        const lines = icsData.split("\n");
        for (let line of lines) {
            if (line.startsWith("SUMMARY:")) {
                summaryEntries.push(line.replace("SUMMARY:", "").trim());
            }
        }

        // Extrahierte Einträge anzeigen
        entryList.textContent = summaryEntries.length > 0 
            ? summaryEntries.join("\n")
            : "Keine 'Summary'-Einträge gefunden.";
    }
</script>
