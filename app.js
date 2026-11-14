/* Ask the Stars — zodiac data, horoscopes, calculators, moon phases,
   Mercury retrograde, kundali, and the consultation form.
   Readings are for entertainment and reflection only.
   Pure calculation functions are guarded so this file can also run under
   Node for verification (see the export block at the end). */

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

/* Time zones: familiar abbreviations with region and fixed UTC offset.
   Daylight variants are listed separately so visitors pick the one that
   was in force on the birth date. */
const TIMEZONES = [
  { id: "IST",  label: "IST — India (UTC+5:30)", offset: 5.5 },
  { id: "EST",  label: "EST — Eastern US (UTC\u22125)", offset: -5 },
  { id: "EDT",  label: "EDT — Eastern US, daylight (UTC\u22124)", offset: -4 },
  { id: "CST",  label: "CST — Central US (UTC\u22126)", offset: -6 },
  { id: "CDT",  label: "CDT — Central US, daylight (UTC\u22125)", offset: -5 },
  { id: "MST",  label: "MST — Mountain US (UTC\u22127)", offset: -7 },
  { id: "MDT",  label: "MDT — Mountain US, daylight (UTC\u22126)", offset: -6 },
  { id: "PST",  label: "PST — Pacific US (UTC\u22128)", offset: -8 },
  { id: "PDT",  label: "PDT — Pacific US, daylight (UTC\u22127)", offset: -7 },
  { id: "GMT",  label: "GMT — UK / Greenwich (UTC+0)", offset: 0 },
  { id: "BST",  label: "BST — UK, daylight (UTC+1)", offset: 1 },
  { id: "CET",  label: "CET — Central Europe (UTC+1)", offset: 1 },
  { id: "CEST", label: "CEST — Central Europe, daylight (UTC+2)", offset: 2 },
  { id: "JST",  label: "JST — Japan (UTC+9)", offset: 9 },
  { id: "AEST", label: "AEST — Eastern Australia (UTC+10)", offset: 10 },
  { id: "AEDT", label: "AEDT — Eastern Australia, daylight (UTC+11)", offset: 11 }
];

/* Fallback coordinates used ONLY when a birthplace is not recognised and no
   latitude/longitude is typed: the standard-time meridian longitude for the
   zone plus a rough central latitude for its region. Always disclosed with
   a warning on the result — the Lagna from this estimate may be off. */
const TZ_FALLBACK = {
  IST:  { lat: 21, lon: 82.5 },  EST: { lat: 39, lon: -75 },  EDT: { lat: 39, lon: -75 },
  CST:  { lat: 38, lon: -90 },  CDT: { lat: 38, lon: -90 },  MST: { lat: 39, lon: -105 },
  MDT:  { lat: 39, lon: -105 }, PST: { lat: 36, lon: -120 }, PDT: { lat: 36, lon: -120 },
  GMT:  { lat: 52, lon: 0 },    BST: { lat: 52, lon: 0 },    CET: { lat: 49, lon: 15 },
  CEST: { lat: 49, lon: 15 },   JST: { lat: 36, lon: 135 },  AEST: { lat: -33, lon: 150 },
  AEDT: { lat: -33, lon: 150 }
};

/* Well-known birthplaces with coordinates. Only places whose coordinates are
   well established are listed; anything else falls back to the time-zone
   estimate (with a warning) unless the visitor types coordinates.
   Keys are normalised (lowercase, no diacritics); values are [lat, lon]. */
const PLACES = {
  "palwal": [28.14, 77.33], "new delhi": [28.61, 77.21], "delhi": [28.61, 77.21],
  "mumbai": [19.08, 72.88], "bombay": [19.08, 72.88], "kolkata": [22.57, 88.36],
  "calcutta": [22.57, 88.36], "chennai": [13.08, 80.27], "madras": [13.08, 80.27],
  "bengaluru": [12.97, 77.59], "bangalore": [12.97, 77.59], "hyderabad": [17.39, 78.49],
  "ahmedabad": [23.03, 72.58], "pune": [18.52, 73.86], "jaipur": [26.91, 75.79],
  "lucknow": [26.85, 80.95], "kanpur": [26.45, 80.33], "nagpur": [21.15, 79.09],
  "bhopal": [23.26, 77.41], "patna": [25.59, 85.14], "chandigarh": [30.73, 76.78],
  "faridabad": [28.41, 77.31], "gurugram": [28.46, 77.03], "gurgaon": [28.46, 77.03],
  "noida": [28.54, 77.39], "ghaziabad": [28.67, 77.42], "amritsar": [31.63, 74.87],
  "ludhiana": [30.90, 75.85], "varanasi": [25.32, 82.97], "agra": [27.17, 78.01],
  "meerut": [28.98, 77.71], "prayagraj": [25.44, 81.85], "allahabad": [25.44, 81.85],
  "surat": [21.17, 72.83], "vadodara": [22.31, 73.18], "indore": [22.72, 75.86],
  "kochi": [9.93, 76.27], "cochin": [9.93, 76.27], "thiruvananthapuram": [8.52, 76.94],
  "trivandrum": [8.52, 76.94], "guwahati": [26.14, 91.74], "dehradun": [30.32, 78.03],
  "shimla": [31.10, 77.17], "srinagar": [34.08, 74.80], "jammu": [32.73, 74.87],
  "mysuru": [12.30, 76.64], "mysore": [12.30, 76.64], "coimbatore": [11.02, 76.96],
  "madurai": [9.93, 78.12], "visakhapatnam": [17.69, 83.22], "vijayawada": [16.51, 80.65],
  "raipur": [21.25, 81.63], "ranchi": [23.34, 85.31], "bhubaneswar": [20.30, 85.82],
  "udaipur": [24.59, 73.71], "jodhpur": [26.24, 73.02], "kota": [25.21, 75.84],
  "gwalior": [26.22, 78.18], "jabalpur": [23.18, 79.99], "nashik": [20.01, 73.79],
  "aurangabad": [19.88, 75.34], "rajkot": [22.30, 70.80], "jalandhar": [31.33, 75.58],
  "mathura": [27.49, 77.67], "haridwar": [29.95, 78.16], "rishikesh": [30.09, 78.29],
  "kurukshetra": [29.97, 76.88], "karnal": [29.69, 76.98], "panipat": [29.39, 76.97],
  "sonipat": [28.99, 77.01], "rohtak": [28.90, 76.58], "hisar": [29.15, 75.72],
  "ambala": [30.38, 76.78], "bathinda": [30.21, 74.95], "patiala": [30.34, 76.38],
  "ajmer": [26.45, 74.64], "bikaner": [28.02, 73.31], "alwar": [27.55, 76.62],
  "bharatpur": [27.22, 77.49], "jhansi": [25.45, 78.57], "bareilly": [28.37, 79.43],
  "moradabad": [28.84, 78.76], "aligarh": [27.88, 78.08], "gorakhpur": [26.76, 83.37],
  "muzaffarpur": [26.12, 85.38], "gaya": [24.79, 85.00], "dhanbad": [23.80, 86.43],
  "asansol": [23.68, 86.99], "durgapur": [23.55, 87.32], "siliguri": [26.71, 88.43],
  "darjeeling": [27.04, 88.27], "shillong": [25.58, 91.89], "imphal": [24.82, 93.94],
  "agartala": [23.83, 91.29], "aizawl": [23.73, 92.72], "kohima": [25.67, 94.12],
  "itanagar": [27.08, 93.62], "gangtok": [27.34, 88.61], "port blair": [11.62, 92.71],
  "puducherry": [11.94, 79.81], "pondicherry": [11.94, 79.81], "panaji": [15.49, 73.83],
  "goa": [15.49, 73.83], "leh": [34.15, 77.57], "kargil": [34.56, 76.13],
  "ujjain": [23.18, 75.78], "salem": [11.66, 78.15], "tiruchirappalli": [10.79, 78.70],
  "vellore": [12.92, 79.13], "tirupati": [13.62, 79.42], "guntur": [16.31, 80.44],
  "warangal": [18.00, 79.56], "hubli": [15.36, 75.12], "belgaum": [15.85, 74.50],
  "mangalore": [12.87, 74.84], "dharamshala": [32.22, 76.32], "manali": [32.24, 77.19],
  "nainital": [29.38, 79.45], "haldwani": [29.22, 79.52], "ayodhya": [26.79, 82.20],
  "faizabad": [26.77, 82.13], "saharanpur": [29.97, 77.55], "muzaffarnagar": [29.47, 77.70],
  "london": [51.51, -0.13], "paris": [48.86, 2.35], "berlin": [52.52, 13.40],
  "madrid": [40.42, -3.70], "rome": [41.90, 12.50], "amsterdam": [52.37, 4.90],
  "brussels": [50.85, 4.35], "vienna": [48.21, 16.37], "zurich": [47.38, 8.54],
  "geneva": [46.20, 6.14], "stockholm": [59.33, 18.07], "oslo": [59.91, 10.75],
  "copenhagen": [55.68, 12.57], "helsinki": [60.17, 24.94], "dublin": [53.35, -6.26],
  "lisbon": [38.72, -9.14], "athens": [37.98, 23.73], "warsaw": [52.23, 21.01],
  "prague": [50.08, 14.42], "budapest": [47.50, 19.04], "moscow": [55.76, 37.62],
  "kyiv": [50.45, 30.52], "kiev": [50.45, 30.52], "istanbul": [41.01, 28.98],
  "ankara": [39.93, 32.86], "cairo": [30.04, 31.24], "lagos": [6.52, 3.38],
  "nairobi": [-1.29, 36.82], "johannesburg": [-26.20, 28.05], "cape town": [-33.92, 18.42],
  "karachi": [24.86, 67.01], "lahore": [31.52, 74.36], "islamabad": [33.68, 73.05],
  "dhaka": [23.81, 90.41], "kathmandu": [27.72, 85.32], "colombo": [6.93, 79.86],
  "bangkok": [13.76, 100.50], "singapore": [1.35, 103.82], "kuala lumpur": [3.14, 101.71],
  "jakarta": [-6.21, 106.85], "manila": [14.60, 120.98], "hanoi": [21.03, 105.85],
  "ho chi minh city": [10.82, 106.70], "hong kong": [22.32, 114.17],
  "beijing": [39.90, 116.41], "shanghai": [31.23, 121.47], "tokyo": [35.68, 139.69],
  "osaka": [34.69, 135.50], "seoul": [37.57, 126.98], "taipei": [25.03, 121.56],
  "ulaanbaatar": [47.92, 106.92], "sydney": [-33.87, 151.21], "melbourne": [-37.81, 144.96],
  "brisbane": [-27.47, 153.03], "perth": [-31.95, 115.86], "auckland": [-36.85, 174.76],
  "wellington": [-41.29, 174.78], "new york": [40.71, -74.01], "nyc": [40.71, -74.01],
  "los angeles": [34.05, -118.24], "chicago": [41.88, -87.63], "houston": [29.76, -95.37],
  "san francisco": [37.77, -122.42], "washington": [38.91, -77.04],
  "washington dc": [38.91, -77.04], "toronto": [43.65, -79.38], "vancouver": [49.28, -123.12],
  "montreal": [45.50, -73.57], "ottawa": [45.42, -75.69], "calgary": [51.05, -114.07],
  "mexico city": [19.43, -99.13], "sao paulo": [-23.55, -46.63],
  "rio de janeiro": [-22.91, -43.17], "buenos aires": [-34.60, -58.38],
  "santiago": [-33.45, -70.67], "lima": [-12.05, -77.04], "bogota": [4.71, -74.07],
  "dubai": [25.20, 55.27], "abu dhabi": [24.45, 54.38], "doha": [25.29, 51.53],
  "riyadh": [24.63, 46.70], "jeddah": [21.49, 39.19], "tel aviv": [32.08, 34.78],
  "jerusalem": [31.77, 35.21], "tehran": [35.69, 51.39], "baghdad": [33.32, 44.36],
  "kuwait city": [29.38, 47.98], "muscat": [23.59, 58.41], "kabul": [34.53, 69.17],
  "tashkent": [41.31, 69.24], "almaty": [43.24, 76.89], "tbilisi": [41.72, 44.79],
  "yerevan": [40.18, 44.51], "baku": [40.41, 49.87]
};

/* Nakshatras in order, with Vimshottari lords. Each spans 13°20' of the
   sidereal zodiac, starting at 0° Aries. */
const NAKSHATRAS = [
  { name: "Ashwini", lord: "Ketu" }, { name: "Bharani", lord: "Venus" },
  { name: "Krittika", lord: "Sun" }, { name: "Rohini", lord: "Moon" },
  { name: "Mrigashira", lord: "Mars" }, { name: "Ardra", lord: "Rahu" },
  { name: "Punarvasu", lord: "Jupiter" }, { name: "Pushya", lord: "Saturn" },
  { name: "Ashlesha", lord: "Mercury" }, { name: "Magha", lord: "Ketu" },
  { name: "Purva Phalguni", lord: "Venus" }, { name: "Uttara Phalguni", lord: "Sun" },
  { name: "Hasta", lord: "Moon" }, { name: "Chitra", lord: "Mars" },
  { name: "Swati", lord: "Rahu" }, { name: "Vishakha", lord: "Jupiter" },
  { name: "Anuradha", lord: "Saturn" }, { name: "Jyeshtha", lord: "Mercury" },
  { name: "Mula", lord: "Ketu" }, { name: "Purva Ashadha", lord: "Venus" },
  { name: "Uttara Ashadha", lord: "Sun" }, { name: "Shravana", lord: "Moon" },
  { name: "Dhanishta", lord: "Mars" }, { name: "Shatabhisha", lord: "Rahu" },
  { name: "Purva Bhadrapada", lord: "Jupiter" }, { name: "Uttara Bhadrapada", lord: "Saturn" },
  { name: "Revati", lord: "Mercury" }
];

const RASHIS = ["Mesha", "Vrishabha", "Mithuna", "Karka", "Simha", "Kanya",
  "Tula", "Vrischika", "Dhanu", "Makara", "Kumbha", "Meena"];

const DASHA_YEARS = { Ketu: 7, Venus: 20, Sun: 6, Moon: 10, Mars: 7, Rahu: 18,
  Jupiter: 16, Saturn: 19, Mercury: 17 };
const DASHA_ORDER = ["Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"];

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

/* ================= Astronomy (simplified, approximate) =================
   Planetary longitudes use Paul Schlyter's low-precision orbital-element
   algorithm (elements referenced to JD 2451543.5), with the major lunar
   perturbation terms for the Moon. Verified against Swiss Ephemeris
   (Lahiri) for 26 Aug 1973, 15:30 IST, Palwal: all placements match within
   about 0.3 degrees. Good enough for signs and houses in most cases, but
   bodies near a sign or nakshatra boundary can flip — results are labelled
   approximate throughout. */

const DEG = Math.PI / 180;
function rev(x) { return x - Math.floor(x / 360) * 360; }
function sind(x) { return Math.sin(x * DEG); }
function cosd(x) { return Math.cos(x * DEG); }
function tand(x) { return Math.tan(x * DEG); }
function atan2d(y, x) { return Math.atan2(y, x) / DEG; }

function julianDay(y, m, d, utHours) {
  if (m <= 2) { y -= 1; m += 12; }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5 + utHours / 24;
}

/* Orbital elements: [N0, Nrate, i0, irate, w0, wrate, a, e0, erate, M0, Mrate]
   per day, referenced to JD 2451543.5 (1999 Dec 31, 00:00 UT). */
const ELEMENTS = {
  sun:     [0.0, 0.0, 0.0, 0.0, 282.9404, 4.70935e-5, 1.000000, 0.016709, -1.151e-9, 356.0470, 0.9856002585],
  moon:    [125.1228, -0.0529538083, 5.1454, 0.0, 318.0634, 0.1643573223, 60.2666, 0.054900, 0.0, 115.3654, 13.0649929509],
  mercury: [48.3313, 3.24587e-5, 7.0047, 5.00e-8, 29.1241, 1.01444e-5, 0.387098, 0.205635, 5.59e-10, 168.6562, 4.0923344368],
  venus:   [76.6799, 2.46590e-5, 3.3946, 2.75e-8, 54.8910, 1.38374e-5, 0.723330, 0.006773, -1.302e-9, 48.0052, 1.6021302244],
  mars:    [49.5574, 2.11081e-5, 1.8497, -1.78e-8, 286.5016, 2.92961e-5, 1.523688, 0.093405, 2.516e-9, 18.6021, 0.5240207766],
  jupiter: [100.4542, 2.76854e-5, 1.3030, -1.557e-7, 273.8777, 1.64505e-5, 5.20256, 0.048498, 4.469e-9, 19.8950, 0.0830853001],
  saturn:  [113.6634, 2.38980e-5, 2.4886, -1.081e-7, 339.3939, 2.97661e-5, 9.55475, 0.055546, -9.499e-9, 316.9670, 0.0334442282]
};

function kepler(M, e) {
  let E = M + (180 / Math.PI) * e * sind(M) * (1 + e * cosd(M));
  for (let i = 0; i < 10; i++) {
    const E0 = E;
    E = E0 - (E0 - (180 / Math.PI) * e * sind(E0) - M) / (1 - e * cosd(E0));
    if (Math.abs(E - E0) < 1e-6) break;
  }
  return E;
}

function helioXYZ(el, d) {
  const N = rev(el[0] + el[1] * d);
  const i = el[2] + el[3] * d;
  const w = rev(el[4] + el[5] * d);
  const a = el[6];
  const e = el[7] + el[8] * d;
  const M = rev(el[9] + el[10] * d);
  const E = kepler(M, e);
  const xv = Math.cos(E * DEG) - e;
  const yv = Math.sin(E * DEG) * Math.sqrt(1 - e * e);
  const v = atan2d(yv, xv);
  const r = Math.sqrt(xv * xv + yv * yv) * a;
  const u = v + w;
  return {
    x: r * (cosd(N) * cosd(u) - sind(N) * sind(u) * cosd(i)),
    y: r * (sind(N) * cosd(u) + cosd(N) * sind(u) * cosd(i)),
    z: r * (sind(u) * sind(i)),
    M: M, N: N, w: w
  };
}

function tropicalLongitudes(jd) {
  const d = jd - 2451543.5;
  const sun = helioXYZ(ELEMENTS.sun, d);
  /* Schlyter's Sun elements describe the Sun's apparent (geocentric) orbit,
     so atan2 gives the geocentric longitude directly. */
  const out = { sun: rev(atan2d(sun.y, sun.x)) };
  const moon = helioXYZ(ELEMENTS.moon, d);
  let moonLon = rev(atan2d(moon.y, moon.x));
  /* Major lunar perturbation terms (evection, variation, yearly equation
     and the next-largest terms). Without these the Moon can be several
     degrees off; with them it is typically within a fraction of a degree. */
  const Ms = sun.M;
  const Lm = rev(moon.N + moon.w + moon.M);
  const Ls = rev(sun.w + sun.M);
  const D = rev(Lm - Ls);
  const F = rev(Lm - moon.N);
  const M = moon.M;
  moonLon += -1.274 * sind(M - 2 * D)
    + 0.658 * sind(2 * D)
    - 0.186 * sind(Ms)
    - 0.059 * sind(2 * M - 2 * D)
    - 0.057 * sind(M - 2 * D + Ms)
    + 0.053 * sind(M + 2 * D)
    + 0.046 * sind(2 * D - Ms)
    + 0.041 * sind(M - Ms)
    - 0.035 * sind(D)
    - 0.031 * sind(M + Ms)
    - 0.015 * sind(2 * F - 2 * D)
    + 0.011 * sind(M - 4 * D);
  out.moon = rev(moonLon);
  out.moonNode = rev(moon.N); /* mean ascending node = Rahu */
  for (const p of ["mercury", "venus", "mars", "jupiter", "saturn"]) {
    const h = helioXYZ(ELEMENTS[p], d);
    out[p] = rev(atan2d(h.y + sun.y, h.x + sun.x));
  }
  return out;
}

function gmst(jd) {
  const T = (jd - 2451545.0) / 36525;
  return rev(280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T - T * T * T / 38710000);
}

function obliquity(jd) {
  const T = (jd - 2451545.0) / 36525;
  return 23.439291 - 0.0130042 * T - 0.00000016 * T * T + 0.000000504 * T * T * T;
}

function ascendant(jd, lat, lonEast) {
  const theta = rev(gmst(jd) + lonEast);
  const eps = obliquity(jd);
  return rev(atan2d(cosd(theta), -(sind(theta) * cosd(eps) + tand(lat) * sind(eps))));
}

/* Lahiri ayanamsa approximation: 23.8558 degrees at J2000, +0.01397/year. */
function ayanamsaLahiri(jd) {
  const year = 2000 + (jd - 2451545.0) / 365.25;
  return 23.8558 + 0.01397 * (year - 2000);
}

function signOf(lon) {
  const l = rev(lon);
  return { index: Math.floor(l / 30), degree: l % 30, lon: l };
}

function nakshatraOf(lon) {
  const l = rev(lon);
  const span = 360 / 27;
  const idx = Math.floor(l / span);
  const pada = Math.floor((l % span) / (span / 4)) + 1;
  return { index: idx, name: NAKSHATRAS[idx].name, lord: NAKSHATRAS[idx].lord, pada: pada };
}

function formatDegree(degInSign) {
  const d = Math.floor(degInSign);
  const m = Math.floor((degInSign - d) * 60);
  return d + "°" + String(m).padStart(2, "0") + "′";
}

/* ---------- Place lookup and coordinate resolution ---------- */

function normalizePlace(value) {
  return String(value || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
}

function lookupPlace(placeText) {
  const first = String(placeText || "").split(",")[0];
  const key = normalizePlace(first);
  if (!key) return null;
  const hit = PLACES[key];
  if (hit) return { lat: hit[0], lon: hit[1], matched: first.trim() };
  const fullKey = normalizePlace(placeText);
  if (fullKey !== key && PLACES[fullKey]) {
    const h2 = PLACES[fullKey];
    return { lat: h2[0], lon: h2[1], matched: String(placeText).trim() };
  }
  return null;
}

/* Resolve coordinates for a chart. Priority: typed lat/lon, recognised
   place name, time-zone-meridian fallback (disclosed, with a warning). */
function resolveCoordinates(placeText, typedLat, typedLon, tzId) {
  if (typeof typedLat === "number" && typeof typedLon === "number" &&
      isFinite(typedLat) && isFinite(typedLon) &&
      typedLat >= -90 && typedLat <= 90 && typedLon >= -180 && typedLon <= 180) {
    return { lat: typedLat, lon: typedLon, source: "typed",
      note: "Coordinates typed by you." };
  }
  const found = lookupPlace(placeText);
  if (found) {
    return { lat: found.lat, lon: found.lon, source: "place",
      note: "Coordinates for " + found.matched + " from the built-in place list." };
  }
  const fb = TZ_FALLBACK[tzId] || TZ_FALLBACK.IST;
  return { lat: fb.lat, lon: fb.lon, source: "fallback",
    note: "Birthplace not recognised and no coordinates typed, so the Lagna is estimated from your time zone meridian (" +
      fb.lon + "° longitude, assumed latitude " + fb.lat + "°). It may be off by a sign or more — type your birthplace coordinates for a more reliable Lagna." };
}

/* ---------- Western birth chart ---------- */

function computeWesternChart(input) {
  const tz = TIMEZONES.filter(function (t) { return t.id === input.tzId; })[0] || TIMEZONES[0];
  const hour = input.hasTime ? input.hour : 12;
  const minute = input.hasTime ? input.minute : 0;
  const jd = julianDay(input.year, input.month, input.day, hour - tz.offset + minute / 60);
  const trop = tropicalLongitudes(jd);
  const sun = signOf(trop.sun);
  const moon = signOf(trop.moon);
  let rising = null;
  if (input.hasTime && input.coords) {
    rising = signOf(ascendant(jd, input.coords.lat, input.coords.lon));
  }
  return {
    sun: { sign: SIGNS[sun.index].name, signIndex: sun.index, degree: sun.degree, lon: sun.lon },
    moon: { sign: SIGNS[moon.index].name, signIndex: moon.index, degree: moon.degree, lon: moon.lon },
    rising: rising ? { sign: SIGNS[rising.index].name, signIndex: rising.index, degree: rising.degree, lon: rising.lon } : null
  };
}

/* ---------- Kundali (Vedic / sidereal) ---------- */

const KUNDALI_PLANETS = [
  { key: "sun", name: "Sun", abbr: "Su" }, { key: "moon", name: "Moon", abbr: "Mo" },
  { key: "mars", name: "Mars", abbr: "Ma" }, { key: "mercury", name: "Mercury", abbr: "Me" },
  { key: "jupiter", name: "Jupiter", abbr: "Ju" }, { key: "venus", name: "Venus", abbr: "Ve" },
  { key: "saturn", name: "Saturn", abbr: "Sa" }, { key: "rahu", name: "Rahu", abbr: "Ra" },
  { key: "ketu", name: "Ketu", abbr: "Ke" }
];

function computeKundali(input) {
  const tz = TIMEZONES.filter(function (t) { return t.id === input.tzId; })[0] || TIMEZONES[0];
  const hour = input.hasTime ? input.hour : 12;
  const minute = input.hasTime ? input.minute : 0;
  const jd = julianDay(input.year, input.month, input.day, hour - tz.offset + minute / 60);
  const aya = ayanamsaLahiri(jd);
  const trop = tropicalLongitudes(jd);
  const sid = {
    sun: rev(trop.sun - aya), moon: rev(trop.moon - aya), mars: rev(trop.mars - aya),
    mercury: rev(trop.mercury - aya), jupiter: rev(trop.jupiter - aya),
    venus: rev(trop.venus - aya), saturn: rev(trop.saturn - aya),
    rahu: rev(trop.moonNode - aya), ketu: rev(trop.moonNode + 180 - aya)
  };
  let lagna = null;
  if (input.hasTime && input.coords) {
    const ascSid = rev(ascendant(jd, input.coords.lat, input.coords.lon) - aya);
    const s = signOf(ascSid);
    const nk = nakshatraOf(ascSid);
    lagna = { lon: ascSid, sign: SIGNS[s.index].name, signIndex: s.index,
      degree: s.degree, rashi: RASHIS[s.index], nakshatra: nk.name, pada: nk.pada };
  }
  const lagnaIndex = lagna ? lagna.signIndex : null;
  const planets = KUNDALI_PLANETS.map(function (p) {
    const lon = sid[p.key];
    const s = signOf(lon);
    const nk = nakshatraOf(lon);
    return { key: p.key, name: p.name, abbr: p.abbr, lon: lon,
      sign: SIGNS[s.index].name, signIndex: s.index, degree: s.degree,
      rashi: RASHIS[s.index], nakshatra: nk.name, pada: nk.pada,
      house: lagnaIndex === null ? null : ((s.index - lagnaIndex + 12) % 12) + 1 };
  });
  const moonPlanet = planets[1];
  const moonNak = nakshatraOf(sid.moon);
  return {
    ayanamsa: aya,
    lagna: lagna,
    moon: { sign: moonPlanet.sign, signIndex: moonPlanet.signIndex, degree: moonPlanet.degree,
      rashi: moonPlanet.rashi, nakshatra: moonNak.name, pada: moonNak.pada,
      lord: moonNak.lord, lon: sid.moon },
    planets: planets,
    dashas: dashaPeriods(input, sid.moon)
  };
}

/* Vimshottari dasha from the Moon's nakshatra. Approximate: periods are
   placed by 365.25-day years from the birth date. */
function dashaPeriods(input, moonLon) {
  const nk = nakshatraOf(moonLon);
  const span = 360 / 27;
  const elapsed = (rev(moonLon) % span) / span;
  const balanceYears = (1 - elapsed) * DASHA_YEARS[nk.lord];
  const tz = TIMEZONES.filter(function (t) { return t.id === input.tzId; })[0] || TIMEZONES[0];
  const hour = input.hasTime ? input.hour : 12;
  const minute = input.hasTime ? input.minute : 0;
  let cursor = Date.UTC(input.year, input.month - 1, input.day, hour - tz.offset, minute, 0);
  const startIdx = DASHA_ORDER.indexOf(nk.lord);
  const periods = [];
  const now = Date.now();
  for (let i = 0; i < 10; i++) {
    const lord = DASHA_ORDER[(startIdx + i) % DASHA_ORDER.length];
    const years = i === 0 ? balanceYears : DASHA_YEARS[lord];
    const start = cursor;
    const end = start + years * 365.25 * 86400000;
    periods.push({ lord: lord, years: years, start: new Date(start), end: new Date(end),
      current: now >= start && now < end, balance: i === 0 });
    cursor = end;
  }
  return periods;
}

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

/* ---------- Shared calculator helpers ---------- */

function populateTimezoneSelect(select) {
  select.innerHTML = TIMEZONES.map(function (tz) {
    return "<option value='" + tz.id + "'>" + escapeHtml(tz.label) + "</option>";
  }).join("");
  select.value = "IST";
}

function parseDateInput(value) {
  const parts = String(value || "").split("-");
  if (parts.length !== 3) return null;
  const y = Number(parts[0]), m = Number(parts[1]), d = Number(parts[2]);
  if (!y || !m || !d) return null;
  return { year: y, month: m, day: d };
}

function parseTimeInput(value) {
  if (!value) return null;
  const parts = String(value).split(":");
  if (parts.length < 2) return null;
  return { hour: Number(parts[0]), minute: Number(parts[1]) };
}

function parseCoordInput(value) {
  if (value === "" || value === null || typeof value === "undefined") return null;
  const n = Number(value);
  return isFinite(n) ? n : null;
}

function placementCard(title, bodyHtml, note) {
  return "<div class='result-card'><h4>" + title + "</h4>" + bodyHtml +
    (note ? "<p class='result-note'>" + note + "</p>" : "") + "</div>";
}

/* ---------- Western birth chart calculator ---------- */

function initWesternCalculator() {
  populateTimezoneSelect(document.getElementById("bc-timezone"));
  const form = document.getElementById("birth-chart-form");
  const result = document.getElementById("birth-chart-result");
  const error = document.getElementById("birth-chart-error");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const date = parseDateInput(document.getElementById("bc-date").value);
    if (!date) {
      error.hidden = false;
      document.getElementById("bc-date").focus();
      return;
    }
    error.hidden = true;
    const time = parseTimeInput(document.getElementById("bc-time").value);
    const tzId = document.getElementById("bc-timezone").value;
    const coords = resolveCoordinates(
      document.getElementById("bc-place").value,
      parseCoordInput(document.getElementById("bc-lat").value),
      parseCoordInput(document.getElementById("bc-lon").value),
      tzId
    );
    const chart = computeWesternChart({
      year: date.year, month: date.month, day: date.day,
      hour: time ? time.hour : 12, minute: time ? time.minute : 0,
      hasTime: !!time, tzId: tzId, coords: coords
    });

    let html = "<div class='result-grid'>";
    html += placementCard("Sun in " + escapeHtml(chart.sun.sign),
      "<p class='result-big'>" + escapeHtml(chart.sun.sign) + " " + formatDegree(chart.sun.degree) + "</p>" +
      "<p>Your core character — how you shine and what drives you. " + escapeHtml(SIGN_MEANINGS[chart.sun.signIndex]) + "</p>",
      "Sun sign is calculated from your birth date.");
    html += placementCard("Moon in " + escapeHtml(chart.moon.sign) + " <span class='approx-tag'>approximate</span>",
      "<p class='result-big'>" + escapeHtml(chart.moon.sign) + " " + formatDegree(chart.moon.degree) + "</p>" +
      "<p>Your emotional nature — what you need to feel at ease. " + escapeHtml(SIGN_MEANINGS[chart.moon.signIndex]) + "</p>",
      "Moon sign uses a simplified calculation and can be off near a sign change.");
    if (chart.rising) {
      html += placementCard("Rising in " + escapeHtml(chart.rising.sign) + " <span class='approx-tag'>approximate</span>",
        "<p class='result-big'>" + escapeHtml(chart.rising.sign) + " " + formatDegree(chart.rising.degree) + "</p>" +
        "<p>Your rising sign — the face you show the world and how you approach new things. " + escapeHtml(SIGN_MEANINGS[chart.rising.signIndex]) + "</p>",
        "Rising sign needs an accurate birth time and place, and uses a simplified calculation.");
    } else {
      html += placementCard("Rising sign",
        "<p>Add your birth time to calculate your rising sign — it changes roughly every two hours, so the date alone cannot pin it down.</p>",
        null);
    }
    html += "</div>";
    html += "<p class='coord-note'>" + escapeHtml(coords.note) + "</p>";
    html += "<p class='calc-disclaimer'>Simplified calculation, for entertainment and reflection only. " +
      "A professional reading uses precise ephemeris data and your exact birth time. " +
      "Not medical, financial, or legal advice.</p>";
    result.innerHTML = html;
    result.hidden = false;
    result.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

/* ---------- Kundali generator ---------- */

/* North Indian chart geometry (viewBox 0 0 360 360). Houses sit in fixed
   positions, counterclockwise from the Lagna at the top; signs rotate.
   Each entry: sign-number anchor, planet anchor, max abbreviations per line. */
const CHART_HOUSES = [
  { sign: [180, 26], planets: [180, 96], perLine: 3 },
  { sign: [90, 18], planets: [90, 42], perLine: 3 },
  { sign: [34, 72], planets: [34, 96], perLine: 2 },
  { sign: [90, 148], planets: [90, 172], perLine: 3 },
  { sign: [34, 252], planets: [34, 276], perLine: 2 },
  { sign: [90, 348], planets: [90, 322], perLine: 3, flip: true },
  { sign: [180, 334], planets: [180, 262], perLine: 3 },
  { sign: [270, 348], planets: [270, 322], perLine: 3, flip: true },
  { sign: [326, 252], planets: [326, 276], perLine: 2 },
  { sign: [270, 148], planets: [270, 172], perLine: 3 },
  { sign: [326, 72], planets: [326, 96], perLine: 2 },
  { sign: [270, 18], planets: [270, 42], perLine: 3 }
];

function buildNorthIndianChart(chart) {
  const lagnaIndex = chart.lagna.signIndex;
  const byHouse = {};
  chart.planets.forEach(function (p) { (byHouse[p.house] = byHouse[p.house] || []).push(p.abbr); });
  let svg = "<svg viewBox='0 0 360 360' class='kundali-chart' role='img' " +
    "aria-label='North Indian style kundali chart. The Lagna is " + escapeHtml(chart.lagna.sign) +
    ". Planet positions are also listed in the table below.'>" +
    "<rect x='2' y='2' width='356' height='356' class='chart-frame' />" +
    "<line x1='2' y1='2' x2='358' y2='358' class='chart-line' />" +
    "<line x1='358' y1='2' x2='2' y2='358' class='chart-line' />" +
    "<polygon points='180,2 358,180 180,358 2,180' class='chart-diamond' />";
  for (let h = 1; h <= 12; h++) {
    const geo = CHART_HOUSES[h - 1];
    const signNumber = ((lagnaIndex + h - 1) % 12) + 1;
    svg += "<text x='" + geo.sign[0] + "' y='" + geo.sign[1] + "' class='chart-sign-number'>" + signNumber + "</text>";
    let labels = byHouse[h] ? byHouse[h].slice() : [];
    if (h === 1) labels.unshift("As");
    if (!labels.length) continue;
    const lines = [];
    for (let i = 0; i < labels.length; i += geo.perLine) lines.push(labels.slice(i, i + geo.perLine).join(" "));
    const lineHeight = 15;
    let startY = geo.planets[1];
    if (geo.flip) startY = geo.planets[1] - (lines.length - 1) * lineHeight;
    lines.forEach(function (line, i) {
      const isAs = line.split(" ").indexOf("As") !== -1;
      svg += "<text x='" + geo.planets[0] + "' y='" + (startY + i * lineHeight) + "' class='chart-planet" +
        (isAs && lines.length === 1 ? " chart-asc" : "") + "'>" + escapeHtml(line) + "</text>";
    });
  }
  svg += "</svg>";
  return svg;
}

function initKundali() {
  populateTimezoneSelect(document.getElementById("kd-timezone"));
  const form = document.getElementById("kundali-form");
  const result = document.getElementById("kundali-result");
  const error = document.getElementById("kundali-error");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const date = parseDateInput(document.getElementById("kd-date").value);
    if (!date) {
      error.hidden = false;
      document.getElementById("kd-date").focus();
      return;
    }
    error.hidden = true;
    const time = parseTimeInput(document.getElementById("kd-time").value);
    const tzId = document.getElementById("kd-timezone").value;
    const coords = resolveCoordinates(
      document.getElementById("kd-place").value,
      parseCoordInput(document.getElementById("kd-lat").value),
      parseCoordInput(document.getElementById("kd-lon").value),
      tzId
    );
    const chart = computeKundali({
      year: date.year, month: date.month, day: date.day,
      hour: time ? time.hour : 12, minute: time ? time.minute : 0,
      hasTime: !!time, tzId: tzId, coords: coords
    });

    let html = "<div class='result-grid'>";
    if (chart.lagna) {
      html += placementCard("Lagna (Ascendant) <span class='approx-tag'>approximate</span>",
        "<p class='result-big'>" + escapeHtml(chart.lagna.sign) + " (" + escapeHtml(chart.lagna.rashi) + ") " +
        formatDegree(chart.lagna.degree) + "</p>" +
        "<p>" + escapeHtml(chart.lagna.nakshatra) + ", pada " + chart.lagna.pada + "</p>", null);
    } else {
      html += placementCard("Lagna (Ascendant)",
        "<p>The Lagna cannot be determined without a birth time — it changes roughly every two hours. " +
        "Add your time of birth to see the ascendant, houses, and chart.</p>", null);
    }
    html += placementCard("Moon sign (Rashi) <span class='approx-tag'>approximate</span>",
      "<p class='result-big'>" + escapeHtml(chart.moon.sign) + " (" + escapeHtml(chart.moon.rashi) + ") " +
      formatDegree(chart.moon.degree) + "</p>" +
      "<p>" + escapeHtml(chart.moon.nakshatra) + ", pada " + chart.moon.pada + " — lord " + escapeHtml(chart.moon.lord) + "</p>",
      time ? null : "Without a birth time the Moon sign and nakshatra are calculated for midday and may be off.");
    html += placementCard("Nakshatra <span class='approx-tag'>approximate</span>",
      "<p class='result-big'>" + escapeHtml(chart.moon.nakshatra) + ", pada " + chart.moon.pada + "</p>" +
      "<p>Birth nakshatra of the Moon, lord " + escapeHtml(chart.moon.lord) + ". This sets the starting Vimshottari dasha below.</p>",
      null);
    html += "</div>";

    html += "<div class='table-scroll'><table class='chart-table'><caption>Planets by sign and house (whole-sign houses from the Lagna)</caption>" +
      "<thead><tr><th>Planet</th><th>Sign (Rashi)</th><th>Degree</th><th>Nakshatra</th><th>Pada</th><th>House</th></tr></thead><tbody>";
    chart.planets.forEach(function (p) {
      html += "<tr><td>" + escapeHtml(p.name) + "</td><td>" + escapeHtml(p.sign) + " (" + escapeHtml(p.rashi) + ")</td>" +
        "<td>" + formatDegree(p.degree) + "</td><td>" + escapeHtml(p.nakshatra) + "</td><td>" + p.pada + "</td>" +
        "<td>" + (p.house === null ? "—" : p.house) + "</td></tr>";
    });
    html += "</tbody></table></div>";

    if (chart.lagna) {
      html += "<div class='chart-wrap'>" + buildNorthIndianChart(chart) +
        "<p class='chart-caption'>North Indian style chart. Numbers are the signs (1 = Aries … 12 = Pisces); " +
        "As marks the Lagna. Planet abbreviations: Su Sun, Mo Moon, Ma Mars, Me Mercury, Ju Jupiter, Ve Venus, Sa Saturn, Ra Rahu, Ke Ketu.</p></div>";
    }

    html += "<h4 class='dasha-heading'>Vimshottari dasha <span class='approx-tag'>approximate</span></h4>" +
      "<div class='table-scroll'><table class='chart-table'><caption>Dasha periods from birth (approximate dates)</caption>" +
      "<thead><tr><th>Period</th><th>From</th><th>To</th><th></th></tr></thead><tbody>";
    chart.dashas.forEach(function (d) {
      html += "<tr" + (d.current ? " class='dasha-current'" : "") + "><td>" + escapeHtml(d.lord) +
        (d.balance ? " (balance at birth)" : "") + "</td><td>" + formatDateShort(d.start) + "</td><td>" +
        formatDateShort(d.end) + "</td><td>" + (d.current ? "Current" : "") + "</td></tr>";
    });
    html += "</tbody></table></div>";

    html += "<p class='coord-note'>" + escapeHtml(coords.note) + "</p>";
    html += "<p class='calc-disclaimer'>Approximate kundali, for entertainment and reflection only. " +
      "Positions use simplified calculations with a Lahiri ayanamsa approximation (" +
      chart.ayanamsa.toFixed(2) + "° for this date); a professional jyotishi uses precise ephemeris data and your exact birth time. " +
      "Not medical, financial, or legal advice.</p>";
    result.innerHTML = html;
    result.hidden = false;
    result.scrollIntoView({ behavior: "smooth", block: "start" });
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

/* ---------- Request a consultation (browser-local storage) ---------- */

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
    return (
      "<li><div class='q-meta'>#" + q.ref + " &middot; " + escapeHtml(q.category) +
      " &middot; " + date + who + " &middot; Awaiting answer</div>" +
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
    const description = descInput.value.trim();
    ok = showFieldError(descInput, document.getElementById("question-error"), !description) && ok;
    if (!ok) {
      const firstInvalid = form.querySelector("[aria-invalid='true']");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const questions = loadQuestions();
    const ref = questions.length + 1;
    questions.push({
      ref: ref,
      name: nameInput.value.trim(),
      email: email,
      phone: phone,
      category: document.getElementById("q-category").value,
      birthdate: document.getElementById("q-birthdate").value,
      birthtime: document.getElementById("q-birthtime").value,
      birthplace: document.getElementById("q-birthplace").value.trim(),
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
  initWesternCalculator();
  initKundali();
  renderMoonPhases();
  renderMercury();
  initConsultationForm();
}

/* ---------- Node export (verification only; skipped in the browser) ---------- */

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    SIGNS: SIGNS, TIMEZONES: TIMEZONES, PLACES: PLACES, NAKSHATRAS: NAKSHATRAS,
    RASHIS: RASHIS, MERCURY_PERIODS: MERCURY_PERIODS,
    computeKundali: computeKundali, computeWesternChart: computeWesternChart,
    resolveCoordinates: resolveCoordinates, lookupPlace: lookupPlace,
    tropicalLongitudes: tropicalLongitudes, julianDay: julianDay,
    ayanamsaLahiri: ayanamsaLahiri, ascendant: ascendant,
    moonPhaseInfo: moonPhaseInfo, mercuryStatus: mercuryStatus,
    nakshatraOf: nakshatraOf, signOf: signOf, formatDegree: formatDegree
  };
}
