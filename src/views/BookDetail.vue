<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import useFetch from "@/composables/useFetch";
import BackIcon from "@/components/icons/IconBack.vue";
import EditIcon from "@/components/icons/IconEdit.vue";
import DeleteIcon from "@/components/icons/IconDelete.vue";

const router = useRouter();
const route = useRoute();
const isNew = ref(false);
const bookData = ref({});
const formData = ref({});

const { error, fetchData } = useFetch();

watch(
  () => route.params.bookId,
  async (bookId) => {
    if (bookId === "new") {
      isNew.value = true;
      return;
    }
    if (bookId || Number.isInteger(Number(bookId))) {
      bookData.value = await fetchData({
        url: `https://fe-interview-api.unnotech.com/books/${bookId}/`,
      });
      formData.value = { ...bookData.value };
    }
  },
  { immediate: true }
);

const addBook = async () => {
  const response = await fetchData({
    url: `https://fe-interview-api.unnotech.com/books/`,
    method: "POST",
    data: formData.value,
  });
  if (!error.value) {
    isNew.value = false;
    router.push({ name: "bookDetail", params: { bookId: response.id } });
  }
};

const isEdit = ref(false);
const editBook = async () => {
  await fetchData({
    url: `https://fe-interview-api.unnotech.com/books/${bookData.value.id}/`,
    method: "PATCH",
    data: formData.value,
  });
  if (!error.value) {
    isEdit.value = false;
  }
};
const cancelHandler = () => {
  formData.value = { ...bookData.value };
  isEdit.value = false;
};

const submitForm = async (e) => {
  e.preventDefault();
  if (isNew.value) {
    await addBook();
  } else {
    await editBook();
  }
};

const deleteBook = async () => {
  await fetchData({
    url: `https://fe-interview-api.unnotech.com/books/${bookData.value.id}/`,
    method: "DELETE",
  });
  if (!error.value) {
    router.push({ name: "books" });
  }
};
</script>

<template>
  <header>
    <button class="left">
      <Router-Link to="/books">
        <BackIcon />
      </Router-Link>
    </button>
    <h2 v-if="isNew" class="no-right-btn">新增書本</h2>
    <h2 v-else>{{ bookData?.title || "書本詳情" }}</h2>
    <button v-if="!isEdit && !isNew" class="right" @click="isEdit = true">
      <EditIcon />
    </button>
    <button v-if="isEdit" class="right" @click="deleteBook">
      <DeleteIcon />
    </button>
  </header>
  <div class="book-detail">
    <form name="signInForm" @submit="submitForm">
      <div class="form-item">
        <input
          v-model="formData.title"
          type="text"
          required
          :disabled="!isNew && !isEdit"
          placeholder="名稱"
          maxlength="100"
        />
      </div>
      <div class="form-item">
        <input
          v-model="formData.author"
          type="text"
          required
          :disabled="!isNew && !isEdit"
          placeholder="作者"
          maxlength="100"
        />
      </div>
      <div class="form-item">
        <textarea
          v-model="formData.description"
          :disabled="!isNew && !isEdit"
          placeholder="備註"
          :rows="8"
          maxlength="300"
        ></textarea>
      </div>
      <div v-if="isNew" class="action">
        <Router-Link to="/books">
          <button class="cancel">取消</button>
        </Router-Link>
        <button class="confirm">新增</button>
      </div>
      <div v-if="isEdit" class="action">
        <button class="cancel" @click="cancelHandler">取消</button>
        <button class="confirm">修改</button>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.book-detail {
  form {
    margin: auto;
    @media screen and (max-width: 768px) {
      width: 90%;
    }
    @media screen and (min-width: 769px) {
      width: 80%;
      max-width: 600px;
    }
    .form-item {
      margin: 20px 0;
    }
    input,
    textarea {
      width: 100%;
      padding: 10px;
    }
    .action {
      button {
        color: #ffffff;
        padding: 10px;
        border-radius: 20px;
        width: 40%;
        &.cancel {
          background: #dfdfdf;
          margin-right: 20%;
          a {
            color: #ffffff;
          }
        }
        &.confirm {
          background: #3d96e9;
        }
      }
    }
  }
}
</style>
