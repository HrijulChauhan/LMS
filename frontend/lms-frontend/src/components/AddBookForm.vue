<template>
  <nav class="flex justify-between px-10 py-5">
    <router-link to="/">
      <h1 class="text-lg tracking-tighter text-center font-medium bg-clip-text h-fit">LMS</h1>
    </router-link>
    <section class="flex text-base">
      <router-link to="/">
        <div class="px-4">Home</div>
      </router-link>
      <router-link to="/addbook">
        <div class="px-4">Add book</div>
      </router-link>
      <router-link to="/books">
        <div class="px-4">Book List</div>
      </router-link>
    </section>
  </nav>

  <div class="add-book-form mt-20 max-w-lg mx-auto bg-gray-100 border p-10 rounded-lg shadow-lg">
    <h2 class="text-2xl font-semibold text-gray-800 mb-4 text-center">Add a New Book</h2>
    <form @submit.prevent="addBook" class="space-y-4">
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700">Title:</label>
        <input
          type="text"
          id="title"
          v-model="book.title"
          required
          class="mt-2 border block p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label for="author" class="block text-sm font-medium text-gray-700">Author:</label>
        <input
          type="text"
          id="author"
          v-model="book.author"
          required
          class="mt-2 mb-4 border block p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        class="w-full inline-flex justify-center rounded-md border mt-4 border-transparent bg-blue-600 px-0 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Add Book
      </button>
    </form>
    <p v-if="message" class="mt-6 text-center text-sm text-green-600 font-medium">{{ message }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      book: {
        title: "",
        author: "",
      },
      message: "",
    };
  },
  methods: {
    async addBook() {
      try {
        console.log(this.book);
        const response = await axios.post("http://localhost:5000/api/books/add", this.book);
        this.message = "Book added successfully!";
        this.book = { title: "", author: "" }; // Reset form
      } catch (error) {
        console.error(error);
        this.message = "Failed to add book.";
      }
    },
  },
};
</script>

<style>
/* Optional: Remove the custom styles if no longer needed */
</style>
