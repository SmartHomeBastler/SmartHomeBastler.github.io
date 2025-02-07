---
title: Raster (Grid) Layout Code
subtitle: Definiere dein eigenes Layout für dein Home Assistant Dashboard
description: Um Position und Größe der verschiedenen Karten am Dashboard zu konfigurieren, ist grid-layout eine super Möglichkeit
show_sidebar: false
layout: page
---

<div class="shb-main-container">
    <div id="shb-custom-alert" style="display: none;">
        <div id="shb-custom-alert-content">
            <h4 id="shb-custom-alert-title"></h4>
            <p id="shb-custom-alert-message"></p>
            <button id="shb-close-alert">OK</button>
        </div>
    </div>
    <section class="content-section">
        <h1 class="shb-main-title">Layout Codegenerator</h1>
        <h2 class="shb-section-title-center">Definiere die Größe und Position der einzelnen Areas</h2>
        <p class="shb-main-description">
            Mit diesem Tool kannst du durch Eingabe der Angaben zur Spaltenbreite und Betitelung der einzelnen Areas den Code für dein Layout erstellen. 
        </p>
        <div class="shb-form-group" style="display: flex;justify-content: flex-start;gap: 30px;flex-direction: row;align-items: center;">
            <div style="display: flex; align-items: flex-start; flex-direction: column; width: 20%;">
                <label for="columns">Anzahl der Spalten:</label>
                <input type="number" id="columns" value="3" min="1" max="12" onchange="updateTable()">
            </div>
            <div style="display: flex; flex-direction: column; align-items: flex-start; width: 20%">
                <label for="rows">Anzahl der Zeilen:</label>
                <input type="number" id="rows" value="1" min="1" max="12" onchange="updateTable()">
            </div>
        </div>
        <h2>Tabelle</h2>
        <div class="shb-styled-table-container" style="width: 100%;">
            <table id="layoutTable" border="1" class="shb-styled-table" style="text-align: center">
                <thead></thead>
                <tbody></tbody>
            </table>
        </div>
        <h2>Vorschau</h2>
        <div id="gridPreviewContainer" class="shb-preview-container">
            <div id="gridPreview" class="shb-grid-preview"></div>
        </div>
    </section>
</div>
<style>
    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
    }
    th, td {
        padding: 10px;
        text-align: center;
        border: 1px solid #ccc;
    }
    input {
        width: 80%;
        text-align: center;
    }
    .shb-preview-container {
        width: 100%;
        max-width: 98%;
        margin: 20px auto;
        padding: 10px;
        border: 1px solid #ccc;
        background: #f9f9f9;
    }
    .shb-grid-preview {
        display: grid;
        gap: 1px;
        width: 100%;
        background: #f0f0f0;
        padding: 10px;
    }
    .shb-grid-item {
        background: #ddd;
        padding: 20px;
        text-align: center;
        border: 1px solid #aaa;
    }
</style>

<script>
    function addColumn() {
        let columns = parseInt(document.getElementById("columns").value);
        document.getElementById("columns").value = columns + 1;

        let storedAreas = getStoredAreas();
        let storedWidths = getStoredWidths();

        redistributeColumnWidths(columns + 1);
        updateTable(storedAreas, storedWidths);
    }

    function addRow() {
        let rows = parseInt(document.getElementById("rows").value);
        document.getElementById("rows").value = rows + 1;

        let storedAreas = getStoredAreas();
        let storedWidths = getStoredWidths();

        updateTable(storedAreas, storedWidths);
    }

    function getStoredAreas() {
        return Array.from(document.querySelectorAll("#layoutTable tbody input"), input => input.value);
    }

    function getStoredWidths() {
        return Array.from(document.querySelectorAll("#layoutTable thead input"), input => input.value);
    }

    function redistributeColumnWidths(columns) {
        let equalWidth = Math.floor(100 / columns);
        let inputs = document.querySelectorAll("#layoutTable thead input");

        inputs.forEach(input => {
            input.value = equalWidth;
        });

        while (inputs.length < columns) {
            let newInput = document.createElement("input");
            newInput.type = "number";
            newInput.min = "1";
            newInput.max = "100";
            newInput.value = equalWidth;
            newInput.oninput = adjustLastColumn;
            let th = document.createElement("th");
            th.appendChild(newInput);
            document.querySelector("#layoutTable thead tr").appendChild(th);
            inputs = document.querySelectorAll("#layoutTable thead input");
        }

        adjustLastColumn();
    }

    function updateTable(storedAreas = [], storedWidths = []) {
        let columns = parseInt(document.getElementById("columns").value);
        let rows = parseInt(document.getElementById("rows").value);
        let tableHead = document.querySelector("#layoutTable thead");
        let tableBody = document.querySelector("#layoutTable tbody");

        tableHead.innerHTML = "";
        tableBody.innerHTML = "";

        let headerRow = document.createElement("tr");
        for (let i = 0; i < columns; i++) {
            let th = document.createElement("th");
            let input = document.createElement("input");
            input.type = "number";
            input.min = "1";
            input.max = "100";
            input.value = storedWidths[i] !== undefined ? storedWidths[i] : Math.floor(100 / columns);
            input.oninput = adjustLastColumn;
            th.appendChild(input);
            headerRow.appendChild(th);
        }
        tableHead.appendChild(headerRow);

        adjustLastColumn();

        for (let r = 0; r < rows; r++) {
            let tr = document.createElement("tr");
            for (let c = 0; c < columns; c++) {
                let td = document.createElement("td");
                let input = document.createElement("input");
                input.type = "text";
                input.placeholder = `Area ${r + 1}-${c + 1}`;
                input.value = storedAreas[r * columns + c] || "";
                input.oninput = updatePreview;
                td.appendChild(input);
                tr.appendChild(td);
            }
            tableBody.appendChild(tr);
        }

        updatePreview();
    }

    function adjustLastColumn() {
        let inputs = document.querySelectorAll("#layoutTable thead input");
        let totalWidth = Array.from(inputs).slice(0, -1).reduce((sum, input) => sum + parseInt(input.value || 0), 0);

        let lastInput = inputs[inputs.length - 1];
        if (lastInput) {
            lastInput.value = Math.max(0, 100 - totalWidth);
        }

        updatePreview();
    }

    function updatePreview() {
        let gridPreview = document.getElementById("gridPreview");
        let inputs = document.querySelectorAll("#layoutTable thead input");
        let areaInputs = document.querySelectorAll("#layoutTable tbody input");
        let columns = parseInt(document.getElementById("columns").value);
        let rows = parseInt(document.getElementById("rows").value);

        gridPreview.style.gridTemplateColumns = Array.from(inputs).map(input => input.value + "%").join(" ");
        gridPreview.style.gridTemplateRows = `repeat(${rows}, auto)`;
        gridPreview.innerHTML = "";

        let areaColors = {};
        let colorPalette = ["#FFCDD2", "#C8E6C9", "#BBDEFB", "#FFF9C4", "#D1C4E9"];
        let colorIndex = 0;

        areaInputs.forEach(input => {
            let div = document.createElement("div");
            div.className = "shb-grid-item";
            div.textContent = input.value || input.placeholder;

            if (input.value) {
                if (!areaColors[input.value]) {
                    areaColors[input.value] = colorPalette[colorIndex % colorPalette.length];
                    colorIndex++;
                }
                div.style.backgroundColor = areaColors[input.value];
            }

            gridPreview.appendChild(div);
        });
    }

    updateTable();
</script>
















