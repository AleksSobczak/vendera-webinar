# Vendera Live-Workshop 29.11.

Statische Seiten für workshop.vendera-sales.de (GitHub Pages).

- `index.html`: Anmeldeseite
- `aufzeichnung.html`: Seite für die Aufzeichnung (zeigt ab 2.12., 23:59 Uhr automatisch "offline")
- `img/og.png`: Vorschaubild für WhatsApp und Social Media

## Einstellungen

Oben in beiden HTML-Dateien steht ein Block `window.VENDERA = { ... }`. Nur dort eintragen:

| Feld | Datei | Wofür |
|---|---|---|
| `formEndpoint` | index | Webhook, an den die Anmeldung geht (JSON als Text). **Solange leer, wird keine Anmeldung gespeichert.** |
| `whatsappLink` | index | Einladungslink der WhatsApp-Community (erscheint nach der Anmeldung) |
| `metaPixelId` | index | Meta-Pixel, lädt erst nach Zustimmung, sendet `Lead` bei Anmeldung |
| `videoUrl` | index | Einladungsvideo von Sarah (Embed-Link), Block bleibt sonst ausgeblendet |
| `replayUrl` | aufzeichnung | Embed-Link der Aufzeichnung |
| `buchungslink` | aufzeichnung | Calendly-Link zur Strategie-Session |
| `impressumUrl`, `datenschutzUrl` | beide | Rechtliche Links im Footer |

## Fotos

`img/sarah-hero.jpg` (Hochformat 4:5) und `img/sarah-portrait.jpg` (quadratisch) hochladen. Fehlen die Dateien, zeigt die Seite stattdessen die Inhaltskarte bzw. blendet das Porträt aus.

## Daten, die das Formular sendet

`{typ:"anmeldung", vorname, email, telefon, einwilligung, zeitpunkt, webinar, seite, herkunft:{utm_*, fbclid}}`
und nach dem Klick auf die Zusatzfrage `{typ:"segment", email, segment}` mit `closerin`, `eigenes-angebot`, `ohne-kooperation` oder `einstieg`.
