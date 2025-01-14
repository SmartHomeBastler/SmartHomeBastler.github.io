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

<div class="important-container" style="display: none;">
    <h3>❗Achtung</h3>
    <p>
        Hier folgt eine Warnung mit <strong>hervorgehobenem</strong> Text!
    </p>
</div>
<style>
    .important-container {
        background-color: rgb(255, 255, 255);
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
        border: 8px solid rgb(255, 0, 0);
    }
    .important-container h3 {
        color: #d12700;
        font-weight: bold;
        text-shadow: 0 0 1px rgb(0, 0, 0);
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
        background-color: rgb(255, 255, 255);
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
        border: 8px solid #0062ff;
    }
    .note-container h3 {
        color: #0062ff;
        font-weight: bold;
        text-shadow: 0 0 1px rgb(0, 0, 0);
    }
    .note-container p {
        color: #383838;
    }
    .note-container strong {
        color: #0062ff;
        text-transform: uppercase;
    }
</style>

</div>
</div>