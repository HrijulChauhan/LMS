<template>
  <nav class="relative flex items-center px-10 py-5">
    <router-link to="/" class="flex-shrink-0">
      <h1 class="text-lg text-gray-600 tracking-tighter font-medium">LMS</h1>
    </router-link>

    <h1 class="absolute left-1/2 transform -translate-x-1/2 text-2xl tracking-tight font-medium text-gray-800">Book Search</h1>

    <section class="ml-auto flex space-x-6 text-base">
      <router-link to="/">
        <div>Home</div>
      </router-link>
      <router-link to="/addbook">
        <div>Add Book</div>
      </router-link>
      <router-link to="/books">
        <div>Book List</div>
      </router-link>
    </section>
  </nav>

  <div class="p-10">
    <div class="mb-6 flex justify-end">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by title or author"
        class="w-80 p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div class="grid grid-cols-6 gap-4">
      <div
        v-for="(book, index) in filteredBooks"
        :key="index"
        class="bg-gray-200 p-4 text-gray-900 rounded-sm shadow-sm hover:bg-gray-900 hover:text-white transition-all duration-150 ease-in-out"
      >
        <h3 class="text-lg font-semibold">{{ book.title }}</h3>
        <p class="text-sm">
          <span class="italic">{{ book.author }}</span>
        </p>
        <p class="text-sm mt-4 font-semibold">
          <span :class="book.availability === true ? 'text-green-600' : 'text-red-600'">
            {{ book.availability === true ? "Available" : "Unavailable" }}
          </span>
        </p>
      </div>
    </div>

    <p v-if="error" class="mt-4 text-red-600">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from "vue";
import axios from "axios";

const books = ref([]);
const searchQuery = ref("");
const error = ref("");

const fetchBooks = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/books");
    books.value = response.data;
  } catch (err) {
    error.value = "Failed to load books.";
  }
};

const filteredBooks = computed(() => {
  return books.value.filter((book) => (book.title + " " + book.author).toLowerCase().includes(searchQuery.value.toLowerCase()));
});

onBeforeMount(fetchBooks);
</script>
