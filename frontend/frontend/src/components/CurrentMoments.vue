<script setup lang="ts">
import {ref, onMounted, onUnmounted} from "vue";
import { io, Socket} from 'socket.io-client';

//define a type for moments
interface Moments {
  timestamp: string;
  emoji: string;
}

const moments = ref<Moments[]>([]);
let socket: Socket;

onMounted(() => {
  // Use environment variable for WebSocket URL,    // socket = io('ws://server_a:3000');
  socket = io(import.meta.env.VITE_SOCKET_URL );

  // if we are using http, we write it like this
  //socket = io('http://localhost:3000' );

  // Handle WebSocket errors
  socket.on('connect_error', (error) => {
    console.error('WebSocket connection failed:', error);
  });


  // Listen for incoming moments
    socket.on('current-moment', (moment: any) => {
      if (!moment || !moment.timestamp || !moment.emoji) {
        console.warn("Invalid data received:", moment);
        return;
      }

      console.log('Raw emote received:', moment);

      // Add new moment at the start of the list
      moments.value.unshift({
        timestamp: moment.timestamp,
        emoji: moment.emoji
      });

      // Keep only the last 10 moments
      if (moments.value.length > 10) {
        moments.value.pop();
      }
    });
});


onUnmounted(() => {
  // Disconnect WebSocket on unmount
  if (socket) {
    socket.disconnect();
  }
})

</script>

<template>
  <div class="p-2">
    <h2 class="text-lg font-bond mb--2">
      Current Emotions
    </h2>

    <div v-for="(moment, index) in moments" :key="index"
        class="flex items-center mb--2 p-2 bg-gray-100 rounded">
      <span class="mr-2">{{moment.timestamp}}}</span>
      <span class="text-2xl">{{moment.emoji}}}</span>
    </div>
  </div>
</template>



