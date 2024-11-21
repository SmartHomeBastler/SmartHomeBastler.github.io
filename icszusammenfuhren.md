---
title: ICS Code Generator
subtitle: ICS-Dateien hochladen oder von URL abrufen
description: Lade ICS-Dateien hoch oder rufe sie von einer URL ab, um sie zu bearbeiten oder zusammenzuführen.
show_sidebar: false
layout: page
---
<div class="ics-guide">
    <h1 class="ics-title">ICS Code Generator</h1>
    <h2 class="ics-subtitle">ICS-Dateien hochladen oder von URL abrufen</h2>
    <p class="ics-description">
        Lade eine oder mehrere ICS-Dateien hoch oder gib die URL einer ICS-Datei an, um sie zu bearbeiten oder zusammenzuführen.
    </p>
    <section class="ics-step">
        <h3>1. ICS-Dateien hochladen oder URL verwenden</h3>
        <p>
            Wähle entweder eine <code>.ics</code>-Datei aus oder gib die URL einer Datei an. Du kannst auch mehrere Dateien hochladen, um sie zusammenzuführen.
        </p>
        <div class="ics-input-section">
            <div class="ics-url-input">
                <label for="ics-url">ICS URL (optional):</label>
                <input type="text" id="ics-url" placeholder="Gib die URL einer ICS-Datei ein">
                <button class="ics-button" onclick="fetchICSFromURL()">Kalender von URL laden</button>
            </div>
            <form class="ics-file-upload">
                <div class="ics-file-group">
                    <label for="file1">ICS Datei 1 (erforderlich, wenn keine URL):</label>
                    <input type="file" id="file1" accept=".ics">
                </div>
                <div class="ics-file-group">
                    <label for="file2">ICS Datei 2 (optional):</label>
                    <input type="file" id="file2" accept=".ics">
                </div>
                <div class="ics-file-group">
                    <label for="file3">ICS Datei 3 (optional):</label>
                    <input type="file" id="file3" accept=".ics">
                </div>
                <div class="ics-file-group">
                    <label for="file4">ICS Datei 4 (optional):</label>
                    <input type="file" id="file4" accept=".ics">
                </div>
                <div class="ics-file-group">
                    <label for="file5">ICS Datei 5 (optional):</label>
                    <input type="file" id="file5" accept=".ics">
                </div>
                <div class="ics-file-group">
                    <label for="file6">ICS Datei 6 (optional):</label>
                    <input type="file" id="file6" accept=".ics">
                </div>
                <button type="button" class="ics-button" onclick="mergeICSFiles()">ICS Datei(en) verarbeiten</button>
            </form>
        </div>
    </section>
    <section class="ics-step">
        <h3>2. Zusammengeführte ICS-Datei bearbeiten</h3>
        <p>
            Die verarbeiteten Inhalte der ICS-Dateien werden hier angezeigt. Du kannst sie überprüfen und die Daten in die Zwischenablage kopieren.
        </p>
        <textarea id="output" rows="20" readonly></textarea>
        <br>
        <button class="ics-button" onclick="copyToClipboard()">In Zwischenablage kopieren</button>
    </section>
    <section class="ics-step">
        <h3>3. ICS-Datei herunterladen</h3>
        <p>
            Nach der Verarbeitung kannst du die zusammengeführte ICS-Datei hier herunterladen:
        </p>
        <button class="ics-button" onclick="downloadICSFile()">ICS-Datei herunterladen</button>
    </section>
    <section class="ics-step">
        <h3>2. Zusammengeführte ICS-Datei bearbeiten</h3>
        <p>
            Die verarbeiteten Inhalte der ICS-Dateien werden hier angezeigt. Du kannst sie überprüfen und die Daten in die Zwischenablage kopieren.
        </p>
        <textarea id="output" rows="20" readonly></textarea>
        <br>
        <button class="ics-button" onclick="copyToClipboard()">In Zwischenablage kopieren</button>
        <button class="ics-button" onclick="editEntries()">Einträge bearbeiten</button>
    </section>
    <section class="ics-step" id="edit-section" style="display: none;">
        <h3>Bearbeite die Einträge</h3>
        <div id="entry-table-wrapper">
            <table id="entry-table">
                <thead>
                    <tr>
                        <th>Auswählen</th>
                        <th>Eintrag</th>
                        <th>Eigene Bezeichnung</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Einträge werden hier eingefügt -->
                </tbody>
            </table>
        </div>
        <button class="ics-button" onclick="saveEditedEntries()">Bearbeitete Einträge speichern</button>
    </section>
    <section class="ics-step" id="edited-output-section" style="display: none;">
        <h3>Fertige bearbeitete ICS-Datei</h3>
        <textarea id="edited-output" rows="20" readonly></textarea>
        <br>
        <button class="ics-button" onclick="copyEditedToClipboard()">In Zwischenablage kopieren</button>
    </section>

    <footer class="ics-footer">
        <h4>Viel Erfolg! 🎉</h4>
        <p>Mit dem ICS Code Generator kannst du deine Kalender schnell und einfach bearbeiten.</p>
    </footer>
</div>

<style>
    .ics-guide {
        max-width: 100%;
        margin: auto;
        padding: 20px;
        background-color: #f9f9f9;
        font-family: Arial, sans-serif;
        line-height: 1.6;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .ics-title {
        text-align: center;
        color: #333;
        font-size: 2em;
        margin-bottom: 10px;
    }
    .ics-subtitle {
        text-align: center;
        color: #666;
        font-size: 1.4em;
        margin-bottom: 20px;
    }
    .ics-description {
        text-align: center;
        color: #555;
        margin-bottom: 20px;
    }
    .ics-step {
        margin-bottom: 20px;
    }
    .ics-step h3 {
        color: #4CAF50;
        font-size: 1.2em;
        margin-bottom: 10px;
    }
    .ics-input-section {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    .ics-url-input,
    .ics-file-upload {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .ics-url-input label,
    .ics-file-upload label {
        font-weight: bold;
        margin-bottom: 5px;
    }
    .ics-url-input input,
    .ics-file-upload input {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    .ics-file-group {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    .ics-button {
        padding: 10px 15px;
        background-color: #4CAF50;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1em;
        align-self: flex-start;
    }
    .ics-button:hover {
        background-color: #45a049;
    }
    textarea {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        resize: vertical;
    }
    .ics-footer {
        text-align: center;
        margin-top: 20px;
    }
    .ics-footer h4 {
        color: #333;
    }
    .ics-footer p {
        color: #777;
    }
    #entry-table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
    }
    
    #entry-table th, #entry-table td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }
    
    #entry-table th {
        background-color: #4CAF50;
        color: white;
    }
</style>

<script>
    function fetchICSFromURL() {
        const url = document.getElementById('ics-url').value;

        if (!url) {
            alert("Bitte eine gültige URL eingeben.");
            return;
        }

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Netzwerkfehler oder ungültige URL.");
                }
                return response.text();
            })
            .then(data => {
                document.getElementById('output').value = data;
            })
            .catch(error => {
                console.error("Fehler beim Abrufen der ICS-Datei:", error);
                alert("Fehler beim Abrufen der ICS-Datei. Überprüfen Sie die URL.");
            });
    }

    function mergeICSFiles() {
        const files = [
            document.getElementById('file1').files[0],
            document.getElementById('file2').files[0],
            document.getElementById('file3').files[0],
            document.getElementById('file4').files[0],
            document.getElementById('file5').files[0],
            document.getElementById('file6').files[0],
        ];

        const validFiles = files.filter(file => file);

        if (validFiles.length === 0) {
            alert("Bitte mindestens eine ICS-Datei hochladen.");
            return;
        }

        const readers = validFiles.map(file => {
            const reader = new FileReader();
            reader.readAsText(file);
            return reader;
        });

        Promise.all(
            readers.map(
                reader =>
                    new Promise(resolve => {
                        reader.onload = () => resolve(reader.result);
                    })
            )
        ).then(results => {
            document.getElementById('output').value = results.join('\n');
        });
    }

    function copyToClipboard() {
        const output = document.getElementById('output');
        output.select();
        document.execCommand('copy');
        alert('ICS-Datei in die Zwischenablage kopiert!');
    }
    function downloadICSFile() {
        const output = document.getElementById('output').value;

        if (!output) {
            alert("Keine ICS-Daten verfügbar. Bitte eine Datei hochladen oder von einer URL laden und verarbeiten.");
            return;
        }

        const blob = new Blob([output], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);

        // Erstelle einen temporären Link
        const link = document.createElement('a');
        link.href = url;
        link.download = 'zusammengefuehrte_kalender.ics';
        document.body.appendChild(link);

        // Automatisches Klicken des Links, um den Download zu starten
        link.click();

        // Temporären Link entfernen
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
    function editEntries() {
        const icsData = document.getElementById('output').value;
    
        if (!icsData) {
            alert("Keine ICS-Daten verfügbar. Bitte zuerst eine Datei verarbeiten.");
            return;
        }
    
        // Rufe extractEntries auf, um die Einträge anzuzeigen
        extractEntries(icsData);
    }
    
    async function extractEntries(icsData) {
        const entryTableBody = document.getElementById('entry-table').querySelector('tbody');
        entryTableBody.innerHTML = "Lade und verarbeite Daten...";
    
        try {
            const summaryEntries = new Set();
            const lines = icsData.split("\n");
            for (let line of lines) {
                if (line.startsWith("SUMMARY")) {
                    const summaryText = line.split(":").slice(1).join(":").trim();
                    summaryEntries.add(summaryText);
                }
            }
    
            entryTableBody.innerHTML = "";
            let idCounter = 0;
            summaryEntries.forEach(entry => {
                const row = document.createElement("tr");
    
                // Checkbox
                const checkboxCell = document.createElement("td");
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.className = "entry-checkbox";
                checkbox.id = `entry-checkbox-${idCounter}`;
                checkboxCell.appendChild(checkbox);
                row.appendChild(checkboxCell);
    
                // Summary Entry
                const summaryCell = document.createElement("td");
                summaryCell.textContent = entry;
                summaryCell.id = `summary-${idCounter}`;
                row.appendChild(summaryCell);
    
                // Custom Name Input
                const customNameCell = document.createElement("td");
                const customNameInput = document.createElement("input");
                customNameInput.type = "text";
                customNameInput.placeholder = "Eigene Bezeichnung";
                customNameInput.className = "entry-custom-name";
                customNameInput.id = `custom-name-${idCounter}`;
                customNameCell.appendChild(customNameInput);
                row.appendChild(customNameCell);
    
                entryTableBody.appendChild(row);
                idCounter++;
            });
    
            // Zeige die Bearbeitungssektion
            document.getElementById('edit-section').style.display = 'block';
    
        } catch (error) {
            console.error("Fehler beim Verarbeiten der ICS-Daten:", error);
        }
    }
    
    function saveEditedEntries() {
        const editedEntries = [];
        const entryTableBody = document.getElementById('entry-table').querySelector('tbody');
        const rows = entryTableBody.querySelectorAll('tr');
    
        rows.forEach(row => {
            const checkbox = row.querySelector('.entry-checkbox');
            const summaryCell = row.querySelector('td:nth-child(2)');
            const customNameInput = row.querySelector('.entry-custom-name');
    
            if (checkbox.checked || customNameInput.value.trim()) {
                editedEntries.push(
                    customNameInput.value.trim() || summaryCell.textContent
                );
            }
        });
    
        // Zeige die bearbeitete Datei
        const editedOutput = document.getElementById('edited-output');
        editedOutput.value = editedEntries.map(entry => `SUMMARY:${entry}`).join('\n');
        document.getElementById('edited-output-section').style.display = 'block';
    }
    
    function copyEditedToClipboard() {
        const editedOutput = document.getElementById('edited-output');
        editedOutput.select();
        document.execCommand('copy');
        alert('Bearbeitete ICS-Daten in die Zwischenablage kopiert!');
    }
</script>


