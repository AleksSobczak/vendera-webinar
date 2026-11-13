# Vendera Live-Workshop 29.11.

Statische Seiten für workshop.vendera-sales.de (GitHub Pages).

- `index.html`: Anmeldeseite
- `aufzeichnung.html`: Seite für die Aufzeichnung. Vor dem 29.11., 12:30 Uhr zählt sie bis zum Workshop herunter, danach bis zum Ende der Aufzeichnung, ab 2.12., 23:59 Uhr zeigt sie automatisch "offline"
- `img/og.png`: Vorschaubild für WhatsApp und Social Media

## Einstellungen

Oben in beiden HTML-Dateien steht ein Block `window.VENDERA = { ... }`. Nur dort eintragen:

| Feld | Datei | Wofür |
|---|---|---|
| `formEndpoint` | index | Eingang des Vendera-CRM (Supabase Edge Function `vendera-intake`). Speichert Anmeldung, Segment und anonyme Seitenaufrufe. |
| `whatsappLink` | index | Einladungslink der WhatsApp-Community (erscheint nach der Anmeldung) |
| `metaPixelId` | index | Meta-Pixel, lädt erst nach Zustimmung, sendet `Lead` bei Anmeldung |
| `videoUrl` | index | Einladungsvideo von Sarah (Embed-Link), Block bleibt sonst ausgeblendet |
| `replayUrl` | aufzeichnung | Embed-Link der Aufzeichnung |
| `buchungslink` | aufzeichnung | Calendly-Link zur Strategie-Session |
| `formEndpoint` | aufzeichnung | zählt anonym `replay_vorab`, `replay_view` und `buchung_klick` im Vendera-CRM |
| `metaPixelId` | aufzeichnung | wie auf der Anmeldeseite, sendet zusätzlich `Schedule` beim Klick auf Buchen |
| `geschenk` | aufzeichnung | nur ausfüllen, wenn es ein echtes Geschenk fürs Buchen gibt. Erscheint dann in der Buchungskarte |
| `plaetze` | aufzeichnung | nur ausfüllen, wenn es eine echte Begrenzung gibt. Erscheint dann in der Buchungskarte |
| `impressumUrl`, `datenschutzUrl` | beide | Rechtliche Links im Footer |

## Links in den E-Mails zur Aufzeichnung

`https://workshop.vendera-sales.de/aufzeichnung.html?vorname={{contact.FIRSTNAME}}&email={{contact.EMAIL}}&utm_source=brevo&utm_content=<mail>`

Vorname und E-Mail werden dann im Calendly-Formular vorausgefüllt, `utm_source`, `utm_campaign` und `utm_content` gehen an Calendly weiter.

## Fotos

Logo, Sarahs Foto und die Profilbilder der Kundinnen werden direkt aus dem Quiz-Funnel geladen (perspective.imgix.net). Werden die Bilder dort gelöscht, zeigt die Seite stattdessen die Inhaltskarte bzw. blendet Porträt und Profilbilder aus.

## Daten, die das Formular sendet

`{typ:"anmeldung", vorname, email, telefon, einwilligung, zeitpunkt, webinar, seite, herkunft:{utm_*, fbclid}}`
und nach dem Klick auf die Zusatzfrage `{typ:"segment", email, segment}` mit `eigenes-angebot` ("Ja, für mein eigenes Angebot"), `closerin` ("Ja, für andere") oder `einstieg` ("Noch nicht"). Die Frage lautet "Führst du gerade Verkaufsgespräche?". `ohne-kooperation` wird seit 13.11. nicht mehr angeboten.
