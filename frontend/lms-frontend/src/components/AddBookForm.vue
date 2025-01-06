<template>
  <div class="add-book-form">
    <h2>Add a New Book</h2>
    <form @submit.prevent="addBook">
      <div>
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="book.title" required />
      </div>
      <div>
        <label for="author">Author:</label>
        <input type="text" id="author" v-model="book.author" required />
      </div>
      <button type="submit">Add Book</button>
    </form>
    <p v-if="message">{{ message }}</p>
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
        this.book = { title: "", author: ""}; // Reset form
      } catch (error) {
        console.error(error);
        this.message = "Failed to add book.";
      }
    },
  },
};
</script>

<style>
.add-book-form {
  max-width: 400px;
  margin: auto;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #f9f9f9;
}

.add-book-form label {
  display: block;
  margin-bottom: 0.5em;
  font-weight: bold;
}

.add-book-form input {
  width: 100%;
  padding: 0.5em;
  margin-bottom: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.add-book-form button {
  padding: 0.7em 1.5em;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-book-form button:hover {
  background-color: #0056b3;
}
</style>
