<template >
  <div class="justify-center ">
    <!--header area-->
    <div id="Mainheader" class="min-h-60">
      <div id="header-bar" class="font-italic">imagine i have a menu bar</div>
      <div id="search-bar">imagine i have a search bar</div>
    </div>

    <!-- Main Content Area-->
      <div id = "playwrap" class="relative flex  w-full ">
          <!-- Placeholder for streaming video-->
            <video-player class="relative flex-grow flex w-full h-full items-center justify-center" :options="videoOptions">
              <div>
                <!-- Left Side Current Emoji List-->
                <CurrentMoments id="current-moment" class="absolute border-r-2 overflow-y-auto " />
              </div>
            </video-player>

      </div>

      <!-- Significant Moments bar  -->
      <SignificantMoments/>
      <ThresholdControl @update-threshold="handleThresholdUpdate"/>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { VideoPlayer } from '@videojs-player/vue';
import 'video.js/dist/video-js.css';

import './input.css'
import CurrentMoments from './components/CurrentMomentsDisplay.vue';
import SignificantMoments from './components/SignificantMomentsDisplay.vue';
import ThresholdControl from "@/components/EmojiDisplayControls.vue";



const videoOptions = ref({
  sources: [{
    src: 'placeholder.mp4',
    type: 'video/mp4'
    // kinda wanna put her never gonna give you up never gonna let you down
  }],
  controls: true,
  aspectRatio: "16:9",

});

const threshold = ref(50);

const handleThresholdUpdate = (newThreshold:number) => {
  threshold.value = newThreshold;
};

// onMounted(()=>{
//   emojiBlasts({emojis:["💖","❤️", "🧡", "💛", "💚", "💙", "💜"],
//   });
// });

</script>

<style scoped>

#current-moment {
  position: absolute;
  left: 0;
  bottom: 0;
}

</style>
