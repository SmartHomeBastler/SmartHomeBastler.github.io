---
title: Müllerinnerungs Codegenerator Beschreibung
subtitle: Hier erfährst du alles über die Handhabung der Müllerinnerungs Codegeneratoren
description: Details und Infos zu den Müllerinnerungs Codegeneratoren
show_sidebar: false
layout: page 
---

{% include support_note.html %}



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
      Die Kalendereinträge werden geladen und angezeigt.
    </p>
  </section>

  <section class="guide-section">
    <h2 class="section-title">2. Kalenderdaten umwandeln</h2>
    <p>
      <strong>Einträge prüfen und anpassen:</strong><br>
      Wähle die Einträge aus, die du als Sensor nutzen möchtest, und passe die Bezeichnungen an. 
      Achte darauf, keine Umlaute oder Leerzeichen zu verwenden.
    </p>
    <p>
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
      <strong>Integration installieren:</strong><br>
      Nun sollte die "Waste Collection Schedule" Integration installiert werden.<br>
      Eine Anleitung, wie genau das funktioniert, findest du im 🔽 Dropdown Menü 🔽
    </p>
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
    <p>
      <strong>Sensoren definieren:</strong><br>
      Die Sensoren werden aus den Kalendereinträgen erstellt. Wähle für jeden Sensor die Farbe der Tonne aus. 
      Beachte: Jede Farbe darf nur einmal verwendet werden.
    </p>
    <p>
      <strong>Kopieroption:</strong><br>
      Klicke auf den Sensor-Namen, um ihn in die Zwischenablage zu kopieren.<br> 
      Kopiere dir die Werte Templates und lege die Sensoren in der WCS Integration an.
      Wenn alle Sensoren angelegt sind, klicke auf <button class="highlight-button">Sensoren angelegt? Weiter zu den Templates!</button>.
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
      Um die Templates zu generieren, klicke auf <button class="highlight-button">Templates erstellen</button>.<br>
      Die Templates für die Müllabholungen werden erstellt. Kopiere die Überschriften mit einem Klick darauf und die YAML-Templates mithilfe der 
      <button class="highlight-button">Copy</button>-Buttons.
    </p>
    <p>
      <strong>Helfer Templates anlegen</strong><br>
      Gehe in Home Assistant auf <strong>Einstellungen</strong> - <strong>Geräte&Dienste</strong> - <strong>Helfer</strong><br>
      Lege dort die 4 Helfer Templates an. Eine detaillierte Beschreibung findest du im 🔽 Dropdown Menü 🔽.
    </p>
    <p>
      Wenn die Templates angelegt sind, klicke auf <button class="highlight-button">Templates angelegt? Weiter zu den Dashboard-Karten</button>.<br>  
    </p>
  </section>

  <section class="guide-section">
    <h2 class="section-title">5. Dashboard-Karten</h2>
    <p>
      <strong>Vorbereitung:</strong><br>
      Stelle sicher, dass die <strong>"Custom Button Card"</strong> installiert ist und die Tonnenbilder im Ordner <code>www/muell</code> gespeichert sind.<br>
      Die Bilder der einzelnen Tonnen, kannst du dir mit einem Klick auf das Vorschaubild herunterladen.
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
    <p>
      <strong>Karte am Dashboard einfügen</strong><br>
      Kopiere dir den YAML-Code und gehe in Home Assistant auf dein Dashboard.<br>
      Erstelle eine neue Karte und suche nach <strong>Manuell</strong>. Nun füge den kopierten Code ein und klicke auf Speichern.
    </p>
  </section>

  <footer class="guide-footer">
    <h2>Viel Erfolg bei der Einrichtung! 🎉</h2>
  </footer>

<div style="text-align: center;">
    <a href="https://www.amazon.de/dp/B0CK2FCG1K?tag=smarthomebast-21&amp;linkCode=ogi&amp;th=1&amp;psc=1" target="_blank">
        <img src="https://m.media-amazon.com/images/I/81eJ9jIot+L._AC_SL1500_.jpg" alt="Raspberry Pi 5 8 GB" style="max-width: 300px;">
        <p>Raspberry Pi 5 8 GB auf Amazon ansehen</p>
    </a>
</div>
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
    max-width: 100%;
    margin: auto;
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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


