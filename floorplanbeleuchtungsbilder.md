---
title: Floorplan Beleuchtungsbilder Code Generator
subtitle: Erstelle Home Assistant Picture Elements Code der Beleuchtungsbilder
description: Generiere YAML-Code für Home Assistant
show_sidebar: false
layout: page
---

<h3>Allgemeine Einstellungen</h3>
<div class="form-group">
    <label for="path-input">Speicherpfad der Floorplan Bilder:</label>
    <input type="text" id="path-input" value="/local/lovelace/floorplan/" placeholder="/local/lovelace/floorplan/">
</div>
<div class="form-group">
    <label for="background-image-input">Dateiname Hintergrundbild:</label>
    <input type="text" id="background-image-input" placeholder="z.B. hintergrund_nacht.png">
</div>
<div class="form-group">
    <label for="transparent-image-input">Dateiname 1 Pixel Bild:</label>
    <input type="text" id="transparent-image-input" placeholder="z.B. 1x1_transparent.png">
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

<style>
    .form-group {
        margin-bottom: 15px;
    }
    .button-container {
        display: flex;
        gap: 10px;
        margin-top: 20px;
    }
    .button-container button {
        padding: 10px 15px;
        font-size: 14px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    .button-container .generate {
        background-color: #007bff;
        color: #fff;
    }
    .button-container .copy {
        background-color: #17a2b8;
        color: #fff;
    }
    .button-container .remove {
        background-color: #ffc107;
        color: #fff;
    }
    .button-container .clear {
        background-color: #dc3545;
        color: #fff;
    }
    #yaml-output {
        width: 100%;
        margin-top: 20px;
        padding: 10px;
        font-size: 14px;
        border: 1px solid #ddd;
        border-radius: 5px;
        background-color: #f8f8f8;
    }
</style>

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
    document.getElementById('transparent-image-input').value = '';
    document.querySelectorAll('#entities-table input').forEach(input => input.value = '');
}

// Funktion zum Generieren des YAML-Codes
function generateYAML() {
    const path = document.getElementById('path-input').value;
    const backgroundImage = document.getElementById('background-image-input').value;
    const transparentImage = document.getElementById('transparent-image-input').value || "1x1_transparent.png";
    const tableRows = document.querySelectorAll('#entities-table tbody tr');
    let yaml = '';

    tableRows.forEach(row => {
        const entity = row.cells[0].querySelector('input').value;
        const entityImage = row.cells[1].querySelector('input').value;
        const option = row.cells[2].querySelector('select').value;

        if (option === 'switch') {
            yaml += `  - type: image\n`;
            yaml += `    entity: ${entity}\n`;
            yaml += `    image: ${path}${transparentImage}\n`;
            yaml += `    state_image:\n`;
            yaml += `      "on": ${path}${entityImage}\n`;
            yaml += `    tap_action:\n`;
            yaml += `      action: none\n`;
            yaml += `    hold_action:\n`;
            yaml += `      action: none\n`;
            yaml += `    style:\n`;
            yaml += `      opacity: 1\n\n`;
            yaml += `      mix-blend-mode: lighten\n`;
            yaml += `      left: 50%\n`;
            yaml += `      top: 50%\n`;
            yaml += `      width: 100%\n`;
        } else if (option === 'dimmable') {
            yaml += `  - type: custom:config-template-card\n`;
            yaml += `    variables:\n`;
            yaml += `      LEUCHTENSTATUS: states['${entity}'].state\n`;
            yaml += `      HELLIGKEIT: states['${entity}'].attributes.brightness\n`;
            yaml += `    entities:\n`;
            yaml += `      - ${entity}\n`;
            yaml += `    element:\n`;
            yaml += `      type: image\n`;
            yaml += `      image: ${path}${transparentImage}\n`;
            yaml += `      state_image:\n`;
            yaml += `        "on": ${path}${entityImage}\n`;
            yaml += `    tap_action:\n`;
            yaml += `      action: none\n`;
            yaml += `    hold_action:\n`;
            yaml += `      action: none\n`;
            yaml += `    style:\n`;
            yaml += `      mix-blend-mode: lighten\n`;
            yaml += `      opacity: >-\n`;
            yaml += `        \${LEUCHTENSTATUS === 'on' ? (HELLIGKEIT / 254) : '100'}\n`;
            yaml += `      left: 50%\n`;
            yaml += `      top: 50%\n`;
            yaml += `      width: 100%\n\n`;
        } else if (option === 'rgb') {
            yaml += `  - type: custom:config-template-card\n`;
            yaml += `    variables:\n`;
            yaml += `      LEUCHTENSTATUS: states['${entity}'].state\n`;
            yaml += `      FARBMODUS: states['${entity}'].attributes.color_mode\n`;
            yaml += `      LICHTFARBE: states['${entity}'].attributes.hs_color\n`;
            yaml += `      HELLIGKEIT: states['${entity}'].attributes.brightness\n`;
            yaml += `    entities:\n`;
            yaml += `      - ${entity}\n`;
            yaml += `    element:\n`;
            yaml += `      type: image\n`;
            yaml += `      entity: ${entity}\n`;
            yaml += `      image: ${path}${transparentImage}\n`;
            yaml += `      state_image:\n`;
            yaml += `        "on": ${path}${entityImage}\n`;
            yaml += `    tap_action:\n`;
            yaml += `      action: none\n`;
            yaml += `    hold_action:\n`;
            yaml += `      action: none\n`;
            yaml += `    style:\n`;
            yaml += `      mix-blend-mode: lighten\n`;
            yaml += `      filter: >-\n`;
            yaml += `        \${ "hue-rotate(" + (LICHTFARBE ? LICHTFARBE[0] : 0) + "deg)"}\n`;
            yaml += `      opacity: >-\n`;
            yaml += `        \${LEUCHTENSTATUS === 'on' ? (HELLIGKEIT / 254) : '100'}\n`;
            yaml += `      left: 50%\n`;
            yaml += `      top: 50%\n`;
            yaml += `      width: 100%\n\n`;
        } else if (option === 'rgbw') {
            yaml += `  - type: custom:config-template-card\n`;
            yaml += `    variables:\n`;
            yaml += `      LEUCHTENSTATUS: states['${entity}'].state\n`;
            yaml += `      FARBMODUS: states['${entity}'].attributes.color_mode\n`;
            yaml += `      LICHTFARBE: states['${entity}'].attributes.hs_color\n`;
            yaml += `      HELLIGKEIT: states['${entity}'].attributes.brightness\n`;
            yaml += `    entities:\n`;
            yaml += `      - ${entity}\n`;
            yaml += `    element:\n`;
            yaml += `      type: image\n`;
            yaml += `      entity: ${entity}\n`;
            yaml += `      image: ${path}${transparentImage}\n`;
            yaml += `      state_image:\n`;
            yaml += `        "on": >-\n`;
            yaml += `          \${FARBMODUS === 'color_temp' ? '${path}${entityImage.replace('_farbe.png', '_weiss.png')}' : '${path}${entityImage}'}\n`;
            yaml += `    style:\n`;
            yaml += `      mix-blend-mode: lighten\n`;
            yaml += `      filter: >-\n`;
            yaml += `        \${ "hue-rotate(" + (LICHTFARBE ? LICHTFARBE[0] : 0) + "deg)"}\n`;
            yaml += `      opacity: >-\n`;
            yaml += `        \${LEUCHTENSTATUS === 'on' ? (HELLIGKEIT / 254) : '100'}\n`;
            yaml += `      left: 50%\n`;
            yaml += `      top: 50%\n`;
            yaml += `      width: 100%\n\n`;
        } else if (option === 'cover') {
            yaml += `  - type: image\n`;
            yaml += `    entity: ${entity}\n`;
            yaml += `    tap_action:\n`;
            yaml += `      action: none\n`;
            yaml += `    image: ${path}${transparentImage}\n`;
            yaml += `    state_image:\n`;
            yaml += `      closed: ${path}${entityImage}\n`;
            yaml += `    style:\n`;
            yaml += `      left: 50%\n`;
            yaml += `      top: 50%\n`;
            yaml += `      width: 100%\n`;
            yaml += `      opacity: 1\n\n`;
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