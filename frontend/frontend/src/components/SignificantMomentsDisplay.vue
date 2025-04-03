<script setup>
import { ref, onMounted } from "vue";
import EmojiRainStormEffect from "./EmojiRainStormEffect.vue";
//need to update emoji.value dynamically in SignificantMomentsDisplay.vue
const emoji = ref("💧");

// Simulating real-time emoji updates
const mockEmojis = ["😊", "❤️", "🎉", "💧", "🔥"];
let intervalId = null;

onMounted(() => {
  intervalId = setInterval(() => {
    emoji.value = mockEmojis[Math.floor(Math.random() * mockEmojis.length)];
  }, 5000); // Change emoji every 3 seconds
});
</script>

<template>
  <EmojiRainStormEffect :emoji="emoji" />
</template>
