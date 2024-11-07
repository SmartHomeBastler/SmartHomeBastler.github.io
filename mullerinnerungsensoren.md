---
title: Müllerinnerung Sensoren Codegenerator
subtitle: Erstelle die Template-Codes für deine Müllerinnerung
description: Generiere die Templates für die Waste Collection Schedule Integration anhand der Angaben aus deinem Müllkalender.
show_sidebar: false
layout: page
---

<div class="custom-container-wide">
    <h2 class="custom-title">Müllkalender Import und Code-Generator</h2>

    <!-- Important Notice -->
    <div class="important-container">
        <h3>Wichtig!</h3>
        <p>
            Vor dem Erstellen der Codes stelle sicher, dass die Integration <strong>"Waste Collection Schedule"</strong> in HACS heruntergeladen und installiert ist. Mit der neuesten Version dieser Integration ist es möglich, die Sensoren usw. direkt in Home Assistant unter Geräte & Dienste einzurichten. Im Weiteren Verlauf dieser Code-Generierung, werden alle notwendigen Angaben für diese Integration für dich bereitgestellt.
        </p>
    </div>

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

    <!-- Code Output for Templates in a Code Block with Copy Button -->
    <h3 class="custom-subtitle" id="template-header" style="display:none;">Werte Templates</h3>
    <div id="code-output" style="display:none;">
        <h4>Werte Template Nächste Abholung</h4>
        <div class="code-block">
            <pre id="next-pickup-template"></pre>
            <button class="copy-button" onclick="copyCode('next-pickup-template')">Copy</button>
        </div>

        <h4>Werte Template einzelne Abholungen</h4>
        <div class="code-block">
            <pre id="individual-pickup-template"></pre>
            <button class="copy-button" onclick="copyCode('individual-pickup-template')">Copy</button>
        </div>
    </div>
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
    .important-container {
        background-color: #ffeb3b;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
        border: 1px solid #ffc107;
    }
    .important-container h3 {
        margin: 0;
        font-size: 1.2em;
        color: #333;
    }
    .important-container p {
        margin: 5px 0 0;
        color: #555;
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
    .code-block {
        position: relative;
        background-color: #f5f5f5;
        border: 1px solid #ddd;
        border-radius: 5px;
        padding: 15px;
        margin-bottom: 20px;
        font-family: monospace;
        white-space: pre-wrap;
    }
    .code-block pre {
        margin: 0;
        padding-right: 50px;
    }
    .copy-button {
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: #007bff;
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 3px;
        cursor: pointer;
        font-size: 12px;
    }
    .copy-button:hover {
        background-color: #0056b3;
    }
</style>

<script>
    // Code templates as JavaScript strings using template literals
    const nextPickupTemplate = `{{ value.types | join(", ") }}{% if value.daysTo == 0 %} Heute{% elif value.daysTo == 1 %} Morgen{% else %} in {{ value.daysTo }} Tagen{% endif %}`;
    const individualPickupTemplate = `{% if value.daysTo == 0 %} Heute{% elif value.daysTo == 1 %} Morgen{% else %} in {{ value.daysTo }} Tagen{% endif %}`;

    // Display templates in pre blocks
    document.addEventListener("DOMContentLoaded", function() {
        document.getElementById("next-pickup-template").textContent = nextPickupTemplate;
        document.getElementById("individual-pickup-template").textContent = individualPickupTemplate;
    });

    function copyCode(elementId) {
        const code = document.getElementById(elementId).textContent;
        navigator.clipboard.writeText(code).then(() => {
            alert("Code erfolgreich kopiert!");
        }).catch(err => {
            alert("Fehler beim Kopieren des Codes: " + err);
        });
    }
    
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
            document.getElementById("template-header").style.display = "block";
            document.getElementById("code-output").style.display = "block";
        }
    }

    function generateSensorTable(selectedEntries) {
        const sensorTableBody = document.getElementById('sensor-table').querySelector('tbody');
        const sensorTable = document.getElementById('sensor-table');
        sensorTableBody.innerHTML = "";

        // Add standard row for "Nächste Abholung"
        const standardRow = document.createElement("tr");
        const standardNameCell = document.createElement("td");
        standardNameCell.textContent = "Nächste Abholung";
        standardRow.appendChild(standardNameCell);

        const standardSensorCell = document.createElement("td");
        standardSensorCell.textContent = "sensor.nachste_abholung";
        standardRow.appendChild(standardSensorCell);

        const standardColorCell = document.createElement("td");
        standardColorCell.textContent = "-"; // No color selection for "Nächste Abholung"
        standardRow.appendChild(standardColorCell);

        sensorTableBody.appendChild(standardRow);

        // Add rows for selected entries
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

        sensorTable.style.display = "table";
    }

    function copyCode(elementId) {
        const code = document.getElementById(elementId).textContent;
        navigator.clipboard.writeText(code).then(() => {
            alert("Code erfolgreich kopiert!");
        }).catch(err => {
            alert("Fehler beim Kopieren des Codes: " + err);
        });
    }
</script>
