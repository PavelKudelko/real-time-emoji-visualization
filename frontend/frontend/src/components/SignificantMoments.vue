<script setup>
import { onMounted } from "vue";
import { emojiBlast } from "emoji-blast";
let direction = 1; // 1 for right, -1 for left
let positionX = 50; // Starting X position
const pageMidpoint = Math.floor(window.innerHeight / 2);

const rainbowCol = () => {
  const rainbows = ["❤️", "🧡", "💛", "💚", "💙", "💜"];
  let positionY = pageMidpoint;

  for (const rainbow of rainbows) {
    emojiBlast({
      emojiCount: 1,
      emojis: [rainbow],
      physics: {
        fontSize: 35,
        gravity: 0.08,
        initialVelocities: {
          rotation: 0,
          x: 20,
          y: -20,
        },
        rotation: 0,
      },
      position: {
        x: 50, // Adjust as needed
        y: positionY,
      },
    });
    positionY += 30;
  } // Move the rainbow left and right
  positionX += 30 * direction;
  if (positionX >= window.innerWidth - 50 || positionX <= 50) {
    direction *= -1; // Change direction at screen edges
  }
};

const clouds = () => {
  let positionY = pageMidpoint;

  for (let i = 0; i < 6; i++) {
    emojiBlast({
      emojiCount: 1,
      emojis: ["☁️"],
      physics: {
        fontSize: 65,
        gravity: 0.08,
        initialVelocities: {
          rotation: 0,
          x: 20,
          y: -20,
        },
        rotation: 0,
      },
      position: {
        x: 50, // Adjust as needed
        y: positionY,
      },
    });
    positionY += 30;
  }
};

onMounted(() => {
  clouds();

  const intervalId = setInterval(rainbowCol, 80);

  setTimeout(() => {
    clearInterval(intervalId);
  }, 3000);

  setTimeout(clouds, 3000);
});
</script>

<template>
  <div>
    <h1>Emoji Animation</h1>
  </div>
</template>
