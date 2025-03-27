<template>
  <div class="significant-moments">
    <h2 class="text-2xl font-bold mb-4">Significant Moments</h2>
    <div
      v-for="(moment, index) in significantMoments"
      :key="index"
      class="bg-blue-100 p-4 mb-2 rounded-lg"
    >
      <p>Emote: {{ moment.emote }}</p>
      <p>Timestamp: {{ moment.timestamp }}</p>
      <p>Viewers: {{ moment.viewerCount }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { io, Socket } from 'socket.io-client';

const significantMoments = ref<any[]>([]);
let socket: Socket;

onMounted(() => {
  // Connect to Server A's WebSocket
  socket = io('http://localhost:3000');

  socket.on('significant-moment', (moment) => {
    console.log("Significant moment received:", moment);
    significantMoments.value.push(moment);

    // Limit to last 10 moments
    if (significantMoments.value.length > 10) {
      significantMoments.value.shift();
    }
  });
  socket.on("currentMoment", (moment) => {
    console.log('Raw emote received: ', moment)})
});

onUnmounted(() => {
  // Disconnect socket when component is unmounted
  if (socket) {
    socket.disconnect();
  }
});
</script>
