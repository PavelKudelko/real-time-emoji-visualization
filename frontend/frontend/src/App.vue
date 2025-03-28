<template >
  <div class="flex justify-center min-h-screen bg-gray-100">
    <div class="w-4/5 bg-white shadow-lg flex flex-col">

      <!-- Main Content Area-->
      <div id="video-container" class="flex-grow flex items-center justify-center">
        <!-- Placeholder for streaming video-->
        <div class="w-3/4 h-2/3 bg-gray-200 flex items-center justify-center">
          <p>Livestream Placeholder</p>
        </div>
      </div>

      <!-- Left Side Current Emoji List-->
      <CurrentMoments class = "w-1/5 border-r-2  overflow-y-auto" />

      <!--Bottom Significant Moments Animation -->
      <SignificantMoments class="h-1/5 bg-gray-50 overflow-x-auto"/>

    </div>
  </div>

</template>

<script setup lang="ts">
import CurrentMoments from './components/CurrentMoments.vue';
import SignificantMoments from './components/SignificantMoments.vue';
</script>
