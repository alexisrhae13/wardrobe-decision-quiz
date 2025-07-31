document.getElementById("quiz-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const season = form.season.value.toLowerCase();
  const color = form.color.value.trim().toLowerCase();
  const pattern = form.pattern.value.trim().toLowerCase();
  const quality = form.quality.value.trim().toLowerCase();
  const fillsGap = form.gap.value === "true";
  const styleable = form.styleable.value === "true";
  const trendy = form.trendy.value === "true";

  if (trendy) {
    document.getElementById("result").innerText = "NO! it's a trend so be reallllly critical. Is everyone buying it because of the color? Is it the sillohette? Are you going to make fun of the outfit choice in a photo you see three years from now?  ";
    return;
  }

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

  let score = 0;

  if (palettes[season].colors.includes(color)) score++;
  if (palettes[season].patterns.includes(pattern)) score++;
  //all instances of polyester like poly blend will be grabbed. also case sensitive. 
  if (!quality.toLowerCase().includes("poly")) score++;
  if (fillsGap) score++;
  if (styleable) score++;

  const result = document.getElementById("result");

  if (score >= 4) {
    result.innerText = "YES! This is a good choice i think!";
  } else {
    result.innerText = "Hmmm, this doesnt meet your matrix. Is there another reason you like this that much? Is it on SALE?!?!?!?!? tisk tisk.";
  }
});

