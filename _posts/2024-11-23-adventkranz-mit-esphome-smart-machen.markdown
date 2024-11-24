---
layout: post
title: "Adventkranz mit ESPHome smart machen"
date: 2024-11-23 08:03:24
categories: Dashboard
description: "Hier zeige ich, wie ich mit ESPHome und einem D1 Mini Microcontroller meinen Adventkranz smart gemacht habe"
image: /img/blog/smarter_Adventkranz/blog-post-smarter-adbentkranz.png
published: true
---

<head>
    <!-- Einbindung von Prism.js für Syntaxhervorhebung und Zeilennummern (helles Theme) -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-coy.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/line-numbers/prism-line-numbers.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/line-numbers/prism-line-numbers.min.js"></script>
</head>


<div style="text-align: center;">
    <img src="/img/blog/smarter_Adventkranz/blog-post-smarter-adbentkranz.png" alt="Titelbild" style="max-width: 60%; height: auto; border-radius: 10px; margin-bottom: 30px;">
</div>


<h2>Einen smarten Adventkranz bauen</h2>

<p>
    Da meine Frau und ich das Glück haben, bei zwei unglaublich süßen Katern wohnen zu dürfen, ist es leider nicht möglich, echte, brennende Kerzen in der Wohnung zu nutzen. 
    Da wir dennoch gerne zur Weihnachtszeit einen Adventkranz aufstellen und dieser natürlich leuchtende Kerzen haben soll, kam mir die Idee, einfach einen smarten Adventkranz zu bauen und diesen voll automatisiert zu gestalten.
</p>

<h3>Schritt 1. Verwendete Komponenten</h3>

<p>Was habe ich zum Bau des smarten Adventkranzes benötigt:</p>

<ol>
    <li>Einen künstlichen, optisch ansprechenden Kranz</li>
    <li>Vier batteriebetriebene Echtwachs-Kerzen</li>
    <li>Einen ESP32-Mikrocontroller</li>
    <li>Ein Netzteil und ein Micro-USB-Kabel</li>
    <li>Ein paar Klemmen und Draht</li>
</ol>

<p>
    Die meisten der Komponenten könnt ihr in meinem Amazon Shop ansehen und gerne kaufen.
</p>

<a href="https://amzn.to/4fK08yu" target="_blank" style="color: white; text-decoration: none;">
<button style="padding: 10px 20px; background-color: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">Link zum Shop</button>
</a>

<h3>Schritt 2. Zusammenbau</h3>

<p>
    Als alle Teile zuhause angekommen waren, habe ich mich daran gemacht, die Kerzen für den Anschluss an den Mikrocontroller vorzubereiten.
    Dazu habe ich seitlich ein kleines Loch gebohrt, welches direkt in die Batteriekammer führte. In dieses Loch habe ich zwei Drähte mit 0,5 mm (Farbe schwarz und grün) eingeführt und an die Batteriekontakte gelötet.
</p>

<div class="columns">
<div class="column is-6">
{% include image-modal.html ratio="is-4by3" link="/img/blog/smarter_Adventkranz/Batteriekammer_k.png" alt="Example image" large_link="/img/blog/smarter_Adventkranz/Batteriekammer.png" %}
</div>
</div>

<div class="columns">
<div class="column is-6">
{% include image-modal.html ratio="is-4by3" link="/img/blog/smarter_Adventkranz/ESP_Verdrahtung_k.png" alt="Example image" large_link="/img/blog/smarter_Adventkranz/ESP_Verdrahtung.png" %}
</div>
</div>

<div class="columns">
<div class="column is-6">
{% include image-modal.html ratio="is-4by3" link="/img/blog/smarter_Adventkranz/Platine_obern_k.png" alt="Example image" large_link="/img/blog/smarter_Adventkranz/Platine_obern.png" %}
</div>
</div>



<h3>ESPHome Programmierung</h3>

<div class="code-container">
    <button class="copy-button">Copy</button>
    <pre class="line-numbers"><code class="language-yaml">
# WICHTIG! Du musst card-mod installiert haben um den Stil der Karte zu ändern!

esphome:
name: adventkranz
friendly_name: Adventkranz

esp32:
board: wemos_d1_mini32
framework:
    type: arduino

# Enable logging
logger:

# Enable Home Assistant API
api:
encryption:
    key: "DEIN-ENCRYPTION-KEY"

ota:
- platform: esphome
    password: "DEIN-OTA-PASSWORT"

#Web server
web_server:
port: 80

# WIFI Einstellungen mit statischer IP
wifi:
ssid: !secret wifi_ssid
password: !secret wifi_password
manual_ip:
    static_ip: 192.168.50.211
    gateway: 192.168.50.1
    subnet: 255.255.255.0

# Enable fallback hotspot (captive portal) in case wifi connection fails
ap:
    ssid: "Adventkranz Fallback Hotspot"
    password: "DEIN PASSWORT"

captive_portal:


light:
- platform: binary
    name: "Kerze1"
    output: light_kerze1
- platform: binary
    name: "Kerze2"
    output: light_kerze2
- platform: binary
    name: "Kerze3"
    output: light_kerze3
- platform: binary
    name: "Kerze4"
    output: light_kerze4
- platform: binary
    name: "Kette"
    output: light_kette

output:
- id: light_kerze1
    platform: gpio
    pin: GPIO12
- id: light_kerze2
    platform: gpio
    pin: GPIO14
- id: light_kerze3
    platform: gpio
    pin: GPIO33
- id: light_kerze4
    platform: gpio
    pin: GPIO32
- id: light_kette
    platform: gpio
    pin: GPIO27
    </code></pre>
</div>

<h3>Helfer Template anlegen</h3>

<p>
    Name: Advent<br>
    Icon: mdi:pine-tree-variant-outline
</p>

<div class="code-container">
    <button class="copy-button">Copy</button>
    <pre class="line-numbers"><code class="language-yaml">
{% raw %}
{% set ADVENTKAL = states.calendar.advent.state %}
{%- if ADVENTKAL == 'off' %}
Kein Advent!
{%- elif ADVENTKAL == 'on' %}
{{ states.calendar.advent.attributes.message }}
{% else %}
FEHLER
{%- endif %}
{% endraw %}
    </code></pre>
</div>


<h3>Advent-Kalender Termine</h3>


<div style="text-align: center;">
    <label for="year-select" style="font-weight: bold; margin-bottom: 10px; display: block;">Jahr auswählen:</label>
    <select id="year-select" class="styled-select">
        <option value="all">Alle Jahre</option>
    </select>
</div>

<div id="event-table" class="styled-table-container" style="margin-top: 20px;"></div>


<div id="event-table" class="styled-table-container" style="margin-top: 20px;"></div>

<a href="/assets/calendar/advent_calendar.ics" download="Advent_Kalender.ics" class="download-button">
  📅 Advent-Kalender ICS herunterladen
</a>

<style>
    /* Allgemeines Styling für Dropdown-Menü */
    .styled-select {
        width: 200px;
        padding: 10px;
        font-size: 14px;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-bottom: 20px;
        text-align: center;
        background-color: #f9f9f9;
        cursor: pointer;
    }

    /* Tabellencontainer */
    .styled-table-container {
        margin: auto;
        width: 80%;
    }

    /* Tabellenstyling */
    table {
        width: 100%;
        border-collapse: collapse;
        font-family: Arial, sans-serif;
        margin: 20px 0;
    }

    th, td {
        text-align: left;
        padding: 10px;
    }

    th {
        background-color: #f4f4f4;
        font-weight: bold;
        border-bottom: 2px solid #ddd;
    }

    tr:nth-child(even) {
        background-color: #f9f9f9;
    }

    tr:hover {
        background-color: #f1f1f1;
    }

    td {
        border-bottom: 1px solid #ddd;
    }

    /* Download-Button */
    .download-button {
        display: inline-block;
        padding: 10px 20px;
        margin-top: 20px;
        font-size: 14px;
        text-decoration: none;
        color: #fff;
        background-color: #007bff;
        border-radius: 5px;
        text-align: center;
        cursor: pointer;
    }

    .download-button:hover {
        background-color: #0056b3;
    }
    .code-container {
        position: relative;
        background-color: #fdfdfd; /* Heller Hintergrund */
        border: 1px solid #ddd;
        border-radius: 5px;
        padding: 15px;
        margin-bottom: 20px;
        overflow: auto; /* Scrollbar hinzufügen */
        max-height: 300px; /* Maximale Höhe festlegen */
    }

    /* Stil für Code-Text */
    .code-container code {
        font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
        font-size: 0.95em;
        line-height: 1.5;
        color: #333; /* Dunklere Textfarbe für bessere Lesbarkeit */
    }

    /* Stil für den Copy-Button */
    .copy-button {
        position: absolute;
        top: 10px;
        right: 10px;
        background: #007acc;
        color: #fff;
        border: none;
        border-radius: 5px;
        padding: 5px 10px;
        font-size: 0.85em;
        cursor: pointer;
        z-index: 10;
    }

    /* Hover-Effekt für den Copy-Button */
    .copy-button:hover {
        background: #005a9c;
    }
</style>


<script>
    document.addEventListener("DOMContentLoaded", function () {
        const icsUrl = "/assets/calendar/advent_calendar.ics";
        const yearSelect = document.getElementById("year-select");
        const eventTableContainer = document.getElementById("event-table");

        let allEvents = []; // Speicher für alle geladenen Events

        // Funktion zum Erstellen der Tabelle
        function createTable(events) {
            eventTableContainer.innerHTML = ""; // Tabelle leeren
            const table = document.createElement("table");
            table.style.width = "100%";
            table.setAttribute("border", "1");

            const tableHeader = `
                <thead>
                    <tr>
                        <th>Terminname</th>
                        <th>Startdatum</th>
                        <th>Enddatum</th>
                    </tr>
                </thead>
            `;
            table.innerHTML = tableHeader;

            const tbody = document.createElement("tbody");

            // Zeilen für jedes Event erstellen
            events.forEach(event => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${event.title}</td>
                    <td>${event.start}</td>
                    <td>${event.end || "-"}</td>
                `;
                tbody.appendChild(row);
            });

            table.appendChild(tbody);
            eventTableContainer.appendChild(table);
        }

        // Funktion zum Filtern der Events nach Jahr
        function filterEventsByYear(year) {
            const filteredEvents = allEvents.filter(event => {
                const eventYear = new Date(event.start.split('.').reverse().join('-')).getFullYear();
                return year === "all" || eventYear === parseInt(year, 10);
            });
            createTable(filteredEvents);
        }

        // ICS-Datei laden und Events extrahieren
        fetch(icsUrl)
            .then(response => response.text())
            .then(data => {
                // ICS-Datei durchsuchen
                const eventRegex = /BEGIN:VEVENT[\s\S]*?END:VEVENT/g;
                const events = data.match(eventRegex) || [];

                // Events extrahieren
                allEvents = events.map(eventData => {
                    const titleMatch = eventData.match(/SUMMARY:(.+)/);
                    const startMatch = eventData.match(/DTSTART(?:;VALUE=DATE)?:(\d{4})(\d{2})(\d{2})/);
                    const endMatch = eventData.match(/DTEND(?:;VALUE=DATE)?:(\d{4})(\d{2})(\d{2})/);

                    return {
                        title: titleMatch ? titleMatch[1] : "Unbekannt",
                        start: startMatch ? `${startMatch[3]}.${startMatch[2]}.${startMatch[1]}` : "Unbekannt",
                        end: endMatch
                            ? new Date(`${endMatch[1]}-${endMatch[2]}-${endMatch[3]}`)
                                .toISOString()
                                .split("T")[0]
                                .split("-")
                                .reverse()
                                .join(".")
                            : null
                    };
                });

                // Dropdown mit "Dieses Jahr" und den nächsten 10 Jahren füllen
                const currentYear = new Date().getFullYear();
                const years = Array.from({ length: 11 }, (_, i) => currentYear + i);
                years.unshift("Dieses Jahr"); // "Dieses Jahr" als ersten Eintrag hinzufügen

                // Dropdown-Menü füllen
                years.forEach(year => {
                    const option = document.createElement("option");
                    option.value = year === "Dieses Jahr" ? currentYear : year;
                    option.textContent = year;
                    if (year === "Dieses Jahr") option.selected = true; // "Dieses Jahr" als Standardwert
                    yearSelect.appendChild(option);
                });

                // Tabelle basierend auf dem aktuellen Jahr anzeigen
                filterEventsByYear(currentYear);
            })
            .catch(error => console.error("Fehler beim Laden der ICS-Datei:", error));

        // Event-Listener für die Jahresauswahl
        yearSelect.addEventListener("change", function () {
            const selectedYear = this.value === "Dieses Jahr" ? new Date().getFullYear() : this.value;
            filterEventsByYear(selectedYear);
        });
    });
</script>


