---
layout: post
title: "Adventkranz mit ESPHome smart machen"
date: 2024-11-23 08:03:24
categories: Dashboard
description: "Hier zeige ich, wie ich mit ESPHome und einem D1 Mini Microcontroller meinen Adventkranz smart gemacht habe"
image: /img/blog/smarter_Adventkranz/blog-post-smarter-adbentkranz.png
published: true
---

<div style="text-align: center;">
    <img src="/img/blog/smarter_Adventkranz/blog-post-smarter-adbentkranz.png" alt="Titelbild" style="max-width: 60%; height: auto; border-radius: 10px; margin-bottom: 30px;">
</div>

<!-- Dropdown-Menü für die Jahresauswahl -->
<div style="margin-bottom: 20px; text-align: center;">
    <label for="year-select">Jahr auswählen: </label>
    <select id="year-select">
        <option value="all">Alle Jahre</option>
    </select>
</div>

<div id="event-table" style="margin: 20px 0;"></div>

<a href="/assets/calendar/advent_calendar.ics" download="Adventskalender.ics">
  📅 Adventskalender herunterladen
</a>

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
                        end: endMatch ? `${endMatch[3]}.${endMatch[2]}.${endMatch[1]}` : null
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
            filterEventsByYear(this.value === "Dieses Jahr" ? new Date().getFullYear() : this.value);
        });
    });
</script>

