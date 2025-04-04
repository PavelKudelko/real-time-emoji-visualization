<script setup>
import { onMounted, onUnmounted, watch } from "vue";
import { emojiBlasts } from "emoji-blast";
//resuable compnonent
const props = defineProps({
  emoji: {
    type: String,
    required: true,
    default: "💧",
  },
  duration: {
    type: Number,
    default: 1000,
  },
});

let rainDrops = [];

const startRain = () => {
  // Stop any existing rain first ( or not)
  // stopRain();

  for (let i = 0; i < window.innerWidth; i += 25) {
    const randGravity = Math.random() * 0.3 + 0.1;
    const { cancel } = emojiBlasts({
      emojiCount: 1,
      emojis: [props.emoji],
      physics: {
        fontSize: { max: 30, min: 18 },
        gravity: randGravity,
        initialVelocities: { rotation: 0, x: 0, y: 0 },
        rotation: 0,
        rotationDeceleration: 0,
      },
      position: { x: i, y: 100 },
      interval: () => Math.floor(Math.random() * 1000) + 100,
    });

    rainDrops.push(cancel);
  }

  // Stop after the set duration
  setTimeout(stopRain, props.duration);
};

const stopRain = () => {
  rainDrops.forEach((cancel) => cancel());
  rainDrops = [];
};

onMounted(startRain);
onUnmounted(stopRain);

// Restart the effect when the emoji changes
watch(() => props.emoji, startRain);
</script>

<template>
  <div></div>
</template>
