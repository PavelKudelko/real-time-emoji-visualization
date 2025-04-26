<script setup lang="ts">
import { ref, onMounted, defineEmits } from "vue";

const emit = defineEmits(["update-allowed-emotes"]);
const availableEmotes = ['❤️', '👍', '😢', '😡']; // All possible emotes
const selectedEmotes = ref<string[]>([]);

// Fetch current settings on component mount
onMounted(async () => {
  try {
    const response = await fetch("http://localhost:3001/settings/allowed-emotes", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
      const data = await response.json();
      selectedEmotes.value = data.allowedEmotes || availableEmotes;
    } else {
      // Default to all emotes if fetch fails
      selectedEmotes.value = [...availableEmotes];
    }
  } catch (error) {
    console.error("Failed to fetch allowed emotes:", error);
    // Default to all emotes if fetch fails
    selectedEmotes.value = [...availableEmotes];
  }
});

const toggleEmote = (emote: string) => {
  if (selectedEmotes.value.includes(emote)) {
    // Remove emote if already selected
    selectedEmotes.value = selectedEmotes.value.filter(e => e !== emote);
  } else {
    // Add emote if not selected
    selectedEmotes.value.push(emote);
  }

  // Emit event to parent
  emit("update-allowed-emotes", selectedEmotes.value);

  // Save changes to server
  updateAllowedEmotes();
};

const updateAllowedEmotes = async () => {
  try {
    const response = await fetch("http://localhost:3001/settings/allowed-emotes", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ allowedEmotes: selectedEmotes.value }),
    });

    if (!response.ok) {
      console.error("Failed to update allowed emotes");
    }
  } catch (error) {
    console.error("Error updating allowed emotes:", error);
  }
};

const isSelected = (emote: string) => {
  return selectedEmotes.value.includes(emote);
};
</script>

<template>
  <div class="font-mono bg-gray-700 p-4 rounded-lg shadow-md w-full max-w-xs mt-4">
    <h3 class="text-gray-200 mb-3 text-center text-sm">Allowed Reactions</h3>

    <div class="flex justify-between gap-2 mt-2">
      <button
        v-for="emote in availableEmotes"
        :key="emote"
        @click="toggleEmote(emote)"
        class="flex-1 py-2 text-xl rounded transition-colors"
        :class="isSelected(emote) ? 'bg-gray-500 shadow-inner' : 'bg-gray-600 hover:bg-gray-500'"
      >
        {{ emote }}
        <div class="text-xs mt-1 text-gray-300">
          {{ isSelected(emote) ? "On" : "Off" }}
        </div>
      </button>
    </div>
  </div>
</template>