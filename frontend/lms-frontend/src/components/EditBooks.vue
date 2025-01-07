<template>
  <div class="p-10">
    <h1 class="text-2xl font-semibold mb-6">Search and Edit Books</h1>
    <div class="mb-6 flex justify-end">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by title or author"
        class="w-80 p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div class="grid grid-cols-4 gap-4">
      <div
        v-for="(book, index) in filteredBooks"
        :key="index"
        class="bg-gray-200 p-4 rounded-sm shadow-sm hover:bg-gray-900 hover:text-white transition-all duration-150 ease-in-out"
      >
        <h3 class="text-lg font-semibold">{{ book.title }}</h3>
        <p class="text-sm">
          <span class="italic">{{ book.author }}</span>
        </p>
        <p class="text-sm mt-4 font-semibold">
          <span :class="book.availability ? 'text-green-600' : 'text-red-600'">
            {{ book.availability ? "Available" : "Unavailable" }}
          </span>
        </p>
        <button class="mt-4 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-700" @click="editBook(book)">Edit</button>
      </div>
    </div>

    <div v-if="editingBookFlag" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 class="text-xl font-semibold mb-4">Edit Book</h2>
        <form @submit.prevent="saveBook">
          <div class="mb-4">
            <label class="block text-sm font-medium">Title</label>
            <input v-model="editingBook.title" type="text" class="w-full p-2 border rounded-md" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium">Author</label>
            <input v-model="editingBook.author" type="text" class="w-full p-2 border rounded-md" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium">Availability</label>
            <select v-model="editingBook.availability" class="w-full p-2 border rounded-md">
              <option :value="true">Available</option>
              <option :value="false">Unavailable</option>
            </select>
          </div>
          <div class="flex justify-end">
            <button type="button" class="mr-4 px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400" @click="cancelEdit">Cancel</button>
            <button type="submit" class="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from "vue";
import axios from "axios";

const books = ref([]);
const searchQuery = ref("");
const editingBook = ref(null);
const editingBookFlag = ref(false);

const fetchBooks = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/books");
    books.value = response.data;
  } catch (err) {
    console.error("Failed to fetch books");
  }
};

const filteredBooks = computed(() => {
  return books.value.filter((book) => (book.title + " " + book.author).toLowerCase().includes(searchQuery.value.toLowerCase()));
});

const editBook = (book) => {
  editingBook.value = { ...book };
  editingBookFlag.value = true; 
};

const saveBook = async () => {
  const index = books.value.findIndex((b) => b.id === editingBook.value.id);
  if (index !== -1) {
    books.value[index] = { ...editingBook.value };
    await axios.put(`http://localhost:5000/api/books/edit/${editingBook.value.id}`, editingBook.value);
  }
  editingBook.value = null;
  editingBookFlag.value = false; 
  console.log(editingBookFlag.value)
};

const cancelEdit = () => {
  editingBook.value = null;
  editingBookFlag.value = false; 
};


onBeforeMount(fetchBooks);
</script>
