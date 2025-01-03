---
layout: post
title: "Eigene Schriftart in Home Assistant integrieren"
date: 2023-05-03 06:58:00
categories: Dashboard
tags: [Eigene Schriftart, Font, Home Assistant, StudioCodeServer]
description: "Einen Weg, eigene Schriftarten in Home Assistant einzufügen, zeige ich hier."
image: /img/blog/eigene_Schriftart/blog-post-eigene-schriftarten.png
published: true
---

<head>
    <!-- Einbindung von Prism.js für Syntaxhervorhebung und Zeilennummern (helles Theme) -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-coy.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/line-numbers/prism-line-numbers.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/line-numbers/prism-line-numbers.min.js"></script>
</head>

<div style="text-align: center;">
    <img src="/img/blog/eigene_Schriftart/blog-post-eigene-schriftarten.png" alt="Titelbild" style="max-width: 60%; height: auto;height: auto; border-radius: 10px; margin-bottom: 30px;">
</div>


## Eigene Schriftart

Ich wollte unbedingt für meine Dashboards eine Schriftart zur Auswahl haben, welche meine Uhr in digitaler Schrift anzeigt.

Da ich als "font-family" keine passende Schrift gefunden habe, fügte ich mir eine im Netz gefundene in Home Assistant hinzu.
Hier die notwendigen Schritte und Codes zum Nachmachen:

![Digitale Uhr](/img/blog/eigene_Schriftart/blog-post-eigene-schriftart-digital-uhr.png)

- Lade dir eine Schrift deiner Wahl aus dem Internet z.B von [https://www.1001fonts.com/technology-font.html](https://www.1001fonts.com/technology-font.html)

- Dann musst du die heruntergeladene "ttf-Datei" in ein "woff2" konvertieren. Nutze dazu diesen [Konverter](https://www.fontconverter.io/de)

- Entpacke die erstellte Datei und speichere das `<deine-Schrift>.woff2` in deinen `www-Ordner` in Home Assistant. In meinem Fall ist es `Technology.woff2`

- Nun öffne in Home Assistant deinen File-Editor oder Studio Code Server und erstelle im `www-Ordner` ein neues File mit Namen `font.css` und füge folgende Codezeilen ein:

<div class="code-container">
    <button class="copy-button">Copy</button>
    <pre class="line-numbers"><code class="language-css">
/* Ersetze "Technology" mit dem Namen deiner Schriftart */
@font-face {
  font-family: "DJBGetDigital";
  src: url(/local/Technology.woff2) format('woff2');
}
    </code></pre>
</div>

- Füge ein weiteres File in deinen "www-Order" hinzu und gib ihm den Namen `loadfonts.js`. In dieses File füge folgenden Code ein:

<div class="code-container">
    <button class="copy-button">Copy</button>
    <pre class="line-numbers"><code class="language-js">
function loadcss() {
    let css = '/local/fonts.css?v=0.005';

    let link = document.createElement('link');
    let head = document.getElementsByTagName('head')[0];
    let tmp;
    link.rel = 'stylesheet';
    link.type = 'text/css';

    tmp = link.cloneNode(true);
    tmp.href = css;
    head.appendChild(tmp);
    console.info('%c Font Style sheet loaded', 'color: white; background: #000; font-weight: 700;');
}
loadcss();
    </code></pre>
</div>

- Leere den Browser-Cache und teste, ob die Schrift funktioniert. Z.B. kannst du folgende Karte manuell in dein Dashboard einfügen:

<div class="code-container">
    <button class="copy-button">Copy</button>
    <pre class="line-numbers"><code class="language-yaml">
# WICHTIG! Du musst card-mod installiert haben um den Stil der Karte zu ändern!
# Ändere die font-family auf deine Schriftart
type: markdown
content: '# &lt;center&gt; &#123;&#123;states("sensor.time")&#125;&#125; &lt;/center&gt;'
card_mod:
  style: |
    ha-card {
      font-family: Technology;
      font-size: 2vw;
      color: var(--primary-color);
      background: transparent;
      border: transparent;
    }
    </code></pre>
</div>

In meinem Fall sieht das Endergebnis so aus:

![Digitale Uhr 2](/img/blog/eigene_Schriftart/blog-post-eigene-schriftart-digital-uhr-2.png)

<style>
    /* Hintergrundfarbe und Rahmen für den Code-Container */
    .code-container {
        position: relative;
        background-color: #fdfdfd; /* Heller Hintergrund */
        border: 1px solid #ddd;
        border-radius: 5px;
        padding: 15px;
        margin-bottom: 20px;
        overflow: hidden;
    }

    /* Stil für Code-Text */
    .code-container code {
        font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
        font-size: 0.95em;
        line-height: 1.5;
        color: #333; /* Dunklere Textfarbe für bessere Lesbarkeit */
    }

    /* Stil für den Copy-Button */
    .copy-button {
        position: absolute;
        top: 10px;
        right: 10px;
        background: #007acc;
        color: #fff;
        border: none;
        border-radius: 5px;
        padding: 5px 10px;
        font-size: 0.85em;
        cursor: pointer;
        z-index: 10;
    }

    /* Hover-Effekt für den Copy-Button */
    .copy-button:hover {
        background: #005a9c;
    }
</style>

<script>
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.copy-button').forEach((button) => {
        button.addEventListener('click', () => {
            const codeBlock = button.nextElementSibling.querySelector('code');
            const code = codeBlock.innerText;
            navigator.clipboard.writeText(code).then(() => {
                button.textContent = 'Copied!';
                setTimeout(() => {
                    button.textContent = 'Copy';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    });
});
</script>
