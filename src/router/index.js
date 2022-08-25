import { createRouter, createWebHistory } from "vue-router";
import BookList from "@/views/BookList.vue";
import BookDetail from "@/views/BookDetail.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/books",
      name: "books",
      component: BookList,
    },
    {
      path: "/books/:bookId",
      name: "bookDetail",
      component: BookDetail,
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: { name: "books" },
    },
  ],
});

export default router;
