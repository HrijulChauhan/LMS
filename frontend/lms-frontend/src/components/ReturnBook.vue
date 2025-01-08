<template>
  <nav class="relative flex items-center px-10 py-5">
    <router-link to="/" class="flex-shrink-0">
      <h1 class="text-lg text-gray-600 tracking-tighter font-medium">LMS</h1>
    </router-link>
    <h1 class="absolute left-1/2 transform -translate-x-1/2 text-2xl tracking-tight font-medium text-gray-800">Return</h1>
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
        placeholder="Search by title, author, or borrower"
        class="w-80 p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div v-if="filteredBooks.length > 0" class="grid grid-cols-4 gap-4">
      <div
        v-for="(book, index) in filteredBooks"
        :key="index"
        class="bg-gray-200 p-4 rounded-sm shadow-sm hover:bg-gray-900 hover:text-white transition-all duration-150 ease-in-out"
      >
        <h3 class="text-lg font-semibold">{{ book.title }}</h3>
        <p class="text-sm italic">{{ book.author }}</p>
        <p class="text-sm mt-2">Borrower: {{ book.borrowed_by }}</p>
        <button class="mt-4 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700" @click="returnBook(book)">Return</button>
      </div>
    </div>
    <p v-else class="text-center text-gray-500 text-lg mt-10">No books lent!</p>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from "vue";
import axios from "axios";

const books = ref([]);
const searchQuery = ref("");

const fetchBooks = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/books");
    books.value = response.data.filter((book) => !book.availability);
  } catch (err) {
    console.error("Failed to fetch books");
  }
};

const filteredBooks = computed(() => {
  return books.value.filter((book) => (book.title + " " + book.author + " " + book.borrowed_by).toLowerCase().includes(searchQuery.value.toLowerCase()));
});

const returnBook = async (book) => {
  try {
    await axios.post(`http://localhost:5000/api/books/return/${book.id}`);
    books.value = books.value.filter((b) => b.id !== book.id);
  } catch (err) {
    console.error("Failed to return book:", err);
  }
};

onBeforeMount(fetchBooks);
</script>
