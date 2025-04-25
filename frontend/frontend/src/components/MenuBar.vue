<template>
  <div class="navbar-container p-4">
    <!-- Main Navigation Bar -->
    <nav class="bg-gray-800 text-white shadow-lg">
      <div class=" mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">

          <!-- Search Bar -->
          <div class="flex-1 flex  px-2 lg:ml-6 lg:justify-end p-4">
            <div class="  lg:max-w-xs">
              <label for="search" class="sr-only">Search</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <!-- Search Icon -->
                  <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                  </svg>
                </div>
                <input
                  id="search"
                  v-model="searchQuery"
                  @keyup.enter="performSearch"
                  class="block  pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search videos..."
                  type="search">
              </div>
            </div>
          </div>

        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'NavbarWithSearch',
  data() {
    return {
      searchQuery: '',
      menuOpen: false,
      profileOpen: false
    }
  },
  methods: {
    performSearch() {
      console.log('Searching for:', this.searchQuery);
      this.$emit('search', this.searchQuery);
    }
  }
}
</script>

<style scoped>
.navbar-container {
  position: sticky;
  top: 0;
  z-index: 50;
}
</style>
