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
        <div id="columnInputs"></div>
        <h2>Vorschau</h2>
        <div id="gridPreview" class="grid-container"></div>
    </section>
</div>
<script>
    function updateGrid() {
        let columns = document.getElementById("columns").value;
        let gridPreview = document.getElementById("gridPreview");
        let columnInputs = document.getElementById("columnInputs");
        
        gridPreview.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
        gridPreview.innerHTML = '';
        columnInputs.innerHTML = '';
        
        for (let i = 0; i < columns; i++) {
            let input = document.createElement("input");
            input.type = "number";
            input.min = "1";
            input.max = "100";
            input.value = Math.floor(100 / columns);
            input.setAttribute("data-index", i);
            input.onchange = updatePreview;
            columnInputs.appendChild(document.createTextNode(` Spalte ${i+1}: `));
            columnInputs.appendChild(input);
            
            let div = document.createElement("div");
            div.className = "grid-item";
            div.textContent = `Spalte ${i+1}`;
            gridPreview.appendChild(div);
        }
    }

    function updatePreview() {
        let inputs = document.querySelectorAll("#columnInputs input");
        let gridPreview = document.getElementById("gridPreview");
        let template = [];
        
        inputs.forEach(input => {
            template.push(input.value + "%");
        });
        
        gridPreview.style.gridTemplateColumns = template.join(" ");
    }

    updateGrid();
</script>
