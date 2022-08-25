<script setup>
import { ref, onBeforeMount } from "vue";
import { RouterLink } from "vue-router";
import useFetch from "@/composables/useFetch";
import PlusIcon from "@/components/icons/IconPlus.vue";

const { fetchData } = useFetch();
let bookList = ref([]);
onBeforeMount(async () => {
  bookList.value = await fetchData({
    url: "https://fe-interview-api.unnotech.com/books/",
  });
});

const selectId = ref(null);
</script>

<template>
  <header>
    <h2 class="no-left-btn">書本列表</h2>
    <button class="right">
      <RouterLink to="/books/new">
        <PlusIcon />
      </RouterLink>
    </button>
  </header>
  <div class="book-list">
    <div
      v-for="book in bookList"
      :key="book.id"
      class="book-card"
      :class="{ selected: selectId === book.id }"
      @click="selectId = book.id"
    >
      <h4 class="title">{{ book.title }}</h4>
      <p class="author">{{ book.author }}</p>
      <button class="more">
        <RouterLink :to="`/books/${book.id}`">詳情</RouterLink>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.book-list {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
}
.book-card {
  background: #ffffff;
  width: 48%;
  margin: 1%;
  padding: 10px;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-flow: column;
  &.selected {
    outline: 2px solid #3d96e9;
    box-shadow: 3px 3px 3px #3d96e9;
  }
  h4 {
    flex-grow: 1;
  }
  p {
    width: 100%;
  }
  .more {
    background: #3d96e9;
    border-radius: 20px;
    padding: 0;
    width: fit-content;
    margin: auto;
    a {
      color: #ffffff;
      display: block;
      padding: 8px 12px;
    }
  }
}
</style>
