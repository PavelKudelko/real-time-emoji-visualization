<script setup lang="ts">
import { ref, defineEmits } from "vue";

const threshold = ref(50);
const emit = defineEmits(["update-threshold"]);

const updateThreshold = () => {
  emit("update-threshold", threshold.value);
 //"http://server-b:3000/api/set-threshold"
  fetch("http://your-server-b.com/api/set-threshold", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ threshold: threshold.value }),
  });
};
</script>

<template>
  <!--simple display-->
<!--  <div>-->
<!--    <label>Threshold: {{ threshold }}%</label>-->
<!--    <input type="range" v-model="threshold" min="0" max="100" @change="updateThreshold" />-->
<!--  </div>-->
  <div class="font-mono bg-gray-700 p-4 rounded-lg shadow-md">
    <label class="text-gray-200 block mb-2 "> Emoji Threshold: {{ threshold }}%</label>
    <input
      type="range"
      v-model="threshold"
      min="0"
      max="100"
      @change="updateThreshold"
      class="w-full accent-gray-400"
    />
  </div>
</template>

