<template >
  <div class="justify-center ">
    <!--header area-->
    <div id="Mainheader" class="min-h-60">
      <MenuBar/>
    </div>

    <!-- Main Content Area-->
      <div id = "playwrap" class=" relative flex  w-full ">
          <!-- Youtube video with Overlay-->
        <div class=" relative flex-grow flex w-full items-center justify-center">
        <YouTube
          height="540"
          width="960"
          src="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          ref="youtube"/>
          <div>
            <!-- Left Side Current Emoji List-->
            <CurrentMoments id="current-moment" class="absolute border-r-2 overflow-y-auto " />
          </div>
        </div>
      </div>

      <!-- Significant Moments bar  -->
      <div>
        <SignificantMoments/>
        <ThresholdControl @update-threshold="handleThresholdUpdate"/>
      </div>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import YouTube from 'vue3-youtube';
import 'video.js/dist/video-js.css';

import './input.css'
import CurrentMoments from './components/CurrentMomentsDisplay.vue';
import SignificantMoments from './components/SignificantMomentsDisplay.vue';
import ThresholdControl from "@/components/EmojiDisplayControls.vue";
import MenuBar from "@/components/MenuBar.vue";


const threshold = ref(50);

const handleThresholdUpdate = (newThreshold:number) => {
  threshold.value = newThreshold;
};

</script>

<style scoped>

#current-moment {
  position: absolute;
  left: 0;
  bottom: 0;
}

</style>
