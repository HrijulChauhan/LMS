import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import AddBookForm from "../components/AddBookForm.vue";
import BookList from "../components/BookList.vue";

// Define routes
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/addbook",
    name: "AddBookForm",
    component: AddBookForm,
  },
  {
    path: "/books",
    name: "BookList",
    component: BookList,
  },
];

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
