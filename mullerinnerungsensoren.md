---
title: Müllerinnerung Sensoren Codegenerator
subtitle: Erstelle die Template-Codes für deine Müllerinnerung
description: Generiere die Templates für die Waste Collection Schedule Integration anhand der Angaben aus deinem Müllkalender.
show_sidebar: false
layout: page
---

<div class="container mt-5">
    <h2 class="text-center">Müllkalender Import</h2>
    <div class="form-group">
        <label for="icsFile">ICS-Datei hochladen</label>
        <input type="file" id="icsFile" class="form-control" accept=".ics" />
    </div>
    
    <div class="form-group mt-3">
        <label for="calendarUrl">oder ICS-URL eingeben</label>
        <input type="url" id="calendarUrl" class="form-control" placeholder="https://example.com/kalender.ics" />
    </div>

    <button class="btn btn-success w-100 mt-3" onclick="extractEntries()">Einträge extrahieren</button>

    <h3 class="mt-4">Extrahierte Einträge</h3>
    <pre id="entry-list" class="p-3 bg-light border rounded">Hier erscheinen die "Summary"-Einträge...</pre>
</div>

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
