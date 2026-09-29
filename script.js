// ==========================================
// MOOD CHECK — IMPROVED MOOD DETECTION
// ==========================================

const moodInput = document.getElementById("moodInput");
const moodBtn = document.getElementById("moodBtn");
const moodResult = document.getElementById("moodResult");
const resetBtn = document.getElementById("resetBtn");

const charCount = document.getElementById("charCount");

const mainEmoji = document.getElementById("mainEmoji");

const resultEmoji = document.getElementById("resultEmoji");
const resultTitle = document.getElementById("resultTitle");
const resultText = document.getElementById("resultText");
const moodScore = document.getElementById("moodScore");
const moodTip = document.getElementById("moodTip");
const meterFill = document.getElementById("meterFill");


// ==========================================
// CHARACTER COUNTER
// ==========================================

moodInput.addEventListener("input", () => {
    charCount.textContent = moodInput.value.length;
});


// ==========================================
// MOOD INFORMATION
// ==========================================

const moods = {

    happy: {
        emoji: "😊",
        title: "You seem to be feeling happy!",
        text: "Your words suggest a positive and happy mood.",
        score: "Positive",
        percentage: 90,
        tip: "Enjoy the moment and share your positive energy with someone around you."
    },

    excited: {
        emoji: "🤩",
        title: "You sound excited!",
        text: "Your words suggest enthusiasm, energy, and excitement.",
        score: "Very Positive",
        percentage: 95,
        tip: "Channel that excitement into something creative or productive."
    },

    relaxed: {
        emoji: "😌",
        title: "You seem relaxed.",
        text: "Your words suggest a calm and peaceful state of mind.",
        score: "Calm",
        percentage: 82,
        tip: "Keep giving yourself time to relax and enjoy peaceful moments."
    },

    sad: {
        emoji: "😔",
        title: "It sounds like you're feeling down.",
        text: "Your words suggest sadness or disappointment.",
        score: "Low",
        percentage: 30,
        tip: "Take some time for yourself and consider talking to someone you trust."
    },

    angry: {
        emoji: "😤",
        title: "You sound frustrated.",
        text: "Your words suggest anger, irritation, or frustration.",
        score: "Tense",
        percentage: 25,
        tip: "Take a few slow breaths and give yourself some space before reacting."
    },

    stressed: {
        emoji: "😰",
        title: "You may be feeling stressed.",
        text: "Your words suggest pressure, worry, or stress.",
        score: "Stressed",
        percentage: 25,
        tip: "Try taking a short break and focusing on one thing at a time."
    },

    tired: {
        emoji: "😴",
        title: "You sound tired.",
        text: "Your words suggest that you may need some rest.",
        score: "Low Energy",
        percentage: 40,
        tip: "If possible, give yourself some time to rest and recharge."
    },

    neutral: {
        emoji: "🙂",
        title: "You seem to be feeling okay.",
        text: "Your message doesn't show a strong positive or negative mood.",
        score: "Neutral",
        percentage: 60,
        tip: "Sometimes simply checking in with yourself is a good thing."
    }
};


// ==========================================
// KEYWORDS
// ==========================================

const keywordGroups = {

    happy: [
        "happy",
        "happier",
        "happiness",
        "good",
        "great",
        "wonderful",
        "amazing",
        "love",
        "loving",
        "joy",
        "joyful",
        "fun",
        "awesome",
        "smile",
        "smiling",
        "glad",
        "pleased",
        "nice",
        "fantastic",

        "খুশি",
        "সুখী",
        "ভালো",
        "ভাল",
        "আনন্দ",
        "দারুণ",
        "অসাধারণ"
    ],

    excited: [
        "excited",
        "exciting",
        "thrilled",
        "enthusiastic",
        "enthusiasm",
        "can't wait",
        "cannot wait",
        "looking forward",

        "উত্তেজিত",
        "রোমাঞ্চিত",
        "উচ্ছ্বসিত"
    ],

    relaxed: [
        "relaxed",
        "relax",
        "calm",
        "peaceful",
        "peace",
        "comfortable",
        "chill",
        "restful",
        "relieved",

        "শান্ত",
        "আরাম",
        "স্বস্তি",
        "নির্ভার"
    ],

    sad: [
        "sad",
        "sadness",
        "unhappy",
        "cry",
        "crying",
        "lonely",
        "alone",
        "disappointed",
        "disappointment",
        "hurt",
        "upset",
        "heartbroken",
        "broken",
        "bad",
        "terrible",
        "awful",
        "miserable",
        "hopeless",

        "মন খারাপ",
        "দুঃখ",
        "দুঃখিত",
        "কষ্ট",
        "একাকী",
        "একা",
        "খারাপ",
        "ভীষণ খারাপ",
        "খুব খারাপ",
        "অসহ্য"
    ],

    angry: [
        "angry",
        "anger",
        "mad",
        "furious",
        "annoyed",
        "annoying",
        "frustrated",
        "frustration",
        "hate",
        "hating",
        "irritated",
        "irritating",

        "রাগ",
        "রেগে",
        "বিরক্ত",
        "ক্ষুব্ধ",
        "ঘৃণা"
    ],

    stressed: [
        "stress",
        "stressed",
        "pressure",
        "worried",
        "worry",
        "anxious",
        "anxiety",
        "overwhelmed",
        "tension",
        "panic",
        "nervous",

        "চাপ",
        "দুশ্চিন্তা",
        "উদ্বিগ্ন",
        "টেনশন",
        "নার্ভাস",
        "অস্থির"
    ],

    tired: [
        "tired",
        "sleepy",
        "exhausted",
        "sleep",
        "drained",
        "fatigue",
        "no energy",
        "low energy",
        "burned out",
        "burnt out",

        "ঘুম",
        "ক্লান্ত",
        "অবসন্ন",
        "শক্তি নেই",
        "ক্লান্ত লাগছে"
    ]
};


// ==========================================
// STRONG PHRASES
// ==========================================
// These phrases get extra weight.

const strongPhrases = {

    happy: [
        "very happy",
        "really happy",
        "so happy",
        "extremely happy",
        "feeling great",
        "feeling amazing",
        "very good",
        "really good",
        "খুব ভালো",
        "অনেক ভালো",
        "খুব খুশি"
    ],

    sad: [
        "very bad",
        "really bad",
        "so bad",
        "extremely bad",
        "feeling bad",
        "feel bad",
        "feeling terrible",
        "feel terrible",
        "very sad",
        "really sad",
        "so sad",
        "extremely sad",
        "খুব খারাপ",
        "ভীষণ খারাপ",
        "অনেক খারাপ",
        "মনটা খুব খারাপ"
    ],

    angry: [
        "very angry",
        "really angry",
        "extremely angry",
        "so angry",
        "very frustrated",
        "really frustrated",
        "খুব রাগ",
        "অনেক রাগ",
        "খুব বিরক্ত"
    ],

    stressed: [
        "very stressed",
        "really stressed",
        "extremely stressed",
        "too much pressure",
        "under a lot of pressure",
        "অনেক চাপ",
        "খুব চাপ",
        "অনেক দুশ্চিন্তা"
    ],

    tired: [
        "very tired",
        "really tired",
        "extremely tired",
        "so tired",
        "completely exhausted",
        "খুব ক্লান্ত",
        "অনেক ক্লান্ত"
    ],

    excited: [
        "very excited",
        "really excited",
        "extremely excited",
        "so excited",
        "খুব উত্তেজিত",
        "অনেক উত্তেজিত"
    ]
};


// ==========================================
// NEGATIVE / POSITIVE PHRASES
// ==========================================

const positivePhrases = [
    "feeling good",
    "feel good",
    "doing good",
    "doing great",
    "feeling great",
    "feeling happy",
    "feel happy",
    "having a great day",
    "having a good day",

    "ভালো লাগছে",
    "ভালো আছি",
    "অনেক ভালো আছি",
    "খুব ভালো লাগছে",
    "খুশি লাগছে"
];

const negativePhrases = [
    "feeling bad",
    "feel bad",
    "feeling terrible",
    "feel terrible",
    "feeling awful",
    "feel awful",
    "having a bad day",
    "not feeling good",
    "not feeling well",

    "ভালো লাগছে না",
    "ভালো নেই",
    "খারাপ লাগছে",
    "মন ভালো নেই",
    "মন খারাপ"
];


// ==========================================
// NEGATION WORDS
// ==========================================

const negationWords = [
    "not",
    "never",
    "no",
    "isn't",
    "wasn't",
    "aren't",
    "don't",
    "doesn't",
    "didn't",
    "cannot",
    "can't",
    "hardly",

    "না",
    "নেই",
    "কখনো না"
];


// ==========================================
// TEXT NORMALIZATION
// ==========================================

function normalizeText(text) {

    return text
        .toLowerCase()
        .replace(/[!?.,;:()[\]{}"']/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}


// ==========================================
// CHECK WHETHER A KEYWORD IS NEGATED
// ==========================================

function isNegated(text, keyword) {

    const index = text.indexOf(keyword);

    if (index === -1) {
        return false;
    }

    const beforeKeyword = text.substring(
        Math.max(0, index - 35),
        index
    );

    return negationWords.some(word => {

        return beforeKeyword
            .split(" ")
            .slice(-4)
            .includes(word);

    });
}


// ==========================================
// MOOD DETECTION
// ==========================================

function detectMood(originalText) {

    const text = normalizeText(originalText);

    const scores = {
        happy: 0,
        excited: 0,
        relaxed: 0,
        sad: 0,
        angry: 0,
        stressed: 0,
        tired: 0
    };


    // --------------------------------------
    // Strong phrase matching
    // --------------------------------------

    for (const mood in strongPhrases) {

        strongPhrases[mood].forEach(phrase => {

            if (text.includes(phrase.toLowerCase())) {

                scores[mood] += 4;

            }

        });

    }


    // --------------------------------------
    // Positive phrases
    // --------------------------------------

    positivePhrases.forEach(phrase => {

        if (text.includes(phrase.toLowerCase())) {

            scores.happy += 3;

        }

    });


    // --------------------------------------
    // Negative phrases
    // --------------------------------------

    negativePhrases.forEach(phrase => {

        if (text.includes(phrase.toLowerCase())) {

            scores.sad += 3;

        }

    });


    // --------------------------------------
    // Individual keyword matching
    // --------------------------------------

    for (const mood in keywordGroups) {

        keywordGroups[mood].forEach(keyword => {

            const normalizedKeyword = keyword.toLowerCase();

            if (!text.includes(normalizedKeyword)) {
                return;
            }


            // If keyword is negated,
            // don't count it normally.
            if (isNegated(text, normalizedKeyword)) {

                // Example:
                // "I am not happy"
                //
                // Instead of adding positive points,
                // add negative points.

                if (mood === "happy") {
                    scores.sad += 2;
                }

                if (mood === "excited") {
                    scores.neutral += 0;
                }

                return;
            }


            scores[mood] += 1;

        });

    }


    // --------------------------------------
    // Explicit negative combinations
    // --------------------------------------

    const explicitNegativePatterns = [
        "not good",
        "not happy",
        "not great",
        "not okay",
        "not okay at all",
        "not feeling good",
        "not feeling happy",
        "feel very bad",
        "feeling very bad",
        "feel really bad",
        "feeling really bad",
        "feel so bad",
        "feeling so bad",
        "feel extremely bad",
        "feeling extremely bad"
    ];


    explicitNegativePatterns.forEach(pattern => {

        if (text.includes(pattern)) {

            scores.sad += 5;

        }

    });


    // --------------------------------------
    // Explicit positive combinations
    // --------------------------------------

    const explicitPositivePatterns = [
        "very good",
        "really good",
        "so good",
        "extremely good",
        "very happy",
        "really happy",
        "so happy",
        "extremely happy",
        "feeling very good",
        "feeling really good"
    ];


    explicitPositivePatterns.forEach(pattern => {

        if (text.includes(pattern)) {

            scores.happy += 4;

        }

    });


    // ======================================
    // FIND HIGHEST SCORE
    // ======================================

    let detectedMood = "neutral";
    let highestScore = 0;


    for (const mood in scores) {

        if (scores[mood] > highestScore) {

            highestScore = scores[mood];

            detectedMood = mood;

        }

    }


    // ======================================
    // SPECIAL RULES
    // ======================================

    // Very clearly negative text
    if (
        text.includes("very bad") ||
        text.includes("really bad") ||
        text.includes("extremely bad") ||
        text.includes("so bad") ||
        text.includes("খুব খারাপ") ||
        text.includes("ভীষণ খারাপ")
    ) {

        detectedMood = "sad";

    }


    // Very clearly positive text
    if (
        text.includes("very happy") ||
        text.includes("really happy") ||
        text.includes("so happy") ||
        text.includes("extremely happy") ||
        text.includes("খুব খুশি")
    ) {

        detectedMood = "happy";

    }


    return detectedMood;
}


// ==========================================
// SHOW RESULT
// ==========================================

function showMoodResult(moodName) {

    const mood = moods[moodName];


    resultEmoji.textContent = mood.emoji;

    resultTitle.textContent = mood.title;

    resultText.textContent = mood.text;

    moodScore.textContent = mood.score;

    moodTip.textContent = mood.tip;

    mainEmoji.textContent = mood.emoji;


    moodResult.classList.remove("hidden");


    // Reset meter
    meterFill.style.width = "0%";


    // Animate meter
    setTimeout(() => {

        meterFill.style.width = `${mood.percentage}%`;

    }, 100);


    moodResult.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
}


// ==========================================
// CHECK MOOD
// ==========================================

moodBtn.addEventListener("click", () => {

    const text = moodInput.value.trim();


    if (!text) {

        moodInput.focus();

        moodInput.style.borderColor = "#c77d7d";

        setTimeout(() => {

            moodInput.style.borderColor = "";

        }, 1200);

        return;
    }


    const detectedMood = detectMood(text);

    showMoodResult(detectedMood);

});


// ==========================================
// CTRL + ENTER
// ==========================================

moodInput.addEventListener("keydown", event => {

    if (
        event.key === "Enter" &&
        (event.ctrlKey || event.metaKey)
    ) {

        event.preventDefault();

        moodBtn.click();

    }

});


// ==========================================
// RESET
// ==========================================

resetBtn.addEventListener("click", () => {

    moodInput.value = "";

    charCount.textContent = "0";

    moodResult.classList.add("hidden");

    mainEmoji.textContent = "🌸";

    meterFill.style.width = "0%";

    moodInput.focus();

});