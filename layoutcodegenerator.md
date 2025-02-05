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
    <!-- Container für das Dropdown -->
    <div style="display: flex;text-align: right;align-items: flex-start;flex-direction: column;width: 30%;">
        <label for="columns">Anzahl der Spalten:</label>
        <input type="number" id="columns" value="3" min="1" max="12" onchange="updateTable()">
    </div>
    <!-- Container für die Checkbox -->
    <div style="display: flex;flex-direction: column;gap: 10px;align-items: center;">
        <label for="rows">Anzahl der Zeilen:</label>
        <input type="number" id="rows" value="3" min="1" max="12" onchange="updateTable()">
    </div>
</div>

<h2>Tabelle</h2>
<table id="layoutTable" border="1">
    <thead></thead>
    <tbody></tbody>
</table>

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
    }
    
    updateTable();
</script>
