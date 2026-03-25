import {createApp} from "vue";

import "@/assets/css/index.css";
import store from "@/stores/index.js";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(store);
app.use(router);

app.mount("#app");


console.log("hello wanandroid");