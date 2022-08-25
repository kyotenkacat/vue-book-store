import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";

import "@/assets/style/normalize.css";
import "vue-toast-notification/dist/theme-sugar.css";
import "@/style/main.scss";

const app = createApp(App);

app.use(router);

app.mount("#app");
