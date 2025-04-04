<script setup>
import {io} from 'socket.io-client';
import { ref, onMounted, onUnmounted } from "vue";
import EmojiRainStormEffect from "./EmojiRainStormEffect.vue";
//need to update emoji.value dynamically in SignificantMomentsDisplay.vue
const emoji = ref("💧"); // Default emoji
let socket = null;
// // Simulating real-time emoji updates
// const mockEmojis = ["😊", "❤️", "🎉", "💧", "🔥"];
// let intervalId = null;
//
// onMounted(() => {
//   intervalId = setInterval(() => {
//     emoji.value = mockEmojis[Math.floor(Math.random() * mockEmojis.length)];
//   }, 5000); // Change emoji every 3 seconds
// });

onMounted(() => {
  socket = io('ws://localhost:3000');

  socket.on('connect', () => {
    console.log('significant data Connected to WebSocket server');
  });

  socket.on('significant-moment', (data) => {
    console.log('Received significant-moment:', data);
    if (data?.emote) {
      emoji.value = data.emote;
    }
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket server');
  });
});

onUnmounted(() => {
  if (socket) {
    socket.disconnect();
  }
});

</script>

<template>
  <EmojiRainStormEffect :emoji="emoji" />
</template>
