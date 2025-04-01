<template >
  <div class="justify-center ">
    <div id="Mainheader" class="min-h-60">
      <div id="header-bar">imagine i have a menu bar</div>
      <div id="search-bar">imagine i have a search bar</div>
    </div>

    <!-- Main Content Area-->
      <div id = "playwrap" class=" flex  w-full ">

          <!-- Placeholder for streaming video-->
            <video-player class="relative flex-grow flex w-full h-full items-center justify-center" :options="videoOptions">
              <div>
                <!-- Left Side Current Emoji List-->
                <CurrentMoments id="current-moment" class="absolute border-r-2 overflow-y-auto " />
              </div>
            </video-player>

      </div>
      <!--Bottom Significant Moments Animation -->
      <SignificantMoments class="h-1/5 w-full overflow-x-auto"/>
    <div>
      emojiBlasts();
    </div>

  </div>

</template>

<script setup lang="ts">
import {onMounted} from "vue";
import { ref } from 'vue';
import { VideoPlayer } from '@videojs-player/vue';
import 'video.js/dist/video-js.css';

import './input.css'
import CurrentMoments from './components/CurrentMoments.vue';
import SignificantMoments from './components/SignificantMoments.vue';

import { emojiBlast, emojiBlasts } from "emoji-blast";


const videoOptions = ref({
  sources: [{
    src: 'placeholder.mp4',
    type: 'video/mp4'
  }],
  controls: true,
  aspectRatio: "16:9",

});

onMounted(()=>{
  emojiBlasts({emojis:["💖","❤️", "🧡", "💛", "💚", "💙", "💜"],
  });
});

</script>

<style scoped>

#current-moment {
  position: absolute;
  left: 0;
  bottom: 0;
}

</style>
