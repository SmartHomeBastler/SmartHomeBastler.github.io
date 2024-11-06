---
title: Smart Home Bastler
subtitle: Schritt für Schritt ins smarte Zuhause!
layout: page
show_sidebar: true
---

# Herzlich willkommen auf meiner Home Assistant Code Website

Auf dieser Website dreht sich alles um Code-Snippets, Codegeneratoren und Code-Vorlagen für die Einrichtung, die Erweiterung und das Design von Home Assistant.
Viel Spaß beim Schmökern, Testen und Designen.

Beste Grüße, Maxx

# Einladung zum 2024.11 Home Assistant-Treffen 
# in Linz am 14.11.2024 18:00Uhr

<div style="display: flex; justify-content: center; align-items: center; padding: 20px;">
    <div style="flex: 1; background-color: black; padding: 20px; margin: 0 5px; text-align: center; color: orange; font-family: 'Digital', sans-serif;">
        <div id="days" style="font-size: 64px;">00</div>
        <div style="font-size: 20px;">Tage</div>
    </div>
    <div style="flex: 1; background-color: black; padding: 20px; margin: 0 5px; text-align: center; color: orange; font-family: 'Digital', sans-serif;">
        <div id="hours" style="font-size: 64px;">00</div>
        <div style="font-size: 20px;">Stunden</div>
    </div>
    <div style="flex: 1; background-color: black; padding: 20px; margin: 0 5px; text-align: center; color: orange; font-family: 'Digital', sans-serif;">
        <div id="minutes" style="font-size: 64px;">00</div>
        <div style="font-size: 20px;">Minuten</div>
    </div>
</div>

## Liebe Home Assistant-Enthusiasten,

ich möchte mich herzlich für eure Teilnahme am letzten Treffen 2024.10 bedanken. Eure rege Beteiligung und die inspirierenden Gespräche haben dazu beigetragen, dass unsere Community weiter gewachsen ist. Vielen Dank für euer Engagement!

Ich freue mich, euch bereits zum nächsten Treffen einzuladen. Bitte notiert euch den Termin für das 2024.11 – Home Assistant Treffen:

**Termin:** Donnerstag, 14. November 2024 Uhrzeit: 18:00 Uhr

**Ort:**
Gemeinschaftszentrum Auweisen  
Wüstenrotplatz 2  
4030 Linz Auweisen  

**WIFI und Strom vorhanden**

### Karte

<div style="padding: 20px; text-align: center;">
    <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2632.9284990559843!2d14.313016515691857!3d48.23909097924521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476ecb86e57477f3%3A0xd49114de5109cd3b!2sW%C3%BCstenrotplatz%202%2C%204030%20Linz%20Auweisen!5e0!3m2!1sen!2sat!4v1699256728777!5m2!1sen!2sat" 
        width="600" 
        height="450" 
        style="border:0;" 
        allowfullscreen="" 
        loading="lazy">
    </iframe>
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
