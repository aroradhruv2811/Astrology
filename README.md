# Ask the Stars

A personal astrology website: professional paid-consultation presentation,
daily, weekly and monthly horoscopes, zodiac sign readings, moon phases,
Mercury retrograde dates, short articles explaining transits, and a
consultation request form. Built as a standalone
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
  date/time/place/state, and a description of the situation or question. On submit
  it validates, saves the request in the browser, and confirms that a reply
  will be sent to the visitor's email, with pricing confirmed personally
  first. A "your questions on this device" list shows saved requests.
- **FAQ** — how consultations work, payment, timing, privacy, and a clear
  "for entertainment only" note: readings are not medical, financial, or
  legal advice.
- **About** — a short introduction to the site.

## Files

| File | What it does |
| --- | --- |
| `index.html` | Page structure and content |
| `styles.css` | All styling: lighter night-sky theme (sky-blue gradient, stars, soft clouds, CSS only) with navy and gold accents |
| `app.js` | Zodiac data, horoscope rotation, moon phases, Mercury retrograde, and the consultation form |
| `README.md` | This file |

## How to view it

Open `index.html` in any browser — that's it. To publish it on the web, enable
GitHub Pages for this repository (Settings → Pages → deploy from the `main`
branch) and share the resulting link.

## A note on the consultation form

When hosted on Netlify, submitted requests are sent through Netlify Forms:
each submission is stored in the site's Netlify dashboard and, once an email
notification is configured there, forwarded to the owner's email address. A
copy is also kept in the visitor's own browser (local storage) so they can
see their requests on that device. When the site is opened anywhere else
(for example from a local file), the send step cannot run and the form asks
the visitor to try again.

## Approximation notes

Moon phase times are approximate and can be off by up to a day. A professional
reading uses precise ephemeris data and the exact birth time.

## Disclaimer

Readings on this site are for entertainment and reflection only. They are not
medical, financial, or legal advice. Always trust your own judgment — and a
qualified professional — for important decisions.
