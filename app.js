/* Ask the Stars — zodiac data, horoscopes, moon phases,
   Mercury retrograde, and the consultation form.
   Readings are for reflection only. */

"use strict";

/* Text-presentation variation selector keeps zodiac glyphs in gold text style
   instead of rendering as colored emoji on some platforms. */
const VS = "\uFE0E";

const SIGNS = [
  {
    name: "Aries", glyph: "\u2648", dates: "Mar 21 – Apr 19", element: "Fire", ruler: "Mars",
    traits: "Bold, energetic, independent",
    readings: [
      "A conversation you have been putting off goes better than expected. Say the first sentence and let the rest follow.",
      "Your energy is high today — point it at one thing that matters instead of five things that don't.",
      "A small win early in the day sets the tone. Notice it, and let it carry you through the afternoon."
    ],
    periodReadings: [
      "Momentum is on your side. Start the thing you keep circling, and let the details catch up later.",
      "A bold ask gets a better answer than a careful hint. Be direct about what you want.",
      "Rest is not retreat. A slower stretch now keeps your energy strong for what comes next."
    ]
  },
  {
    name: "Taurus", glyph: "\u2649", dates: "Apr 20 – May 20", element: "Earth", ruler: "Venus",
    traits: "Patient, loyal, grounded",
    readings: [
      "Something you built slowly is ready to be shown. Resist the urge to polish it for one more week.",
      "A practical decision today saves you a headache later. Choose the steady option, not the flashy one.",
      "Comfort matters, but so does movement. Take one small step outside your usual routine."
    ],
    periodReadings: [
      "Slow and steady is not slow at all — it is how the important things get finished.",
      "Money and comfort deserve a calm review. Small adjustments now prevent bigger ones later.",
      "Loyalty is returned in kind. Notice who shows up, and let yourself lean on them."
    ]
  },
  {
    name: "Gemini", glyph: "\u264A", dates: "May 21 – Jun 20", element: "Air", ruler: "Mercury",
    traits: "Curious, adaptable, quick-witted",
    readings: [
      "You will hear two versions of the same story today. The truth is somewhere in the middle — ask one more question.",
      "An idea that seemed small this morning grows legs by evening. Write it down before it wanders off.",
      "Your words land well today. Use them kindly, especially with someone who is listening more than speaking."
    ],
    periodReadings: [
      "Curiosity pays off. Follow the question that keeps nagging you — it leads somewhere useful.",
      "Two good options are not a problem. Pick the one you would enjoy explaining to a friend.",
      "A conversation changes your mind in a good way. Stay open to being persuaded."
    ]
  },
  {
    name: "Cancer", glyph: "\u264B", dates: "Jun 21 – Jul 22", element: "Water", ruler: "Moon",
    traits: "Caring, intuitive, protective",
    readings: [
      "Your instincts about a person are sharper than usual. Trust the quiet feeling, not the loud argument.",
      "Home and the people in it need a little of your attention today. A small gesture goes a long way.",
      "You have been carrying something that isn't yours to carry. Today is a good day to set it down gently."
    ],
    periodReadings: [
      "Your home life asks for a decision you have been delaying. Make it kindly, and make it once.",
      "A family pattern becomes clear. Seeing it is the first step; you do not have to fix it all at once.",
      "Protect your energy like you protect others. Saying no to one thing is saying yes to yourself."
    ]
  },
  {
    name: "Leo", glyph: "\u264C", dates: "Jul 23 – Aug 22", element: "Fire", ruler: "Sun",
    traits: "Confident, warm, generous",
    readings: [
      "The room is paying attention — say the thing you actually think, not the safe version of it.",
      "Generosity comes back to you today, possibly from an unexpected direction. Accept it gracefully.",
      "A creative project deserves an hour of your best energy, not the leftovers of your day. Give it the morning."
    ],
    periodReadings: [
      "A stage, literal or not, is waiting. Take the opportunity to be seen doing what you do well.",
      "Praise you receive now is sincere. Accept it without deflecting — it took work to earn.",
      "A creative idea deserves a proper hearing. Present it to someone whose opinion you respect."
    ]
  },
  {
    name: "Virgo", glyph: "\u264D", dates: "Aug 23 – Sep 22", element: "Earth", ruler: "Mercury",
    traits: "Thoughtful, precise, helpful",
    readings: [
      "The detail everyone else missed is the one you catch. Speak up — it matters more than you think.",
      "Order returns to something that felt messy. Don't rush the last 10%; the finish is the point.",
      "Helping someone today teaches you something about your own plans. Listen while you help."
    ],
    periodReadings: [
      "A system you set up starts paying for itself. Let it run, and resist the urge to rebuild it.",
      "Good enough is good enough this time. Ship it, send it, or say it, and move on.",
      "Your help is wanted, not just needed. Offer it where it will actually be received."
    ]
  },
  {
    name: "Libra", glyph: "\u264E", dates: "Sep 23 – Oct 22", element: "Air", ruler: "Venus",
    traits: "Fair, charming, peace-loving",
    readings: [
      "A decision you have been weighing finally tips. The scale was never as balanced as it looked.",
      "Harmony is worth something, but not everything. One honest disagreement today clears the air for weeks.",
      "Beauty and order around you lift your mood more than you expect. Tidy one corner and see."
    ],
    periodReadings: [
      "A relationship finds a fairer balance. The conversation is easier than you feared.",
      "A choice between two good things resolves itself if you stop forcing it. Give it a little more time.",
      "Your eye for what works makes a shared space better. Offer the suggestion — it will land well."
    ]
  },
  {
    name: "Scorpio", glyph: "\u264F", dates: "Oct 23 – Nov 21", element: "Water", ruler: "Pluto",
    traits: "Intense, focused, determined",
    readings: [
      "Something hidden comes to light — not a scandal, just a fact that changes the shape of a plan. Good.",
      "Your focus is a superpower today. Aim it at the task you've been circling and watch it fall.",
      "A private conversation holds more truth than the public one. Seek out the quieter room."
    ],
    periodReadings: [
      "A long game you have been playing quietly reaches a turning point. Stay patient a little longer.",
      "Letting go of one grudge frees more energy than you expect. Try it and see how it feels.",
      "Depth beats breadth right now. One real connection is worth ten polite ones."
    ]
  },
  {
    name: "Sagittarius", glyph: "\u2650", dates: "Nov 22 – Dec 21", element: "Fire", ruler: "Jupiter",
    traits: "Honest, adventurous, optimistic",
    readings: [
      "A plan to go somewhere — a place, a project, a conversation — deserves a date on the calendar, not just a wish.",
      "Your honesty lands well today, as long as you pair it with timing. Wait for the right hour, then be direct.",
      "Something you learn by accident turns out to be the most useful thing all week. Stay curious."
    ],
    periodReadings: [
      "A bigger horizon opens up — a course, a trip, a new field. Sign up before the doubt talks you out of it.",
      "Your optimism is contagious right now. Use it on someone who needs it, including yourself.",
      "A belief you outgrew is ready to be replaced. The new one is already forming — let it."
    ]
  },
  {
    name: "Capricorn", glyph: "\u2651", dates: "Dec 22 – Jan 19", element: "Earth", ruler: "Saturn",
    traits: "Steady, ambitious, disciplined",
    readings: [
      "The long game is paying off in a way that's easy to miss. Look back three months and measure honestly.",
      "Someone senior notices your consistency today. You don't need to perform — just keep doing the work.",
      "Rest is part of the plan, not a break from it. Schedule it like you schedule everything else."
    ],
    periodReadings: [
      "A goal that felt distant moves within reach. Break the next step into something you can do this week.",
      "Recognition comes quietly — a door opening, not applause. Walk through it.",
      "A boundary you set holds. That is not coldness; it is how the work gets done."
    ]
  },
  {
    name: "Aquarius", glyph: "\u2652", dates: "Jan 20 – Feb 18", element: "Air", ruler: "Uranus",
    traits: "Original, independent, humanitarian",
    readings: [
      "An unconventional idea finds its first supporter today. Don't water it down to win the second one.",
      "A group you belong to needs your particular way of seeing things. Speak in the meeting, not after it.",
      "Time alone recharges you faster than anything social today. Take the quiet hour without guilt."
    ],
    periodReadings: [
      "An idea that seemed too strange for the room turns out to be exactly what the room needed.",
      "A friendship deepens when you let someone see the unpolished version of your plans.",
      "Your independence is a strength, but one shared project benefits from letting others in."
    ]
  },
  {
    name: "Pisces", glyph: "\u2653", dates: "Feb 19 – Mar 20", element: "Water", ruler: "Neptune",
    traits: "Gentle, imaginative, compassionate",
    readings: [
      "A dream or daydream holds a useful clue. Write down what you remember before the day washes it away.",
      "Compassion is your default — today, aim a little of it at yourself. You have earned the same kindness you give.",
      "A creative thread you dropped months ago is worth picking up. It has been quietly maturing."
    ],
    periodReadings: [
      "A creative project moves from daydream to draft. Protect the first fragile version of it.",
      "Your intuition about a person proves right. Trust it earlier next time.",
      "A quiet retreat — even an afternoon — restores more than a busy weekend would."
    ]
  }
];

const MOODS = ["Steady", "Curious", "Bold", "Reflective", "Bright", "Calm", "Restless", "Hopeful"];

const SIGN_MEANINGS = [
  "Direct, energetic, and quick to act — momentum matters more than perfect plans.",
  "Steady, patient, and grounded — comfort, loyalty, and things built to last.",
  "Curious and quick-minded — variety, conversation, and learning keep life interesting.",
  "Sensitive and protective — home, family, and emotional safety come first.",
  "Warm, confident, and expressive — being seen and appreciated matters.",
  "Thoughtful and precise — order, usefulness, and getting the details right.",
  "Fair-minded and sociable — harmony, beauty, and good company.",
  "Intense and focused — depth, honesty, and all-or-nothing commitment.",
  "Honest and adventurous — freedom, meaning, and the bigger picture.",
  "Disciplined and ambitious — steady progress toward long-term goals.",
  "Original and independent — ideas, principles, and doing things differently.",
  "Gentle and imaginative — compassion, creativity, and quiet depth."
];


/* Mercury retrograde periods, verified against published ephemeris data
   (UTC; a station near midnight can fall on the neighbouring local date). */
const MERCURY_PERIODS = [
  { start: "2026-02-26", end: "2026-03-20", signs: "Pisces" },
  { start: "2026-06-29", end: "2026-07-23", signs: "Cancer" },
  { start: "2026-10-24", end: "2026-11-13", signs: "Scorpio" },
  { start: "2027-02-09", end: "2027-03-03", signs: "Pisces into Aquarius" },
  { start: "2027-06-10", end: "2027-07-04", signs: "Cancer into Gemini" },
  { start: "2027-10-07", end: "2027-10-28", signs: "Scorpio into Libra" }
];

const STORAGE_KEY = "ask-the-stars-questions";


/* ---------- Moon phases ---------- */

const SYNODIC_MONTH = 29.53059;
const NEW_MOON_JD = 2451550.26; /* New moon, 6 Jan 2000, 18:14 UTC */

function moonPhaseInfo(date) {
  const jd = date.getTime() / 86400000 + 2440587.5;
  let age = (jd - NEW_MOON_JD) % SYNODIC_MONTH;
  if (age < 0) age += SYNODIC_MONTH;
  const angle = age / SYNODIC_MONTH * 2 * Math.PI;
  const illumination = (1 - Math.cos(angle)) / 2;
  const eighth = SYNODIC_MONTH / 8;
  const names = ["New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous",
    "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent"];
  const phaseIndex = Math.floor(((age + eighth / 2) % SYNODIC_MONTH) / eighth);
  const quarterTargets = [
    { age: 0, name: "New Moon" }, { age: SYNODIC_MONTH * 0.25, name: "First Quarter" },
    { age: SYNODIC_MONTH * 0.5, name: "Full Moon" }, { age: SYNODIC_MONTH * 0.75, name: "Last Quarter" }
  ];
  const upcoming = [];
  for (let cycle = 0; cycle < 2 && upcoming.length < 4; cycle++) {
    for (const q of quarterTargets) {
      const targetAge = q.age + cycle * SYNODIC_MONTH;
      let delta = targetAge - age;
      if (delta <= 0.02) delta += SYNODIC_MONTH;
      upcoming.push({ name: q.name, date: new Date(date.getTime() + delta * 86400000) });
    }
  }
  upcoming.sort(function (a, b) { return a.date - b.date; });
  const nextFull = upcoming.filter(function (e) { return e.name === "Full Moon"; })[0];
  const nextNew = upcoming.filter(function (e) { return e.name === "New Moon"; })[0];
  return { age: age, phaseIndex: phaseIndex, phaseName: names[phaseIndex],
    illumination: illumination, angle: angle, nextFull: nextFull, nextNew: nextNew,
    upcoming: upcoming.slice(0, 4) };
}

/* ---------- Mercury retrograde status ---------- */

function mercuryStatus(today) {
  const todayMs = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  for (const p of MERCURY_PERIODS) {
    const s = Date.parse(p.start + "T00:00:00Z");
    const e = Date.parse(p.end + "T23:59:59Z");
    if (todayMs >= s && todayMs <= e) return { retrograde: true, period: p, next: null };
  }
  for (const p of MERCURY_PERIODS) {
    if (Date.parse(p.start + "T00:00:00Z") > todayMs) return { retrograde: false, period: null, next: p };
  }
  return { retrograde: false, period: null, next: null };
}

/* ================= Browser UI (guarded; skipped under Node) ================= */

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatDateLong(date) {
  return date.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

function formatDateShort(date) {
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

/* ---------- Horoscopes: Daily / Weekly / Monthly ---------- */

let horoscopePeriod = "daily";

function dayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date - start) / 86400000);
}

function mondayOf(date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const shift = (d.getDay() + 6) % 7; /* Monday = 0 */
  d.setDate(d.getDate() - shift);
  return d;
}

function periodSeed(signIndex, period, date) {
  if (period === "weekly") {
    const monday = mondayOf(date);
    return Math.floor(monday.getTime() / 86400000) + signIndex * 13;
  }
  if (period === "monthly") {
    return date.getFullYear() * 12 + date.getMonth() + signIndex * 11;
  }
  return dayOfYear(date) + signIndex * 7;
}

function readingFor(signIndex, period, date) {
  const sign = SIGNS[signIndex];
  const seed = periodSeed(signIndex, period, date);
  const pool = period === "daily" ? sign.readings : sign.periodReadings;
  return {
    text: pool[((seed % pool.length) + pool.length) % pool.length],
    luckyNumber: ((seed * 13) % 99 + 99) % 99 + 1,
    mood: MOODS[((seed % MOODS.length) + MOODS.length) % MOODS.length]
  };
}

function periodLabel(period, date) {
  if (period === "weekly") {
    const monday = mondayOf(date);
    const sunday = new Date(monday.getTime() + 6 * 86400000);
    return "Week of " + formatDateShort(monday) + " – " + formatDateShort(sunday) +
      " — the same reading all week.";
  }
  if (period === "monthly") {
    return date.toLocaleDateString(undefined, { month: "long", year: "numeric" }) +
      " — the same reading all month.";
  }
  return formatDateLong(date) + " — a fresh reading for every sign, updated daily.";
}

function renderHoroscopes() {
  const grid = document.getElementById("horoscope-grid");
  const today = new Date();
  document.getElementById("horoscope-period-label").textContent = periodLabel(horoscopePeriod, today);
  grid.innerHTML = SIGNS.map(function (sign, i) {
    const reading = readingFor(i, horoscopePeriod, today);
    return (
      "<article class='horoscope-card'>" +
        "<header><h3><span class='glyph' aria-hidden='true'>" + sign.glyph + VS + "</span> " +
        escapeHtml(sign.name) + "</h3><span class='dates'>" + escapeHtml(sign.dates) + "</span></header>" +
        "<p>" + escapeHtml(reading.text) + "</p>" +
        "<p class='lucky'>Mood: " + escapeHtml(reading.mood) +
        " &middot; Lucky number: " + reading.luckyNumber + "</p>" +
      "</article>"
    );
  }).join("");
}

function initHoroscopeTabs() {
  const tabs = document.querySelectorAll(".period-tab");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      horoscopePeriod = tab.getAttribute("data-period");
      tabs.forEach(function (t) { t.setAttribute("aria-selected", t === tab ? "true" : "false"); });
      renderHoroscopes();
    });
  });
  renderHoroscopes();
}

/* ---------- Zodiac grid + detail dialog ---------- */

let lastFocusedCard = null;

function renderZodiacGrid() {
  const grid = document.getElementById("zodiac-grid");
  grid.innerHTML = SIGNS.map(function (sign, i) {
    return "<button type='button' class='zodiac-card' data-sign='" + i + "'>" +
      "<span class='glyph' aria-hidden='true'>" + sign.glyph + VS + "</span>" +
      "<span class='sign-name'>" + escapeHtml(sign.name) + "</span>" +
      "<span class='sign-dates'>" + escapeHtml(sign.dates) + "</span>" +
    "</button>";
  }).join("");

  grid.addEventListener("click", function (event) {
    const card = event.target.closest(".zodiac-card");
    if (card) openDialog(Number(card.dataset.sign), card);
  });
}

function openDialog(signIndex, card) {
  const sign = SIGNS[signIndex];
  const reading = readingFor(signIndex, "daily", new Date());
  document.getElementById("dialog-sign-glyph").textContent = sign.glyph + VS;
  document.getElementById("dialog-sign-name").textContent = sign.name;
  document.getElementById("dialog-sign-dates").textContent = sign.dates;
  document.getElementById("dialog-sign-element").textContent = sign.element;
  document.getElementById("dialog-sign-ruler").textContent = sign.ruler;
  document.getElementById("dialog-sign-traits").textContent = sign.traits;
  document.getElementById("dialog-sign-reading").textContent = reading.text;
  lastFocusedCard = card || null;
  document.getElementById("sign-dialog-backdrop").hidden = false;
  document.getElementById("dialog-close").focus();
}

function closeDialog() {
  document.getElementById("sign-dialog-backdrop").hidden = true;
  if (lastFocusedCard) lastFocusedCard.focus();
}

function initDialog() {
  document.getElementById("dialog-close").addEventListener("click", closeDialog);
  document.getElementById("sign-dialog-backdrop").addEventListener("click", function (event) {
    if (event.target.id === "sign-dialog-backdrop") closeDialog();
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !document.getElementById("sign-dialog-backdrop").hidden) {
      closeDialog();
    }
  });
}


/* ---------- Moon phases ---------- */

function moonSvg(info) {
  const r = 30, cx = 40, cy = 40;
  const theta = info.angle;
  const k = Math.cos(theta);
  const waxing = theta < Math.PI;
  const eps = 0.02;
  let lit = "";
  if (theta < eps || theta > 2 * Math.PI - eps) {
    lit = "";
  } else if (Math.abs(theta - Math.PI) < eps) {
    lit = "<circle cx='" + cx + "' cy='" + cy + "' r='" + r + "' class='moon-lit' />";
  } else {
    const rx = Math.max(0.5, Math.abs(k) * r);
    const outerSweep = waxing ? 1 : 0;
    const termSweep = waxing ? (k > 0 ? 0 : 1) : (k < 0 ? 0 : 1);
    lit = "<path d='M " + cx + " " + (cy - r) +
      " A " + r + " " + r + " 0 0 " + outerSweep + " " + cx + " " + (cy + r) +
      " A " + rx.toFixed(2) + " " + r + " 0 0 " + termSweep + " " + cx + " " + (cy - r) + " Z' class='moon-lit' />";
  }
  return "<svg viewBox='0 0 80 80' class='moon-svg' role='img' aria-label='Moon phase: " +
    escapeHtml(info.phaseName) + ", about " + Math.round(info.illumination * 100) + " percent illuminated'>" +
    "<circle cx='" + cx + "' cy='" + cy + "' r='" + r + "' class='moon-dark' />" + lit + "</svg>";
}

function renderMoonPhases() {
  const info = moonPhaseInfo(new Date());
  document.getElementById("moon-visual").innerHTML = moonSvg(info);
  document.getElementById("moon-phase-name").textContent = info.phaseName;
  document.getElementById("moon-illumination").textContent =
    "About " + Math.round(info.illumination * 100) + "% illuminated";
  document.getElementById("moon-age").textContent = "Moon age: " + info.age.toFixed(1) + " days into the 29.53-day cycle";
  document.getElementById("moon-next-full").textContent = "Next full moon: " + formatDateLong(info.nextFull.date);
  document.getElementById("moon-next-new").textContent = "Next new moon: " + formatDateLong(info.nextNew.date);
  document.getElementById("moon-upcoming").innerHTML = info.upcoming.map(function (e) {
    return "<li><span>" + escapeHtml(e.name) + "</span><span>" + formatDateShort(e.date) + "</span></li>";
  }).join("");
}

/* ---------- Mercury retrograde ---------- */

function renderMercury() {
  const status = mercuryStatus(new Date());
  const statusEl = document.getElementById("mercury-status");
  if (status.retrograde) {
    statusEl.innerHTML = "<strong>Mercury is retrograde now</strong> (in " +
      escapeHtml(status.period.signs) + "), until " + formatDateLong(new Date(status.period.end + "T00:00:00Z")) + ".";
  } else if (status.next) {
    statusEl.innerHTML = "<strong>Mercury is direct now.</strong> The next retrograde begins " +
      formatDateLong(new Date(status.next.start + "T00:00:00Z")) + " (" + escapeHtml(status.next.signs) + ").";
  } else {
    statusEl.innerHTML = "<strong>Mercury is direct now.</strong> The table below covers retrograde dates through October 2027.";
  }
  document.getElementById("mercury-table-body").innerHTML = MERCURY_PERIODS.map(function (p) {
    return "<tr><td>" + formatDateShort(new Date(p.start + "T00:00:00Z")) + "</td><td>" +
      formatDateShort(new Date(p.end + "T00:00:00Z")) + "</td><td>" + escapeHtml(p.signs) + "</td></tr>";
  }).join("");
}

/* ---------- Request a consultation (Netlify Forms + browser-local copy) ---------- */

function loadQuestions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function saveQuestions(questions) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
  } catch (e) {
    /* Storage unavailable (private mode, quota) — the confirmation still shows. */
  }
}

function renderMyQuestions() {
  const questions = loadQuestions();
  const section = document.getElementById("my-questions");
  const list = document.getElementById("my-questions-list");
  if (questions.length === 0) {
    section.hidden = true;
    list.innerHTML = "";
    return;
  }
  section.hidden = false;
  list.innerHTML = questions.map(function (q) {
    const date = formatDateShort(new Date(q.askedAt));
    const who = q.name ? " — " + escapeHtml(q.name) : "";
    const mode = q.consultationMode ? " &middot; " + escapeHtml(q.consultationMode) : "";
    return (
      "<li><div class='q-meta'>#" + q.ref + " &middot; " + escapeHtml(q.category) +
      " &middot; " + date + who + mode + " &middot; Awaiting answer</div>" +
      "<p class='q-text'>" + escapeHtml(q.description) + "</p></li>"
    );
  }).join("");
}

function showFieldError(input, errorEl, show) {
  errorEl.hidden = !show;
  if (show) input.setAttribute("aria-invalid", "true");
  else input.removeAttribute("aria-invalid");
  return !show;
}

function initConsultationForm() {
  const form = document.getElementById("question-form");
  const nameInput = document.getElementById("q-name");
  const emailInput = document.getElementById("q-email");
  const phoneInput = document.getElementById("q-phone");
  const modeSelect = document.getElementById("q-mode");
  const descInput = document.getElementById("q-question");
  const confirmation = document.getElementById("confirmation");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let ok = true;
    ok = showFieldError(nameInput, document.getElementById("name-error"), !nameInput.value.trim()) && ok;
    const email = emailInput.value.trim();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    ok = showFieldError(emailInput, document.getElementById("email-error"), !emailValid) && ok;
    const phone = phoneInput.value.trim();
    const phoneValid = phone === "" || (/^[+0-9][0-9+\s-]*$/.test(phone) && phone.replace(/\D/g, "").length >= 7);
    ok = showFieldError(phoneInput, document.getElementById("phone-error"), !phoneValid) && ok;
    ok = showFieldError(modeSelect, document.getElementById("mode-error"), !modeSelect.value) && ok;
    const description = descInput.value.trim();
    ok = showFieldError(descInput, document.getElementById("question-error"), !description) && ok;
    if (!ok) {
      const firstInvalid = form.querySelector("[aria-invalid='true']");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const submitButton = form.querySelector("button[type='submit']");
    const submitError = document.getElementById("submit-error");
    submitError.hidden = true;
    submitButton.disabled = true;
    submitButton.textContent = "Sending…";

    /* Send the request to the site owner via Netlify Forms (the form is
       detected from the static HTML at deploy time). A copy is also kept
       in the visitor's own browser so they can see their requests. */
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(new FormData(form)).toString()
    }).then(function (response) {
      /* A redirected response means the POST was turned into a plain page
         load (e.g. an http page redirecting to https), so the submission
         never reached the form handler — treat it as a failure rather
         than showing a false confirmation. */
      if (!response.ok || response.redirected) throw new Error("Submission failed");
      const questions = loadQuestions();
      const ref = questions.length + 1;
      questions.push({
        ref: ref,
        name: nameInput.value.trim(),
        email: email,
        phone: phone,
        category: document.getElementById("q-category").value,
      consultationMode: modeSelect.value,
        birthdate: document.getElementById("q-birthdate").value,
        birthtime: document.getElementById("q-birthtime").value,
        birthplace: document.getElementById("q-birthplace").value.trim(),
      state: document.getElementById("q-state").value.trim(),
        description: description,
        askedAt: new Date().toISOString()
      });
      saveQuestions(questions);

      document.getElementById("confirmation-ref").textContent = "Reference #" + ref + ".";
      document.getElementById("confirmation-email").textContent = email;
      confirmation.hidden = false;
      confirmation.scrollIntoView({ behavior: "smooth", block: "center" });
      form.reset();
      renderMyQuestions();
    }).catch(function () {
      submitError.hidden = false;
      submitError.scrollIntoView({ behavior: "smooth", block: "center" });
    }).finally(function () {
      submitButton.disabled = false;
      submitButton.textContent = "Send my consultation request";
    });
  });

  document.getElementById("clear-questions").addEventListener("click", function () {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignore */ }
    renderMyQuestions();
  });

  renderMyQuestions();
}

/* ---------- Init (browser only) ---------- */

if (typeof document !== "undefined") {
  document.getElementById("footer-year").textContent = String(new Date().getFullYear());
  initHoroscopeTabs();
  renderZodiacGrid();
  initDialog();
  renderMoonPhases();
  renderMercury();
  initConsultationForm();
}

