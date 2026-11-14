# Ask the Stars

A personal astrology website: professional paid-consultation presentation,
daily, weekly and monthly horoscopes, zodiac sign readings, Western and Vedic
birth chart calculators, moon phases, Mercury retrograde dates, short articles
explaining transits, and a consultation request form. Built as a standalone
static site — no build step, no server required.

## What's on the site

- **Ask the stars hero** — a professional first page for a paid consultation
  service: a clear value proposition (a personal written answer, prepared for
  you, not from a template), a trust strip stating only service facts, a
  three-step "How it works" section, and a "Readings & services" section with
  three options (Single Question, A Deeper Reading, Birth Chart Reading).
  No prices are shown; pricing is confirmed personally before any payment.
- **Horoscopes** — Daily, Weekly, and Monthly tabs for all 12 signs. Daily
  readings rotate by date, weekly readings stay the same within a calendar
  week, and monthly readings within a calendar month. Each card shows the
  sign, its dates, a reading, a mood, and a lucky number.
- **The twelve signs** — tap any sign for its dates, element, ruling planet,
  traits, and a short reading.
- **Birth chart calculator** — Western (tropical) astrology. Enter a birth
  date, time, place, and time zone (familiar abbreviations such as IST, EST,
  CST, with region and UTC offset, including daylight variants) to get Sun,
  Moon, and rising signs with short meanings. The Sun sign is calculated from
  the birth date; Moon and rising use simplified calculations and are
  labelled approximate.
- **Kundali generator** — Vedic (sidereal) astrology, separate from the
  Western calculator, with a note that the two systems can differ. Enter a
  date, time, and place of birth, a time zone, and optional latitude/longitude
  to get the Lagna (ascendant), Moon sign (Rashi), Nakshatra with pada and
  lord, all nine planets by sign and house, a North Indian diamond-style
  chart, and approximate Vimshottari dasha periods. Well-known birthplaces
  are recognised automatically and their real coordinates used; otherwise the
  Lagna falls back to a time-zone-meridian estimate with a plain warning.
  Without a birth time, the Lagna cannot be determined and houses are not
  shown.
- **Moon phases** — tonight's phase name, approximate illumination, Moon age,
  next full and new moon dates, and the next four quarter events, computed
  from the 29.53-day lunar cycle. Approximate.
- **Mercury retrograde** — the current status plus the verified 2026–2027
  date table with signs, and a short explanation of what a retrograde means
  in astrological tradition. Dates are UTC; local dates can shift by a day.
- **Understanding transits** — six short articles: What is a transit?,
  Mercury retrograde explained, Saturn return, Jupiter transits, Venus
  retrograde, and Full Moon vs New Moon. Accurate general concepts, framed
  as entertainment and reflection, not prediction or advice.
- **Request a consultation** — a form collecting name, email, optional phone
  number, category (love, career, money, health, general), optional birth
  date/time/place, and a description of the situation or question. On submit
  it validates, saves the request in the browser, and confirms that a reply
  will be sent to the visitor's email, with pricing confirmed personally
  first. A "your questions on this device" list shows saved requests.
- **FAQ** — how consultations work, payment, timing, privacy, the
  Western/Vedic difference, calculator accuracy, and a clear
  "for entertainment only" note: readings are not medical, financial, or
  legal advice.
- **About** — a short introduction to the site.

## Files

| File | What it does |
| --- | --- |
| `index.html` | Page structure and content |
| `styles.css` | All styling: lighter night-sky theme (sky-blue gradient, stars, soft clouds, CSS only) with navy and gold accents |
| `app.js` | Zodiac data, horoscope rotation, calculators, moon phases, Mercury retrograde, kundali chart, and the consultation form |
| `README.md` | This file |

## How to view it

Open `index.html` in any browser — that's it. To publish it on the web, enable
GitHub Pages for this repository (Settings → Pages → deploy from the `main`
branch) and share the resulting link.

## A note on the consultation form

In this standalone version, submitted requests are saved in the visitor's own
browser (local storage), so they stay on that device and are not sent anywhere.
A future version with a server could collect requests centrally, notify the
owner by email, and show them in an inbox for answering.

## Approximation notes

The calculators use simplified astronomical methods (orbital elements with
lunar perturbation terms, and a Lahiri ayanamsa approximation for the
kundali). They were checked against Swiss Ephemeris data for a 1973 test case
and matched within about a third of a degree, but bodies near a sign or
nakshatra boundary can flip to the neighbouring sign, and the Lagna depends
on an accurate birth time and place. Results are labelled approximate
throughout. A professional reading uses precise ephemeris data and the exact
birth time. Moon phase times are approximate and can be off by up to a day.

## Disclaimer

Readings on this site are for entertainment and reflection only. They are not
medical, financial, or legal advice. Always trust your own judgment — and a
qualified professional — for important decisions.
