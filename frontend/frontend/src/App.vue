<template >
  <div class="justify-center ">
    <!--header area-->
    <div id="Mainheader" class="min-h-60">
      <MenuBar/>
    </div>

    <!-- Main Content Area-->
      <div id = "playwrap" class=" relative flex  w-full ">

        <!-- Youtube video on the left-->
        <div class=" relative flex-grow flex w-full left:0">
          <YouTube
            height="540"
            width="960"
            src="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            ref="youtube"/>
        </div>

        <div id="emoji-box">
          <!-- right Side Current Emoji List-->
          <CurrentMoments id="current-moment" class="absolute overflow-y-auto " />

          <!-- right side Significant Moments bar  -->
          <div id="significant-moment" class="absolute">
            <SignificantMoments/>
            <ThresholdControl @update-threshold="handleThresholdUpdate"/>
          </div>

        </div>
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
  right: 0;
  top: 0;
  padding: 1rem;
  background: #f4c5cd 100%;
}

#significant-moment{
  position: absolute;
  right: 0;
  bottom: 0;
}

#Mainheader{
  padding: 1rem;
  background: #ede0e2 50%;
}

#playwrap{
  padding: 1rem;
  background: #e0edec 50%;


}
</style>
