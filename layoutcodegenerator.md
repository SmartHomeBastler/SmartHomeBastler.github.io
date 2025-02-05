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
        <label for="columns">Anzahl der Spalten:</label>
        <input type="number" id="columns" value="3" min="1" max="12" onchange="updateGrid()">
        <label for="rows">Anzahl der Zeilen:</label>
        <input type="number" id="rows" value="3" min="1" max="12" onchange="updateGrid()">
        <div id="columnInputs" class="column-inputs-container"></div>
        <h2>Vorschau</h2>
        <div id="gridPreviewContainer">
            <div id="gridPreview" class="grid-container"></div>
        </div>
    </section>
</div>
<style>
    #gridPreviewContainer {
        width: 100%;
        max-width: 98%;
        margin: 20px auto;
        padding: 10px;
        border: 1px solid #ccc;
        background: #f9f9f9;
    }
    .grid-container {
        display: grid;
        gap: 1px;
        width: 100%;
        background: #f0f0f0;
        padding: 10px;
    }
    .grid-item {
        background: #ddd;
        padding: 20px;
        text-align: center;
        border: 1px solid #aaa;
    }
    .grid-item input {
        width: 90%;
    }
    .column-inputs-container {
        display: flex;
        gap: 10px;
    }
    .column-input {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>

<script>

function updateGrid() {
    let columns = parseInt(document.getElementById("columns").value);
    let rows = parseInt(document.getElementById("rows").value);
    let gridPreview = document.getElementById("gridPreview");
    let columnInputs = document.getElementById("columnInputs");
    
    gridPreview.innerHTML = '';
    columnInputs.innerHTML = '';
    columnInputs.style.display = 'flex';
    columnInputs.style.gap = '10px';
    
    let templateColumns = [];
    let inputs = [];
    let totalWidth = 0;
    
    for (let i = 0; i < columns; i++) {
        let container = document.createElement("div");
        container.className = "column-input";
        
        let label = document.createElement("label");
        label.textContent = `Spalte ${i+1}`;
        
        let input = document.createElement("input");
        input.type = "number";
        input.min = "1";
        input.max = "100";
        input.value = Math.floor(100 / columns);
        input.setAttribute("data-index", i);
        input.oninput = function () { updatePreview(); };
        
        container.appendChild(label);
        container.appendChild(input);
        columnInputs.appendChild(container);
        inputs.push(input);
    }
    
    updatePreview();
}

function updatePreview() {
    let gridPreview = document.getElementById("gridPreview");
    let inputs = document.querySelectorAll("#columnInputs input");
    let templateColumns = [];
    let totalWidth = 0;
    
    inputs.forEach((input, index) => {
        templateColumns.push(input.value + "%");
        totalWidth += parseInt(input.value);
    });
    
    let lastInput = inputs[inputs.length - 1];
    if (lastInput) {
        let remainingWidth = 100 - totalWidth;
        lastInput.value = remainingWidth;
        templateColumns.push(remainingWidth + "%");
    }
    
    gridPreview.style.gridTemplateColumns = templateColumns.join(" ");
    
    let rows = parseInt(document.getElementById("rows").value);
    gridPreview.style.gridTemplateRows = `repeat(${rows}, auto)`;
    gridPreview.innerHTML = '';
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < inputs.length; c++) {
            let div = document.createElement("div");
            div.className = "grid-item";
            let areaInput = document.createElement("input");
            areaInput.type = "text";
            areaInput.placeholder = `Area ${r+1}-${c+1}`;
            div.appendChild(areaInput);
            gridPreview.appendChild(div);
        }
    }
}

updateGrid();
</script>
