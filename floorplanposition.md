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
    <label for="marker-entity">Entität (entity):</label>
    <input type="text" id="marker-entity" placeholder="z.B. light.esszimmer_spots">
    
    <label for="marker-path">Speicherpfad der Icons:</label>
    <input type="text" id="marker-path" placeholder="/local/lovelace/icon/">
    
    <label for="marker-default-icon">Standard Icon Bild:</label>
    <input type="text" id="marker-default-icon" placeholder="icon_fail.png">
    
    <label for="marker-on-icon">Bild im Zustand 'An':</label>
    <input type="text" id="marker-on-icon" placeholder="button_spot_on.png">
    
    <label for="marker-off-icon">Bild im Zustand 'Aus':</label>
    <input type="text" id="marker-off-icon" placeholder="button_spot_off.png">
    
    <label for="marker-size">Größe des Icons (%):</label>
    <input type="text" id="marker-size" placeholder="z.B. 2%">
</div>
<button class="button is-primary" onclick="generateYAML()">YAML-Code generieren</button>

<div class="button-container">
    <button class="button is-warning" onclick="removeMarkers()">Alle Markierungen entfernen</button>
</div>

<div class="coord-list" id="coord-list"></div>

<h3>Generierter YAML-Code:</h3>
<textarea id="yaml-output" rows="20" cols="80" readonly></textarea>

<style>
    .container {
        position: relative;
        width: 100%;
        max-width: 600px;
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
        background: rgba(255, 255, 255, 0.8);
        padding: 5px;
        border-radius: 5px;
        font-size: 14px;
    }
    .marker {
        position: absolute;
        width: 10px;
        height: 10px;
        background: red;
        border-radius: 50%;
        transform: translate(-50%, -50%);
    }
    .coord-list, .marker-form {
        margin-top: 20px;
    }
    .button-container {
        margin-top: 10px;
    }
</style>

<script>
// JavaScript zur Markierungserstellung, Bild-Upload und Anzeige der Bildabmessungen
const img = document.getElementById('floorplan');
const coordsDisplay = document.getElementById('coords');
const container = document.getElementById('container');
const coordList = document.getElementById('coord-list');
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
  marker.style.transform = "translate(-50%, -50%)";
  container.appendChild(marker);

  // Koordinate zur Liste hinzufügen und als Marker speichern
  const coordItem = document.createElement('p');
  coordItem.textContent = `left: ${xPercent.toFixed(2)}%, top: ${yPercent.toFixed(2)}%`;
  coordList.appendChild(coordItem);

  // Füge die Markierung und aktuelle Eingaben zur Markerliste hinzu
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

  // Felder leeren
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
  coordList.innerHTML = '';
  yamlOutput.value = '';
  markers = [];
}

// Generiert YAML-Code basierend auf den Markierungen
function generateYAML() {
  let yaml = `elements:\n`;
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
    yaml += `      width: ${marker.size}\n`;
  });
  yamlOutput.value = yaml;
}
</script>
