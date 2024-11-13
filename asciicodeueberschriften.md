---
title: ASCII Art Code Überschriften
subtitle: Erstelle deine eigenen ASCII Art Überschriften
description: Um die Überschriften in deinem Code Editor besser aussehen zu lassen, ist der ASCII Art Text generator genau richtig.
show_sidebar: false
layout: page
---

<div style="text-align: center; max-width: 800px; margin: auto;">
    <p style="font-size: 1.2em; margin-bottom: 20px;">
        Gib den Text ein, wähle eine Schriftart und die Buchstabenbreite, um eine ASCII-Art-Überschrift zu erstellen. Drücke "Generieren", um den Text anzuzeigen, oder "Test All", um alle Schriftarten auf einmal anzuzeigen.
    </p>
</div>

<!-- Eingabefeld und Auswahloptionen im Formular-Design -->
<div class="custom-form-group" style="display: flex; justify-content: center; align-items: flex-start; gap: 20px;">
    <textarea id="textInput" placeholder="Gib hier deinen Text ein" style="padding: 10px; width: 60%; max-width: 400px; height: 120px; resize: vertical; border: 1px solid #ddd; border-radius: 5px;"></textarea>
    
    <div style="display: flex; flex-direction: column; gap: 10px; width: 30%;">
        <div class="custom-form-group">
            <label for="fontSelect">Schriftart:</label>
            <select id="fontSelect" style="width: 100%; padding: 8px; font-size: 14px; border: 1px solid #ddd; border-radius: 5px;">
                <option value="Banner" selected>Banner</option>
                <option value="Banner3">Banner3</option>
                <option value="Big">Big</option>
                <option value="Colossal">Colossal</option>
                <option value="Doom">Doom</option>
                <option value="Slant">Slant</option>
                <option value="Small">Small</option>
                <option value="Standard">Standard</option>
            </select>
        </div>
        <div class="custom-form-group">
            <label for="widthSelect">Buchstaben Breite:</label>
            <select id="widthSelect" style="width: 100%; padding: 8px; font-size: 14px; border: 1px solid #ddd; border-radius: 5px;">
                <option value="default" selected>Default</option>
                <option value="full">Full</option>
                <option value="fitted">Fitted</option>
                <option value="smushR">Smush (R)</option>
                <option value="smushU">Smush (U)</option>
            </select>
        </div>
    </div>
</div>

<!-- Buttons für Generieren, Test All und Kopieren -->
<div class="custom-button-container" style="text-align: center;">
    <button onclick="generateASCII()" class="custom-button generate">Generieren</button>
    <button onclick="testAllFonts()" class="custom-button copy">Test All</button>
    <button onclick="copyToClipboard()" class="custom-button remove">Kopieren</button>
</div>

<!-- Ausgabefeld -->
<div style="text-align: center; margin: 20px;">
    <pre id="asciiOutput" class="yaml-output" style="width: 100%; padding: 10px; font-size: 14px; border: 1px solid #ddd; border-radius: 5px; background-color: #f8f8f8;"></pre>
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
/* Formulargestaltung */
.custom-form-group {
    margin-bottom: 15px;
}
.custom-form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}

/* Buttons für Generieren, Test All und Kopieren */
.custom-button-container {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
}
.custom-button {
    padding: 10px 15px;
    font-size: 14px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: #fff;
}
.custom-button.generate {
    background-color: #007bff;
}
.custom-button.copy {
    background-color: #17a2b8;
}
.custom-button.remove {
    background-color: #ffc107;
    color: #000;
}

/* YAML-Ausgabe Styling */
#asciiOutput {
    width: 100%;
    margin-top: 20px;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f8f8f8;
}
</style>
