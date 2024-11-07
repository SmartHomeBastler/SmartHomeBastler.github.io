---
title: Müllerinnerung Sensoren Codegenerator
subtitle: Erstelle die Template-Codes für deine Müllerinnerung
description: Generiere die Templates für die Waste Collection Schedule Integration anhand der Angaben aus deinem Müllkalender.
show_sidebar: false
layout: page
---

<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Müllkalender Import</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            padding: 20px;
        }
        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            max-width: 500px;
            margin: auto;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            text-align: center;
        }
        label {
            display: block;
            margin-top: 10px;
            font-weight: bold;
        }
        input, button {
            width: 100%;
            padding: 8px;
            margin-top: 5px;
            border-radius: 4px;
            border: 1px solid #ddd;
        }
        button {
            background-color: #4CAF50;
            color: white;
            cursor: pointer;
        }
        button:hover {
            background-color: #45a049;
        }
        #entry-list {
            margin-top: 20px;
            padding: 10px;
            background-color: #f7f7f7;
            border-radius: 4px;
            border: 1px solid #ddd;
            font-family: monospace;
            max-height: 300px;
            overflow-y: auto;
        }
    </style>
</head>
<body>

<div class="container">
    <h2>Müllkalender Import</h2>
    <label for="icsFile">ICS-Datei hochladen</label>
    <input type="file" id="icsFile" accept=".ics" />

    <label for="calendarUrl">oder ICS-URL eingeben</label>
    <input type="url" id="calendarUrl" placeholder="https://example.com/kalender.ics" />

    <button onclick="extractEntries()">Einträge extrahieren</button>

    <h3>Extrahierte Einträge</h3>
    <pre id="entry-list">Hier erscheinen die "Summary"-Einträge...</pre>
</div>

<script>
    async function extractEntries() {
        const fileInput = document.getElementById('icsFile');
        const urlInput = document.getElementById('calendarUrl');
        const entryList = document.getElementById('entry-list');
        entryList.textContent = "Lade und verarbeite Daten...";

        let icsData;
        
        if (fileInput.files.length > 0) {
            // File upload
            const file = fileInput.files[0];
            icsData = await file.text();
        } else if (urlInput.value) {
            // URL input
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

        // Extract "SUMMARY" entries
        const summaryEntries = [];
        const lines = icsData.split("\n");
        for (let line of lines) {
            if (line.startsWith("SUMMARY:")) {
                summaryEntries.push(line.replace("SUMMARY:", "").trim());
            }
        }

        // Display extracted summaries
        entryList.textContent = summaryEntries.length > 0 
            ? summaryEntries.join("\n")
            : "Keine 'Summary'-Einträge gefunden.";
    }
</script>

</body>
</html>