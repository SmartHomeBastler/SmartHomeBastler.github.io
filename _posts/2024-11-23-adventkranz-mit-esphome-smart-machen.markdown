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

<div id="calendar" style="max-width: 900px; margin: auto; margin-top: 20px;"></div>

<a href="/assets/calendar/advent_calendar.ics" download="Adventskalender.ics">
  📅 Adventskalender herunterladen
</a>

<script type="module">
    document.addEventListener("DOMContentLoaded", function () {
        var calendarEl = document.getElementById("calendar");

        if (calendarEl) {
            var calendar = new Calendar(calendarEl, {
                initialView: "dayGridMonth",
                locale: "de", // Sprache auf Deutsch setzen
                events: {
                    url: "https://<dein-benutzername>.github.io/assets/calendar/advent_calendar.ics", // URL zur ICS-Datei
                    format: "ics", // Format definieren
                },
            });
            calendar.render();
        }
    });
</script>

