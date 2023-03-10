# Facharbeit von SteinGaming (Danial Daryab)

Dies ist meine Facharbeit, welche das Thema "Auftragsprogrammierung" besitzt. <br>
Dieses Dokument ist dafür da, um meine vorgehensweise zu erklären. <br>

### **EMPFEHLUNG: FALLS SIE DIESE DATEI IM PDF FORMAT LESEN, BITTE ICH SIE, DAS BESSER FORMAT [HIER](https://github.com/SteinGaming/FacharbeitWebseite/blob/main/README.MD) ANZUSEHEN**

## Inhaltsangabe


1. [Dateistruktur](#dateistruktur)
2. [Wichtiges!!!](#wichtiges)
   1. [Sprache](#sprache)
   2. [Ansehen der Seite](#ansehen-der-seite)
   3. [Ansehen der Dateien](#ansehen-der-dateien)
   4. [Ansehen der Markdown Dateien](#ansehen-der-markdown-dateien)
3. [Vorgehensweise](#vorgehensweise)
   1. [Idee](#1-idee)
   2. [Planung](#2-planung)
   3. [Umsetzung](#3-umsetzung)
   4. [Komponente](#4-komponente)
4. [Fazit](#fazit)

## Dateistruktur



```
.
├── aboutus.html
├── credits.html
├── examples.html
├── Facharbeit_Website.iml
├── global.html
├── index.html
├── js
│   ├── example.js
│   ├── global.js
│   ├── index.js
│   ├── jquery-3.6.3.min.js
│   ├── marked.min.js
│   └── modal.js
├── media
│   ├── examples
│   │   ├── Example1.md
│   │   └── Example2.md
│   ├── favicon.png
│   ├── languages
│   │   ├── Gnu-bash.svg
│   │   ├── HTML5.svg
│   │   ├── JavaScript.svg
│   │   ├── Java.svg
│   │   ├── Kotlin.svg
│   │   ├── MongoDB.svg
│   │   └── Redis.svg
│   ├── logo.png
│   └── others
│       └── Silhouette.png
├── package.json
├── package-lock.json
├── README.md
├── README.pdf
├── start.bat
├── start.sh
└── style
    ├── aboutus.css
    ├── credits.css
    ├── example.css
    ├── global.css
    ├── highlight-js.css
    ├── index.css
    └── modal.css
```

## Wichtiges

#### Sprache

Ich habe die ganze Seite im Englischen geschrieben, da ich es für sinnvoller halte, um dies mehr zum Programmieren anzupassen, welche hauptsächlich auch in dieser Sprache bearbeitet, besprochen und vergleicht wird. <br>
Es gab von ihnen keine Vorschrift, weshalb ich denke, das dies erlaubt sei. <br>

#### Ansehen der Seite

Aufgrund meiner Vorgehensweise ist es nicht möglich, die Dateien selbst im Browser anzusehen, weil aufgrund von einem Sicherheitsproblem dies blockiert ist (CORS).

Deshalb müssten sie einen einfachen Server aufsetzen, was sie mit meiner mitgegeben `start.bat` (linux `start.sh`) ansehen können. <br>
Dafür bräuchten sie jedoch auf Python 3.0 oder höher.

Wenn dies nicht möglich ist, können sie jederzeit auf [der von Github (immer aktuellen) Webseite gehen](https://steingaming.github.io/FacharbeitWebseite/).

#### Ansehen der Dateien

**Wenn sie diese Datei bei der von mir angehängten lesen, dann dies bitte durchlesen.
Sonst können sie diesen Teil überspringen und [hier](#ansehen-der-markdown-dateien) gehen.**

Sie haben 2 Möglichkeiten die Dateien anzusehen:

1. Sie können die von mir angehängte .zip Datei entpacken und diese nutzen
2. Sie können auf [meiner Github Repository](https://github.com/SteinGaming/FacharbeitWebseite) gehen und dort die Dateien anschauen und herunterladen

#### Ansehen der Markdown Dateien

Markdown Dateien (`.md`) werden oft in diesem Projekt benutzt, um genauer zu sein, in den Beispielen und bei dieser Datei. <br>
Diese können sie entweder auf Github ansehen, oder sie können sie mit einem Markdown Viewer (entweder im Internet oder eine App) ansehen.

## Vorgehensweise

<br>
<ins>

### 1. Idee
</ins>
Die Idee war es, eine Website zu erstellen, welche die Auftragsprogrammierung anbietet. <br>
Dabei zeige ich Beispiele, die Personen hinter dieser "Firma" (ich) und Kontaktmöglichkeiten zum Bewerben und Beauftragen. <br>
Den Firmennamen und das Logo habe ich mit der Seite https://brandmark.io generiert, wobei ich die Stichwörter "contracted-coding programming" angegeben habe. <br>
Das Logo: <br>

![Logo](media/logo.png)

<ins>

### 2. Planung
</ins>
Die Webseite hat 2 Teile: Die globale Sektion und die unterteile Sektionen.

#### Globale Sektion

Die globale Sektion ist die Sektion, welche auf jeder Seite zu sehen ist. <br>
Diese existiert, um Repetition zu vermeiden. <br>
Bei der globalen Sektion gibt es 2 Teile: das Logo und die Navigationsleiste. <br>
Mit der Navigationsleiste kann man von Seite zu Seite wechseln.

#### Untersektionen

Die Untersektionen sind die Sektionen, wo der Inhalt zu sehen ist (z. B. die Hauptseite und die Beispielseite).

<ins>

### 3. Umsetzung
</ins>
Die Umsetzung ist in 3 Teile unterteilt: HTML, CSS und JavaScript.
<br><br>

### HTML

HTML wurde verwendet, um die Struktur der Seite zu erstellen. <br>
Dort habe ich die Implementation der Sektionen eingeführt. <br>
Die globale Sektion ist in jeder Seite vorhanden, wobei die Untersektionen nur in der jeweiligen Seite vorhanden sind. <br>
Bei jeder Seite wurden die Dateien [`global.css (style/)`](#css) und [`global.js (js/)`](#javascript) eingebunden, welche die globale Sektion implementieren. <br>
`global.js` nutzt dann die Gelegenheit, um die `global.html` in die div mit der id "includedContent" und die Fußzeile in den footer mit der id "footer" zu injizieren <br>
Die Dateien sind in dem Hauptverzeichnis mit der Erweiterung `.html` zu finden.

### CSS

CSS wurde verwendet, um die [HTML Dateien](#html) zu stylen. <br>
Die Dateien sind unter dem Verzeichnis `style/` mit der Erweiterung `.css` zu finden. <br>

### JavaScript

JavaScript wurde verwendet, um die [HTML Dateien](#html) zu interagieren. <br>
Diese wurden bei diesem Projekt besonders viel für Animationen, Integrationen und modalen Fenster verwendet. <br>
Die Dateien sind unter dem Verzeichnis `js/` mit der Erweiterung `.js` zu finden. <br>

#### Bibliotheken

Dieses Projekt nutzt 3 Bibliotheken:

1. [jQuery](https://jquery.com/)
2. [marked.js](https://marked.js.org/)
3. [highlight.js](https://highlightjs.org/)

##### jQuery

Dieses Projekt nutzt JQuery in der Version 3.6.3, welche im Pfad `js/jquery-3.6.3.min.js` zu finden ist. <br>
Ich habe diese hinzugefügt, um die HTML Elemente einfacher zu manipulieren. <br>
Dieses Projekt nutzt JQuery nur für die Animationen und die Integrationen. <br>
Ich nutze die Funktion `$("#includedContent").load("global.html")` (Zeile 7 von `js/global.js`) bei jeder Seite, um die `global.html` Datei in jede Seite einzubinden. <br>
Dafür besitzt jede Datei eine `div` mit der ID `includedContent`, wo die `global.html` eingefügt wird. <br>

JQuery wird auch für die Animationen verwendet, da ich diese einfacher finde als die `transition` von css. <br>

##### marked.js und highlight.js

Diese Bibliotheken wurden verwendet, um die Beispiele zu rendern. <br>
Dabei nutze ich `marked.js` um die Markdown Dateien in HTML zu rendern und `highlight.js` um die Syntax zu highlighten. <br>
Diese Bibliotheken werden _**nur**_ in der `example.html` Datei verwendet. <br>
Da der normale highlighting-style von `highlight.js` nicht zu meinem Design passt, habe ich eine eigene erstellt (`style/highlight-js.css`). <br>

<ins>

### 4. Komponente
</ins>

### Global

Beim Vorgehen an die Färbung der Seite habe ich mich für dunklere Farben entschieden, da diese leichter zu lesen sind und die Augen weniger belasten. <br>
Um verschiedene Breiten zu unterstützen, habe ich die Seite responsive gestaltet, wobei jedoch eine minimale Breite von 720px trotzdem empfohlen ist. <br>
Auf jeder Seite gibt es einen Header, wo zur linken ein Logo ist und zur rechten mehrere Weiterleitungen, und eine Fußzeile, wo man eine Weiterleitung zu den [Credits](#credits-impressum-der-ressourcen) findet.

### Hauptseite

Die Hauptseite besteht nur aus dem globalen Teil und dem Inhalt. <br>
Der Inhalt besitzt nur einen Header und einen Text, wobei der Text nur eine Beschreibung der "Firma" ist. <br>
Dazu gibt es Bilder (`media/languages`), die von `js/index.js` geladen werden. <br>
Urheberrecht ist bei [den Credits](#credits-impressum-der-ressourcen) zu finden. <br>

### Über uns

Bei dieser Seite werden die Personen gelistet, welche hinter dieser "Firma" stehen (nur ich). <br>
Dabei wird jeder Person ein Bild, ein Name und eine Beschreibung (Hintergrund im Programmieren) angezeigt. <br>
Als letztes Element wird eine Silhouette von einer Person

### Unsere Beispiele

Bei dieser Seite werden die Beispiele gelistet, welche ich in meiner Zeit als Programmierer erstellt habe. <br>
Diese werden in dem Ordner `media/examples/` als Markdown Dateien gespeichert, welche dann mithilfe von `marked.js` und `highlight.js` gerendert werden. <br>
Diese sind in der `example.js` als Liste abgespeichert. <br>
Dabei wird eine Beschreibung und der Code angezeigt. <br>
Oben rechts befindet sich ein Knopf, um das Beispiel in einem modalen Fenster zu öffnen. <br>
Wenn man außerhalb des Inhalts des modalen Fensters oder auf das obere rechte X klickt, wird dieses geschlossen. <br>

### Kontakt & Bewerbung

Da dieses Projekt ohne Backend fungiert, werden die Daten nicht gespeichert. <br>
Deshalb habe ich für Kontakt eine Weiterleitung zu meiner privaten E-Mail-Adresse und für Bewerbung eine Weiterleitung zu einem Google Form erstellt. <br>
AKTUALISIERUNG 8. JAN: Nun ist Kontakt eine Modal, wo die E-Mail-Adresse angezeigt wird. <br>
Dies wurde hinzugefügt für Geräte, die keine mailto: Links unterstützen. <br>

### Credits (Impressum der Ressourcen)
Hier findet man Informationen zu den Ressourcen, welche ich für das Erstellen dieser Webseite benutzt habe (Hauptsächlich der Bilder auf der [Hauptseite](#hauptseite)). <br>

## Fazit


Ich habe sehr viele Informationen ausgelassen, weshalb ich ihnen empfehle, sich die Dateien genau anzuschauen. <br>
Bei Nachfragen können sie mich jederzeit über IServ kontaktieren. <br>
