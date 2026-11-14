# Ask the Stars

A small astrology website: daily horoscopes, zodiac sign readings, and a place
for visitors to ask questions. Built as a standalone static site — no build
step, no server required.

## What's on the site

- **Ask the stars hero** — dark navy and gold design, mobile-first.
- **Today's horoscopes** — a fresh reading for all 12 signs that changes daily
  (readings rotate by date, so no backend is needed).
- **The twelve signs** — tap any sign for its dates, element, ruling planet,
  traits, and a short reading.
- **Ask a question** — a form with optional name, birth date/time/place,
  category (love, career, money, health, general), and the question itself.
- **FAQ** — how questions are answered, privacy, and a clear
  "for entertainment only" note: readings are not medical, financial, or
  legal advice.
- **About** — a short introduction to the site.

## Files

| File | What it does |
| --- | --- |
| `index.html` | Page structure and content |
| `styles.css` | All styling (dark navy / gold theme) |
| `app.js` | Zodiac data, daily horoscope rotation, sign details, and the question form |
| `README.md` | This file |

## How to view it

Open `index.html` in any browser — that's it. To publish it on the web, enable
GitHub Pages for this repository (Settings → Pages → deploy from the `main`
branch) and share the resulting link.

## A note on the question form

In this standalone version, submitted questions are saved in the visitor's own
browser (local storage), so they stay on that device and are not sent anywhere.
A future version with a server could collect questions centrally and show them
in an inbox for answering.

## Disclaimer

Readings on this site are for entertainment and reflection only. They are not
medical, financial, or legal advice. Always trust your own judgment — and a
qualified professional — for important decisions.
