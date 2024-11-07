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

    <!-- Table for Calendar Entries -->
    <h3 class="custom-subtitle">Kalendereinträge</h3>
    <table class="custom-table" id="entry-table">
        <thead>
            <tr>
                <th>Auswählen</th>
                <th>Kalendereintrag</th>
                <th>Eigene Bezeichnung</th>
            </tr>
        </thead>
        <tbody>
            <!-- Dynamically populated rows will go here -->
        </tbody>
    </table>

    <button class="custom-button" onclick="checkEntries()">Eingaben überprüfen</button>

    <!-- Table for Sensor Configurations -->
    <h3 class="custom-subtitle">Sensor-Konfigurationen</h3>
    <table class="custom-table" id="sensor-table" style="display:none;">
        <thead>
            <tr>
                <th>Eigene Bezeichnung</th>
                <th>Sensorname</th>
                <th>Farbe</th>
            </tr>
        </thead>
        <tbody>
            <!-- Dynamically populated rows will go here -->
        </tbody>
    </table>

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
    .custom-title, .custom-subtitle {
        text-align: center;
        font-weight: bold;
        margin-top: 20px;
    }
    .custom-form-group {
        margin-top: 15px;
    }
    .custom-label {
        display: block;
        font-weight: bold;
        margin-bottom: 5px;
    }
    .custom-input, .custom-button, select {
        width: 100%;
        padding: 8px;
        margin-top: 5px;
        border-radius: 4px;
        border: 1px solid #ddd;
    }
    .custom-button {
        background-color: #4CAF50;
        color: white;
        cursor: pointer;
    }
    .custom-button:hover {
        background-color: #45a049;
    }
    .custom-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
    }
    .custom-table th, .custom-table td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: center;
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
        const entryTableBody = document.getElementById('entry-table').querySelector('tbody');
        entryTableBody.innerHTML = "Lade und verarbeite Daten...";

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
                entryTableBody.innerHTML = `<tr><td colspan="3">Fehler beim Laden der ICS-Datei: ${error.message}</td></tr>`;
                return;
            }
        } else {
            entryTableBody.innerHTML = "<tr><td colspan='3'>Bitte eine ICS-Datei hochladen oder eine URL eingeben.</td></tr>";
            return;
        }

        const summaryEntries = new Set();
        const lines = icsData.split("\n");
        for (let line of lines) {
            if (line.startsWith("SUMMARY:")) {
                summaryEntries.add(line.replace("SUMMARY:", "").trim());
            }
        }

        entryTableBody.innerHTML = "";
        let idCounter = 0;
        summaryEntries.forEach(entry => {
            const row = document.createElement("tr");

            // Checkbox
            const checkboxCell = document.createElement("td");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "entry-checkbox";
            checkbox.id = `entry-checkbox-${idCounter}`;
            checkboxCell.appendChild(checkbox);
            row.appendChild(checkboxCell);

            // Summary Entry
            const summaryCell = document.createElement("td");
            summaryCell.textContent = entry;
            summaryCell.id = `summary-${idCounter}`;
            row.appendChild(summaryCell);

            // Custom Name Input
            const customNameCell = document.createElement("td");
            const customNameInput = document.createElement("input");
            customNameInput.type = "text";
            customNameInput.placeholder = "Eigene Bezeichnung";
            customNameInput.className = "entry-custom-name";
            customNameInput.id = `custom-name-${idCounter}`;
            customNameCell.appendChild(customNameInput);
            row.appendChild(customNameCell);

            entryTableBody.appendChild(row);
            idCounter++;
        });
    }

    function checkEntries() {
        const entryTableBody = document.getElementById('entry-table').querySelector('tbody');
        const umlautPattern = /[äöüÄÖÜß]/;
        const selectedEntries = Array.from(entryTableBody.querySelectorAll("tr")).filter(row => {
            return row.querySelector(".entry-checkbox").checked;
        });

        let umlautWarning = false;

        selectedEntries.forEach(row => {
            const customName = row.querySelector(".entry-custom-name").value;
            if (umlautPattern.test(customName)) {
                umlautWarning = true;
            }
        });

        if (umlautWarning) {
            alert("Umlaute verwendet! Bitte eigene Bezeichnungen kontrollieren!");
        } else {
            generateSensorTable(selectedEntries);
        }
    }

    function generateSensorTable(selectedEntries) {
        const sensorTableBody = document.getElementById('sensor-table').querySelector('tbody');
        const sensorTable = document.getElementById('sensor-table');
        sensorTableBody.innerHTML = "";
        sensorTable.style.display = "table";

        selectedEntries.forEach((row, index) => {
            const customName = row.querySelector(".entry-custom-name").value || row.querySelector("td:nth-child(2)").textContent;
            const sensorName = `sensor.${customName.toLowerCase().replace(/\s+/g, "_").replace(/[äöüÄÖÜß]/g, match => {
                return {
                    'ä': 'ae', 'ö': 'oe', 'ü': 'ue',
                    'Ä': 'Ae', 'Ö': 'Oe', 'Ü': 'Ue', 'ß': 'ss'
                }[match];
            })}`;

            const sensorRow = document.createElement("tr");

            // Eigene Bezeichnung
            const customNameCell = document.createElement("td");
            customNameCell.textContent = customName;
            sensorRow.appendChild(customNameCell);

            // Sensorname
            const sensorNameCell = document.createElement("td");
            sensorNameCell.textContent = sensorName;
            sensorRow.appendChild(sensorNameCell);

            // Farbe Auswahlfeld
            const colorCell = document.createElement("td");
            const colorSelect = document.createElement("select");
            colorSelect.className = "color-select";
            ["Schwarz-Schwarz", "Schwarz-Blau", "Schwarz-Rot", "Schwarz-Gelb", "Schwarz-Grün", "Schwarz-Braun", "Blau", "Rot", "Gelb", "Grün", "Braun", "Sack"].forEach(color => {
                const option = document.createElement("option");
                option.value = color;
                option.textContent = color;
                colorSelect.appendChild(option);
            });
            colorCell.appendChild(colorSelect);
            sensorRow.appendChild(colorCell);

            sensorTableBody.appendChild(sensorRow);
        });
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
