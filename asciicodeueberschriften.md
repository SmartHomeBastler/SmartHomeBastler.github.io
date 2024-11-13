---
title: ASCII Art Code Überschriften
subtitle: Erstelle deine eigenen ASCII Art Überschriften
description: Um die Überschriften in deinem Code Editor besser aussehen zu lassen, ist der ASCII Art Text generator genau richtig.
show_sidebar: false
layout: page
---

<div style="text-align: center;">
    <h1>{{ page.title }}</h1>
    <p>{{ page.subtitle }}</p>
</div>

<!-- Eingabefeld und Auswahloptionen -->
<div style="text-align: center; margin: 20px;">
    <textarea id="textInput" placeholder="Gib hier deinen Text ein" style="padding: 10px; width: 80%; max-width: 500px; height: 100px;"></textarea>
    <br><br>
    <label for="fontSelect">Schriftart:</label>
    <select id="fontSelect" style="padding: 5px;">
        <option value="Banner" selected>Banner</option>
        <option value="Standard">Standard</option>
        <option value="Ghost">Ghost</option>
        <option value="Block">Block</option>
        <!-- Weitere Schriftarten können hinzugefügt werden -->
    </select>
    <button onclick="generateASCII()" style="margin-left: 10px; padding: 10px 20px;">Generieren</button>
</div>

<!-- Ausgabefeld und Kopier-Button -->
<div style="text-align: center; margin: 20px;">
    <pre id="asciiOutput" style="border: 1px solid #ccc; padding: 20px; background: #f4f4f4; text-align: left; white-space: pre-wrap; word-wrap: break-word;"></pre>
    <button onclick="copyToClipboard()" style="margin-top: 10px; padding: 10px 20px;">Kopieren</button>
</div>

<!-- Lokale figlet.js Bibliothek -->
<script src="{{ '/assets/js/figlet.js' | relative_url }}"></script>

<!-- JavaScript für die ASCII-Art-Generierung und Kopieren -->
<script>
figlet.defaults.fontPath = "/assets/js/fonts/";  // Setzt den Pfad zu den Schriftarten

function generateASCII() {
    const text = document.getElementById("textInput").value;
    const font = document.getElementById("fontSelect").value;
    const lines = text.split('\n');  // Teilt den Text in Zeilen auf

    let asciiArt = "";  // Zum Speichern der generierten ASCII-Art

    function generateLine(line, callback) {
        figlet.text(line, { font: font }, function(err, result) {
            if (err) {
                console.log("Fehler:", err);
                callback(err);
                return;
            }
            asciiArt += result + "\n";  // Füge die generierte Zeile zur ASCII-Art hinzu
            callback();
        });
    }

    function generateAllLines(i) {
        if (i < lines.length) {
            generateLine(lines[i], function(err) {
                if (!err) {
                    generateAllLines(i + 1);
                } else {
                    console.log("Fehler beim Generieren der ASCII-Art");
                }
            });
        } else {
            document.getElementById("asciiOutput").textContent = asciiArt;
        }
    }

    generateAllLines(0);  // Startet die rekursive Generierung
}

function copyToClipboard() {
    const asciiOutput = document.getElementById("asciiOutput").textContent;
    navigator.clipboard.writeText(asciiOutput).then(() => {
        alert("Text kopiert!");
    }).catch(err => {
        console.log("Kopierfehler:", err);
    });
}

// Testen, ob figlet.js geladen wurde
console.log(typeof figlet);  // Sollte "object" anzeigen, wenn die Bibliothek korrekt geladen wurde
</script>

<!-- Inline CSS für eine ansprechende Ansicht -->
<style>
body {
    font-family: Arial, sans-serif;
}
textarea, select, button {
    font-size: 16px;
}
#asciiOutput {
    font-family: monospace;
    font-size: 14px;
    line-height: 1.2;
    overflow-x: auto;
    max-height: 300px;
    white-space: pre;
}
button {
    background-color: #0073e6;
    color: white;
    border: none;
    cursor: pointer;
}
button:hover {
    background-color: #005bb5;
}
</style>
