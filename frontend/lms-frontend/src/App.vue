<template>
  <section id="app">
    <div class="title">Library Management System</div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/add-book">Add Book</router-link> |
      <router-link to="/books">Book List</router-link>
    </nav>
    <router-view />
  </section>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>

nav {
  margin-bottom: 20px;
}
nav a {
  margin-right: 10px;
  text-decoration: none;
  color: blue;
}
nav a:hover {
  text-decoration: underline;
}
</style>
