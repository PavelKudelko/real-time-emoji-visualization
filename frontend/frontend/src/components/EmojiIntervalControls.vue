<script setup lang="ts">
import { ref, defineEmits } from "vue";

const interval = ref(60);
// might need to convert datatype
const emit_interval = defineEmits(["update-interval"]);
const updateInterval = () => {
  emit_interval("update-interval", interval.value);
  //  we don't know why but the link  not working, only localhost link working
  // "http://server_b:3001/threshold"
  const numericInterval = Number(interval.value);
  fetch("http://localhost:3001/settings/interval", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ interval: numericInterval}),
  });
};
</script>

<template>
  <label class="block mb-2 font-medium">Update Interval : {{ interval }}</label>
      <div class="flex items-center">
        <input
          type="range"
          min="10"
          max="200"
          v-model="interval"
          class="w-full mr-2"
          @change="updateInterval"
        />
      </div>
</template>

