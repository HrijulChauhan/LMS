<template>
  <nav class="relative flex items-center px-10 py-5">
    <router-link to="/" class="flex-shrink-0">
      <h1 class="text-lg text-gray-600 tracking-tighter font-medium">LMS</h1>
    </router-link>
    <h1 class="absolute left-1/2 transform -translate-x-1/2 text-2xl tracking-tight font-medium text-gray-800">Borrow</h1>
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
            {{ book.availability ? "Available" : "Borrowed" }}
          </span>
        </p>
        <button v-if="book.availability" class="mt-4 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-700" @click="openBorrowModal(book)">Borrow</button>
      </div>
    </div>

    <div v-if="showBorrowModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 class="text-xl font-semibold mb-4">Borrow Book</h2>
        <form @submit.prevent="borrowBook">
          <div class="mb-4">
            <label class="block text-sm font-medium">Borrower Name</label>
            <input v-model="borrowerName" type="text" class="w-full p-2 border rounded-md" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium">Borrower ID</label>
            <input v-model="borrowerId" type="text" class="w-full p-2 border rounded-md" />
          </div>
          <div class="flex justify-end">
            <button type="button" class="mr-4 px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400" @click="closeBorrowModal">Cancel</button>
            <button type="submit" class="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700">Confirm</button>
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
const showBorrowModal = ref(false);
const borrowerName = ref("");
const borrowerId = ref("");
const selectedBook = ref(null);

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

const openBorrowModal = (book) => {
  selectedBook.value = book;
  showBorrowModal.value = true;
};

const closeBorrowModal = () => {
  selectedBook.value = null;
  showBorrowModal.value = false;
};

const borrowBook = async () => {
  try {
    await axios.post(`http://localhost:5000/api/books/borrow/${selectedBook.value.id}`, {
      borrower_name: borrowerName.value,
      borrower_id: borrowerId.value,
    });
    selectedBook.value.availability = false;
    selectedBook.value.borrowed_by = borrowerName.value;
    closeBorrowModal();
  } catch (err) {
    console.error("Failed to borrow book:", err);
  }
};

onBeforeMount(fetchBooks);
</script>
