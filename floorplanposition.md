---
title: Floorplan Position Generator
subtitle: Erstelle Home Assistant Picture Elements Code mit Markierungen und Koordinaten
description: Generiere YAML-Code für Home Assistant anhand der Markierungen und Positionen.
show_sidebar: false
layout: page
---

<p>Lade ein Bild hoch, klicke auf das Bild, um Markierungen zu setzen, und gib zusätzliche Informationen ein, um den YAML-Code zu generieren:</p>

<!-- Bild-Upload -->
<div class="floorplan-image-upload">
    <label for="image-upload">Bild hochladen:</label>
    <input type="file" id="image-upload" accept="image/*">
</div>
<p id="image-dimensions">Bildabmessungen: Noch kein Bild hochgeladen</p>

<!-- Bildcontainer -->
<div class="floorplan-container" id="container">
  <img src="floorplan.png" alt="Floorplan" id="floorplan">
  <div class="floorplan-coords" id="coords">left: 0%, top: 0%</div>
</div>

<!-- Formular für zusätzliche Angaben -->
<h3>Button-Einstellungen</h3>
<div class="floorplan-marker-form">
    <div class="floorplan-form-group">
        <label for="marker-entity">Entität (entity):</label>
        <input type="text" id="marker-entity" placeholder="z.B. light.<DEINE-ENTITÄT>">
    </div>
    
    <div class="floorplan-form-group">
        <label for="marker-path">Speicherpfad der Icons:</label>
        <input type="text" id="marker-path" placeholder="/local/lovelace/icon/">
    </div>
    
    <div class="floorplan-form-group">
        <label for="marker-default-icon">Bild bei Fehler:</label>
        <input type="text" id="marker-default-icon" placeholder="<DEIN-FEHLER-BUTTON-BILD>.png">
    </div>
    
    <div class="floorplan-form-group">
        <label for="marker-on-icon">Bild im Zustand 'An':</label>
        <input type="text" id="marker-on-icon" placeholder="<DEIN-AN-BUTTON-BILD>.png">
    </div>
    
    <div class="floorplan-form-group">
        <label for="marker-off-icon">Bild im Zustand 'Aus':</label>
        <input type="text" id="marker-off-icon" placeholder="<DEIN-AUS-BUTTON-BILD>.png">
    </div>
    
    <div class="floorplan-form-group">
        <label for="marker-size">Größe des Icons (%):</label>
        <input type="text" id="marker-size" placeholder="z.B. 2">
    </div>
    
    <!-- Auswahl für die Form des Markers -->
    <div class="floorplan-form-group">
        <label for="marker-shape">Form des Buttons:</label>
        <select id="marker-shape">
            <option value="50%">Rund</option>
            <option value="0%">Eckig</option>
            <option value="10%">Abgerundet</option>
        </select>
    </div>
</div>

<div class="floorplan-button-container">
    <button class="floorplan-button floorplan-button-primary" onclick="generateYAML()">YAML-Code generieren</button>
    <button class="floorplan-button floorplan-button-info" onclick="copyYAML()">YAML-Code kopieren</button>
    <button class="floorplan-button floorplan-button-warning" onclick="removeMarkers()">Alle Markierungen entfernen</button>
    <button class="floorplan-button floorplan-button-danger" onclick="clearYAML()">YAML-Code löschen</button>
</div>

<h3>Generierter YAML-Code:</h3>
<textarea id="yaml-output" rows="20" cols="80" readonly></textarea>

<style>
    .floorplan-container {
        position: relative;
        display: inline-block;
        margin-top: 20px;
        border: 1px solid #ddd;
        padding: 0;
        background-color: #f9f9f9;
        border-radius: 8px;
    }
    img {
        display: block;
        cursor: crosshair;
    }
    .floorplan-coords {
        position: absolute;
        top: 10px;
        left: 10px;
        background: rgba(0, 0, 0, 0.7);
        color: #fff;
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 14px;
    }
    .floorplan-marker {
        position: absolute;
        width: 10px;
        height: 10px;
        background: red;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
        transform: translate(-50%, -50%);
        pointer-events: none;
    }
    .floorplan-marker-form {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
        margin-top: 20px;
    }
    .floorplan-form-group {
        display: flex;
        flex-direction: column;
    }
    .floorplan-form-group label {
        font-weight: bold;
        margin-bottom: 5px;
    }
    .floorplan-form-group input, .floorplan-form-group select {
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 14px;
    }
    .floorplan-button-container {
        display: flex;
        gap: 10px;
        margin-top: 20px;
    }
    .floorplan-button {
        padding: 10px 15px;
        font-size: 14px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    .floorplan-button-primary {
        background-color: #007bff;
        color: #fff;
    }
    .floorplan-button-info {
        background-color: #17a2b8;
        color: #fff;
    }
    .floorplan-button-warning {
        background-color: #ffc107;
        color: #fff;
    }
    .floorplan-button-danger {
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
// JavaScript zur Markierungserstellung, Bild-Upload und Anzeige der Bildabmessungen
const img = document.getElementById('floorplan');
const coordsDisplay = document.getElementById('coords');
const container = document.getElementById('container');
const imageUpload = document.getElementById('image-upload');
const imageDimensions = document.getElementById('image-dimensions');
const yamlOutput = document.getElementById('yaml-output');

// Speichert die Daten der Markierungen für die YAML-Generierung
let markers = [];

img.addEventListener('mousemove', (event) => {
  const rect = img.getBoundingClientRect();
  const xPercent = ((event.clientX - rect.left) / rect.width) * 100;
  const yPercent = ((event.clientY - rect.top) / rect.height) * 100;

  coordsDisplay.textContent = `left: ${xPercent.toFixed(2)}%, top: ${yPercent.toFixed(2)}%`;
});

img.addEventListener('click', (event) => {
  const rect = img.getBoundingClientRect();
  const xPercent = ((event.clientX - rect.left) / rect.width) * 100;
  const yPercent = ((event.clientY - rect.top) / rect.height) * 100;

  // Auswahl der Form des Markers
  const shape = document.getElementById('marker-shape').value;

  // Marker erstellen
  const marker = document.createElement('div');
  marker.classList.add('floorplan-marker');
  marker.style.left = `${xPercent}%`;
  marker.style.top = `${yPercent}%`;
  marker.style.borderRadius = shape; // Setzt die Form des Markers
  container.appendChild(marker);

  // Speichert die Markierung und aktuelle Eingaben
  markers.push({
    x: xPercent.toFixed(2),
    y: yPercent.toFixed(2),
    entity: document.getElementById('marker-entity').value || "",
    path: document.getElementById('marker-path').value || "/local/lovelace/icon/",
    defaultIcon: document.getElementById('marker-default-icon').value || "DEIN-FEHLER-BUTTON-BILD.png",
    onIcon: document.getElementById('marker-on-icon').value || "DEIN-AN-BUTTON-BILD.png",
    offIcon: document.getElementById('marker-off-icon').value || "DEIN-AUS-BUTTON-BILD.png",
    size: document.getElementById('marker-size').value || "2",
    shape: shape
  });
});

// Bild hochladen und anzeigen
imageUpload.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target.result;
      img.onload = function() {
        container.style.width = `${img.width}px`;  
        container.style.height = `${img.height}px`; 
        removeMarkers();

        imageDimensions.textContent = `Bildabmessungen: Breite ${img.width}px, Höhe ${img.height}px`;
      };
    };
    reader.readAsDataURL(file);
  }
});

// Funktion zum Entfernen aller Markierungen im Bild
function removeMarkers() {
  document.querySelectorAll('.floorplan-marker').forEach(marker => marker.remove());
  markers = [];
}

// Funktion zum Leeren des YAML-Code-Feldes
function clearYAML() {
  yamlOutput.value = '';
}

// Generiert YAML-Code basierend auf den Markierungen
function generateYAML() {
  let yaml = "";
  markers.forEach(marker => {
    yaml += `  - type: custom:button-card\n`;
    yaml += `    entity: ${marker.entity || "light.default_entity"}\n`;
    yaml += `    show_name: false\n`;
    yaml += `    show_entity_picture: true\n`;
    yaml += `    entity_picture: ${marker.path}${marker.defaultIcon}\n`;
    yaml += `    show_icon: false\n`;
    yaml += `    aspect_ratio: 1/1\n`;
    yaml += `    size: 100%\n`;
    yaml += `    styles:\n`;
    yaml += `      card:\n`;
    yaml += `        - border: 2px solid var(--state-icon-color)\n`;
    yaml += `        - border-radius: ${marker.shape}\n`; // Form des Markers
    yaml += `        - background-color: var(--primary-background-color)\n`;
    yaml += `    state:\n`;
    yaml += `      - value: "on"\n`;
    yaml += `        entity_picture: ${marker.path}${marker.onIcon}\n`;
    yaml += `        styles:\n`;
    yaml += `          card:\n`;
    yaml += `            - border: 2px solid var(--primary-color)\n`;
    yaml += `      - value: "off"\n`;
    yaml += `        entity_picture: ${marker.path}${marker.offIcon}\n`;
    yaml += `        styles:\n`;
    yaml += `          card:\n`;
    yaml += `            - border: 2px solid var(--primary-color)\n`;
    yaml += `    tap_action:\n`;
    yaml += `      action: toggle\n`;
    yaml += `    hold_action:\n`;
    yaml += `      action: more-info\n`;
    yaml += `    style:\n`;
    yaml += `      left: ${marker.x}%\n`;
    yaml += `      top: ${marker.y}%\n`;
    yaml += `      width: ${marker.size}%\n\n`;
  });
  yamlOutput.value = yaml;
}

// Funktion zum Kopieren des YAML-Codes
function copyYAML() {
  yamlOutput.select();
  document.execCommand('copy');
  alert('YAML-Code wurde in die Zwischenablage kopiert!');
}
</script>
