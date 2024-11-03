---
title: Floorplan Beleuchtungsbilder Code Generator
subtitle: Erstelle Home Assistant Picture Elements Code der Beleuchtungsbilder
description: Generiere YAML-Code für Home Assistant
show_sidebar: false
layout: page
---

<h3>Allgemeine Einstellungen</h3>
<div class="custom-form-group">
    <label for="path-input">Speicherpfad der Floorplan Bilder:</label>
    <input type="text" id="path-input" value="/local/lovelace/floorplan/" placeholder="/local/lovelace/floorplan/">
</div>
<div class="custom-form-group">
    <label for="background-image-input">Dateiname Hintergrundbild:</label>
    <input type="text" id="background-image-input" placeholder="z.B. hintergrund_nacht.png">
</div>
<div class="custom-form-group">
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
            <td><button class="action-button remove-button" onclick="removeRow(this)">&#x2212;</button></td>
        </tr>
    </tbody>
</table>
<button class="action-button add-button" onclick="addRow()">&#x2b;</button>

<div class="custom-button-container">
    <button class="custom-button generate" onclick="generateYAML()">YAML-Code generieren</button>
    <button class="custom-button copy" onclick="copyYAML()">YAML-Code kopieren</button>
    <button class="custom-button remove" onclick="clearYAML()">YAML-Code löschen</button>
    <button class="custom-button clear" onclick="clearInputs()">Eingaben löschen</button>
</div>

<h3>Generierter YAML-Code:</h3>
<textarea id="yaml-output" rows="20" cols="80" readonly></textarea>

<style>
    /* Formulargestaltung */
    .custom-form-group {
        margin-bottom: 15px;
    }
    .custom-form-group label {
        display: block;
        font-weight: bold;
        margin-bottom: 5px;
    }
    .custom-form-group input {
        width: 100%;
        padding: 8px;
        font-size: 14px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }

    /* Tabellengestaltung */
    #entities-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 15px;
    }
    #entities-table th, #entities-table td {
        padding: 10px;
        border: 1px solid #ddd;
        text-align: left;
    }
    #entities-table th {
        background-color: #f1f1f1;
        font-weight: bold;
    }
    #entities-table td input, #entities-table td select {
        width: 100%;
        padding: 6px;
        font-size: 14px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    /* Buttons für Zeilen hinzufügen und entfernen */
    .action-button {
        font-size: 20px;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        color: #fff;
    }
    .add-button {
        background-color: #28a745;
        margin-top: 10px;
    }
    .remove-button {
        background-color: #dc3545;
    }

    /* Hauptbuttons Styling */
    .custom-button-container {
        display: flex;
        gap: 10px;
        margin-top: 20px;
    }
    .custom-button {
        padding: 10px 15px;
        font-size: 14px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        color: #fff;
    }
    .custom-button.generate {
        background-color: #007bff;
    }
    .custom-button.copy {
        background-color: #17a2b8;
    }
    .custom-button.remove {
        background-color: #ffc107;
        color: #000;
    }
    .custom-button.clear {
        background-color: #dc3545;
    }

    /* YAML-Ausgabe Styling */
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
    const backgroundImage = document.getElementById('background-image-input').value || "hintergrund_nacht_org.png";
    const transparentImage = document.getElementById('transparent-image-input').value || "1x1_transparent.png";
    const tableRows = document.querySelectorAll('#entities-table tbody tr');
    let yaml = '';

    // Anfang des Picture Elements-Codes basierend auf den Eingaben
    yaml += `type: picture-elements\n`;
    yaml += `image: ${path}${backgroundImage}\n`;
    yaml += `elements:\n`;

    // Elemente für jede Zeile in der Tabelle generieren
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
