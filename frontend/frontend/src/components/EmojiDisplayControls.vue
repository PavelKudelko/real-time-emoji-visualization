<script setup lang="ts">
import { ref, defineEmits } from "vue";

const threshold = ref(50);
const emit = defineEmits(["update-threshold"]);

const updateThreshold = () => {
  emit("update-threshold", threshold.value);
  //  we don't know why but the link above not working, only localhost link working
  // "http://server-b:3001/threshold"
  const numericThreshold = Number(threshold.value);
  fetch("http://localhost:3001/settings/threshold", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ threshold: numericThreshold }),
  });
};
</script>

<template>
  <div class="font-mono bg-gray-700 p-4 rounded-lg shadow-md w-[15rem]">
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

