import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    define: {
        VITE_BACKEND_US: JSON.stringify(process.env.VITE_BACKEND_US),
        VITE_BACKEND_EU: JSON.stringify(process.env.VITE_BACKEND_EU),
        VITE_BACKEND_ASIA: JSON.stringify(process.env.VITE_BACKEND_ASIA),
        VITE_SUPABASE_URL: JSON.stringify(process.env.VITE_SUPABASE_URL),
        VITE_SUPABASE_KEY: JSON.stringify(process.env.VITE_SUPABASE_KEY),
    },
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
});
