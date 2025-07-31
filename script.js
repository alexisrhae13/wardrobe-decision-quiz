let liveScore = 0;

const updateScore = (value) => {
  liveScore += value;
  document.getElementById("live-score").innerText = liveScore;
};

// Reset liveScore when starting fresh
const resetScore = () => {
  liveScore = 0;
  document.getElementById("live-score").innerText = liveScore;
};

// Define palettes
const palettes = {
  fall: {
    colors: ["crisp cream", "espresso brown", "charcoal gray", "navy", "chartreuse", "cherry red", "bright teal", "electric violet", "emerald green"],
    patterns: ["tartan", "fair isle", "houndstooth", "cable knit"]
  },
  winter: {
    colors: ["crisp cream", "espresso brown", "charcoal gray", "navy", "chartreuse", "cherry red", "bright teal", "electric violet", "emerald green"],
    patterns: ["tartan", "fair isle", "houndstooth", "cable knit"]
  },
  spring: {
    colors: ["black", "light gray", "linen beige", "cobalt", "chartreuse", "hot magenta", "cherry red", "turquoise"],
    patterns: ["stripes", "sailboat"]
  },
  summer: {
    colors: ["black", "light gray", "linen beige", "cobalt", "chartreuse", "hot magenta", "cherry red", "turquoise"],
    patterns: ["stripes", "sailboat"]
  }
};

// Inputs to watch
const inputs = ["season", "color", "pattern", "quality", "gap", "styleable", "trendy"];

// Live feedback handlers
inputs.forEach((id) => {
  document.getElementById(id).addEventListener("change", updateFeedback);
});

function updateFeedback() {
  resetScore(); // Start fresh
  const season = form.querySelector('input[name="season"]:checked').value === "Yes";
  const color = document.getElementById("color").value.trim().toLowerCase();
  const pattern = document.getElementById("pattern").value.trim().toLowerCase();
  const quality = document.getElementById("quality").value.trim().toLowerCase();
  const fillsGap = document.getElementById("gap").value === "true";
  const styleable = form.querySelector('input[name="styleable"]:checked').value === "Yes";
  const trendy = document.getElementById("trendy").value === "true";

  // Clear all feedback first
  document.querySelectorAll("[id$='-feedback']").forEach(div => div.innerText = "");

  if (trendy) {
    document.getElementById("trendy-feedback").innerText = "⚠️ Trend alert! Will this age well?";
    document.getElementById("result").innerText = "🚫 Nope! Too trendy. Be cautious!";
    return; // Don’t score anything else
  } else {
    document.getElementById("trendy-feedback").innerText = "✅ Trend-safe!";
  }

  if (season && palettes[season]) {
    document.getElementById("season-feedback").innerText = `Season chosen: ${season.charAt(0).toUpperCase() + season.slice(1)} 🍂`;
  }

  if (color && palettes[season] && palettes[season].colors.includes(color)) {
    document.getElementById("color-feedback").innerText = `🎨 "${color}" is in your color palette!`;
    updateScore(1);
  } else if (color) {
    document.getElementById("color-feedback").innerText = `🚫 "${color}" isn't part of your seasonal palette.`;
  }

  if (pattern && palettes[season] && palettes[season].patterns.includes(pattern)) {
    document.getElementById("pattern-feedback").innerText = `🧶 Pattern "${pattern}" fits the season!`;
    updateScore(1);
  } else if (pattern) {
    document.getElementById("pattern-feedback").innerText = `⚠️ "${pattern}" isn't a known seasonal pattern.`;
  }

  if (quality && !quality.includes("poly")) {
    document.getElementById("quality-feedback").innerText = "👌 Passes the fabric check!";
    updateScore(1);
  } else if (quality) {
    document.getElementById("quality-feedback").innerText = "🚫 Polyester? No thank you.";
  }

  if (fillsGap) {
    document.getElementById("gap-feedback").innerText = "🧩 Fills a wardrobe gap — smart!";
    updateScore(1);
  } else if (document.getElementById("gap").value === "false") {
    document.getElementById("gap-feedback").innerText = "🤷‍♀️ Doesn't fill a wardrobe gap. Hmm.";
  }

  if (styleable) {
    document.getElementById("styleable-feedback").innerText = "👗 You can pair it — we love versatility!";
    updateScore(1);
  } else if (document.getElementById("styleable").value === "false") {
    document.getElementById("styleable-feedback").innerText = "😬 Hard to pair? That’s risky!";
  }

  // Update result as feedback
  if (liveScore >= 5) {
    document.getElementById("result").innerText = "✅ YES! This is a smart and stylish pick.";
  } else {
    document.getElementById("result").innerText = "🤔 Not quite a winner yet — think it over.";
  }
}

// Final decision button logic (optional because we already show feedback live)
document.getElementById("quiz-form").addEventListener("submit", function (e) {
  e.preventDefault();
  updateFeedback();
});
