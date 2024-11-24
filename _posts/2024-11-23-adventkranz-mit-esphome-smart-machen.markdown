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
<link href="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.4/main.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.4/main.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@fullcalendar/icalendar@6.1.4/index.global.min.js"></script>

</head>

<div style="text-align: center;">
    <img src="/img/blog/smarter_Adventkranz/blog-post-smarter-adbentkranz.png" alt="Titelbild" style="max-width: 60%; height: auto;height: auto; border-radius: 10px; margin-bottom: 30px;">
</div>

<div id="calendar" style="max-width: 900px; margin: auto; margin-top: 20px;"></div>

<a href="/assets/calendar/advent_calendar.ics" download="Adventskalender.ics">
  📅 Adventskalender herunterladen
</a>



<style>
    /* Hintergrundfarbe und Rahmen für den Code-Container */
    .code-container {
        position: relative;
        background-color: #fdfdfd; /* Heller Hintergrund */
        border: 1px solid #ddd;
        border-radius: 5px;
        padding: 15px;
        margin-bottom: 20px;
        overflow: hidden;
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
document.addEventListener("DOMContentLoaded", function() {
    var calendarEl = document.getElementById("calendar");

    if (calendarEl) { // Sicherstellen, dass das Kalender-Element existiert
        var calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: "dayGridMonth",
            locale: "de", // Sprache auf Deutsch setzen
            plugins: [ 'iCalendar' ], // icalendar Plugin einfügen
            events: {
                url: "/assets/calendar/advent_calendar.ics", // Pfad zur ICS-Datei
                format: "ics"
            }
        });
        calendar.render();
    }
});
</script>