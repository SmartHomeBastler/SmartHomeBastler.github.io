---
title: Meine HTML und CSS Vorlagen
subtitle: Alle Blöcke auf einer Seite
description: Hier kann ich mir alles für neue Seiten kopieren um einen Standard zu halten
show_sidebar: false
layout: page
---

<div class="shb-main-container">

<h1 class="shb-main-title">SHB Main Title</h1>
<style>
    .shb-main-title, .shb-main-title h1 {
        text-align: center;
        font-weight: bold !important;
        margin: 10px 0  !important;
        font-size: 2.5em !important;
        color: #1598b3 !important;
        text-shadow: 1px 1px #ebecf0;
    }
</style>

<p class="shb-main-description">
    Main Description Text here
</p>
<style>
    .shb-main-description, .shb-main-description p {
        text-align: center;
        font-size: 1.2em !important;
        color: #ebecf0 !important;
        padding: 10px 0 !important;
    }
</style>

<div class="content-section">
<style>
    .content-section {
        margin-bottom: 20px;
        padding: 15px;
        background-color: #252525;
        border: 1px solid #444;
        border-radius: 8px;
    }
</style>

<h2 class="shb-section-title-center">Section Title Center H2</h2>
<h3 class="shb-section-title-center">Section Title Center H3</h3>
<h4 class="shb-section-title-center">Section Title Center H4</h4>
<style>
    .shb-section-title-center, .shb-section-title-center h2, .shb-section-title-center h3, .shb-section-title-center h4 {
        text-align: center;
        font-weight: bold !important;
        margin: 20px 0 !important;
    }
</style>

<h2 class="shb-section-title-left">Section Title Left H2</h2>
<h3 class="shb-section-title-left">Section Title Left H3</h3>
<h4 class="shb-section-title-left">Section Title Left H4</h4>
<style>
    .shb-section-title-left, .shb-section-title-left h2, .shb-section-title-left h3, .shb-section-title-left h4 {
        font-weight: bold !important;
        margin: 20px 0 !important;
    }
</style>

<div class="important-container">
    <h3>❗Achtung</h3>
    <p>
        Hier folgt eine Warnung mit <strong>hervorgehobenem</strong> Text!
    </p>
</div>
<style>
    .important-container {
        background-color: #ffffff;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
        border: 8px solid #ff0000;
    }
    .important-container h3 {
        color: #d12700;
        font-weight: bold;
        text-shadow: 0 0 1px #000000;
    }
    .important-container p {
        color: #383838;
        font-family: Arial Black;
    }
    .important-container strong {
        color:rgb(255, 0, 0);
        text-transform: uppercase;
    }
</style>

<div class="note-container">
    <h3>💡 Hinweis</h3> 
    <p>
        Hier folgt ein Hinweis mit <strong>hervorgehobenem</strong> Text!
    </p>
</div>
<style>
    .note-container {
        background-color: #ffffff;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
        border: 8px solid #0062ff;
    }
    .note-container h3 {
        color: #0062ff;
        font-weight: bold;
        text-shadow: 0 0 1px #000000;
    }
    .note-container p {
        color: #383838;
        font-family: Arial Black;
    }
    .note-container strong {
        color: #0062ff;
        text-transform: uppercase;
    }
</style>

<div class="shb-form-group-30">
    <label for="select-id-1">Auswahl:</label>
    <select id="select-id-1">  <!-- Füge  onchange="updateScript1()" hinzu für Script -->
        <option value="Eins">Eins</option>
        <option value="Zwei">Zwei</option>
        <option value="Drei">Drei</option>
        <option value="Vier">Vier</option>
    </select>
</div>
<style>
    .shb-form-group-30, .shb-form-group-30-full {
        display: flex;
        flex-direction: column;
        gap: 10px; /* Abstand zwischen den Checkbox-Gruppen */
        margin: 20px 0;
    }
    .shb-form-group-30 label, .shb-form-group-30-full label {
        font-weight: bold;
        color: #ffffff;
    }
    .shb-form-group-30 input, .shb-form-group-30 select {
        padding: 8px;
        color: #000000;
        background-color: #1ab5d5;
        max-width: 30%;
        border: 1px solid #ffffff;
        box-shadow: 0 2px 5px #ffffff;
        border-radius: 5px;
        font-size: 14px;
    }
    .shb-form-group-30 select:focus {
        background-color: #1ab5d5;
        border: 2px solid #0048ff;
        box-shadow: 0 4px 10px #7199ff;
        outline: none;
    }
    /* Stile für die Optionen */
    .shb-form-group-30 select option {
        background-color: #99eafb;
    }
    /* Jede zweite Zeile heller */
    .shb-form-group-30 select option:nth-child(even) {
        background-color: #b4f2ff
    }
    .shb-form-group-30 input:focus {
        background-color: #99eafb;
        border: 2px solid #0048ff;
        box-shadow: 0 4px 10px #7199ff;
        outline: none;
    }
</style>

<div class="shb-form-group-30">
    <label for="file-id-1">Eine Datei hochladen</label>
    <input type="file" id="file-id-1" accept=".ics" />
</div>

<div class="shb-form-group-30">
    <label for="input-id-1">Einen Text eingeben</label>
    <input type="url" id="input-id-1" placeholder="Das ist der Platzhalter" />
</div>

<div class="shb-form-group-30">
    <div class="checkbox-wrapper">
        <input type="checkbox" id="checkbox-id-1" />
        <label for="checkbox-id-1">Text für Checkbox 1</label>
    </div>
    <div class="checkbox-wrapper">
        <input type="checkbox" id="checkbox-id-2" />
        <label for="checkbox-id-2">Text für Checkbox 2</label>
    </div>
</div>
<style>
    .checkbox-wrapper {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .shb-form-group-30 input[type="checkbox"] {
        transform: scale(1.5); /* Größe der Checkbox anpassen */
        margin: 0; /* Standardabstände entfernen */
    }
</style>

<label class="shb-label">Drücke den gewählten Button:</label>

<div class="shb-button-container">
    <button class="shb-button shb-button-blue">Button Blau</button> <!-- Füge  onclick="updateScript2()" hinzu für Script -->
    <button class="shb-button shb-button-green">Button Grün</button>
    <button class="shb-button shb-button-yellow">Button Gelb</button>
    <button class="shb-button shb-button-red">Button Rot</button>
</div>

<div class="shb-button-30">
    <button class="shb-button-30 shb-button-30-blue" >Button Blau</button>
</div>
<div class="shb-button-30">
    <button class="shb-button-30 shb-button-30-green" >Button Grün</button>
</div>
<div class="shb-button-30">
    <button class="shb-button-30 shb-button-30-yellow" >Button Gelb</button>
</div>
<div class="shb-button-30">
    <button class="shb-button-30 shb-button-30-red" >Button Rot</button>
</div>

<ul class="shb-list-start">
    <li>Erster Punkt mit <strong>hervorgehobenem Text</strong></li>
    <li>Zweiter Punkt mit <strong>hervorgehobenem Text</strong></li>
    <li>Dritter Punkt mit <strong>hervorgehobenem Text</strong></li>
</ul>

<div class="shb-code-container">
    <button class="copy-code-button" onclick="copyCode('code-output', this)">Kopieren</button>
    <pre id="code-output">
        <code>
{%- raw %}
{%- set light_entities = states.light | map(attribute='entity_id') | list -%}
{{ light_entities | join('\n') }}{% endraw -%}
        </code>
    </pre>
</div>


<div id="shb-custom-alert" style="display: none;">
    <div id="shb-custom-alert-content">
        <h4 id="shb-custom-alert-title"></h4>
        <p id="shb-custom-alert-message"></p>
        <button id="shb-close-alert">OK</button>
    </div>
</div>


<div class="shb-text-output">
    <button class="copy-code-button" onclick="copyCode('yaml-output', this)">Kopieren</button>
    <textarea id="yaml-output" rows="20" cols="80" readonly>
# Test Eintrag
{%- raw %}
type: picture-elements
image: /local/lovelace/floorplan/hintergrund_nacht_org.png
elements:
  - type: image
    entity: light.arbeitszimmer_deckenlicht
    image: /local/lovelace/floorplan/1x1_transparent.png
    state_image:
      "on": /local/lovelace/floorplan/arbeitszimmer_deckenlicht.png
    tap_action:
      action: none
    hold_action:
      action: none
    style:
      opacity: 1

      mix-blend-mode: lighten
      pointer-events: none
      left: 50%
      top: 50%
      width: 100%
{% endraw -%}
    </textarea>
</div>


<div class="shb-dropdown">
    <button class="shb-dropdown-toggle" onclick="toggleSHBdropdown('testdropdown', this)">
        Was mache ich, wenn ich keine ICS Datei oder URL habe?<span>⬇️</span>
    </button>
    <div id="testdropdown" class="shb-dropdown-content" style="display: none;">
        <div class="shb-dropdown-youtube">
            {% include youtube.html video="r4koAf8UnwQ" %}
        </div>
        <h3><strong>Verwendung des Codegenerators ohne ICS Datei oder URL</strong></h3>
        <p>
            Wenn du keine ICS Datei oder eine URL zur Einrichtung deines Kalenders in der <strong>Waste Collection Schedule</strong> hast, kannst du den Codegenerator mit einem kleinen Trick trotzdem nutzen.
        </p>
        <p>
            Da in der neuen <strong>Waste Collection Schedule</strong> Integration, die Namen der einzelnen Abholungen frei vergeben werden können, kannst du dir zur Nutzung des Codegenartors eine Helfer-ICS Datei anlegen.
        </p>
        <ol>
            <li>Gehe im Menü <strong>Müllerinnerung Tools</strong> auf <strong>ICS zusammenführen / erstellen</strong></li>
            <li>Wähle die Checkbox <strong>Eigen ICS erstellen</strong></li>
            <li>Trage einen frei gewählten Kalendernamen ein</li>
            <li>Trage einen Eventnamen ein, welcher einem deiner Mülltypen / Abholungen entspricht (z.B. Restabfall)</li>
            <li>Wähle ein Eventdatum (dieses hat keine Relevanz im Codegenerator)</li>
            <li>Klicke auf <strong>Event hinzufügen</strong></li>
        </ol>
        <p>
            Es wird ein Kalender mit deinem Kalendernamen und deinem Eventnamen erstellt.<br>
            Für jede weitere deiner Abholungen (unterschidliche Mülltypen) trage einen neuen Eventnamen und ein Datum ein und bestätige immer mit <strong>Event hinzufügen</strong>
        </p>
        <p>
            Wenn deine Einträge für jeweils einen deiner Mülltypen abgeschlossen sind, klicke auf <strong>Erstellten Kalender herunterladen.</strong>
        </p>
        <p>
            Nun kannst du diesen heruntergeladenen Kalender für den Codegenerator verwenden.
        </p>
        <p>
            <strong>Hinweis:</strong> Verwende für deine Eventnamen (Mülltypen) keine Umlaute und vermeide Leerzeichen. Nimm nur die Allgemeine Bezichnung deiner Mülltypen ohne den Zusatz "Tonne", ausnahme z.B. Gelber Sack oder Gelbe Tonne. 
        </p>
        <p>
            <strong>Viel Erfolg! 🎉</strong>
        </p>
    </div>
</div> 

</div>

<footer class="shb-footer">
    <p>Ich hoffe dir hat dieses Tool geholfen. Über Support und Feedback würde ich mich wirklich freuen.</p>
    <h2>Viel Erfolg bei der Einrichtung deines Floorplans! 🎉</h2>
</footer>

<style>
    .shb-footer {
    text-align: center;
    margin-top: 20px;
    }
    .shb-footer p {
        text-align: center;
        font-size: 1.2em !important;
        color: #ebecf0 !important;
        padding-top: 15px !important;
    }
    .shb-footer h2 {
        font-size: 1.75em !important;
        font-weight: bold !important;
        color: #1598b3 !important;
        text-shadow: 1px 1px #ebecf0;
        margin: 0 !important;
    }
</style>

{% include support_note.html %}

</div>
