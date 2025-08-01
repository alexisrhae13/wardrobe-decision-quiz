function setupListeners() {
  const form = document.getElementById("quiz-form");

  // Radio groups: season, gap, styleable, trendy, color, pattern, quality
  ['season', 'gap', 'styleable', 'trendy', 'color', 'pattern', 'quality'].forEach(name => {
    document.querySelectorAll(`input[name="${name}"]`).forEach(input => {
      input.addEventListener('change', updateFeedback);
    });
  });

  // Form submit event - prevent refresh & update feedback
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    updateFeedback();
  });
}

let liveScore = 0;

function resetScore() {
  liveScore = 0;
  const scoreDisplay = document.getElementById("live-score");
  if(scoreDisplay) scoreDisplay.innerText = liveScore;
}

function updateScore(value) {
  liveScore += value;
  const scoreDisplay = document.getElementById("live-score");
  if(scoreDisplay) scoreDisplay.innerText = liveScore;
}

const palettes = {
  fall: {
    colors: ["crisp cream", "espresso brown", "charcoal gray", "navy", "chartreuse", "cherry red", "bright teal", "electric violet", "emerald green"],
    patterns: ["none", "tartan", "fair isle", "houndstooth", "cable knit"]
  },
  winter: {
    colors: ["crisp cream", "espresso brown", "charcoal gray", "navy", "chartreuse", "cherry red", "bright teal", "electric violet", "emerald green"],
    patterns: ["none", "tartan", "fair isle", "houndstooth", "cable knit"]
  },
  spring: {
    colors: ["black", "light gray", "linen beige", "cobalt", "chartreuse", "hot magenta", "cherry red", "turquoise"],
    patterns: ["none", "abstract", "stripes", "sailboat"]
  },
  summer: {
    colors: ["black", "light gray", "linen beige", "cobalt", "chartreuse", "hot magenta", "cherry red", "turquoise"],
    patterns: ["none", "abstract", "stripes", "sailboat"]
  }
};

function updateFeedback() {
  resetScore();

  const form = document.getElementById("quiz-form");

  // Get values
  const season = form.querySelector('input[name="season"]:checked')?.value || "";
  const color = form.querySelector('input[name="color"]:checked')?.value.toLowerCase() || "";
  const pattern = form.querySelector('input[name="pattern"]:checked')?.value.toLowerCase() || "";
  const quality = form.querySelector('input[name="quality"]:checked')?.value.toLowerCase() || "";
  const fillsGap = form.querySelector('input[name="gap"]:checked')?.value === "Yes";
  const styleable = form.querySelector('input[name="styleable"]:checked')?.value === "Yes";
  const trendy = form.querySelector('input[name="trendy"]:checked')?.value === "Yes";

  // Clear feedback fields
  document.querySelectorAll("[id$='-feedback']").forEach(div => div.innerText = "");

  // Trend check - instant no
  if (trendy) {
    document.getElementById("trendy-feedback").innerText = "Will this age well?";
    document.getElementById("result").innerText = "NO - Trend";
    return; // Skip scoring others
  } else {
    document.getElementById("trendy-feedback").innerText = "Timeless?!";
  }

  // Season feedback
  if (season && palettes[season]) {
    document.getElementById("season-feedback").innerText = `It's ${season.charAt(0).toUpperCase() + season.slice(1)}!`;
  }

  // Color feedback and scoring
  if (color && palettes[season] && palettes[season].colors.includes(color)) {
    document.getElementById("color-feedback").innerText = `"${color}" works for the seasonal palette!`;
    updateScore(1);
  } else if (color) {
    document.getElementById("color-feedback").innerText = `UH OH! "${color}" isn't part of your seasonal palette.`;
  }

  // Pattern feedback and scoring
  if (pattern && palettes[season] && palettes[season].patterns.includes(pattern)) {
    document.getElementById("pattern-feedback").innerText = `"${pattern}" fits the season!`;
    updateScore(1);
  } else if (pattern) {
    document.getElementById("pattern-feedback").innerText = `UH OH! "${pattern}" isn't a known seasonal pattern.`;
  }

  // Quality feedback and scoring
  if (quality && !quality.includes("poly")) {
    document.getElementById("quality-feedback").innerText = "Noice!";
    updateScore(1);
  } else if (quality) {
    document.getElementById("quality-feedback").innerText = "Polyester?!? Not worth it probably.";
  }

  // Gap feedback and scoring
  if (fillsGap) {
    document.getElementById("gap-feedback").innerText = "Score!!";
    updateScore(1);
  } else if (fillsGap === false) {
    document.getElementById("gap-feedback").innerText = "Doesn't fill a wardrobe gap. Hmmmmm.";
  }

  // Styleable feedback and scoring
  if (styleable) {
    document.getElementById("styleable-feedback").innerText = "Easeie Peasie!";
    updateScore(1);
  } else if (styleable === false) {
    document.getElementById("styleable-feedback").innerText = "Hard to pair? That’s risky.....";
  }

  // Final decision message
  if (liveScore >= 5) {
    document.getElementById("result").innerText = "YES!";
  } else {
    document.getElementById("result").innerText = "Nope :(";
  }
}

// Initialize listeners when DOM ready
document.addEventListener('DOMContentLoaded', setupListeners);
