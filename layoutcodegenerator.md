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
        let columns = document.getElementById("columns").value;
        let rows = document.getElementById("rows").value;
        let gridPreview = document.getElementById("gridPreview");
        let columnInputs = document.getElementById("columnInputs");
        
        gridPreview.innerHTML = '';
        columnInputs.innerHTML = '';
        columnInputs.style.display = 'flex';
        columnInputs.style.gap = '10px';
        
        let templateColumns = [];
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
            input.onchange = updateGrid;
            
            container.appendChild(label);
            container.appendChild(input);
            columnInputs.appendChild(container);
            
            templateColumns.push(input.value + "%");
            totalWidth += parseInt(input.value);
        }
        
        let lastInput = columnInputs.lastChild.querySelector("input");
        if (lastInput) {
            let remainingWidth = 100 - totalWidth;
            lastInput.value = parseInt(lastInput.value) + remainingWidth;
        }
        
        gridPreview.style.gridTemplateColumns = templateColumns.join(" ");
        gridPreview.style.gridTemplateRows = `repeat(${rows}, auto)`;
        
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                let div = document.createElement("div");
                div.className = "grid-item";
                let areaInput = document.createElement("input");
                areaInput.type = "text";
                areaInput.placeholder = `Area ${r+1}-${c+1}`;
                areaInput.style.width = "90%";
                div.appendChild(areaInput);
                gridPreview.appendChild(div);
            }
        }
    }

    updateGrid();
</script>
