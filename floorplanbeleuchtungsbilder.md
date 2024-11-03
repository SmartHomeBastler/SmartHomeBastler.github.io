---
title: Floorplan Beleuchtungsbilder Code Generator
subtitle: Erstelle Home Assistant Picture Elements Code der Beleuchtungsbilder
description: Generiere YAML-Code für Home Assistant
show_sidebar: false
layout: page
---

<h3>Allgemeine Einstellungen</h3>
<div>
    <label for="path-input">Speicherpfad der Floorplan Bilder:</label>
    <input type="text" id="path-input" value="/local/lovelace/floorplan/" placeholder="/local/lovelace/floorplan/">
</div>
<div>
    <label for="background-image-input">Dateiname Hintergrundbild:</label>
    <input type="text" id="background-image-input" placeholder="z.B. hintergrund_nacht.png">
</div>

<h3>Entitätsbilder Einstellungen</h3>
<table id="entities-table">
    <thead>
        <tr>
            <th>Entität (entity)</th>
            <th>Dateiname des Entitäts-Bildes</th>
            <th>Option</th>
            <th>Aktionen</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><input type="text" placeholder="z.B. light.arbeitszimmer_deckenlicht"></td>
            <td><input type="text" placeholder="z.B. arbeitszimmer_deckenlicht.png"></td>
            <td>
                <select>
                    <option value="switch">Licht ein-aus</option>
                    <option value="dimmable">Licht dimmbar</option>
                    <option value="rgb">Licht RGB</option>
                    <option value="rgbw">Licht RGBW</option>
                    <option value="cover">Abdeckungen</option>
                </select>
            </td>
            <td><button onclick="removeRow(this)">-</button></td>
        </tr>
    </tbody>
</table>
<button onclick="addRow()">+</button>

<div class="button-container">
    <button onclick="generateYAML()">YAML-Code generieren</button>
    <button onclick="copyYAML()">YAML-Code kopieren</button>
    <button onclick="clearYAML()">YAML-Code löschen</button>
    <button onclick="clearInputs()">Eingaben löschen</button>
</div>

<h3>Generierter YAML-Code:</h3>
<textarea id="yaml-output" rows="20" cols="80" readonly></textarea>

<script>
// Funktion zum Hinzufügen einer neuen Zeile zur Tabelle
function addRow() {
    const table = document.getElementById('entities-table').getElementsByTagName('tbody')[0];
    const newRow = table.rows[0].cloneNode(true);
    newRow.querySelectorAll('input').forEach(input => input.value = '');
    table.appendChild(newRow);
}

// Funktion zum Entfernen einer Zeile aus der Tabelle
function removeRow(button) {
    const row = button.parentNode.parentNode;
    const table = row.parentNode;
    if (table.rows.length > 1) {
        row.remove();
    }
}

// Funktion zum Leeren des YAML-Code-Feldes
function clearYAML() {
    document.getElementById('yaml-output').value = '';
}

// Funktion zum Löschen der Eingabefelder
function clearInputs() {
    document.getElementById('path-input').value = '/local/lovelace/floorplan/';
    document.getElementById('background-image-input').value = '';
    document.querySelectorAll('#entities-table input').forEach(input => input.value = '');
}

// Funktion zum Generieren des YAML-Codes
function generateYAML() {
    const path = document.getElementById('path-input').value;
    const backgroundImage = document.getElementById('background-image-input').value;
    const tableRows = document.querySelectorAll('#entities-table tbody tr');
    let yaml = '';

    tableRows.forEach(row => {
        const entity = row.cells[0].querySelector('input').value;
        const entityImage = row.cells[1].querySelector('input').value;
        const option = row.cells[2].querySelector('select').value;

        if (option === 'switch') {
            yaml += `- type: image\n  entity: ${entity}\n  tap_action:\n    action: none\n  image: ${path}1x1_transparent.png\n  state_image:\n    "on": ${path}${entityImage}\n  style:\n    mix-blend-mode: lighten\n    left: 50%\n    top: 50%\n    width: 100%\n    opacity: 1\n\n`;
        } else if (option === 'dimmable') {
            yaml += `- type: custom:config-template-card\n  variables:\n    - states['${entity}'].attributes.brightness\n  entities:\n    - ${entity}\n  element:\n    type: image\n    image: ${path}1x1_transparent.png\n    state_image:\n      "on": ${path}${entityImage}\n  style:\n    left: 50%\n    opacity: >-\n      \${states['${entity}'].state === 'on' ? (states['${entity}'].attributes.brightness / 255) : '0'}\n    top: 50%\n    width: 100%\n\n`;
        } else if (option === 'rgb') {
            yaml += `- type: custom:config-template-card\n  variables:\n    - states['${entity}'].attributes.hs_color\n    - states['${entity}'].attributes.brightness\n  entities:\n    - ${entity}\n  element:\n    type: image\n    image: ${path}1x1_transparent.png\n    state_image:\n      "on": ${path}${entityImage}\n  style:\n    filter: >-\n      \${ "hue-rotate(" + (states['${entity}'].attributes.hs_color ? states['${entity}'].attributes.hs_color[0] : 0) + "deg)"}\n    left: 50%\n    opacity: >-\n      \${states['${entity}'].state === 'on' ? (states['${entity}'].attributes.brightness / 100) : '0'}\n    top: 50%\n    width: 100%\n\n`;
        } else if (option === 'rgbw') {
            yaml += `- type: custom:config-template-card\n  variables:\n    LEUCHTENSTATUS: states['${entity}'].state\n    FARBMODUS: states['${entity}'].attributes.color_mode\n    LICHTFARBE: states['${entity}'].attributes.hs_color\n    HELLIGKEIT: states['${entity}'].attributes.brightness\n  entities:\n    - ${entity}\n  element:\n    type: image\n    image: ${path}1x1_transparent.png\n    state_image:\n      "on": >-\n        \${FARBMODUS === 'color_temp' ? '${path}${entityImage.replace('.png', '_weiss.png')}' : '${path}${entityImage}'}\n  style:\n    filter: >-\n      \${ "hue-rotate(" + (LICHTFARBE ? LICHTFARBE[0] : 0) + "deg)"}\n    opacity: >-\n      \${LEUCHTENSTATUS === 'on' ? (HELLIGKEIT / 254) : '100'}\n    left: 50%\n    top: 50%\n    width: 100%\n\n`;
        } else if (option === 'cover') {
            yaml += `- type: image\n  entity: ${entity}\n  tap_action:\n    action: none\n  image: ${path}1x1_transparent.png\n  state_image:\n    closed: ${path}${entityImage}\n  style:\n    left: 50%\n    top: 50%\n    width: 100%\n    opacity: 1\n\n`;
        }
    });

    document.getElementById('yaml-output').value = yaml;
}

// Funktion zum Kopieren des YAML-Codes
function copyYAML() {
    const yamlOutput = document.getElementById('yaml-output');
    yamlOutput.select();
    document.execCommand('copy');
    alert('YAML-Code wurde in die Zwischenablage kopiert!');
}
</script>
