<template >
  <div class="flex justify-center min-h-screen bg-gray-100">
    <div class="w-4/5 bg-white shadow-lg flex flex-col">

      <div class="relative flex min-h-screen w-full justify-center items-center">
        <!-- Main Content Area-->
        <div id="video-container" class="flex-grow flex h-screen w-4/5 items-center justify-center">
          <!-- Placeholder for streaming video-->
            <video-player class="w-full h-full" :options="videoOptions"></video-player>

        </div>

        <!-- Left Side Current Emoji List-->
        <CurrentMoments class = "absolute w-1/5 bottom-0 border-r-2  overflow-y-auto" />
      </div>
      <!--Bottom Significant Moments Animation -->
      <SignificantMoments class="h-1/5 bg-gray-50 overflow-x-auto"/>

    </div>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { VideoPlayer } from '@videojs-player/vue';
import 'video.js/dist/video-js.css';

import './input.css'
import CurrentMoments from './components/CurrentMoments.vue';
import SignificantMoments from './components/SignificantMoments.vue';


const videoOptions = ref({
  sources: [{
    src: 'placeholder.mp4',
    type: 'video/mp4'
  }],
  controls: true,
  aspectRatio: "9:16",
  width: '100%',
  height: '100%'
});
</script>
