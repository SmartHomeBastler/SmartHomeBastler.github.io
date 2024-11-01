---
title: Floorplan Position Generator
subtitle: Erstelle Home Assistant Picture Elements Code mit Markierungen und Koordinaten
description: Generiere YAML-Code für Home Assistant anhand der Markierungen und Positionen.
show_sidebar: false
layout: page
---

<p>Lade ein Bild hoch, klicke auf das Bild, um Markierungen zu setzen, und gib zusätzliche Informationen ein, um den YAML-Code zu generieren:</p>

<!-- Bild-Upload -->
<div class="image-upload">
    <label for="image-upload">Bild hochladen:</label>
    <input type="file" id="image-upload" accept="image/*">
</div>
<p id="image-dimensions">Bildabmessungen: Noch kein Bild hochgeladen</p>

<!-- Bildcontainer -->
<div class="container" id="container">
  <img src="floorplan.png" alt="Floorplan" id="floorplan">
  <div class="coords" id="coords">left: 0%, top: 0%</div>
</div>

<!-- Formular für zusätzliche Angaben -->
<h3>Marker-Einstellungen</h3>
<div class="marker-form">
    <div class="form-group">
        <label for="marker-entity">Entität (entity):</label>
        <input type="text" id="marker-entity" placeholder="z.B. light.esszimmer_spots">
    </div>
    
    <div class="form-group">
        <label for="marker-path">Speicherpfad der Icons:</label>
        <input type="text" id="marker-path" placeholder="/local/lovelace/icon/">
    </div>
    
    <div class="form-group">
        <label for="marker-default-icon">Standard Icon Bild:</label>
        <input type="text" id="marker-default-icon" placeholder="icon_fail.png">
    </div>
    
    <div class="form-group">
        <label for="marker-on-icon">Bild im Zustand 'An':</label>
        <input type="text" id="marker-on-icon" placeholder="button_spot_on.png">
    </div>
    
    <div class="form-group">
        <label for="marker-off-icon">Bild im Zustand 'Aus':</label>
        <input type="text" id="marker-off-icon" placeholder="button_spot_off.png">
    </div>
    
    <div class="form-group">
        <label for="marker-size">Größe des Icons (%):</label>
        <input type="text" id="marker-size" placeholder="z.B. 2%">
    </div>
</div>

<div class="button-container">
    <button class="button is-primary" onclick="generateYAML()">YAML-Code generieren</button>
    <button class="button is-info" onclick="copyYAML()">YAML-Code kopieren</button>
    <button class="button is-warning" onclick="removeMarkers()">Alle Markierungen entfernen</button>
</div>

<h3>Generierter YAML-Code:</h3>
<textarea id="yaml-output" rows="20" cols="80" readonly></textarea>

<style>
    .container {
        position: relative;
        width: 100%;
        max-width: 600px;
        margin-top: 20px;
        border: 1px solid #ddd;
        padding: 10px;
        background-color: #f9f9f9;
        border-radius: 8px;
    }
    img {
        width: 100%;
        height: auto;
        cursor: crosshair;
    }
    .coords {
        position: absolute;
        top: 10px;
        left: 10px;
        background: rgba(0, 0, 0, 0.7);
        color: #fff;
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 14px;
    }
    .marker {
        position: absolute;
        width: 12px;
        height: 12px;
        background: red;
        border-radius: 50%;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
        transform: translate(-50%, -50%);
    }
    .marker-form {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
        margin-top: 20px;
    }
    .form-group {
        display: flex;
        flex-direction: column;
    }
    .form-group label {
        font-weight: bold;
        margin-bottom: 5px;
    }
    .form-group input {
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 14px;
    }
    .button-container {
        display: flex;
        gap: 10px;
        margin-top: 20px;
    }
    .button {
        padding: 10px 15px;
        font-size: 14px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    .button.is-primary {
        background-color: #007bff;
        color: #fff;
    }
    .button.is-info {
        background-color: #17a2b8;
        color: #fff;
    }
    .button.is-warning {
        background-color: #ffc107;
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

  // Marker erstellen
  const marker = document.createElement('div');
  marker.classList.add('marker');
  marker.style.left = `${xPercent}%`;
  marker.style.top = `${yPercent}%`;
  container.appendChild(marker);

  // Speichert die Markierung und aktuelle Eingaben
  markers.push({
    x: xPercent.toFixed(2),
    y: yPercent.toFixed(2),
    entity: document.getElementById('marker-entity').value || "light.default_entity",
    path: document.getElementById('marker-path').value || "/local/lovelace/icon/",
    defaultIcon: document.getElementById('marker-default-icon').value || "icon_fail.png",
    onIcon: document.getElementById('marker-on-icon').value || "button_spot_on.png",
    offIcon: document.getElementById('marker-off-icon').value || "button_spot_off.png",
    size: document.getElementById('marker-size').value || "2%"
  });

  // Eingabefelder leeren
  document.getElementById('marker-entity').value = "";
  document.getElementById('marker-path').value = "";
  document.getElementById('marker-default-icon').value = "";
  document.getElementById('marker-on-icon').value = "";
  document.getElementById('marker-off-icon').value = "";
  document.getElementById('marker-size').value = "";
});

// Bild hochladen und anzeigen
imageUpload.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target.result;
      removeMarkers();

      const tempImg = new Image();
      tempImg.onload = function() {
        imageDimensions.textContent = `Bildabmessungen: Breite ${tempImg.width}px, Höhe ${tempImg.height}px`;
      };
      tempImg.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// Funktion zum Entfernen aller Markierungen
function removeMarkers() {
  document.querySelectorAll('.marker').forEach(marker => marker.remove());
  yamlOutput.value = '';
  markers = [];
}

// Generiert YAML-Code basierend auf den Markierungen
function generateYAML() {
  let yaml = "";
  markers.forEach(marker => {
    yaml += `  - type: custom:button-card\n`;
    yaml += `    entity: ${marker.entity}\n`;
    yaml += `    show_name: false\n`;
    yaml += `    show_entity_picture: true\n`;
    yaml += `    entity_picture: ${marker.path}${marker.defaultIcon}\n`;
    yaml += `    show_icon: false\n`;
    yaml += `    aspect_ratio: 1/1\n`;
    yaml += `    size: 100%\n`;
    yaml += `    styles:\n`;
    yaml += `      card:\n`;
    yaml += `        - border: 2px solid var(--state-icon-color)\n`;
    yaml += `        - border-radius: 50%\n`;
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
    yaml += `    style:\n`;
    yaml += `      left: ${marker.x}%\n`;
    yaml += `      top: ${marker.y}%\n`;
    yaml += `      width: ${marker.size}\n\n`;
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
