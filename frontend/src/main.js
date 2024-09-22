import { createPinia } from "pinia";
import { createApp } from "vue";
import "./assets/style.css";
import "/node_modules/flag-icons/css/flag-icons.min.css";

import { useLanguage } from "@/stores/language";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

const language = useLanguage();
language
    .fetchIpData()
    .then(() => {
        app.mount("#app");
    })
    .catch((error) => {
        console.error("Error fetching IP data:", error);
        app.mount("#app");
    });
