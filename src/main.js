import {createApp} from "vue";

import "@/assets/css/index.css";
import store from "@/stores/index.js";
import App from "./App.vue";
import router from "./router";
import {Lazyload} from "vant";

const app = createApp(App);

app.use(store);
app.use(router);
app.use(Lazyload);
app.mount("#app");
console.log("hello wanandroid");