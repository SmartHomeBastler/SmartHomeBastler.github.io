---
title: Müllerinnerungs Codegenerator Beschreibung
subtitle: Hier erfährst du alles über die Handhabung der Müllerinnerungs Codegeneratoren
description: Details und Infos zu den Müllerinnerungs Codegeneratoren
show_sidebar: false
layout: page 
---

{% include support_note.html %}

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

<div class="guide-container">
  <h1 class="guide-title">Müllerinnerung Sensoren Codegenerator</h1>
  
  <section class="guide-section">
    <h2 class="section-title">1. Kalenderdaten auslesen</h2>
    <p>
      <strong>Datei hochladen oder URL eingeben:</strong><br>
      Lade deine <code>.ics</code>-Datei hoch oder gib die URL deines Müllkalenders ein. Klicke anschließend auf 
      <button class="highlight-button">Kalendereinträge extrahieren</button>.
    </p>
    <p>
      <strong>Einträge überprüfen:</strong><br>
      Die Kalendereinträge werden geladen und angezeigt. Wähle die Einträge aus, die du als Sensor nutzen möchtest, und passe die Bezeichnungen an. 
      Achte darauf, keine Umlaute oder Leerzeichen zu verwenden.
    </p>
  </section>

  <section class="guide-section">
    <h2 class="section-title">2. Kalenderdaten umwandeln</h2>
    <p>
      <strong>Einträge prüfen und anpassen:</strong><br>
      Kontrolliere deine ausgewählten Kalendereinträge und ändere die Bezeichnungen nach deinen Wünschen.
    </p>
    <p>
      <strong>Weiter zu Sensoren:</strong><br>
      Bestätige mit 
      <button class="highlight-button">Auswahl getroffen, eigene Bezeichnungen gewählt? Weiter mit Sensoren!</button>.
    </p>
  </section>

  <section class="guide-section">
    <h2 class="section-title">3. Sensoren Konfiguration</h2>
    <p>
      <strong>Sensoren definieren:</strong><br>
      Die Sensoren werden aus den Kalendereinträgen erstellt. Wähle für jeden Sensor die Farbe der Tonne aus. 
      Beachte: Jede Farbe darf nur einmal verwendet werden.
    </p>
    <p>
      <strong>Kopieroption:</strong><br>
      Klicke auf den Sensor-Namen, um ihn in die Zwischenablage zu kopieren.
    </p>
  </section>

  <section class="guide-section">
    <h2 class="section-title">4. Templates erstellen</h2>
    <p>
      <strong>Optionen festlegen:</strong><br>
      Entscheide, ob die Meldungen <em>"Keine Tonne rausstellen"</em> angezeigt werden sollen. 
      Aktiviere hierfür die Checkboxen für "Heute" und/oder "Morgen".
    </p>
    <p>
      <strong>Templates generieren:</strong><br>
      Die Templates für die Müllabholungen werden erstellt. Kopiere die YAML-Templates mithilfe der 
      <button class="highlight-button">Copy</button>-Buttons.
    </p>
  </section>

  <section class="guide-section">
    <h2 class="section-title">5. Dashboard-Karten</h2>
    <p>
      <strong>Vorbereitung:</strong><br>
      Stelle sicher, dass die <strong>"Custom Button Card"</strong> installiert ist und die Tonnenbilder im Ordner <code>www/muell</code> gespeichert sind.
    </p>
    <p>
      <strong>Kartenoptionen:</strong><br>
      Wähle Schriftarten, Darstellung und Animationseffekte. Passe den Stil der Karte optional an (z. B. Hintergrund, Rahmen).
    </p>
    <p>
      <strong>Code generieren:</strong><br>
      Klicke auf 
      <button class="highlight-button">Beispiel anzeigen & Code generieren</button>, um den YAML-Code und die Vorschaukarten zu erstellen.
    </p>
  </section>

  <footer class="guide-footer">
    <h2>Viel Erfolg bei der Einrichtung! 🎉</h2>
  </footer>
</div>

<style>
    body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    background-color: #f9f9f9;
    margin: 0;
    padding: 20px;
    }
    .guide-container {
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
    max-width: 800px;
    margin: auto;
    }
    .guide-title {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
    }
    .guide-section {
    margin-bottom: 20px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 15px;
    }
    .section-title {
    color: #4CAF50;
    font-size: 1.4em;
    margin-bottom: 10px;
    }
    p {
    margin: 10px 0;
    }
    .highlight-button {
    background: #4CAF50;
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    }
    .highlight-button:hover {
    background: #45a049;
    }
    code {
    background: #f4f4f4;
    padding: 2px 4px;
    border-radius: 4px;
    }
    .guide-footer {
    text-align: center;
    margin-top: 20px;
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
</style>

<script>
    function toggleDropdown() {
        var dropdownContent = document.getElementById("galleryDropdown");
        if (dropdownContent.style.display === "none") {
            dropdownContent.style.display = "block";
        } else {
            dropdownContent.style.display = "none";
        }
    }
</script>


