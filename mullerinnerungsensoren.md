---
title: Müllerinnerung Sensoren Codegenerator
subtitle: Erstelle die Template-Codes für deine Müllerinnerung
description: Generiere die Templates für die Waste Collection Schedule Integration anhand der Angaben aus deinem Müllkalender.
show_sidebar: false
layout: page
---


<head>
    <!-- Einbindung von Prism.js für Syntaxhervorhebung und Zeilennummern (helles Theme) -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-coy.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/line-numbers/prism-line-numbers.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/line-numbers/prism-line-numbers.min.js"></script>
</head>

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

    <div class="note-container">
        <h3>Hinweis!</h3>
        <p>
            An diesem Punkt kann die Integration <strong>"Waste Collection Schedule"</strong> in Home Assistant unter <strong>"Einstellungen"</strong>, <strong>"Geräte & Dienste"</strong> eingerichtet werden. Dazu rechts unten auf <strong>"+ INTEGRATION HINZUFÜGEN"</strong>, nach Waste Collection Schedule suchen und diese auswählen.
            Dann wähle dein Land, am nächsten Fenster deine Region bzw. deinen Abfallentsorger und danch füge etweder deine Kalender URL oder den Dateipfad ein. Im nächsten Schritt setze den Haken bei <strong>"Sensor Konfiguration Anzeigen"</strong> und klicke auf <strong>"SPEICHERN"</strong>.
        </p>
        <p>
            Als nächstes ist der Sensor für die nächste Abholung an der Reihe. Füge den Namen <strong>"Nächste Abholung"</strong> ein, setze den Haken bei <strong>"Nächste"</strong>, kopiere dir das <strong>"Werte Template Nächste Abholung"</strong> von unten und füge es bei <strong>"Werte Template"</strong> ein. Weiter unten bei den Sensor Einstellungen findest du das Auswahlfeld <strong>"Typen"</strong>. In diesem wählst du alle deine Abholungs-Typen aus, dann setzt du einen Haken bei <strong>"Weitere Sensoren hinzufügen"</strong> und klickst auf <strong>"SPEICHERN"</strong>.
        </p>
        <p>
            Nun sind die Sensoren für die einzelnen Abholungen an der Reihe. Füge den ersten Sensor Namen aus dem genenerator ein, setze den Haken bei <strong>"Abfallarten"</strong>, kopiere dir das <strong>"Werte Template einzelne Abholung"</strong> von unten und füge es bei <strong>"Werte Template"</strong> ein. Weiter unten im Auswahlfeld <strong>"Typen"</strong> wählst du jene Abholungs-Type aus, welche deinem Sensor Namen entspricht. Wenn du noch weitere Sensoren anlegen möchtest, setzt du einen Haken bei <strong>"Weitere Sensoren hinzufügen"</strong> und klickst auf <strong>"SPEICHERN"</strong>.
        </p>
    </div>

    <table class="custom-table" id="sensor-table" style="display:none;">
        <thead>
            <tr>
                <th>Sensor Name</th>
                <th>Entity ID</th>
                <th>Tonnen Farbe</th>
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
        <div class="code-container">
            <button class="copy-button">Copy</button>
            <pre class="line-numbers"><code class="language-yaml">id="next-pickup-template"</code></pre>
        </div>
    
        <h4>Werte Template einzelne Abholungen</h4>
       <div class="code-container">
            <button class="copy-button">Copy</button>
            <pre class="line-numbers"><code class="language-yaml">id="individual-pickup-template"</code></pre>
        </div>
    </div>
    
    <!-- Code for "Templates erstellen" button and helper template generation -->
    <h3 class="custom-subtitle" id="helper-template-header">Helfer Templates</h3>
    <button class="custom-button" onclick="createHelperTemplate()">Templates erstellen</button>
    <div id="helper-template-output" style="display:none;">
        <h4>Generiertes Helfer Template</h4>
        <div class="code-container">
            <button class="copy-button">Copy</button>
            <pre class="line-numbers"><code class="language-yaml"> id="helper-template"</code></pre>
        </div>
    </div>
</div>

<style>
    /* Allgemeine Container-Einstellungen */
    .custom-container-wide {
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        max-width: 90%;
        margin: auto;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    }
    
    /* Titel und Untertitel */
    .custom-title, .custom-subtitle {
        text-align: center;
        font-weight: bold;
        margin-top: 20px;
    }
    
    /* Wichtiges Hinweis-Container */
    .important-container {
        background-color: #ffeb3b;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
        border: 1px solid #ffc107;
    }
    
    /* Hinweise */
    .note-container {
        background-color: #3bfffd;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
        border: 1px solid #07aaff;
    }

    /* Formulareingabefelder und Buttons */
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
    
    /* Tabellen für Kalender- und Sensorkonfigurationen */
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
    .code-container {
        position: relative;
        background-color: #fdfdfd; /* Heller Hintergrund */
        border: 1px solid #ddd;
        border-radius: 5px;
        padding: 15px;
        margin-bottom: 20px;
        overflow: hidden;
    }

    /* Stil für Code-Text */
    .code-container code {
        font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
        font-size: 0.95em;
        line-height: 1.5;
        color: #333; /* Dunklere Textfarbe für bessere Lesbarkeit */
    }

    /* Stil für den Copy-Button */
    .copy-button {
        position: absolute;
        top: 10px;
        right: 10px;
        background: #007acc;
        color: #fff;
        border: none;
        border-radius: 5px;
        padding: 5px 10px;
        font-size: 0.85em;
        cursor: pointer;
        z-index: 10;
    }

    /* Hover-Effekt für den Copy-Button */
    .copy-button:hover {
        background: #005a9c;
    }
</style>


<script>
    document.addEventListener("DOMContentLoaded", function() {
        try {
            const nextPickupTemplate = `{% raw %}{{ value.types | join(", ") }}{% if value.daysTo == 0 %} Heute{% elif value.daysTo == 1 %} Morgen{% else %} in {{ value.daysTo }} Tagen{% endif %}{% endraw %}`;
            const individualPickupTemplate = `{% raw %}{% if value.daysTo == 0 %} Heute{% elif value.daysTo == 1 %} Morgen{% else %} in {{ value.daysTo }} Tagen{% endif %}{% endraw %}`;
            
            document.getElementById("next-pickup-template").textContent = nextPickupTemplate;
            document.getElementById("individual-pickup-template").textContent = individualPickupTemplate;
        } catch (error) {
            console.error("Error during DOMContentLoaded setup:", error);
        }
    });

    async function extractEntries() {
        try {
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
                    console.error("Fetch error:", error);
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
        } catch (error) {
            console.error("Error in extractEntries:", error);
        }
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
            ["Schwarz", "Blau", "Rot", "Gelb", "Grün", "Braun", "Sack"].forEach(color => {
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

    function createHelperTemplate() {
        const sensorTableBody = document.getElementById('sensor-table').querySelector('tbody');
        const rows = Array.from(sensorTableBody.querySelectorAll("tr")).slice(1);
        
        let allBlack = true;
        let hasSack = false;
        const sensorAssignments = [];
        
        rows.forEach(row => {
            const customName = row.cells[0].textContent.trim();
            const sensorName = "states.sensor." + customName.toLowerCase().replace(/\s+/g, "_") + ".state";
            const color = row.cells[2].querySelector("select").value;
    
            if (color !== "Schwarz") {
                allBlack = false;
            }
            if (color === "Sack") {
                hasSack = true;
            }
    
            sensorAssignments.push({ customName, sensorName, color });
        });
    
        if (allBlack) {
            alert("Die Farben der Tonne sollten zugeordnet werden!");
            return;
        }
    
        // Generiere das Template als reine Zeichenkette
        let templateText = "{% raw %}\n";
    
        // Setzen der Variablen
        sensorAssignments.forEach(({ customName, sensorName }) => {
            templateText += "{% set " + customName.toUpperCase() + " = " + sensorName + " %}\n";
        });
    
        templateText += generateConditionsAsText(sensorAssignments, hasSack);
    
        templateText += "\n{% endraw %}";
    
        document.getElementById("helper-template").textContent = templateText;
        document.getElementById("helper-template-output").style.display = "block";
        document.getElementById("helper-template-header").style.display = "block";
    }

{% raw %}
    function generateConditionsAsText(assignments, hasSack) {
        let yaml = "{% if ";
    
        const combinations = getAllCombinations(assignments);
        combinations.forEach((combination, index) => {
            const condition = combination.map(a => `${a.customName.toUpperCase()} == "Morgen"`).join(" and ");
            const output = generateOutputText(combination, hasSack);
    
            if (index === 0) {
                yaml += `${condition} %}\n`;
            } else {
                yaml += `{% elif ${condition} %}\n`;
            }
            yaml += `    ${output}\n`;
        });
    
        yaml += "{% else %}keine {% endif %}"; // Abschluss des Bedingungsblocks
    
        return yaml;
    }
{% endraw %}
    
    function generateOutputText(assignments, hasSack) {
        // Sortiere "Sack"-Einträge an den Anfang
        const formattedNames = assignments.map(({ customName, color }) => {
            if (hasSack && color === "Sack") {
                return { text: "den " + customName + " Sack", order: 0 };
            }
            return { text: "die " + customName, order: 1 };
        });
    
        // Sortiere nach der Reihenfolge: Sack zuerst, dann die anderen
        formattedNames.sort((a, b) => a.order - b.order);
    
        // Extrahiere die Texte aus den Objekten und erstelle die finale Liste
        const sortedTexts = formattedNames.map(item => item.text);
    
        // Füge "und" vor dem letzten Eintrag hinzu, wenn es mehrere gibt
        if (sortedTexts.length > 1) {
            sortedTexts[sortedTexts.length - 1] = "und " + sortedTexts[sortedTexts.length - 1];
        }
    
        // Wenn nur "Sack" enthalten ist, füge kein "Tonne" hinzu
        if (sortedTexts.length === 1 && hasSack && assignments[0].color === "Sack") {
            return sortedTexts[0];
        }
    
        // Verbinde alle Einträge mit Komma und füge "Tonne" am Ende hinzu
        return sortedTexts.join(", ") + " Tonne";
    }


    function getAllCombinations(arr) {
        const result = [];
        const f = function(prefix = [], arr) {
            result.push(prefix);
            for (let i = 0; i < arr.length; i++) {
                f(prefix.concat(arr[i]), arr.slice(i + 1));
            }
        };
        f([], arr);
        return result.filter(comb => comb.length > 0);
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


