---
title: ASCII Art Code Überschriften
subtitle: Erstelle deine eigenen ASCII Art Überschriften
description: Um die Überschriften in deinem Code Editor besser aussehen zu lassen, ist der ASCII Art Text generator genau richtig.
show_sidebar: false
layout: page
---

<div style="text-align: center; max-width: 800px; margin: auto;">
    <p style="font-size: 1.2em;">Gib den Text ein, wähle eine Schriftart und die Buchstabenbreite, um eine ASCII-Art-Überschrift zu erstellen. Drücke "Generieren", um den Text anzuzeigen, oder "Test All", um alle Schriftarten auf einmal anzuzeigen.</p>
</div>

<!-- Eingabefeld und Auswahloptionen in einer Zeile -->
<div style="display: flex; justify-content: center; align-items: center; margin: 20px 0;">
    <textarea id="textInput" placeholder="Gib hier deinen Text ein" style="padding: 10px; width: 40%; max-width: 300px; height: 80px; resize: vertical;"></textarea>
    
    <label for="fontSelect" style="margin-left: 15px;">Schriftart:</label>
    <select id="fontSelect" style="padding: 5px; margin-left: 5px;">
        <option value="Banner" selected>Banner</option>
        <option value="Banner3">Banner3</option>
        <option value="Big">Big</option>
        <option value="Colossal">Colossal</option>
        <option value="Doom">Doom</option>
        <option value="Slant">Slant</option>
        <option value="Small">Small</option>
        <option value="Standard">Standard</option>
    </select>
    
    <label for="widthSelect" style="margin-left: 15px;">Buchstaben Breite:</label>
    <select id="widthSelect" style="padding: 5px; margin-left: 5px;">
        <option value="default" selected>Default</option>
        <option value="full">Full</option>
        <option value="fitted">Fitted</option>
        <option value="smushR">Smush (R)</option>
        <option value="smushU">Smush (U)</option>
    </select>
</div>

<!-- Buttons für Generieren und Test All -->
<div style="text-align: center; margin-bottom: 20px;">
    <button onclick="generateASCII()" style="padding: 10px 20px; margin-right: 10px;">Generieren</button>
    <button onclick="testAllFonts()" style="padding: 10px 20px; margin-right: 10px;">Test All</button>
    <button onclick="copyToClipboard()" style="padding: 10px 20px;">Kopieren</button>
</div>

<!-- Ausgabefeld -->
<div style="text-align: center; margin: 20px;">
    <pre id="asciiOutput" style="border: 1px solid #ccc; padding: 20px; background: #f4f4f4; font-family: monospace; font-size: 14px; white-space: pre-wrap; overflow-wrap: break-word;"></pre>
</div>

<!-- Lokale figlet.js Bibliothek -->
<script src="{{ '/assets/js/figlet.js' | relative_url }}"></script>

<!-- JavaScript für die ASCII-Art-Generierung und Kopieren -->
<script>
figlet.defaults.fontPath = "/assets/js/fonts/";  // Setzt den Pfad zu den Schriftarten

function generateASCII() {
    const text = document.getElementById("textInput").value;
    const font = document.getElementById("fontSelect").value;
    const width = document.getElementById("widthSelect").value;
    const lines = text.split('\n');  // Teilt den Text in Zeilen auf

    let asciiArt = "";  // Zum Speichern der generierten ASCII-Art

    function generateLine(line, callback) {
        figlet.text(line, { font: font, horizontalLayout: width }, function(err, result) {
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

function testAllFonts() {
    const text = document.getElementById("textInput").value;
    const fonts = ["Banner", "Banner3", "Big", "Colossal", "Doom", "Slant", "Small", "Standard"];
    let output = "";

    fonts.forEach((font) => {
        figlet.text(text, { font: font }, function(err, result) {
            if (err) {
                console.log("Fehler:", err);
                return;
            }
            output += `\n--- ${font} ---\n${result}\n`;
            document.getElementById("asciiOutput").textContent = output;
        });
    });
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
    font-size: 14px;
    line-height: 1.2;
    overflow-x: auto;
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
