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
            if (year === "all") {
                createTable(allEvents); // Alle Events anzeigen
            } else {
                const filteredEvents = allEvents.filter(event => {
                    const eventYear = new Date(event.start).getFullYear();
                    return eventYear === parseInt(year, 10);
                });
                createTable(filteredEvents);
            }
        }

        // ICS-Datei laden und Events extrahieren
        fetch(icsUrl)
            .then(response => response.text())
            .then(data => {
                const jcalData = ICAL.parse(data);
                const comp = new ICAL.Component(jcalData);
                const vevents = comp.getAllSubcomponents("vevent");

                // Alle Events speichern
                allEvents = vevents.map(vevent => {
                    const event = new ICAL.Event(vevent);
                    return {
                        title: event.summary,
                        start: event.startDate.toJSDate().toLocaleDateString("de-DE"),
                        end: event.endDate ? event.endDate.toJSDate().toLocaleDateString("de-DE") : null
                    };
                });

                // Jahre für die Auswahl extrahieren
                const years = Array.from(new Set(allEvents.map(event => {
                    return new Date(event.start).getFullYear();
                }))).sort();

                // Dropdown-Menü füllen
                years.forEach(year => {
                    const option = document.createElement("option");
                    option.value = year;
                    option.textContent = year;
                    yearSelect.appendChild(option);
                });

                // Initiale Tabelle mit allen Events erstellen
                createTable(allEvents);
            })
            .catch(error => console.error("Fehler beim Laden der ICS-Datei:", error));

        // Event-Listener für die Jahresauswahl
        yearSelect.addEventListener("change", function () {
            filterEventsByYear(this.value);
        });
    });
</script>
