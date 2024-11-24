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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-coy.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/line-numbers/prism-line-numbers.min.css">
    <link href="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.4/main.min.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/line-numbers/prism-line-numbers.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.4/main.min.js"></script>
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
    // Code für den Copy-Button
    document.querySelectorAll('.copy-button').forEach((button) => {
        button.addEventListener('click', () => {
            const codeBlock = button.nextElementSibling.querySelector('code');
            const code = codeBlock.innerText;
            navigator.clipboard.writeText(code).then(() => {
                button.textContent = 'Copied!';
                setTimeout(() => {
                    button.textContent = 'Copy';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    });

    // Code für FullCalendar
    var calendarEl = document.getElementById('calendar');
    if (calendarEl) { // Sicherstellen, dass das Kalender-Element existiert
        var calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            locale: 'de', // Sprache auf Deutsch setzen
            events: '/assets/calendar/advent_calendar.ics', // Pfad zur ICS-Datei
            eventSourceSuccess: function(content) {
                console.log("ICS-Datei erfolgreich geladen.");
                return FullCalendar.parseICal(content); // ICS-Datei parsen
            },
            eventSourceFailure: function(error) {
                console.error("Fehler beim Laden der ICS-Datei: ", error);
            }
        });
        calendar.render();
    }
});

</script>