/* Ask the Stars — zodiac data, daily horoscopes, sign details, and the ask-a-question form.
   Readings are for entertainment and reflection only. */

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
    ]
  },
  {
    name: "Taurus", glyph: "\u2649", dates: "Apr 20 – May 20", element: "Earth", ruler: "Venus",
    traits: "Patient, loyal, grounded",
    readings: [
      "Something you built slowly is ready to be shown. Resist the urge to polish it for one more week.",
      "A practical decision today saves you a headache later. Choose the steady option, not the flashy one.",
      "Comfort matters, but so does movement. Take one small step outside your usual routine."
    ]
  },
  {
    name: "Gemini", glyph: "\u264A", dates: "May 21 – Jun 20", element: "Air", ruler: "Mercury",
    traits: "Curious, adaptable, quick-witted",
    readings: [
      "You will hear two versions of the same story today. The truth is somewhere in the middle — ask one more question.",
      "An idea that seemed small this morning grows legs by evening. Write it down before it wanders off.",
      "Your words land well today. Use them kindly, especially with someone who is listening more than speaking."
    ]
  },
  {
    name: "Cancer", glyph: "\u264B", dates: "Jun 21 – Jul 22", element: "Water", ruler: "Moon",
    traits: "Caring, intuitive, protective",
    readings: [
      "Your instincts about a person are sharper than usual. Trust the quiet feeling, not the loud argument.",
      "Home and the people in it need a little of your attention today. A small gesture goes a long way.",
      "You have been carrying something that isn't yours to carry. Today is a good day to set it down gently."
    ]
  },
  {
    name: "Leo", glyph: "\u264C", dates: "Jul 23 – Aug 22", element: "Fire", ruler: "Sun",
    traits: "Confident, warm, generous",
    readings: [
      "The room is paying attention — say the thing you actually think, not the safe version of it.",
      "Generosity comes back to you today, possibly from an unexpected direction. Accept it gracefully.",
      "A creative project deserves an hour of your best energy, not the leftovers of your day. Give it the morning."
    ]
  },
  {
    name: "Virgo", glyph: "\u264D", dates: "Aug 23 – Sep 22", element: "Earth", ruler: "Mercury",
    traits: "Thoughtful, precise, helpful",
    readings: [
      "The detail everyone else missed is the one you catch. Speak up — it matters more than you think.",
      "Order returns to something that felt messy. Don't rush the last 10%; the finish is the point.",
      "Helping someone today teaches you something about your own plans. Listen while you help."
    ]
  },
  {
    name: "Libra", glyph: "\u264E", dates: "Sep 23 – Oct 22", element: "Air", ruler: "Venus",
    traits: "Fair, charming, peace-loving",
    readings: [
      "A decision you have been weighing finally tips. The scale was never as balanced as it looked.",
      "Harmony is worth something, but not everything. One honest disagreement today clears the air for weeks.",
      "Beauty and order around you lift your mood more than you expect. Tidy one corner and see."
    ]
  },
  {
    name: "Scorpio", glyph: "\u264F", dates: "Oct 23 – Nov 21", element: "Water", ruler: "Pluto",
    traits: "Intense, focused, determined",
    readings: [
      "Something hidden comes to light — not a scandal, just a fact that changes the shape of a plan. Good.",
      "Your focus is a superpower today. Aim it at the task you've been circling and watch it fall.",
      "A private conversation holds more truth than the public one. Seek out the quieter room."
    ]
  },
  {
    name: "Sagittarius", glyph: "\u2650", dates: "Nov 22 – Dec 21", element: "Fire", ruler: "Jupiter",
    traits: "Honest, adventurous, optimistic",
    readings: [
      "A plan to go somewhere — a place, a project, a conversation — deserves a date on the calendar, not just a wish.",
      "Your honesty lands well today, as long as you pair it with timing. Wait for the right hour, then be direct.",
      "Something you learn by accident turns out to be the most useful thing all week. Stay curious."
    ]
  },
  {
    name: "Capricorn", glyph: "\u2651", dates: "Dec 22 – Jan 19", element: "Earth", ruler: "Saturn",
    traits: "Steady, ambitious, disciplined",
    readings: [
      "The long game is paying off in a way that's easy to miss. Look back three months and measure honestly.",
      "Someone senior notices your consistency today. You don't need to perform — just keep doing the work.",
      "Rest is part of the plan, not a break from it. Schedule it like you schedule everything else."
    ]
  },
  {
    name: "Aquarius", glyph: "\u2652", dates: "Jan 20 – Feb 18", element: "Air", ruler: "Uranus",
    traits: "Original, independent, humanitarian",
    readings: [
      "An unconventional idea finds its first supporter today. Don't water it down to win the second one.",
      "A group you belong to needs your particular way of seeing things. Speak in the meeting, not after it.",
      "Time alone recharges you faster than anything social today. Take the quiet hour without guilt."
    ]
  },
  {
    name: "Pisces", glyph: "\u2653", dates: "Feb 19 – Mar 20", element: "Water", ruler: "Neptune",
    traits: "Gentle, imaginative, compassionate",
    readings: [
      "A dream or daydream holds a useful clue. Write down what you remember before the day washes it away.",
      "Compassion is your default — today, aim a little of it at yourself. You have earned the same kindness you give.",
      "A creative thread you dropped months ago is worth picking up. It has been quietly maturing."
    ]
  }
];

const MOODS = ["Steady", "Curious", "Bold", "Reflective", "Bright", "Calm", "Restless", "Hopeful"];
const STORAGE_KEY = "ask-the-stars-questions";

/* ---------- Helpers ---------- */

function dayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date - start) / 86400000);
}

function readingFor(signIndex, date) {
  const sign = SIGNS[signIndex];
  const seed = dayOfYear(date) + signIndex * 7;
  return {
    text: sign.readings[seed % sign.readings.length],
    luckyNumber: ((seed * 13) % 99) + 1,
    mood: MOODS[seed % MOODS.length]
  };
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ---------- Daily horoscopes ---------- */

function renderHoroscopes() {
  const grid = document.getElementById("horoscope-grid");
  const today = new Date();
  const dateLabel = today.toLocaleDateString(undefined, {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  });
  document.getElementById("today-date").textContent = dateLabel;

  grid.innerHTML = SIGNS.map((sign, i) => {
    const reading = readingFor(i, today);
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

/* ---------- Zodiac grid + detail dialog ---------- */

let lastFocusedCard = null;

function renderZodiacGrid() {
  const grid = document.getElementById("zodiac-grid");
  grid.innerHTML = SIGNS.map((sign, i) =>
    "<button type='button' class='zodiac-card' data-sign='" + i + "'>" +
      "<span class='glyph' aria-hidden='true'>" + sign.glyph + VS + "</span>" +
      "<span class='sign-name'>" + escapeHtml(sign.name) + "</span>" +
      "<span class='sign-dates'>" + escapeHtml(sign.dates) + "</span>" +
    "</button>"
  ).join("");

  grid.addEventListener("click", (event) => {
    const card = event.target.closest(".zodiac-card");
    if (card) openDialog(Number(card.dataset.sign), card);
  });
}

function openDialog(signIndex, card) {
  const sign = SIGNS[signIndex];
  const reading = readingFor(signIndex, new Date());
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
  document.getElementById("sign-dialog-backdrop").addEventListener("click", (event) => {
    if (event.target.id === "sign-dialog-backdrop") closeDialog();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !document.getElementById("sign-dialog-backdrop").hidden) {
      closeDialog();
    }
  });
}

/* ---------- Ask-a-question form (browser-local storage) ---------- */

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
  list.innerHTML = questions.map((q) => {
    const date = new Date(q.askedAt).toLocaleDateString(undefined, {
      year: "numeric", month: "short", day: "numeric"
    });
    const who = q.name ? " — " + escapeHtml(q.name) : "";
    return (
      "<li><div class='q-meta'>#" + q.ref + " &middot; " + escapeHtml(q.category) +
      " &middot; " + date + who + " &middot; Awaiting answer</div>" +
      "<p class='q-text'>" + escapeHtml(q.question) + "</p></li>"
    );
  }).join("");
}

function initForm() {
  const form = document.getElementById("question-form");
  const questionInput = document.getElementById("q-question");
  const error = document.getElementById("question-error");
  const confirmation = document.getElementById("confirmation");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const question = questionInput.value.trim();
    if (!question) {
      error.hidden = false;
      questionInput.focus();
      return;
    }
    error.hidden = true;

    const questions = loadQuestions();
    const ref = questions.length + 1;
    questions.push({
      ref: ref,
      name: document.getElementById("q-name").value.trim(),
      category: document.getElementById("q-category").value,
      birthdate: document.getElementById("q-birthdate").value,
      birthtime: document.getElementById("q-birthtime").value,
      birthplace: document.getElementById("q-birthplace").value.trim(),
      question: question,
      askedAt: new Date().toISOString()
    });
    saveQuestions(questions);

    document.getElementById("confirmation-ref").textContent =
      "Reference #" + ref + ".";
    confirmation.hidden = false;
    confirmation.scrollIntoView({ behavior: "smooth", block: "center" });
    form.reset();
    renderMyQuestions();
  });

  document.getElementById("clear-questions").addEventListener("click", () => {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignore */ }
    renderMyQuestions();
  });

  renderMyQuestions();
}

/* ---------- Init ---------- */

document.getElementById("footer-year").textContent = String(new Date().getFullYear());
renderHoroscopes();
renderZodiacGrid();
initDialog();
initForm();
