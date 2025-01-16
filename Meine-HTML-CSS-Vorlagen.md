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
        background-color: rgb(187, 207, 255);
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

<div class="shb-form-group-full">
    <label for="select-id-2">Auswahl:</label>
    <select id="select-id-2">  <!-- Füge  onchange="updateScript2()" hinzu für Script -->
        <option value="Eins">Eins</option>
        <option value="Zwei">Zwei</option>
        <option value="Drei">Drei</option>
        <option value="Vier">Vier</option>
    </select>
</div>
<style>
    .shb-form-group-full {
        display: flex;
        flex-direction: column;
        margin: 20px 0;
    }
    .shb-form-group-full label {
        font-weight: bold;
        margin-bottom: 5px;
        color: #ffffff;
    }
    .shb-form-group-full input, .shb-form-group-full select {
        padding: 8px;
        color: #000000;
        background-color: #1ab5d5;
        max-width: 100%;
        border: 1px solid #ffffff;
        box-shadow: 0 2px 5px #ffffff;
        border-radius: 5px;
        font-size: 14px;
    }
    .shb-form-group-full select:focus {
        background-color:rgb(187, 207, 255);
        border: 2px solid #0048ff;
        box-shadow: 0 4px 10px #7199ff;
        outline: none;
    }
</style>

<label class="shb-label">Drücke den gewählten Button:</label>
<style>
    .shb-label {
        font-weight: bold;
        margin-bottom: 5px;
        color: #ffffff;
    }
</style>

<div class="shb-button-container">
    <button class="shb-button shb-button-blue">Button Blau</button> <!-- Füge  onclick="updateScript2()" hinzu für Script -->
    <button class="shb-button shb-button-green">Button Grün</button>
    <button class="shb-button shb-button-yellow">Button Gelb</button>
    <button class="shb-button shb-button-red">Button Rot</button>
</div>
<style>
    .shb-button-container {
        display: flex;
        gap: 10px;
        margin: 5px 0 20px 0;
    }
    .shb-button {
        padding: 10px 15px;
        font-size: 1.1em;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    .shb-button-blue {
        background-color: #007bff;
        color: #fff;
        border: 1px solid #ffffff;
        box-shadow: 0 2px 5px #ffffff;
        font-weight: bold;
        text-transform: uppercase;
        text-shadow: 0 0 2px #000000, 0 0 5px #000000;
    }
    .shb-button-green {
        background-color: #17b83a;
        color: #fff;
        border: 1px solid #ffffff;
        box-shadow: 0 2px 5px #ffffff;
        font-weight: bold;
        text-transform: uppercase;
        text-shadow: 0 0 2px #000000, 0 0 5px #000000;
    }
    .shb-button-yellow {
        background-color: #ffc107;
        color: #fff;
        border: 1px solid #ffffff;
        box-shadow: 0 2px 5px #ffffff;
        font-weight: bold;
        text-transform: uppercase;
        text-shadow: 0 0 2px #000000, 0 0 5px #000000;
    }
    .shb-button-red {
        background-color: #dc3545;
        color: #fff;
        border: 1px solid #ffffff;
        box-shadow: 0 2px 5px #ffffff;
        font-weight: bold;
        text-transform: uppercase;
        text-shadow: 0 0 2px #000000, 0 0 5px #000000;
    }
</style>


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
<style>
    .shb-button-30 {
        padding: 10px 0;
        font-size: 1.1em;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        min-width: 30%;
    }
    .shb-button-30-blue {
        background-color: #007bff;
        color: #fff;
        border: 1px solid #ffffff;
        box-shadow: 0 2px 5px #ffffff;
        font-weight: bold;
        text-transform: uppercase;
        text-shadow: 0 0 2px #000000, 0 0 5px #000000;
    }
    .shb-button-30-green {
        background-color: #17b83a;
        color: #fff;
        border: 1px solid #ffffff;
        box-shadow: 0 2px 5px #ffffff;
        font-weight: bold;
        text-transform: uppercase;
        text-shadow: 0 0 2px #000000, 0 0 5px #000000;
    }
    .shb-button-30-yellow {
        background-color: #ffc107;
        color: #fff;
        border: 1px solid #ffffff;
        box-shadow: 0 2px 5px #ffffff;
        font-weight: bold;
        text-transform: uppercase;
        text-shadow: 0 0 2px #000000, 0 0 5px #000000;
    }
    .shb-button-30-red {
        background-color: #dc3545;
        color: #fff;
        border: 1px solid #ffffff;
        box-shadow: 0 2px 5px #ffffff;
        font-weight: bold;
        text-transform: uppercase;
        text-shadow: 0 0 2px #000000, 0 0 5px #000000;
    }
</style>

<ul class="shb-list-start">
    <li>Erster Punkt mit <strong>hervorgehobenem Text</strong></li>
    <li>Zweiter Punkt mit <strong>hervorgehobenem Text</strong></li>
    <li>Dritter Punkt mit <strong>hervorgehobenem Text</strong></li>
</ul>
<style>
    .shb-list-start {
        counter-reset: list-counter;
        padding-left: 0;
        margin: 30px 0 !important;
        margin-inline-start: 0.5em !important;
    }
    .shb-list-start li strong {
        color: #1ab5d5;
        text-transform: uppercase;
    }
    .shb-list-start li {
        counter-increment: list-counter;
        position: relative;
        margin: 10px 30px;
        font-size: 1em;
        line-height: 1.6;
        color: #ffffff;
        background-color: #4b4b4b;
        border-left: 3px solid #1ab5d5;
        border-top: 1px solid #1ab5d5;
        border-right: 1px solid #1ab5d5;
        border-bottom: 1px solid #1ab5d5;
        border-radius: 6px;
        padding: 10px 60px;
        box-shadow: 0 2px 5px #ffffff10;
        width: 90%;
    }
    .shb-list-start li::before {
        content: counter(list-counter);
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        font-weight: bold;
        color: #2266ff;
        font-size: 1.2em;
        background-color: #ffffff;
        border: 3px solid #1ab5d5;
        padding: 5px 15px;
        border-radius: 50%;
        box-shadow: 0 1px 3px #000000;
        text-align: center;
    }
</style>

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
<style>
    .shb-code-container {
        position: relative;
        background-color: #1ab5d5;
        border: 1px solid #ffffff;
        box-shadow: 0 2px 5px #ffffff;
        border-radius: 5px;
        padding: 15px;
        margin-top: 5px;
        margin-bottom: 30px;
        overflow: auto;
        max-height: 300px;
    }
    .shb-code-container code {
        font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
        font-size: 0.95em;
        line-height: 1.5;
        color: #d1d1d1;
    }
    .copy-code-button {
        position: absolute;
        top: 10px;
        right: 10px;
        background: #007acc;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 8px 12px;
        font-size: 0.85em;
        cursor: pointer;
        z-index: 10;
    }
    .copy-code-button:hover {
        background: #005a9c;
    }
    .copy-code-button.copied {
        background: #72dd8b;
        color: white;
        content: '✔️';
        padding: 8px 12px;
    }
</style>
<script>
    function copyCode(elementId, button) {
        const codeElement = document.getElementById(elementId);
        const codeText = codeElement.innerText || codeElement.textContent;
        navigator.clipboard.writeText(codeText)
            .then(() => {
                showSHBcustomAlert("ERFOLG!", "Der Code wurde erfolgreich kopiert!");
                button.classList.add('copied');
                button.textContent = "Kopiert ✔️";
            })
            .catch(err => {
                console.error("Fehler beim Kopieren des Codes: ", err);
                showSHBcustomAlert("FEHLER!", "Beim Kopieren des Codes ist ein Fehler aufgetreten.");
            });
    }
</script>

<div id="shb-custom-alert" style="display: none;">
    <div id="shb-custom-alert-content">
        <h4 id="shb-custom-alert-title"></h4>
        <p id="shb-custom-alert-message"></p>
        <button id="shb-close-alert">OK</button>
    </div>
</div>
<style>
    #shb-custom-alert {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6); /* Dunkles Overlay */
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }
    #shb-custom-alert-content {
        background-color: #fff;
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        text-align: center;
        max-width: 400px;
        animation: fadeIn 0.3s ease-in-out;
    }
    #shb-custom-alert-title {
        margin-bottom: 10px;
        font-size: 18px;
        color: #333;
        font-weight: bold;
    }
    #shb-custom-alert-message {
        margin-bottom: 15px;
        font-size: 16px;
        color: #666;
    }
    #shb-close-alert {
        background-color: #28a745;
        color: white;
        border: none;
        padding: 10px 20px;
        font-size: 14px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    #shb-close-alert:hover {
        background-color: #218838;
    }
    /* Animation */
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
</style>
<script>
function showSHBcustomAlert(title, message) {
    const alertBox = document.getElementById("shb-custom-alert");
    const alertTitle = document.getElementById("shb-custom-alert-title");
    const alertMessage = document.getElementById("shb-custom-alert-message");
    alertTitle.textContent = title;
    alertMessage.textContent = message;
    alertBox.style.display = "flex";
    document.getElementById("shb-close-alert").onclick = function () {
        alertBox.style.display = "none";
    };
}
</script>

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
<style>
    .shb-text-output {
        position: relative;
        background-color: #1ab5d5;
        border: 1px solid #ffffff;
        box-shadow: 0 2px 5px #ffffff;
        border-radius: 5px;
        padding: 15px;
        margin-top: 5px;
        margin-bottom: 30px;
        overflow: auto;
    }
    #yaml-output {
        width: 100% !important;
        padding: 15px;
        border: 1px solid #ddd;
        border-radius: 5px;
        background-color: #1a1a1a;
        font-size: 1em;
        line-height: 1.4;
        color: #d1d1d1;
        font-family: monospace;
    }
</style>

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
