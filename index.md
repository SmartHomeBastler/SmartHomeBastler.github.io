---
title: Smart Home bastler
subtitle: Schritt für Schritt ins smarte Zuhause!
layout: page
show_sidebar: true
---

# Herzlich willkommen auf meiner Home Assistant Code Website

Auf dieser Website dreht sich alles um Code-Snippets, Codegeneratoren und Code-Vorlagen für die Einrichtung, die Erweiterung und das Design von Home Assistant.
Viel Spaß beim Schmökern, Testen und Designen.

Beste Grüße, Maxx

# Einladung zum Home Assistant-Treffen in Linz 2024.11

<div style="display: flex; justify-content: center; align-items: center; background-color: black; padding: 20px; color: orange; font-family: 'Digital', sans-serif;">
    <div style="text-align: center; margin: 0 10px;">
        <div id="days" style="font-size: 64px;">00</div>
        <div style="font-size: 20px;">Tage</div>
    </div>
    <div style="text-align: center; margin: 0 10px;">
        <div id="hours" style="font-size: 64px;">00</div>
        <div style="font-size: 20px;">Stunden</div>
    </div>
    <div style="text-align: center; margin: 0 10px;">
        <div id="minutes" style="font-size: 64px;">00</div>
        <div style="font-size: 20px;">Minuten</div>
    </div>
</div>

<script>
    // Set the date we're counting down to
    var countDownDate = new Date("2024-11-14T18:00:00").getTime(); // Change this date to your target date

    // Update the count down every 1 second
    var x = setInterval(function() {
        // Get today's date and time
        var now = new Date().getTime();
        
        // Find the distance between now and the countdown date
        var distance = countDownDate - now;
        
        // Time calculations for days, hours and minutes
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        
        // Output the result in the elements with respective IDs
        document.getElementById("days").innerHTML = days;
        document.getElementById("hours").innerHTML = hours;
        document.getElementById("minutes").innerHTML = minutes;

        // If the countdown is over, write some text 
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("countdown").innerHTML = "EXPIRED";
        }
    }, 1000);
</script>

<!-- Add a link to a digital font, or you can use a font from Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@700&display=swap" rel="stylesheet">
