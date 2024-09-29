---
layout: post
title:  "Eigene Schriftart in Home Assistant integrieren"
date:   2023-05-03 06:58:00
categories: Dashboard
description: "Einen Weg, eigene Schriftarten in Home Assistant einzufügen, zeige ich hier."
image: /img/blog-post-eigene-schriftarten.png
published: true
---

Ich wollte unbedingt für meine Dashboards eine Schriftart zur Auswahl haben, welche meine Uhr in digitaler Schrift anzeigt.

Da ich als "font-family" keine passende Schrift gefunden habe, fügte ich mir eine im Netz gefundene in Home Assistant hinzu.
Hier die notwendigen Schritte und Codes zum Nachmachen:

![Digitale Uhr](/img/blog-post-eigene-schriftart-digital-uhr.png)

- Lade dir eine Schrift deiner Wahl aus dem Internet z.B von [https://www.1001fonts.com/technology-font.html](https://www.1001fonts.com/technology-font.html)



- Dann musst du die heruntergeladene "ttf-Datei" in ein "woff2" konvertieren. Nutze dazu diesen [Konverter](https://www.fontconverter.io/de)


- Entpacke die erstellte Datei und speichere das `<deine-Schrift>.woff2` in deinen `www-Ordner` in Home Assistant. In meinem Fall ist es `Technology.woff2`


- Nun öffne in Home Assistant deinen File-Editor oder Studio Code Server und erstelle im `www-Ordner` ein neues File mit Namen
`font.css`
und füge folgende Codezeilen ein:

```css
/* Ersetze "Technology" mit dem Namen deiner Schriftart */

@font-face {
  font-family: "DJBGetDigital";
  src: url(/local/Technology.woff2) format('woff2');
}
```


- Füge ein weiteres File in deinen "www-Order" hinzu und gib ihm den Namen `loadfonts.js`.
In dieses File füge folgenden Code ein:


```js
function loadcss() {
    let css = '/local/fonts.css?v=0.005'

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
```

- Als nächsten Schritt gehe in Home Assistant auf `Einstellungen` - `Dashboards` danach oben rechts auf die 3 Punkte und wähle `Ressourcen`. Dann klicke rechts unten auf `Ressource hinzufügen` und füge im geöffneten Fenster bei URL `/local/loadfonts.js` ein. Bei Ressource-Typ wähle `JavaScript-Modul` und klicke auf `ERSTELLEN`.

![Ressource JS](/img/blog-post-eigene-schriftart-ressourcen-js.png)


- Leere den Browser-Cache und teste ob die Schrift funktioniert.
Z.B. kannst du folgende Karte manuell in dein Dashboard einfügen


```yaml
# WICHTIG! Du musst card-mod installiert haben um den Stil der Karte zu ändern!
# Ändere die font-family auf deine Schriftart
type: markdown
content: '# <center> {{states("sensor.time")}}'
card_mod:
  style: |
    ha-card {
      font-family: Technology;
      font-size: 2vw;
      color: var(--primary-color);
      background: transparent;
      border: transparent;
    }
```


In meinem Fall sieht das Endergebnis so aus:


![Digitale Uhr 2](/img/blog-post-eigene-schriftart-digital-uhr-2.png)