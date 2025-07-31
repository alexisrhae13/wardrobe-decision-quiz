// Wait until the form is submitted before doing anything
document.getElementById("quiz-form").addEventListener("submit", function (e) {
  e.preventDefault(); // Stop the page from refreshing when you click the button

  // Grab all the answers from the form
  const form = e.target;
  const season = form.season.value.toLowerCase(); // like fall, spring, etc.
  const color = form.color.value.trim().toLowerCase(); // removes spaces and makes it lowercase
  const pattern = form.pattern.value.trim().toLowerCase();
  const quality = form.quality.value.trim().toLowerCase();
  const fillsGap = form.gap.value === "true"; // turns the answer into true/false
  const styleable = form.styleable.value === "true";
  const trendy = form.trendy.value === "true";

  // This is where the answer will show up!
  const result = document.getElementById("result");

  // If it's trendy, we stop right here and say NO!
  if (trendy) {
    result.innerText = "🚫 NO! It's trendy, so be reallllly critical. Are you gonna make fun of this in 3 years?";
    return; // don’t check anything else if it’s trendy
  }

  // This is our color and pattern list for each season
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

  // This keeps track of how many good things we see!
  let score = 0;

  // Check if the color is in your season palette
  if (palettes[season].colors.includes(color)) {
    score++;
  }

  // Check if the pattern is a match
  if (palettes[season].patterns.includes(pattern)) {
    score++;
  }

  // Check if the fabric is NOT polyester (includes anything like "poly blend")
  if (!quality.includes("poly")) {
    score++;
  }

  // Did you say it fills a wardrobe gap?
  if (fillsGap) {
    score++;
  }

  // Does it pair with 2 or more things in your closet?
  if (styleable) {
    score++;
  }

  // Final result — tell you what to do!
  if (score >= 5) {
    result.innerText = "✅ YES! This is a good choice. Stylish and smart!";
  } else {
    result.innerText = "🤔 Hmmm... this doesn’t meet your matrix. Is it on sale? Or just super fun?";
  }
});
