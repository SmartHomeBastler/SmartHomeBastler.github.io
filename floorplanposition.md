---
title: Floorplan Position finden
subtitle: Klicke auf das Bild, um Markierungen zu setzen und die Koordinaten in % zu sehen
description: Interaktives Tool zur Bestimmung von Positionen auf einem Floorplan-Bild.
show_sidebar: false
layout: page
---

<p>Lade ein Bild hoch und klicke dann auf das Bild, um Positionen zu markieren. Die genauen Koordinaten in Prozent werden angezeigt:</p>

<!-- Bild-Upload -->
<div class="image-upload">
    <label for="image-upload">Bild hochladen:</label>
    <input type="file" id="image-upload" accept="image/*">
</div>

<!-- Bildcontainer -->
<div class="container" id="container">
  <img src="floorplan.png" alt="Floorplan" id="floorplan">
  <div class="coords" id="coords">left: 0%, top: 0%</div>
</div>

<!-- Buttons für Markierungen -->
<div class="button-container">
    <button class="button is-warning" onclick="removeMarkers()">Alle Markierungen entfernen</button>
</div>

<div class="coord-list" id="coord-list"></div>

<style>
    .container {
        position: relative;
        width: 100%;
        max-width: 600px;
    }
    img {
        width: 100%;
        height: auto;
        cursor: crosshair; /* Mauszeiger auf Fadenkreuz setzen */
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
        transform: translate(-50%, -50%); /* Korrektur für die exakte Zentrierung */
    }
    .coord-list {
        margin-top: 20px;
    }
    .button-container {
        margin-top: 10px;
    }
</style>

<script>
// JavaScript zur Markierungserstellung und Bild-Upload
const img = document.getElementById('floorplan');
const coordsDisplay = document.getElementById('coords');
const container = document.getElementById('container');
const coordList = document.getElementById('coord-list');
const imageUpload = document.getElementById('image-upload');

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
  marker.style.transform = "translate(-50%, -50%)"; // Zentriert die Markierung
  container.appendChild(marker);

  // Koordinate zur Liste hinzufügen
  const coordItem = document.createElement('p');
  coordItem.textContent = `left: ${xPercent.toFixed(2)}%, top: ${yPercent.toFixed(2)}%`;
  coordList.appendChild(coordItem);
});

// Bild hochladen und anzeigen
imageUpload.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target.result;
      removeMarkers(); // Entferne bestehende Markierungen beim neuen Bild
    };
    reader.readAsDataURL(file);
  }
});

// Funktion zum Entfernen aller Markierungen
function removeMarkers() {
  document.querySelectorAll('.marker').forEach(marker => marker.remove());
  coordList.innerHTML = ''; // Löscht die Koordinatenliste
}
</script>
