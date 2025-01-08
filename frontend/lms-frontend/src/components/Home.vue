<template>
  <section>
    <h1 class="text-3xl tracking-tighter text-center mt-5 py-2 font-medium bg-clip-text h-fit text-transparent bg-gradient-to-r from-black via-[#1e1e1e] via-45% to-[#ffffff]">
      Library Management System
    </h1>
  </section>
  <nav class="grid grid-cols-3 h-[800px] mt-10 border-2">
    <router-link to="/" class="bg-gray-100 hover:bg-blue-600 hover:text-white transition-all duration-150 ease-in-out flex items-center justify-center">
      <div class="text-5xl tracking-tighter font-normal">Home</div>
    </router-link>
    <router-link to="/addbook" class="bg-gray-100 hover:bg-emerald-600 hover:text-white transition-all duration-150 ease-in-out flex items-center justify-center border-l-2 border-r-2">
      <div class="text-5xl tracking-tighter font-normal">Add Book</div>
    </router-link>
    <router-link to="/edit" class="bg-gray-100 hover:bg-orange-600 hover:text-white transition-all duration-150 ease-in-out flex items-center justify-center">
      <div class="text-5xl tracking-tighter font-normal">Edit Book</div>
    </router-link>
    <router-link to="/borrow" class="bg-gray-100 hover:bg-gray-950 border-t-2  hover:text-white transition-all duration-150 ease-in-out flex items-center justify-center">
      <div class="text-5xl tracking-tighter font-normal">Borrow</div>
    </router-link>
    <router-link to="/return" class="bg-gray-100 hover:bg-red-600 border-t-2 border-l-2 border-r-2 hover:text-white transition-all duration-150 ease-in-out flex items-center justify-center">
      <div class="text-5xl tracking-tighter font-normal">Return</div>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: "Home",
};
</script>
