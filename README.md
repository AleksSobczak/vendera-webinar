# Vendera Live-Workshop 29.11.

Statische Seiten für workshop.vendera-sales.de (GitHub Pages).

- `index.html`: Anmeldeseite
- `danke.html`: Danke-Seite nach Fynns Aufbau. Das Formular leitet nach erfolgreicher Anmeldung dorthin weiter (UTM-Parameter gehen mit, Vorname und E-Mail nur über sessionStorage, nicht in der Adresse). Einstellungen oben in der Datei: `whatsappLink`, `mailAktiv`, `metaPixelId`. Das Meta-Ereignis `Lead` wird hier gesendet. Ereignisse im CRM: `danke_view`, `danke_kalender`, `danke_whatsapp`; die Frage "Führst du gerade Verkaufsgespräche?" steht jetzt hier
- `live.html`: fester Link zum Live-Raum (workshop.vendera-sales.de/live), steht in allen Kalendereinträgen. Oben in der Datei `liveUrl` eintragen, dann leitet die Seite sofort dorthin weiter. Leer zeigt sie einen Hinweis, dass der Raum am Sonntagmorgen freigeschaltet wird
- `kalender.html`, `workshop.ics`: Termin für Google, Apple und Outlook, mit dem Link /live in Beschreibung und Ort
- `aufzeichnung.html`: Seite für die Aufzeichnung. Vor dem 29.11., 12:30 Uhr zählt sie bis zum Workshop herunter, danach bis zum Ende der Aufzeichnung, ab 2.12., 23:59 Uhr zeigt sie automatisch "offline"
- `assets/vendera.css`: gemeinsames Design beider Seiten (dunkel, Gold als Akzent). Die Akzentfarbe steht oben in `--acc`, `--acc-hi`, `--acc-lo`
- Nach Änderungen an `assets/` die Versionsnummer `?v=` in beiden HTML-Dateien hochzählen, sonst zeigen Browser bis zu 10 Minuten die alte Datei
- `assets/kundinnen.js`: Kundinnen-Ergebnisse für beide Seiten (Foto, Zitat, optional Video-Link)
- `img/og-magic-script.jpg`: Vorschaubild für WhatsApp und Social Media (seit 27.11. im Look der Anmeldeseite). Bei einem neuen Bild neuen Dateinamen vergeben, sonst zeigt WhatsApp das alte aus dem Zwischenspeicher

## Einstellungen

Oben in beiden HTML-Dateien steht ein Block `window.VENDERA = { ... }`. Nur dort eintragen:

| Feld | Datei | Wofür |
|---|---|---|
| `formEndpoint` | index | Eingang des Vendera-CRM (Supabase Edge Function `vendera-intake`). Speichert Anmeldung, Segment und anonyme Seitenaufrufe. |
| `whatsappLink` | danke | Einladungslink der WhatsApp-Community (erscheint nach der Anmeldung) |
| `metaPixelId` | index | Meta-Pixel, lädt erst nach Zustimmung, sendet `Lead` bei Anmeldung |
| `replayUrl` | aufzeichnung | Embed-Link der Aufzeichnung |
| `buchungslink` | aufzeichnung | Calendly-Link zur Strategie-Session |
| `formEndpoint` | aufzeichnung | zählt anonym `replay_vorab`, `replay_view` und `buchung_klick` im Vendera-CRM |
| `metaPixelId` | aufzeichnung | wie auf der Anmeldeseite, sendet zusätzlich `Schedule` beim Klick auf Buchen |
| `geschenk` | aufzeichnung | nur ausfüllen, wenn es ein echtes Geschenk fürs Buchen gibt. Erscheint dann in der Buchungskarte |
| `plaetze` | aufzeichnung | nur ausfüllen, wenn es eine echte Begrenzung gibt. Erscheint dann in der Buchungskarte |
| `impressumUrl`, `datenschutzUrl` | beide | Rechtliche Links im Footer |

## Links in den E-Mails zur Aufzeichnung

`https://workshop.vendera-sales.de/aufzeichnung?vorname={{contact.FIRSTNAME}}&email={{contact.EMAIL}}&utm_source=brevo&utm_content=<mail>`

Vorname und E-Mail werden dann im Calendly-Formular vorausgefüllt, `utm_source`, `utm_campaign` und `utm_content` gehen an Calendly weiter.

## Formular

Alle Buttons auf der Anmeldeseite öffnen das Formular als Popup. `workshop.vendera-sales.de/#anmelden` öffnet es direkt. Zusätzliches Ereignis: `form_open`.

## Fotos

Logo, Sarahs Foto und die Profilbilder der Kundinnen werden direkt aus dem Quiz-Funnel geladen (perspective.imgix.net). Werden die Bilder dort gelöscht, zeigt die Seite stattdessen die Inhaltskarte bzw. blendet Porträt und Profilbilder aus.

## Daten, die das Formular sendet

`{typ:"anmeldung", vorname, email, telefon, einwilligung, zeitpunkt, webinar, seite, herkunft:{utm_*, fbclid}}`
und nach dem Klick auf die Zusatzfrage `{typ:"segment", email, segment}` mit `eigenes-angebot` ("Ja, für mein eigenes Angebot"), `closerin` ("Ja, für andere") oder `einstieg` ("Noch nicht"). Die Frage lautet "Führst du gerade Verkaufsgespräche?". `ohne-kooperation` wird seit 13.11. nicht mehr angeboten.

## Videos

Eigener Player ohne Fremdanbieter (`assets/vplayer.js`, `assets/vplayer.css`), Vorbild joinsmoof.com. Videos liegen als MP4 in `assets/video/` (Einladung auf der Anmeldeseite, Danke-Video auf der Danke-Seite), Vorschaubild jeweils `*-poster.jpg`. Das Video lädt erst beim Klick auf Play. Ereignisse im CRM: `video_<name>_play`, `_25`, `_50`, `_75`, `_95`, `_ende`. Neues Video: Datei ersetzen und `?v=` im `data-src-720`-Attribut hochzählen. GitHub Pages erlaubt höchstens 100 MB pro Datei, die Aufzeichnung des Workshops muss deshalb woanders liegen.
