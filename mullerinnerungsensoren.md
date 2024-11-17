---
title: Müllerinnerung Sensoren Codegenerator
subtitle: Erstelle die Template-Codes für deine Müllerinnerung
description: Generiere die Templates für die Waste Collection Schedule Integration anhand der Angaben aus deinem Müllkalender.
show_sidebar: false
layout: page
---

<h1 class="custom-title">Müllkalender Code-Generator</h1>

<!-- Important Notice -->
<div class="important-container">
    <h3>Wichtig!</h3>
    <p>
        Vor dem Erstellen der Codes stelle sicher, dass die Integration <strong>"Waste Collection Schedule"</strong> in HACS heruntergeladen und installiert ist. Mit der neuesten Version dieser Integration ist es möglich, die Sensoren usw. direkt in Home Assistant unter Geräte & Dienste einzurichten. Im Weiteren Verlauf dieser Code-Generierung, werden alle notwendigen Angaben für diese Integration für dich bereitgestellt.
    </p>
</div>
<!--
 █████  ██████  ███████  ██████ ██   ██ ███    ██ ██ ████████ ████████      ██ 
██   ██ ██   ██ ██      ██      ██   ██ ████   ██ ██    ██       ██        ███ 
███████ ██████  ███████ ██      ███████ ██ ██  ██ ██    ██       ██         ██ 
██   ██ ██   ██      ██ ██      ██   ██ ██  ██ ██ ██    ██       ██         ██ 
██   ██ ██████  ███████  ██████ ██   ██ ██   ████ ██    ██       ██         ██ 
                                                                               
-->

<div id="step-1">
<h2 class="custom-title">1. Kalenderdaten Auslesen</h2>

<p>Zum Auslesen der verschiedenen Abholungen aus deinem Mülkalender, gib bitte deine URL an oder lade die ICS Datei hoch und bestätige mit <strong>Kalendereinträge extrahieren</strong></p>

<!-- File Upload and URL Input -->
<div class="custom-form-group">
    <label for="icsFile" class="custom-label">ICS-Datei hochladen</label>
    <input type="file" id="icsFile" class="custom-input" accept=".ics" />
</div>

<div class="custom-form-group">
    <label for="calendarUrl" class="custom-label">oder ICS-URL eingeben</label>
    <input type="url" id="calendarUrl" class="custom-input" placeholder="https://example.com/kalender.ics" />
</div>

<button class="custom-button" onclick="extractEntries(); showStep(2);">Kalendereinträge extrahieren!</button>
</div>

<!--
 █████  ██████  ███████  ██████ ██   ██ ███    ██ ██ ████████ ████████     ██████  
██   ██ ██   ██ ██      ██      ██   ██ ████   ██ ██    ██       ██             ██ 
███████ ██████  ███████ ██      ███████ ██ ██  ██ ██    ██       ██         █████  
██   ██ ██   ██      ██ ██      ██   ██ ██  ██ ██ ██    ██       ██        ██      
██   ██ ██████  ███████  ██████ ██   ██ ██   ████ ██    ██       ██        ███████ 
-->

<div id="step-2" style="display:none;">
<h2 class="custom-title">2. Kalenderdaten Umwandeln</h2>

<p>Im nächsten Schritt wähle jene Einträge aus welche zu deinen Sensoren hinzugefügt werden sollen. Zusätzlich hast du die Möglichkeit individuelle Bezeichnungen zu vergeben. Deine persönlichen Bezeichnungen dürfen keine Umlaute beinhalten und sollten sich, für die weiteren Verwendungen, mit der Bezeichnung "Tonne" bzw "Sack" vereinbaren lassen.</p> 

<p>Beispiel: Bezeichnug `Papier` oder `Gelber` = `Papier Tonne` oder `Gelber Sack`</p>

<p>Nach den Änderungen klicke auf <strong>Kalendereinträge in Sensoren umwandeln</strong></p>

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

<div id="confirm-step-2" style="text-align: center; margin-top: 20px;">
    <button class="custom-button" onclick="checkEntries(); showStep(3);">Auswahl getroffen, eigene Bezeichnungen gewählt? Weiter mit Sensoren!</button>
</div>
</div>

<!--
 █████  ██████  ███████  ██████ ██   ██ ███    ██ ██ ████████ ████████     ██████  
██   ██ ██   ██ ██      ██      ██   ██ ████   ██ ██    ██       ██             ██ 
███████ ██████  ███████ ██      ███████ ██ ██  ██ ██    ██       ██         █████  
██   ██ ██   ██      ██ ██      ██   ██ ██  ██ ██ ██    ██       ██             ██ 
██   ██ ██████  ███████  ██████ ██   ██ ██   ████ ██    ██       ██        ██████  
-->

<div id="step-3" style="display:none;">
<h2 class="custom-title">3. Sensoren Konfiguration</h2>

<p>An diesem Punkt kann die Integration <strong>Waste Collection Schedule</strong> in Home Assistant eingerichtet werden.
Eine detaillierte Beschreibung wie diese eizurichten sind, findest du im Dropdown Menü.</p>

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


<p>Nun müssen den Sensoren bzw. Abholungen die Tonnenfarben zugeordnet werden. Wichtig ist, dass keine Farbe zweimal verwendet werden darf.</p>

<table class="custom-table" id="sensor-table" style="display:none;">
    <thead>
        <tr>
            <th>Sensor Name</th>
            <th>Kopiert</th>
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
<div id="confirm-step-3" style="text-align: center; margin-top: 20px;">
    <button class="custom-button" onclick="showStep(4);">Sensoren angelegt? Weiter zu den Templates!</button>
</div>
</div>

<!--
 █████  ██████  ███████  ██████ ██   ██ ███    ██ ██ ████████ ████████     ██   ██ 
██   ██ ██   ██ ██      ██      ██   ██ ████   ██ ██    ██       ██        ██   ██ 
███████ ██████  ███████ ██      ███████ ██ ██  ██ ██    ██       ██        ███████ 
██   ██ ██   ██      ██ ██      ██   ██ ██  ██ ██ ██    ██       ██             ██ 
██   ██ ██████  ███████  ██████ ██   ██ ██   ████ ██    ██       ██             ██ 
-->

<div id="step-4" style="display:none;">
<h2 class="custom-title">4. Templates Erstellen</h2>

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
    <div class="custom-title-inline">
        <h4 onclick="copyTitleToClipboard(this)">Müllabholung Heute</h4>
        <p>Klicke auf die Überschrift um sie zu kopieren!</p>
        <span class="copy-confirmation" style="display: none;">&#10003;</span>
    </div>
    <div class="code-container">
        <button class="copy-button" onclick="copyCode('helper-template-heute')">Copy</button>
        <pre id="helper-template-heute" class="language-yaml"><code></code></pre>
    </div>
</div>

<!-- Ausgabe für "Müllabholung Text Heute" -->
<div id="helper-template-output-text-heute" style="display:none;">
    <div class="custom-title-inline">
        <h4 onclick="copyTitleToClipboard(this)">Müllabholung Text Heute</h4>
        <p>Klicke auf die Überschrift um sie zu kopieren!</p>
        <span class="copy-confirmation" style="display: none;">&#10003;</span>
    </div>
    <div class="code-container">
        <button class="copy-button" onclick="copyCode('helper-template-text-heute')">Copy</button>
        <pre id="helper-template-text-heute" class="language-yaml"><code></code></pre>
    </div>
</div>

<!-- Output for "Müllabholung Morgen" -->
<div id="helper-template-output-morgen" style="display:none;">
    <div class="custom-title-inline">
        <h4 onclick="copyTitleToClipboard(this)">Müllabholung Morgen</h4>
        <p>Klicke auf die Überschrift um sie zu kopieren!</p>
        <span class="copy-confirmation" style="display: none;">&#10003;</span>
    </div>
    <div class="code-container">
        <button class="copy-button" onclick="copyCode('helper-template-morgen')">Copy</button>
        <pre id="helper-template-morgen" class="language-yaml"><code></code></pre>
    </div>
</div>

<!-- Ausgabe für "Müllabholung Text Morgen" -->
<div id="helper-template-output-text-morgen" style="display:none;">
    <div class="custom-title-inline">
        <h4 onclick="copyTitleToClipboard(this)">Müllabholung Text Morgen</h4>
        <p>Klicke auf die Überschrift um sie zu kopieren!</p>
        <span class="copy-confirmation" style="display: none;">&#10003;</span>
    </div>
    <div class="code-container">
        <button class="copy-button" onclick="copyCode('helper-template-text-morgen')">Copy</button>
        <pre id="helper-template-text-morgen" class="language-yaml"><code></code></pre>
    </div>
</div>
<button class="custom-button" onclick="showStep(5); createImageList();">Templates angelegt? Weiter zu den Dashboard-Karten!</button>
</div>

<!--
 █████  ██████  ███████  ██████ ██   ██ ███    ██ ██ ████████ ████████     ███████ 
██   ██ ██   ██ ██      ██      ██   ██ ████   ██ ██    ██       ██        ██      
███████ ██████  ███████ ██      ███████ ██ ██  ██ ██    ██       ██        ███████ 
██   ██ ██   ██      ██ ██      ██   ██ ██  ██ ██ ██    ██       ██             ██ 
██   ██ ██████  ███████  ██████ ██   ██ ██   ████ ██    ██       ██        ███████ 
                                                                              
-->

<div id="step-5" style="display:none;">
<h2 class="custom-title">5. Dashboard Karten</h2>

<p>Hier siehst du eine Zusammenfassung deiner Einstellungen, welche den Zusammenhang deines Sensor Namens mit den gewählten Tonnen-Farben darstellt. Die Vorschaubilder können mit einem Klick darauf heruntergeladen werden.</p>


<div id="sensor-summary" style="display:none; margin-top: 20px; text-align: start; font-size: 20px;">
    <p>
        Du hast <span id="sensor-count" style="font-weight: bold; color: #4CAF50;">0</span> Sensor angelegt.
    </p>
</div>


<div id="image-list-output"></div>

<!-- Important Notice -->
<div class="important-container">
    <h3>Wichtig!</h3>
    <p>
        Bevor du die Dashboard-Karte erstellst, stelle sicher, dass die <strong>"Custom Button Card"</strong> in HACS installiert ist. Diese Button Card ist für die korrekte Darstellung der Dashbord-Karte unbedingt notwendig.
    </p>
</div>

<div id="example-section" style="margin-top: 20px;">
    <h3 class="custom-title">Dashboard Karten Optionen</h3>

<!-- Checkbox für "Tonne blinkend" -->
<div class="custom-form-group">
    <input type="checkbox" id="tonneBlinkend" />
    <label for="tonneBlinkend">Tonne blinkend</label>
</div>

<!-- Auswahlliste für "Anzeige Heute" und "Anzeige Morgen" -->
<div class="custom-form-group">
    <label for="anzeigeAuswahl" class="custom-label">Anzeige Auswahl:</label>
    <select id="anzeigeAuswahl" class="custom-input">
        <option value="heute">Anzeige Heute</option>
        <option value="morgen">Anzeige Morgen</option>
    </select>
</div>

<!-- Auswahlliste für Darstellung -->
<div class="custom-form-group">
    <label for="darstellungAuswahl" class="custom-label">Darstellung:</label>
    <select id="darstellungAuswahl" class="custom-input">
        <option value="einzeilig">Darstellung Einzeilig</option>
        <option value="mehrzeilig">Darstellung Mehrzeilig</option>
    </select>
</div>

<div id="dashboard-options" style="display: flex; justify-content: space-between; margin-top: 20px;">
    <!-- YAML-Ausgabefenster -->
    <div id="yaml-output-container" style="width: 45%; text-align: left;">
        <h4 class="custom-title">Generierter YAML-Code</h4>
        <div class="code-container">
            <button class="copy-button" onclick="copyYAMLCode()">Copy</button>
            <pre id="yaml-code-output" class="language-yaml"><code></code></pre>
        </div>
    </div>

    <!-- Beispielbild -->
    <div id="example-card-container" style="width: 45%; text-align: center;">
        <h4 class="custom-title">Beispielkarte</h4>
        <img id="example-image" src="" alt="Beispielkarte" style="max-width: 100%; display: none;">
    </div>
</div>

<!-- Button zur Aktualisierung -->
<div style="text-align: center; margin-top: 15px;">
    <button id="update-example-and-code" class="custom-button">Beispiel anzeigen & Code generieren</button>
</div>



PLATZHALTER AUSWAHLLISTEN UND ZUSAMMENFASSUNGEN

</div>

<!--
 ██████ ███████ ███████ 
██      ██      ██      
██      ███████ ███████ 
██           ██      ██ 
 ██████ ███████ ███████ 
                                                                              
-->

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
    .copy-checkmark {
        color: green;
        font-size: 1.2em;
        font-weight: bold;
        display: none; /* Standardmäßig versteckt */
    }

    /* Hover-Effekt für den Copy-Button */
    .copy-button:hover {
        background: #005a9c;
    }
    .custom-title-inline {
        display: flex; /* Elemente nebeneinander anordnen */
        align-items: baseline; /* Ausrichtung an der Grundlinie */
        gap: 10px; /* Abstand zwischen den Elementen */
    }

    .custom-title-inline h4 {
        margin: 0;
        padding: 0;
        font-size: 24px; /* Größere Schriftgröße für die Überschrift */
        line-height: 1.2; /* Für saubere vertikale Ausrichtung */
    }

    .custom-title-inline p {
        margin: 0;
        padding: 0;
        font-size: 16px; /* Kleinere Schriftgröße für den Text */
        line-height: 1.2; /* Passend zur `h4` */
    }

    .copy-confirmation {
        font-size: 24px; /* Gleiche Schriftgröße wie `h4` */
        color: green; /* Bestätigungsfarbe */
        margin-left: 10px; /* Abstand zur Überschrift */
        display: none; /* Standardmäßig versteckt */
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
    .completed {
    opacity: 0.5;
    pointer-events: none;
    }
    .back-button {
        background-color: #f39c12;
        color: white;
        border: none;
        padding: 8px 16px;
        font-size: 14px;
        border-radius: 4px;
        cursor: pointer;
        margin-bottom: 10px;
    }
    .back-button:hover {
        background-color: #e67e22;
    }

</style>

<!--
███████  ██████ ██████  ██ ██████  ████████ ███████ 
██      ██      ██   ██ ██ ██   ██    ██    ██      
███████ ██      ██████  ██ ██████     ██    █████   
     ██ ██      ██   ██ ██ ██         ██    ██      
███████  ██████ ██   ██ ██ ██         ██    ███████ 
                                                                              
-->

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
    function showStep(stepNumber) {
        // Alle Abschnitte anzeigen, die kleiner oder gleich der aktuellen Schritt-Nummer sind
        for (let i = 1; i <= 5; i++) {
            const step = document.getElementById(`step-${i}`);
            if (step) {
                if (i <= stepNumber) {
                    step.style.display = "block"; // Zeigt die vorherigen und den aktuellen Step an
                    step.classList.remove("completed"); // Entfernt die "abgeschlossen"-Markierung, wenn sie gesetzt war
                } else {
                    step.style.display = "none"; // Versteckt die zukünftigen Schritte
                }
            }
        }

        // Automatisch scrollen, um den ausgewählten Schritt in den Fokus zu bringen
        const currentStep = document.getElementById(`step-${stepNumber}`);
        if (currentStep) {
            currentStep.scrollIntoView({ behavior: "smooth" });
        }
    }
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

        // Sensor Name
        const standardNameCell = document.createElement("td");
        standardNameCell.textContent = "Nächste Abholung";
        standardNameCell.style.cursor = "pointer";
        standardNameCell.onclick = () => {
            copyToClipboard("Nächste Abholung", standardCopyStatusCell); // Name wird kopiert
        };
        standardRow.appendChild(standardNameCell);

        // Kopiert-Status
        const standardCopyStatusCell = document.createElement("td");
        standardCopyStatusCell.innerHTML = '<span class="copy-checkmark" style="display: none;">✔️</span>';
        standardCopyStatusCell.style.textAlign = "center";
        standardRow.appendChild(standardCopyStatusCell);

        // Entity ID
        const standardSensorCell = document.createElement("td");
        standardSensorCell.textContent = "sensor.nachste_abholung";
        standardRow.appendChild(standardSensorCell);

        // Farbe (leer für die Standardzeile)
        const standardColorCell = document.createElement("td");
        standardColorCell.textContent = "-"; // No color selection for "Nächste Abholung"
        standardRow.appendChild(standardColorCell);

        sensorTableBody.appendChild(standardRow);

        // Add rows for selected entries
        selectedEntries.forEach((row) => {
            const customName = row.querySelector(".entry-custom-name").value || row.querySelector("td:nth-child(2)").textContent;
            const sensorName = `sensor.${customName.toLowerCase().replace(/\s+/g, "_").replace(/[äöüÄÖÜß]/g, match => {
                return {
                    'ä': 'ae', 'ö': 'oe', 'ü': 'ue',
                    'Ä': 'Ae', 'Ö': 'Oe', 'Ü': 'Ue', 'ß': 'ss'
                }[match];
            })}`;

            const sensorRow = document.createElement("tr");

            // Sensor Name
            const customNameCell = document.createElement("td");
            customNameCell.textContent = customName;
            customNameCell.style.cursor = "pointer";
            customNameCell.onclick = () => {
                copyToClipboard(customName, copyStatusCell); // Name wird kopiert
            };
            sensorRow.appendChild(customNameCell);

            // Kopiert-Status
            const copyStatusCell = document.createElement("td");
            copyStatusCell.innerHTML = '<span class="copy-checkmark" style="display: none;">✔️</span>';
            copyStatusCell.style.textAlign = "center";
            sensorRow.appendChild(copyStatusCell);

            // Entity ID
            const sensorNameCell = document.createElement("td");
            sensorNameCell.textContent = sensorName;
            sensorRow.appendChild(sensorNameCell);

            // Farbe Auswahlfeld
            const colorCell = document.createElement("td");
            const colorSelect = document.createElement("select");
            colorSelect.className = "color-select";
            ["Farbe wählen", "Schwarz", "Blau", "Rot", "Gelb", "Grün", "Braun", "Sack", "Schwarz-Blau", "Schwarz-Rot", "Schwarz-Gelb", "Schwarz-Grün", "Schwarz-Braun"].forEach(color => {
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

    function copyToClipboard(textToCopy, statusCell) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            const checkmark = statusCell.querySelector(".copy-checkmark");
            if (checkmark) {
                checkmark.style.display = "inline"; // Häkchen dauerhaft anzeigen
            }
        }).catch(err => {
            console.error("Fehler beim Kopieren:", err);
        });
    }

    function createTemplates() {
        const sensorTableBody = document.getElementById('sensor-table').querySelector('tbody');
        const rows = Array.from(sensorTableBody.querySelectorAll("tr")).slice(1); // überspringe die Standardreihe "Nächste Abholung"
        
        let colorNotSelected = false;
        const selectedColors = new Set();
        let duplicateColor = false;
    
        rows.forEach(row => {
            const color = row.cells[3].querySelector("select").value;
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
    function copyTitleToClipboard(element) {
        const textToCopy = element.textContent.trim(); // Text der Überschrift
        navigator.clipboard.writeText(textToCopy).then(() => {
            // Nur das entsprechende Bestätigungs-Icon anzeigen
            const confirmationIcon = element.parentElement.querySelector('.copy-confirmation');
            confirmationIcon.style.display = 'inline';
            
            // Nach 2 Sekunden das Icon wieder ausblenden
            setTimeout(() => {
                confirmationIcon.style.display = 'none';
            }, 2000);
        }).catch(err => {
            console.error("Fehler beim Kopieren in die Zwischenablage:", err);
        });
    }
    function createTemplate(day, templateId, outputId) {
        const sensorTableBody = document.getElementById('sensor-table').querySelector('tbody');
        const rows = Array.from(sensorTableBody.querySelectorAll("tr")).slice(1);
        
        let hasSack = false;
        const sensorAssignments = [];
        
        rows.forEach(row => {
            const customName = row.cells[0].textContent.trim();
            const sensorName = "states.sensor." + customName.toLowerCase().replace(/\s+/g, "_") + ".state";
            const color = row.cells[3].querySelector("select").value;
    
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

    function createImageList() {
        const sensorTableBody = document.getElementById('sensor-table').querySelector('tbody');
        const rows = Array.from(sensorTableBody.querySelectorAll("tr")).slice(1); // überspringe die Standardreihe "Nächste Abholung"
        
        // Tabelle für die Ausgabe erstellen
        let imageTable = '<table class="custom-table"><thead><tr><th>Sensor Name</th><th>Bilder Name</th><th>Bild Vorschau</th></tr></thead><tbody>';
        
        // Mapping von Farben zu Bilddateinamen
        const colorToImageMap = {
            "Schwarz": "schwarz.png",
            "Blau": "blau.png",
            "Rot": "rot.png",
            "Gelb": "gelb.png",
            "Grün": "gruen.png",
            "Braun": "braun.png",
            "Sack": "sack.png",
            "Schwarz-Blau": "schwarz-blau.png",
            "Schwarz-Rot": "schwarz-rot.png",
            "Schwarz-Gelb": "schwarz-gelb.png",
            "Schwarz-Grün": "schwarz-gruen.png",
            "Schwarz-Braun": "schwarz-braun.png"
        };
        
        // Zeilen der Tabelle durchlaufen und Bildnamen sowie Bildvorschau zuordnen
        let sensorCount = 0; // Zähler für die Anzahl der Sensoren
        rows.forEach(row => {
            const sensorName = row.cells[0].textContent.trim();
            const selectedColor = row.cells[3].querySelector("select").value;
            
            if (colorToImageMap[selectedColor]) {
                sensorCount++; // Zähler inkrementieren
                const imageName = colorToImageMap[selectedColor];
                const imagePath = `/img/muell/${imageName}`;
                
                // Tabellenzeile erstellen
                imageTable += `
                    <tr>
                        <td>${sensorName}</td>
                        <td>${imageName}</td>
                        <td>
                            <a href="${imagePath}" download="${imageName}">
                                <img src="${imagePath}" alt="${imageName}" style="width: 50px; height: auto; cursor: pointer;" title="Bild herunterladen">
                            </a>
                        </td>
                    </tr>`;
            }
        });
        
        imageTable += '</tbody></table>';
        
        // Tabelle im HTML anzeigen
        const outputContainer = document.getElementById('image-list-output');
        if (!outputContainer) {
            const newOutputContainer = document.createElement('div');
            newOutputContainer.id = 'image-list-output';
            document.body.appendChild(newOutputContainer);
        }
        document.getElementById('image-list-output').innerHTML = imageTable;

        // Sensor-Zusammenfassung anzeigen
        const sensorSummary = document.getElementById('sensor-summary');
        const sensorCountElement = document.getElementById('sensor-count');
        const summaryText = document.getElementById('summary-text');
        
        if (sensorCount === 1) {
            sensorCountElement.textContent = "einen Sensor";
        } else {
            sensorCountElement.textContent = `${sensorCount} Sensoren`;
        }

        sensorSummary.style.display = "block"; // Zusammenfassung einblenden
        sensorSummary.innerHTML = `Du hast <span style="font-weight: bold; color: #4CAF50;">${sensorCount === 1 ? "einen Sensor" : `${sensorCount} Sensoren`}</span> angelegt.`;
    }
    function updateExampleCard() {
        const darstellungAuswahl = document.getElementById("darstellungAuswahl").value;
        const sensorTableBody = document.getElementById("sensor-table").querySelector("tbody");
        const sensorCount = sensorTableBody.querySelectorAll("tr").length - 1; // Exclude the header row

        let imagePath = "/img/muell/";

        if (sensorCount === 1) {
            imagePath += "exampleCard_1.png";
        } else if (sensorCount === 2) {
            imagePath += "exampleCard_2.png";
        } else if (sensorCount === 3) {
            imagePath += "exampleCard_3.png";
        } else if (sensorCount === 4) {
            if (darstellungAuswahl === "einzeilig") {
                imagePath += "exampleCard_4_1.png";
            } else if (darstellungAuswahl === "mehrzeilig") {
                imagePath += "exampleCard_4_2.png";
            }
        } else if (sensorCount === 5) {
            imagePath += "exampleCard_5.png";
        } else {
            imagePath += "exampleCard_6.png";
        }

        const exampleImage = document.getElementById("example-image");
        exampleImage.src = imagePath;
        exampleImage.style.display = "block"; // Show the image
    }

    function generateCardYAML() {
        const darstellungAuswahl = document.getElementById("darstellungAuswahl").value;
        const anzeigeAuswahl = document.getElementById("anzeigeAuswahl").value;
        const blinkendCheckbox = document.getElementById("blinkendCheckbox").checked;
        const sensorTableBody = document.getElementById("sensor-table").querySelector("tbody");
        const sensorCount = sensorTableBody.querySelectorAll("tr").length - 1; // Exclude the header row

        let yaml = "type: custom:button-card\n";
        yaml += "name: Müllkalender\n";

        if (sensorCount >= 1) {
            yaml += `sensor_count: ${sensorCount}\n`;
        }

        yaml += `anzeige: ${anzeigeAuswahl}\n`;
        yaml += `darstellung: ${darstellungAuswahl}\n`;

        if (blinkendCheckbox) {
            yaml += "blinkend: true\n";
        }

        // Add example-specific logic
        if (darstellungAuswahl === "einzeilig") {
            yaml += "layout: horizontal\n";
        } else if (darstellungAuswahl === "mehrzeilig") {
            yaml += "layout: vertical\n";
        }

        yaml += "sensors:\n";

        // Generate sensors YAML
        const rows = Array.from(sensorTableBody.querySelectorAll("tr")).slice(1); // Skip the header
        rows.forEach((row, index) => {
            const sensorName = row.cells[2].textContent.trim(); // Entity ID
            const color = row.cells[3].querySelector("select").value;
            yaml += `  - name: ${sensorName}\n    color: ${color}\n`;
        });

        // Output the generated YAML
        const yamlCodeOutput = document.getElementById("yaml-code-output");
        yamlCodeOutput.textContent = yaml;
    }

    function copyYAMLCode() {
        const yamlCodeOutput = document.getElementById("yaml-code-output");
        const codeText = yamlCodeOutput.textContent;

        navigator.clipboard.writeText(codeText).then(() => {
            alert("Code erfolgreich kopiert!");
        }).catch(err => {
            console.error("Fehler beim Kopieren des Codes:", err);
        });
    }

    // Update both the example card and YAML code
    document.getElementById("update-example-and-code").addEventListener("click", () => {
        updateExampleCard();
        generateCardYAML();
    });

</script>


