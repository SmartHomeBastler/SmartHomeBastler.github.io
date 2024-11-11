---
title: Müllerinnerung Sensoren Codegenerator
subtitle: Erstelle die Template-Codes für deine Müllerinnerung
description: Generiere die Templates für die Waste Collection Schedule Integration anhand der Angaben aus deinem Müllkalender.
show_sidebar: false
layout: page
---

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

<div class="dropdown">
    <button class="dropdown-toggle" onclick="toggleDropdown()">Waste Collection Schedule Integration und Sensor Einrichtung <span>&#9660;</span></button>
    <div id="galleryDropdown" class="dropdown-content" style="display: none;">
        {% assign gallery_images = site.data.gallery_mull_helfer %}
        <div class="columns is-multiline">
            {% for gallery in gallery_images %}
                <div class="column is-12">
                    <p class="title is-3 has-text-centered">{{ gallery.title }}</p>
                </div>
                {% for image in gallery.images %}
                    <div class="column is-3-desktop is-6-tablet">
                        <div class="card">
                            <div class="card-image">
                                {% include image-modal.html ratio=image.ratio link=image.link alt=image.alt large_link=image.large_link %}
                            </div>
                            <div class="card-content">
                                <div class="content">
                                    {{ image.description | markdownify }}
                                </div>
                            </div>
                        </div>
                    </div>
                {% endfor %}
            {% endfor %}
        </div>
    </div>
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
        <button class="copy-button" onclick="copyCode('next-pickup-template')">Copy</button>
        <pre id="next-pickup-template" class="language-yaml"><code></code></pre>
    </div>

    <h4>Werte Template einzelne Abholungen</h4>
    <div class="code-container">
        <button class="copy-button" onclick="copyCode('individual-pickup-template')">Copy</button>
        <pre id="individual-pickup-template" class="language-yaml"><code></code></pre>
    </div>
</div>

<!-- Button to create Templates for both Today and Tomorrow -->
<h3 class="custom-subtitle" id="helper-template-header">Helfer Templates</h3>

<!-- Hinweisfenster mit Beschreibung -->
<div class="note-container">
    <p>
        Vor der Erstellung der Templates solltest du entscheiden, ob du den Text "Du musst heute keine Tonne rausstellen!" bzw. "Du musst morgen keine Tonne rausstellen!" angezeigt bekommen möchtest oder nicht. Für eine Anzeige dieses Textes, aktiviere die jeweilige Checkbox.
    </p>
</div>

<!-- Checkboxen für "keine"-Anzeige -->
<div class="custom-form-group">
    <input type="checkbox" id="keineHeute" />
    <label for="keineHeute">Anzeige "keine" für Heute</label><br>
    <input type="checkbox" id="keineMorgen" />
    <label for="keineMorgen">Anzeige "keine" für Morgen</label>
</div>

<button class="custom-button" onclick="createTemplates()">Templates erstellen</button>

<!-- Output for "Müllabholung Heute" -->
<div id="helper-template-output-heute" style="display:none;">
    <div class="title-inline">
        <h4>Müllabholung Heute</h4>
        <p>(Überschrift = Sensor Name)</p>
    </div>
    <div class="code-container">
        <button class="copy-button" onclick="copyCode('helper-template-heute')">Copy</button>
        <pre id="helper-template-heute" class="language-yaml"><code></code></pre>
    </div>
</div>

<!-- Ausgabe für "Müllabholung Text Heute" -->
<div id="helper-template-output-text-heute" style="display:none;">
    <div class="title-inline">
        <h4>Müllabholung Text Heute</h4>
        <p>(Überschrift = Sensor Name)</p>
    </div>
    <div class="code-container">
        <button class="copy-button" onclick="copyCode('helper-template-text-heute')">Copy</button>
        <pre id="helper-template-text-heute" class="language-yaml"><code></code></pre>
    </div>
</div>

<!-- Output for "Müllabholung Morgen" -->
<div id="helper-template-output-morgen" style="display:none;">
    <div class="title-inline">
        <h4>Müllabholung Morgen</h4>
        <p>(Überschrift = Sensor Name)</p>
    </div>
    <div class="code-container">
        <button class="copy-button" onclick="copyCode('helper-template-morgen')">Copy</button>
        <pre id="helper-template-morgen" class="language-yaml"><code></code></pre>
    </div>
</div>

<!-- Ausgabe für "Müllabholung Text Morgen" -->
<div id="helper-template-output-text-morgen" style="display:none;">
    <div class="title-inline">
        <h4>Müllabholung Text Morgen</h4>
        <p>(Überschrift = Sensor Name)</p>
    </div>
    <div class="code-container">
        <button class="copy-button" onclick="copyCode('helper-template-text-morgen')">Copy</button>
        <pre id="helper-template-text-morgen" class="language-yaml"><code></code></pre>
    </div>
</div>

<style>
    /* Titel und Untertitel */
    .custom-title, .custom-subtitle {
        text-align: center;
        font-weight: bold;
        margin-top: 20px;
    }
    
/* Wichtiges Hinweis-Container */
.important-container {
    background-color: #f39c12;
    color: #ffffff; /* Setzt die gesamte Textfarbe auf weiß */
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
    border: 1px solid #ff2e00;
}

.important-container h3,
.important-container p,
.important-container strong {
    color: #ffffff; /* Stellt sicher, dass auch Überschriften, Absätze und fetter Text in weiß sind */
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
        margin-bottom: 20px;
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
        margin-top: 20px;
        margin-bottom: 20px;
        overflow: auto; /* Ermöglicht Scrollen */
        max-height: 300px; /* Maximale Höhe auf 300px begrenzt */
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
    .title-inline h4, .title-inline p {
        line-height: 1;
        margin: 0;
        padding: 0;
    }
    .title-inline {
        display: flex;
        align-items: center;
        gap: 10px; /* Passt den Abstand zwischen Überschrift und Text an */
    }
    .dropdown {
        margin: 20px 0;
        text-align: center;
    }
    .dropdown-toggle {
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        background-color: #f39c12;
        color: #ffffff;
        padding: 10px 15px;
        border: none;
        border-radius: 5px;
        text-align: center;
        width: 100%;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        display: inline-block;
    }
    .dropdown-toggle span {
        float: right;
    }
    .dropdown-content {
        padding: 20px;
        background-color: #ffffff;
        border: 1px solid #f39c12;
        border-radius: 5px;
        margin-top: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
                if (line.startsWith("SUMMARY")) {
                    const summaryText = line.split(":").slice(1).join(":").trim();
                    summaryEntries.add(summaryText);
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
            ["Farbe wählen", "Schwarz", "Blau", "Rot", "Gelb", "Grün", "Braun", "Sack"].forEach(color => {
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
    function createTemplates() {
        const sensorTableBody = document.getElementById('sensor-table').querySelector('tbody');
        const rows = Array.from(sensorTableBody.querySelectorAll("tr")).slice(1); // überspringe die Standardreihe "Nächste Abholung"
        
        let colorNotSelected = false;
        const selectedColors = new Set();
        let duplicateColor = false;
    
        rows.forEach(row => {
            const color = row.cells[2].querySelector("select").value;
            if (color === "Farbe wählen") {
                colorNotSelected = true;
            } else {
                if (selectedColors.has(color)) {
                    duplicateColor = true; // Farbe wurde schon einmal ausgewählt
                } else {
                    selectedColors.add(color);
                }
            }
        });
    
        if (colorNotSelected) {
            alert("Die Farben der Tonne sollten zugeordnet werden!");
            return;
        }
    
        if (duplicateColor) {
            alert("Jede Farbe darf nur einmal ausgewählt werden!");
            return;
        }
    
        // Falls keine Fehler vorliegen, fahre mit der Template-Erstellung fort
        createTemplate("Heute", "helper-template-heute", "helper-template-output-heute");
        createTemplate("Morgen", "helper-template-morgen", "helper-template-output-morgen");
    
        // Prüfen, ob die Checkboxen für "keine"-Anzeige aktiviert sind
        const heuteCheckbox = document.getElementById("keineHeute").checked;
        const morgenCheckbox = document.getElementById("keineMorgen").checked;
    
        let textHeute, textMorgen;
    
        if (heuteCheckbox) {
            textHeute = `{% raw %}{% if states.sensor.mullabholung_heute.state != 'keine' %}\nDu musst heute {{ states.sensor.mullabholung_heute.state }} rausstellen!\n{% else %}\nDu musst heute keine Tonne rausstellen!\n{% endif %}{% endraw %}`;
        } else {
            textHeute = `{% raw %}{% if states.sensor.mullabholung_heute.state != 'keine' %}\nDu musst heute {{ states.sensor.mullabholung_heute.state }} rausstellen!\n{% else %}\n\n{% endif %}{% endraw %}`;
        }
    
        if (morgenCheckbox) {
            textMorgen = `{% raw %}{% if states.sensor.mullabholung_morgen.state != 'keine' %}\nDu musst morgen {{ states.sensor.mullabholung_morgen.state }} rausstellen!\n{% else %}\nDu musst morgen keine Tonne rausstellen!\n{% endif %}{% endraw %}`;
        } else {
            textMorgen = `{% raw %}{% if states.sensor.mullabholung_morgen.state != 'keine' %}\nDu musst morgen {{ states.sensor.mullabholung_morgen.state }} rausstellen!\n{% else %}\n\n{% endif %}{% endraw %}`;
        }
    
        // Setzen Sie den Text für "Müllabholung Text Heute"
        const textHeuteElement = document.getElementById("helper-template-text-heute");
        textHeuteElement.innerHTML = `<code class="language-yaml">${textHeute}</code>`;
        document.getElementById("helper-template-output-text-heute").style.display = "block";
    
        // Setzen Sie den Text für "Müllabholung Text Morgen"
        const textMorgenElement = document.getElementById("helper-template-text-morgen");
        textMorgenElement.innerHTML = `<code class="language-yaml">${textMorgen}</code>`;
        document.getElementById("helper-template-output-text-morgen").style.display = "block";
    }
    
    function createTemplate(day, templateId, outputId) {
        const sensorTableBody = document.getElementById('sensor-table').querySelector('tbody');
        const rows = Array.from(sensorTableBody.querySelectorAll("tr")).slice(1);
        
        let hasSack = false;
        const sensorAssignments = [];
        
        rows.forEach(row => {
            const customName = row.cells[0].textContent.trim();
            const sensorName = "states.sensor." + customName.toLowerCase().replace(/\s+/g, "_") + ".state";
            const color = row.cells[2].querySelector("select").value;
    
            if (color === "Sack") {
                hasSack = true;
            }
    
            sensorAssignments.push({ customName, sensorName, color });
        });
    
        // Generiere das Template für den angegebenen Tag ("Heute" oder "Morgen")
        let templateText = "{% raw %}\n";
    
        // Setzen der Variablen
        sensorAssignments.forEach(({ customName, sensorName }) => {
            templateText += "{% set " + customName.toUpperCase() + " = " + sensorName + " %}\n";
        });
    
        templateText += generateConditionsAsText(sensorAssignments, hasSack, day);
    
        templateText += "\n{% endraw %}";
    
        // Setze den Inhalt in das entsprechende <pre> Element
        const templateElement = document.getElementById(templateId);
        templateElement.innerHTML = `<code class="language-yaml">${templateText}</code>`;
        document.getElementById(outputId).style.display = "block";
    }    
    
{% raw %}
    function generateConditionsAsText(assignments, hasSack, conditionDay) {
        let yaml = `{% if `;
    
        const combinations = getAllCombinations(assignments);
        combinations.forEach((combination, index) => {
            const condition = combination.map(a => `${a.customName.toUpperCase()} == "${conditionDay}"`).join(" and ");
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
        const codeElement = document.getElementById(elementId);
        const codeText = codeElement.innerText || codeElement.textContent;
        
        navigator.clipboard.writeText(codeText).then(() => {
            alert("Code erfolgreich kopiert!");
        }).catch(err => {
            console.error("Fehler beim Kopieren des Codes: ", err);
        });
    }
    function toggleDropdown() {
        var dropdownContent = document.getElementById("galleryDropdown");
        if (dropdownContent.style.display === "none") {
            dropdownContent.style.display = "block";
        } else {
            dropdownContent.style.display = "none";
        }
    }
</script>


