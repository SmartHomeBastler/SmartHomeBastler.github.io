---
title: Meine HTML und CSS Vorlagen
subtitle: Alle Blöcke auf einer Seite
description: Hier kann ich mir alles für neue Seiten kopieren um einen Standard zu halten
show_sidebar: false
layout: page
---

<div class="shb-main-container">
<style>
    .shb-main-container {
        max-width: 100%;
        margin: auto;
        padding: 20px;
        background-color: #1a1a1a;
        font-family: Arial, sans-serif;
        line-height: 1.6;
        border: 1px solid #1598b3;
        border-radius: 8px;
        box-shadow: 0 4px 4px 6px #1598b380;
    }
</style>

<h1 class="shb-main-title">SHB Main Title</h1>
<style>
    .shb-main-title, .shb-main-title h1 {
        text-align: center;
        font-weight: bold !important;
        margin: 10px 0  !important;
        font-size: 2.5em !important;
        color: #1598b3 !important;
        shadow: #ebecf0;
    }
</style>

<p class="shb-main-description">
    Main Description Text here
</p>
<style>
    .shb-main-description, shb-main-description p {
        text-align: center;
        font-size: 1.2em !important;
        color: #ebecf0 !important;
        padding: 10px 0 !important;
    }
</style>

<div class="content-section">
<style>
    .content-section {
        margin-bottom: 20px;
        padding: 15px;
        background-color: #252525;
        border: 1px solid #444;
        border-radius: 8px;
    }
</style>

<h2 class="shb-section-title-center">Section Title Center H2</h2>
<h3 class="shb-section-title-center">Section Title Center H3</h3>
<h4 class="shb-section-title-center">Section Title Center H4</h4>
<style>
    .shb-section-title-center, .shb-section-title-center h2, .shb-section-title-center h3, .shb-section-title-center h4 {
        text-align: center;
        font-weight: bold !important;
        margin: 20px 0 !important;
    }
</style>

<h2 class="shb-section-title-left">Section Title Left H2</h2>
<h3 class="shb-section-title-left">Section Title Left H3</h3>
<h4 class="shb-section-title-left">Section Title Left H4</h4>
<style>
    .shb-section-title-left, .shb-section-title-left h2, .shb-section-title-left h3, .shb-section-title-left h4 {
        font-weight: bold !important;
        margin: 20px 0 !important;
    }
</style>

<div class="important-container">
    <h3>❗Achtung</h3>
    <p>
        Hier folgt eine Warnung mit <strong>hervorgehobenem</strong> Text!
    </p>
</div>
<style>
    .important-container {
        background-color: #ffffff;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
        border: 8px solid #ff0000;
    }
    .important-container h3 {
        color: #d12700;
        font-weight: bold;
        text-shadow: 0 0 1px #000000;
    }
    .important-container p {
        color: #383838;
        font-family: Arial Black;
    }
    .important-container strong {
        color:rgb(255, 0, 0);
        text-transform: uppercase;
    }
</style>

<div class="note-container">
    <h3>💡 Hinweis</h3> 
    <p>
        Hier folgt ein Hinweis mit <strong>hervorgehobenem</strong> Text!
    </p>
</div>
<style>
    .note-container {
        background-color: #ffffff;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
        border: 8px solid #0062ff;
    }
    .note-container h3 {
        color: #0062ff;
        font-weight: bold;
        text-shadow: 0 0 1px #000000;
    }
    .note-container p {
        color: #383838;
    }
    .note-container strong {
        color: #0062ff;
        text-transform: uppercase;
    }
</style>

<div class="shb-form-group-30">
    <label for="select-id-1">Auswahl:</label>
    <select id="select-id-1">  <!-- Füge  onchange="updateScript1()" hinzu für Script -->
        <option value="Eins">Eins</option>
        <option value="Zwei">Zwei</option>
        <option value="Drei">Drei</option>
        <option value="Vier">Vier</option>
    </select>
</div>
<style>
    .shb-form-group-30, .shb-form-group-30-full {
        display: flex;
        flex-direction: column;
        margin: 20px 0;
    }
    .shb-form-group-30 label, .shb-form-group-30-full label {
        font-weight: bold;
        margin-bottom: 5px;
        color: #ffffff;
    }
    .shb-form-group-30 input, .shb-form-group-30 select {
        padding: 8px;
        color: #000000;
        background-color: #9fb9fb;
        max-width: 30%;
        border: 1px solid #ffffff;
        box-shadow: 0 2px 5px #ffffff;
        border-radius: 5px;
        font-size: 14px;
    }
    .shb-form-group-30 select:focus {
        background-color:rgb(187, 207, 255);
        border: 2px solid #0048ff;
        box-shadow: 0 4px 10px #7199ff;
        outline: none;
    }
</style>

<div class="shb-form-group-full">
    <label for="select-id-2">Auswahl:</label>
    <select id="select-id-2">  <!-- Füge  onchange="updateScript2()" hinzu für Script -->
        <option value="Eins">Eins</option>
        <option value="Zwei">Zwei</option>
        <option value="Drei">Drei</option>
        <option value="Vier">Vier</option>
    </select>
</div>
<style>
    .shb-form-group-full {
        display: flex;
        flex-direction: column;
        margin: 20px 0;
    }
    .shb-form-group-full label {
        font-weight: bold;
        margin-bottom: 5px;
        color: #ffffff;
    }
    .shb-form-group-full input, .shb-form-group-full select {
        padding: 8px;
        color: #000000;
        background-color: #9fb9fb;
        max-width: 100%;
        border: 1px solid #ffffff;
        box-shadow: 0 2px 5px #ffffff;
        border-radius: 5px;
        font-size: 14px;
    }
    .shb-form-group-full select:focus {
        background-color:rgb(187, 207, 255);
        border: 2px solid #0048ff;
        box-shadow: 0 4px 10px #7199ff;
        outline: none;
    }
</style>

<label class="shb-label">Drücke den gewählten Button:</label>
<style>
    .shb-label {
        font-weight: bold;
        margin-bottom: 5px;
        color: #ffffff;
    }
</style>


<div class="shb-button-container">
    <button class="shb-button shb-button-blue">Button Blau</button> <!-- Füge  onclick="updateScript2()" hinzu für Script -->
    <button class="shb-button shb-button-green">Button Grün</button>
    <button class="shb-button shb-button-yellow">Button Gelb</button>
    <button class="shb-button shb-button-red">Button Rot</button>
</div>
<style>
    .shb-button-container {
        display: flex;
        gap: 10px;
        margin: 5px 0 20px 0;
    }
    .shb-button {
        padding: 10px 15px;
        font-size: 14px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    .shb-button-blue {
        background-color: #007bff;
        color: #fff;
    }
    .shb-button-green {
        background-color: #17b83a;
        color: #fff;
    }
    .shb-button-yellow {
        background-color: #ffc107;
        color: #fff;
    }
    .shb-button-red {
        background-color: #dc3545;
        color: #fff;
    }
</style>


<ul class="shb-list-start">
    <li>Erster Punkt mit <strong>hervorgehobenem Text</strong></li>
    <li>Zweiter Punkt mit <strong>hervorgehobenem Text</strong></li>
    <li>Dritter Punkt mit <strong>hervorgehobenem Text</strong></li>
</ul>
<style>
    .shb-list-start {
        counter-reset: list-counter;
        padding-left: 0;
        margin: 20px 0;
    }
    .shb-list-start li strong {
        color: #1598b3;
    }
    .shb-list-start li {
        counter-increment: list-counter;
        position: relative;
        margin: 10px 30px;
        font-size: 1em;
        line-height: 1.6;
        color: #ffffff;
        background-color: #4b4b4b;
        border-left: 3px solid #1598b3;
        border-top: 1px solid #1598b3;
        border-right: 1px solid #1598b3;
        border-bottom: 1px solid #1598b3;
        border-radius: 6px;
        padding: 10px 60px;
        box-shadow: 0 2px 5px #ffffff10;
        width: 90%;
    }
    .shb-list-start li::before {
        content: counter(list-counter);
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        font-weight: bold;
        color: #1598b3;
        font-size: 1.2em;
        background-color: #ffffff;
        border: 3px solid #1598b3;
        padding: 5px 15px;
        border-radius: 50%;
        box-shadow: 0 1px 3px #000000;
        text-align: center;
    }
</style>
</div>
</div>
