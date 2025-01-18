---
title: ICS Code Generator
subtitle: ICS-Dateien hochladen oder erstellen
description: Lade ICS-Dateien hoch oder rufe sie von einer URL ab, um sie zu bearbeiten oder zusammenzuführen.
show_sidebar: false
layout: page
---
<div class="shb-main-container">

<h1 class="shb-main-title">ICS Code Generator</h1>

<h2 class="shb-section-title-center">ICS-Dateien zum Bearbeiten hochladen oder eigene erstellen</h2>

<p class="shb-main-description">
    Lade eine oder mehrere ICS-Dateien hoch um sie auszulesen oder zusammenzuführen, oder erstelle dir eine ICS Datei nach eigenen Angaben und lade sie herunter.
</p>

<h2 class="shb-section-title-center">Was möchtest du machen?</h2>

<div class="shb-center-container">
<div class="shb-form-group" style="flex-direction: row; gap: 50px;">
    <div class="checkbox-wrapper">
        <input type="checkbox" id="mergeICSCheckbox" onchange="toggleSections()">
        <label for="mergeICSCheckbox" style="margin-left: 5px; font-size: 1.2em; color: #1ab5d5;">Mehrere ICS zusammenführen</label>
    </div>
    <div class="checkbox-wrapper">
        <input type="checkbox" id="createICSCheckbox" onchange="toggleSections()">
        <label for="createICSCheckbox" style="margin-left: 5px; font-size: 1.2em; color: #1ab5d5;">Eigene ICS erstellen</label>
    </div>
</div>
</div>

<!--      ___ ____ ____                                                        __ _   _ _                        -->
<!--     |_ _/ ___/ ___|   _____   _ ___  __ _ _ __ ___  _ __ ___   ___ _ __  / _(_) (_) |__  _ __ ___ _ __      -->
<!--      | | |   \___ \  |_  / | | / __|/ _` | '_ ` _ \| '_ ` _ \ / _ \ '_ \| |_| | | | '_ \| '__/ _ \ '_ \     -->
<!--      | | |___ ___) |  / /| |_| \__ \ (_| | | | | | | | | | | |  __/ | | |  _| |_| | | | | | |  __/ | | |    -->
<!--     |___\____|____/  /___|\__,_|___/\__,_|_| |_| |_|_| |_| |_|\___|_| |_|_|  \__,_|_| |_|_|  \___|_| |_|    -->
<!--                                                                                                             -->


<section class="content-section" id="merge-section" style="display: none;">

<h3 class="shb-section-title-center">ICS-Dateien hochladen, auslesen oder zusammenführen</h3>

<p>
    Wähle entweder eine oder mehrere <code>.ics</code>-Dateien aus um sie auszulesen bzw. zusammenzuführen.
</p>

<div class="shb-form-group">
    <label for="file1">ICS Datei 1 (erforderlich):</label>
    <input type="file" id="file1" accept=".ics" style="width: 30%">
</div>

<div class="shb-form-group">
    <label for="file2">ICS Datei 2 (optional):</label>
    <input type="file" id="file2" accept=".ics" style="width: 30%">
</div>

<div class="shb-form-group">
    <label for="file3">ICS Datei 3 (optional):</label>
    <input type="file" id="file3" accept=".ics" style="width: 30%">
</div>

<div class="shb-form-group">
    <label for="file4">ICS Datei 4 (optional):</label>
    <input type="file" id="file4" accept=".ics" style="width: 30%">
</div>

<div class="shb-form-group">
    <label for="file5">ICS Datei 5 (optional):</label>
    <input type="file" id="file5" accept=".ics" style="width: 30%">
</div>

<div class="shb-form-group">
    <label for="file6">ICS Datei 6 (optional):</label>
    <input type="file" id="file6" accept=".ics" style="width: 30%">
</div>

<div class="shb-button">
    <button class="shb-button shb-button-blue" style="width: 30%" onclick="mergeICSFiles()">ICS Datei(en) verarbeiten</button>
</div>

</section>

<div class="important-container" id="warning-container" style="display: none;">
    <h3>❗ Achtung</h3>
    <p>
        Die Bezeichnungen deiner Kalender-Termine beinhalten Ziffern oder Punkte. Eine Bearbeitung dieser Einträge wird empfohlen.
    </p>
</div>

<section class="content-section" id="edit-section" style="display: none;">

<h3 class="shb-section-title-center">Zusammengeführte ICS-Datei</h3>
<p>
    Die verarbeiteten Inhalte der ICS-Dateien werden hier angezeigt. Du kannst sie überprüfen und die Daten in die Zwischenablage kopieren oder bearbeiten.
</p>

<div class="shb-text-output">
    <textarea class="shb-text-code-output" id="output" rows="20" cols="80" readonly></textarea>
</div>

<div class="shb-center-container">
<div class="shb-button-container">
    <button class="shb-button shb-button-yellow" onclick="copyToClipboard()">In Zwischenablage kopieren</button>
    <button class="shb-button shb-button-blue" onclick="editAndDisplayEntries()">Einträge bearbeiten</button>
</div>
</div>

</section>

<section class="content-section" id="edited-output-section" style="display: none;">

<h3 class="shb-section-title-center">Bearbeitete ICS-Datei</h3>

<div class="shb-text-output">
    <textarea class="shb-text-code-output" id="edited-output" rows="20" readonly></textarea>
</div>

<div class="shb-center-container">
<div class="shb-button-container">
    <button class="shb-button shb-button-yellow" onclick="copyEditedToClipboard()">Bearbeitete Datei kopieren</button>
    <button class="shb-button shb-button-green" onclick="downloadEditedICSFile()">Bearbeitete Datei herunterladen</button>
</div>
</div>

</section>

<!--      ___ ____ ____                  _       _ _                -->
<!--     |_ _/ ___/ ___|    ___ _ __ ___| |_ ___| | | ___ _ __      -->
<!--      | | |   \___ \   / _ \ '__/ __| __/ _ \ | |/ _ \ '_ \     -->
<!--      | | |___ ___) | |  __/ |  \__ \ ||  __/ | |  __/ | | |    -->
<!--     |___\____|____/   \___|_|  |___/\__\___|_|_|\___|_| |_|    -->
<!--                                                                -->

<section class="content-section" id="create-section" style="display: none;">

<h3 class="shb-section-title-center">Eigene ICS-Datei erstellen</h3>

<p>
    Fülle die Felder aus, um eigene Events zu erstellen und in eine ICS-Datei zu exportieren.
</p>

<p>
    Mit jedem Klick des Buttons <strong>Event hinzufügen</strong>, werden dein eingetragener Eventname und das Eventdatum deinem gewählten Kalendernamen hinzugefügt^
</p>

<p>
    Wenn alle Einträge getroffen sind, kannst du deinen erstellten ICS-Kalender herunterladen
</p>

<div class="shb-form-group">
    <label for="calendarName">Kalendername:</label>
    <input type="text" id="calendarName" placeholder="z.B. Mein Kalender" style="width: 30%">
</div>
<div class="shb-form-group">
    <label for="eventName">Eventname:</label>
    <input type="text" id="eventName" placeholder="z.B. Restabfall" style="width: 30%">
</div>
<div class="shb-form-group">
    <label for="eventDate">Eventdatum:</label>
    <input type="date" id="eventDate" placeholder="tt.mm.jjjj" style="width: 30%">
</div>

<div class="shb-button">
    <button class="shb-button shb-button-blue" style="width: 30%" onclick="addEventToICS()">Event hinzufügen</button>
</div>

<div class="shb-text-output">
    <textarea class="shb-text-code-output" id="created-ics-output" rows="10" readonly></textarea>
</div>

<div class="shb-button">
<button class="shb-button shb-button-blue" style="width: 30%" onclick="downloadCreatedICS()">Erstellten Kalender herunterladen</button>
</div>

</section>

<footer class="shb-footer">
    <p>Mit dem ICS Code Generator kannst du deine Kalender schnell und einfach bearbeiten.</p>
    <h2>Viel Erfolg! 🎉</h2>
</footer>

{% include support_note.html %}

</div>

<script>
    function toggleSections() {
        const mergeCheckbox = document.getElementById('mergeICSCheckbox');
        const createCheckbox = document.getElementById('createICSCheckbox');
        const mergeSection = document.getElementById('merge-section');
        const editSection = document.getElementById('edit-section');
        const createSection = document.getElementById('create-section');

        // Sichtbarkeit basierend auf Checkbox-Zustand
        if (mergeCheckbox.checked) {
            mergeSection.style.display = 'block';
            editSection.style.display = 'block';
        } else {
            mergeSection.style.display = 'none';
            editSection.style.display = 'none';
        }

        if (createCheckbox.checked) {
            createSection.style.display = 'block';
        } else {
            createSection.style.display = 'none';
        }
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
            const mergedData = results.join("\n");
            const lines = mergedData.split("\n");
            const warningContainer = document.getElementById('warning-container');
    
            let containsInvalidSummary = false;
    
            const processedLines = lines.map((line) => {
                if (line.startsWith("SUMMARY")) {
                    const index = line.indexOf(":");
                    if (index !== -1) {
                        const summaryContent = line.substring(index + 1).trim(); // Inhalt nach dem ersten Doppelpunkt
                        if (/\d|\./.test(summaryContent)) { // Prüft auf Ziffern oder Punkte
                            containsInvalidSummary = true;
                        }
                    }
                }
                return line;
            });
    
            // Zeigt die Warnung an, falls ungültige Einträge gefunden werden
            if (containsInvalidSummary) {
                warningContainer.style.display = "block";
            } else {
                warningContainer.style.display = "none";
            }
    
            document.getElementById('output').value = processedLines.join("\n");
        });
    }

    function copyToClipboard() {
        const output = document.getElementById('output');
        output.select();
        document.execCommand('copy');
        alert('ICS-Datei in die Zwischenablage kopiert!');
    }

    function editAndDisplayEntries() {
        const icsData = document.getElementById('output').value;
    
        if (!icsData) {
            alert("Keine ICS-Daten verfügbar. Bitte zuerst eine Datei verarbeiten.");
            return;
        }
    
        const lines = icsData.split("\n");
        const editedLines = lines.map(line => {
            if (line.startsWith("SUMMARY")) {
                const index = line.indexOf(":");
                if (index !== -1) {
                    const originalSummary = line.substring(index + 1).trim(); // Inhalt nach dem ersten Doppelpunkt
                    const cleanedSummary = originalSummary.replace(/[0-9.\s]/g, ""); // Entferne Ziffern, Punkte und Leerzeichen
                    return `SUMMARY:${cleanedSummary}`; // Ersetze SUMMARY_xyz mit SUMMARY:
                }
            }
            return line; // Unveränderte Zeilen zurückgeben
        });
    
        const editedOutput = document.getElementById('edited-output');
        editedOutput.value = editedLines.join("\n");
        document.getElementById('edited-output-section').style.display = 'block';
    }

    function copyEditedToClipboard() {
        const editedOutput = document.getElementById('edited-output');
        editedOutput.select();
        document.execCommand('copy');
        alert('Bearbeitete ICS-Daten in die Zwischenablage kopiert!');
    }

    function downloadEditedICSFile() {
        const editedOutput = document.getElementById('edited-output').value;

        if (!editedOutput) {
            alert("Keine bearbeiteten ICS-Daten verfügbar.");
            return;
        }

        const blob = new Blob([editedOutput], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'bearbeitete_kalender.ics';
        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    let icsContent = "";

    function addEventToICS() {
        const calendarName = document.getElementById('calendarName').value || "Mein Kalender";
        const eventName = document.getElementById('eventName').value || "Unbekanntes Event";
        const eventDate = document.getElementById('eventDate').value;

        if (!eventDate) {
            alert("Bitte ein Datum für das Event auswählen.");
            return;
        }

        if (!icsContent) {
            icsContent = `BEGIN:VCALENDAR
    VERSION:2.0
    PRODID:${calendarName}
    `;
        }

        const eventEntry = `BEGIN:VEVENT
    SUMMARY:${eventName}
    DTSTART;VALUE=DATE:${eventDate.replace(/-/g, "")}
    DESCRIPTION:${eventName}
    END:VEVENT
    `;

        icsContent += eventEntry;

        // Zeige den aktuellen Inhalt der ICS-Datei im Textfeld an
        document.getElementById('created-ics-output').value = `${icsContent}END:VCALENDAR`;
    }

    function downloadCreatedICS() {
        const calendarName = document.getElementById('calendarName').value || "Mein Kalender";
        const finalICSContent = `${icsContent}END:VCALENDAR`;

        const blob = new Blob([finalICSContent], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `${calendarName}.ics`;
        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

</script>
