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
                <input type="number" id="rows" value="3" min="1" max="12" onchange="updateTable()">
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
        gap: 5px;
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
    function updateTable() {
        let columns = parseInt(document.getElementById("columns").value);
        let rows = parseInt(document.getElementById("rows").value);
        let tableHead = document.querySelector("#layoutTable thead");
        let tableBody = document.querySelector("#layoutTable tbody");
        
        tableHead.innerHTML = "";
        tableBody.innerHTML = "";
        
        // Tabellenkopf mit Spaltenbreiten
        let headerRow = document.createElement("tr");
        for (let i = 0; i < columns; i++) {
            let th = document.createElement("th");
            let input = document.createElement("input");
            input.type = "number";
            input.min = "1";
            input.max = "100";
            input.value = Math.floor(100 / columns);
            input.setAttribute("data-index", i);
            input.oninput = function () { adjustLastColumn(); };
            th.appendChild(input);
            headerRow.appendChild(th);
        }
        tableHead.appendChild(headerRow);
        
        // Tabellenkörper mit Area-Namen
        for (let r = 0; r < rows; r++) {
            let tr = document.createElement("tr");
            for (let c = 0; c < columns; c++) {
                let td = document.createElement("td");
                let input = document.createElement("input");
                input.type = "text";
                input.placeholder = `Area ${r+1}-${c+1}`;
                td.appendChild(input);
                tr.appendChild(td);
            }
            tableBody.appendChild(tr);
        }
    }
    
    function adjustLastColumn() {
        let inputs = document.querySelectorAll("#layoutTable thead input");
        let totalWidth = 0;
        
        inputs.forEach((input, index) => {
            if (index < inputs.length - 1) {
                totalWidth += parseInt(input.value);
            }
        });
        
        let lastInput = inputs[inputs.length - 1];
        if (lastInput) {
            lastInput.value = Math.max(100 - totalWidth, 0);
        }

        updatePreview();
    }
    
    updateTable();
    
    function updatePreview() {
        let gridPreview = document.getElementById("gridPreview");
        let inputs = document.querySelectorAll("#layoutTable thead input");
        let areaInputs = document.querySelectorAll("#layoutTable tbody input");
        let columns = parseInt(document.getElementById("columns").value);
        let rows = parseInt(document.getElementById("rows").value);
        
        let templateColumns = Array.from(inputs).map(input => input.value + "%").join(" ");
        gridPreview.style.gridTemplateColumns = templateColumns;
        gridPreview.style.gridTemplateRows = `repeat(${rows}, auto)`;
        gridPreview.innerHTML = "";
        
        areaInputs.forEach((input, index) => {
            let div = document.createElement("div");
            div.className = "shb-grid-item";
            div.textContent = input.value || input.placeholder;
            gridPreview.appendChild(div);
        });
    }
</script>
