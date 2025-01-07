<template>
  <section>
    <h1 class="text-3xl tracking-tighter text-center mt-5 py-2 font-medium bg-clip-text h-fit text-transparent bg-gradient-to-r from-black via-[#1e1e1e] via-45% to-[#ffffff]">
      Library Management System
    </h1>
  </section>

  <nav class="flex mt-10 justify-center">
    <router-link to="/">
      <div class="px-7 py-3 rounded-md mx-5 text-gray-600 text-lg font-medium bg-gray-200 hover:bg-gray-400 hover:text-white transition-all duration-150 ease-in-out">Home</div>
    </router-link>
    <router-link to="/addbook">
      <div class="px-7 py-3 rounded-md mx-5 text-gray-600 text-lg font-medium bg-gray-200 hover:bg-gray-400 hover:text-white transition-all duration-150 ease-in-out">Add book</div>
    </router-link>
    <router-link to="/books">
      <div class="px-7 py-3 rounded-md mx-5 text-gray-600 text-lg font-medium bg-gray-200 hover:bg-gray-400 hover:text-white transition-all duration-150 ease-in-out">booklist</div>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: "Home",
};
</script>
