import { createPinia } from "pinia";
import { createApp } from "vue";
import "./assets/style.css";
import "/node_modules/flag-icons/css/flag-icons.min.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
