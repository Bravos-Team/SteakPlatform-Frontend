<template>
  <div class="bg-gray-50 rounded-lg shadow">
    <!-- Header Section -->
    <div class="px-6 py-4 border-b border-gray-200">
      <h1 class="text-xl font-semibold text-gray-800">User List</h1>
    </div>

    <!-- Table Section -->
    <div class="p-6">
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left">
          <thead class="text-xs text-gray-700 uppercase">
            <tr>
              <th class="px-6 py-3">Name</th>
              <th class="px-6 py-3">Email</th>
              <th class="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="user in users" :key="user.id" class="bg-white hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">{{ user.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ user.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span v-if="user.status === 'Active'"
                  class="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                  Active
                </span>
                <span v-else-if="user.status === 'Inactive'"
                  class="px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-full">
                  Inactive
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <div class="flex items-center justify-between mt-4 border-t border-gray-200 pt-4">
          <div class="flex items-center gap-2">
            <select v-model="itemsPerPage" class="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
            <span class="text-sm text-gray-600">
              Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ totalItems }} entries
            </span>
          </div>

          <div class="flex items-center gap-2">
            <button @click="currentPage--" :disabled="currentPage === 1"
              class="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>

            <div class="flex items-center gap-1">
              <button v-for="page in displayedPages" :key="page" @click="currentPage = page" :class="[
                'px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50',
                currentPage === page ? 'bg-blue-50 text-blue-600 border-blue-300' : ''
              ]">
                {{ page }}
              </button>
            </div>

            <button @click="currentPage++" :disabled="currentPage === totalPages"
              class="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const users = ref([
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com', status: 'Active' },
  { id: 4, name: 'Bob Brown', email: 'bob@example.com', status: 'Active' },
  { id: 5, name: 'Charlie White', email: 'charlie@example.com', status: 'Active' },
  { id: 6, name: 'John Doe', email: 'john@example.com', status: 'Active' },
  { id: 7, name: 'Jane Smith', email: 'jane@example.com', status: 'Active' },
  { id: 8, name: 'Alice Johnson', email: 'alice@example.com', status: 'Active' },
  { id: 9, name: 'Bob Brown', email: 'bob@example.com', status: 'Active' },
  { id: 10, name: 'Charlie White', email: 'charlie@example.com', status: 'Active' },
  { id: 11, name: 'John Doe', email: 'john@example.com', status: 'Active' },
  { id: 12, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
  { id: 13, name: 'Alice Johnson', email: 'alice@example.com', status: 'Active' },
  { id: 14, name: 'Bob Brown', email: 'bob@example.com', status: 'Inactive' },
  { id: 15, name: 'Charlie White', email: 'charlie@example.com', status: 'Active' }
])

const currentPage = ref(1)
const itemsPerPage = ref(10)

// Computed properties for pagination
const totalItems = computed(() => users.value.length)
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value))

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage.value, totalItems.value))

const displayedPages = computed(() => {
  const pages = []
  const maxPages = 5 // Maximum number of page buttons to show

  let start = Math.max(1, currentPage.value - Math.floor(maxPages / 2))
  let end = Math.min(totalPages.value, start + maxPages - 1)

  if (end - start + 1 < maxPages) {
    start = Math.max(1, end - maxPages + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

// Paginated users
const paginatedUsers = computed(() => {
  return users.value.slice(startIndex.value, endIndex.value)
})

</script>

<style scoped>
h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
</style>
