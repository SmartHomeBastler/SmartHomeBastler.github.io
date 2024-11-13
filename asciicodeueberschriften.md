---
title: ASCII Art Code Überschriften
subtitle: Erstelle deine eigenen ASCII Art Überschriften
description: Um die Überschriften in deinem Code Editor besser aussehen zu lassen, ist der ASCII Art Text generator genau richtig.
show_sidebar: false
layout: page
---

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
    <input type="text" id="textInput" placeholder="Gib hier deinen Text ein" style="padding: 10px; width: 80%; max-width: 500px;">
    <br><br>
    <label for="fontSelect">Schriftart:</label>
    <select id="fontSelect" style="padding: 5px;">
        <option value="Standard">Standard</option>
        <option value="Banner">Banner</option>
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

<!-- FIGlet.js Bibliothek von einem CDN -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/figlet/1.2.4/figlet.min.js"></script>

<!-- JavaScript für die ASCII-Art-Generierung und Kopieren -->
<script>
function generateASCII() {
    const text = document.getElementById("textInput").value;
    const font = document.getElementById("fontSelect").value;

    figlet.text(text, { font: font }, function(err, result) {
        if (err) {
            console.log("Fehler:", err);
            return;
        }
        document.getElementById("asciiOutput").textContent = result;
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
</script>

<!-- Inline CSS für eine ansprechende Ansicht -->
<style>
body {
    font-family: Arial, sans-serif;
}
input, select, button {
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
