---
layout: post
title: "Tageslicht am Floorplan in Homeassistant 2026"
date: 2026-04-28 04:06:00
categories: Dashboard
tags: [Floorplan, Homeassistant, Tageslihct, Bewölkung, ]
description: "Wie man am Floorplan ein Tageslicht Overlay einrichtet und die Helligkeit Sensorsteuert, zeige ich hier"
image: /img/blog/floorplan_tageslicht/blog-post-tageslicht-am-floorplan.png
published: true
---
<div class="post-content">
<p>
    Ich wollte meine Tageslicht Ansicht auf meinem Dashboard wetterbedingt und Tageszeitabhängig angezeigt bekommen. Um das zu erreichen habe ich mir zwei Sensoren zur Berechnung und ein Overlay Bild zur Darstellung erstellt. In diesem Beitrag möchte ich Euch Schritt für Schritt zeigen was man dazu alles benötigt und wie ich das erstellt habe.
</p>

<h3>Tageslicht Ansicht erstellen</h3>

<p>
    Beginnen wir damit, das Tageslicht Bild in Sweet Home 3D zu erstellen. 
</p>

<p>
    Wir öffnen unseren Flurplan in Sweet Home 3D, deaktivieren alle Beleuchtungen und klicken auf das Fotosymbol .
</p>

<p>
    Nun müssen wir dieselben Einstellungen verwenden, die wir auch bei unserem Floorplan benutzt haben, abgesehen von der Helligkeit. Hier wähle ich eine Uhrzeit aus, welche in etwa um die Mittagszeit, in meinem Fall 13:00 Uhr angezeigt wird.
</p>

<p>
    Wenn diese Einstellungen abgeschlossen sind, gehe ich auf Foto erstellen. 
</p>

<div class="columns is-centered">
<div class="column is-5">
{% include image-modal.html ratio="is-4by3" link="/img/blog/floorplan_tageslicht/SH3D_Tageslicht_1_k.png" alt="Example image" large_link="/img/blog/floorplan_tageslicht/SH3D_Tageslicht_1.png" %}
</div>
</div>

<div class="columns is-centered">
<div class="column is-5">
{% include image-modal.html ratio="is-4by3" link="/img/blog/floorplan_tageslicht/0034_Tageslicht_hell-768x384.png" alt="Example image" large_link="/img/blog/floorplan_tageslicht/0034_Tageslicht_hell-1024x512.png" %}
</div>
</div>








</div>



<style>
    .tageslicht-container {
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        border: 1px solid #444; /* Dunkler Rand für das Theme */
        border-radius: 8px;
        background-color: #333; /* Dunkler Hintergrund */
        color: #eee; /* Helle Schriftfarbe */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Schatten für etwas Tiefe */
    }
    .tageslicht-container h2 {
        text-align: center;
        color: #ddd; /* Helle Farbe für Überschrift */
    }
    .tageslicht-container p {
        line-height: 1.6;
        margin-top: 15px;
        color: #ccc; /* Helle Farbe für normalen Text */
        text-align: center;
    }
    .tageslicht-container ul {
        line-height: 1.6;
        margin: 15px 0;
        padding-left: 20px;
        color: #bbb; /* Helle Farbe für Listenelemente */
    }
    .tageslicht-container ul li {
        margin-top: 10px;
    }
    .tageslicht-container ul li ul {
        margin-top: 5px;
        list-style-type: disc;
        padding-left: 20px;
    }
    .tageslicht-container ul li ul li {
        margin-top: 5px;
    }
    .tageslicht-container strong {
        color: #fff; /* Helle Farbe für hervorgehobenen Text */
    }
</style>
