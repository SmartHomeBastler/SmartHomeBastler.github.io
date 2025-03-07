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
    document.getElementById("columns").addEventListener("change", function() {
        console.log("Columns input changed to:", this.value);
        updateTable(getStoredAreas(), getStoredWidths(), false);
    });

    document.getElementById("rows").addEventListener("change", function() {
        console.log("Rows input changed to:", this.value);
        updateTable(getStoredAreas(), getStoredWidths(), true);
    });

    function addColumn() {
        console.log("Adding column...");
        let columns = parseInt(document.getElementById("columns").value);
        document.getElementById("columns").value = columns + 1;

        redistributeColumnWidths(columns + 1);
        updateTable(getStoredAreas(), getStoredWidths(), false);
    }

    function addRow() {
        console.log("Adding row...");
        let rows = parseInt(document.getElementById("rows").value);
        document.getElementById("rows").value = rows + 1;

        updateTable(getStoredAreas(), getStoredWidths(), true);
    }

    function getStoredAreas() {
        const inputs = document.querySelectorAll("#layoutTable tbody input");
        const areas = [];

        inputs.forEach((input, index) => {
            const columns = parseInt(document.getElementById("columns").value);
            const row = Math.floor(index / columns);
            if (!areas[row]) areas[row] = [];
            areas[row][index % columns] = input.value;
        });

        return areas;
    }

    function getStoredWidths() {
        return Array.from(document.querySelectorAll("#layoutTable thead input"), input => parseInt(input.value) || 0);
    }

    function redistributeColumnWidths(columns) {
        const equalWidth = Math.floor(100 / columns);
        const inputs = document.querySelectorAll("#layoutTable thead input");

        for (let i = 0; i < columns; i++) {
            if (inputs[i]) {
                inputs[i].value = equalWidth;
            } else {
                let newInput = document.createElement("input");
                newInput.type = "number";
                newInput.min = "1";
                newInput.max = "100";
                newInput.value = equalWidth;
                newInput.oninput = adjustLastColumn;
                let th = document.createElement("th");
                th.appendChild(newInput);
                document.querySelector("#layoutTable thead tr").appendChild(th);
            }
        }

        adjustLastColumn();
    }

    function updateTable(storedAreas = [], storedWidths = [], isRowUpdate = false) {
        console.log("Updating table with stored data...");
        const columns = parseInt(document.getElementById("columns").value);
        const rows = parseInt(document.getElementById("rows").value);
        const tableHead = document.querySelector("#layoutTable thead");
        const tableBody = document.querySelector("#layoutTable tbody");

        if (!isRowUpdate) {
            tableHead.innerHTML = "";
            const headerRow = document.createElement("tr");

            for (let i = 0; i < columns; i++) {
                const th = document.createElement("th");
                const input = document.createElement("input");
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
        }

        tableBody.innerHTML = "";

        for (let r = 0; r < rows; r++) {
            const tr = document.createElement("tr");
            for (let c = 0; c < columns; c++) {
                const td = document.createElement("td");
                const input = document.createElement("input");
                input.type = "text";
                input.placeholder = `Area ${r + 1}-${c + 1}`;
                input.value = storedAreas[r]?.[c] || "";
                input.oninput = updatePreview;
                td.appendChild(input);
                tr.appendChild(td);
            }
            tableBody.appendChild(tr);
        }

        updatePreview();
    }

    function adjustLastColumn() {
        const inputs = document.querySelectorAll("#layoutTable thead input");
        const totalWidth = Array.from(inputs).slice(0, -1).reduce((sum, input) => sum + parseInt(input.value || 0), 0);
        const lastInput = inputs[inputs.length - 1];

        if (lastInput) {
            lastInput.value = Math.max(0, 100 - totalWidth);
        }

        updatePreview();
    }

    function updatePreview() {
        const gridPreview = document.getElementById("gridPreview");
        const inputs = document.querySelectorAll("#layoutTable thead input");
        const areaInputs = document.querySelectorAll("#layoutTable tbody input");
        const columns = parseInt(document.getElementById("columns").value);
        const rows = parseInt(document.getElementById("rows").value);

        gridPreview.style.gridTemplateColumns = Array.from(inputs).map(input => input.value + "%").join(" ");
        gridPreview.style.gridTemplateRows = `repeat(${rows}, auto)`;
        gridPreview.innerHTML = "";

        areaInputs.forEach(input => {
            const div = document.createElement("div");
            div.className = "shb-grid-item";
            div.textContent = input.value || input.placeholder;
            gridPreview.appendChild(div);
        });
    }

    updateTable();
</script>



























