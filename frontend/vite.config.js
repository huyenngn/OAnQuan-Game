import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    define: {
        VITE_BACKEND_NA: JSON.stringify(process.env.VITE_BACKEND_NA),
        VITE_BACKEND_EU: JSON.stringify(process.env.VITE_BACKEND_EU),
        VITE_BACKEND_AS: JSON.stringify(process.env.VITE_BACKEND_AS),
        VITE_SUPABASE_URL: JSON.stringify(process.env.VITE_SUPABASE_URL),
        VITE_SUPABASE_KEY: JSON.stringify(process.env.VITE_SUPABASE_KEY),
    },
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
});
