const sparkleLayer = document.querySelector(".sparkle-layer");
const sparkleTargets = document.querySelectorAll("[data-sparkle]");
const partyToggle = document.querySelector("[data-party-toggle]");
const sparkleEmojis = ["✨", "🌵", "🌮", "🥃", "🎉", "🪩", "🔥", "🪅"];

const getSparkleOrigin = (event) => {
  if (!sparkleLayer) {
    return { x: 0, y: 0 };
  }

  const layerRect = sparkleLayer.getBoundingClientRect();

  if (typeof event?.clientX === "number" && typeof event?.clientY === "number") {
    return {
      x: event.clientX - layerRect.left,
      y: event.clientY - layerRect.top,
    };
  }

  if (event?.currentTarget?.getBoundingClientRect) {
    const targetRect = event.currentTarget.getBoundingClientRect();
    return {
      x: targetRect.left + targetRect.width / 2 - layerRect.left,
      y: targetRect.top + targetRect.height / 2 - layerRect.top,
    };
  }

  return { x: layerRect.width / 2, y: layerRect.height / 2 };
};

const spawnSparkles = (event) => {
  if (!sparkleLayer) return;
  const origin = getSparkleOrigin(event);

  for (let i = 0; i < 10; i += 1) {
    const sparkle = document.createElement("span");
    sparkle.className = "sparkle";
    sparkle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
    sparkle.style.left = `${origin.x}px`;
    sparkle.style.top = `${origin.y}px`;
    sparkle.style.setProperty("--spread", `${Math.random() * 160 - 80}px`);
    sparkle.style.setProperty("--rise", `${60 + Math.random() * 120}px`);
    sparkle.style.setProperty("--spin", `${Math.random() * 360}deg`);
    sparkleLayer.appendChild(sparkle);

    sparkle.addEventListener("animationend", () => sparkle.remove());
  }
};

sparkleTargets.forEach((target) => {
  target.addEventListener("click", spawnSparkles);
});

partyToggle?.addEventListener("click", (event) => {
  event.preventDefault();
  document.body.classList.toggle("party-mode");
  spawnSparkles(event);
});
