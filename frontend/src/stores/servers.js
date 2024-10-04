import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

const DEFAULT_BACKEND_URL = "http://127.0.0.1:8080";

export const useServers = defineStore("servers", () => {
    const isBackendReady = ref(false);
    const GLOBAL_SERVERS = ref(
        [
            {
                long: -120,
                url: import.meta.env.VITE_BACKEND_NA,
            },
            {
                long: 5,
                url: import.meta.env.VITE_BACKEND_EU,
            },
            {
                long: 120,
                url: import.meta.env.VITE_BACKEND_AS,
            },
        ].filter((server) => server.url)
    );

    async function warmUpBackend(long) {
        if (GLOBAL_SERVERS.value.length === 0) {
            GLOBAL_SERVERS.value = [{ long: 0, url: DEFAULT_BACKEND_URL }];
            isBackendReady.value = true;
            return;
        }
        GLOBAL_SERVERS.value = GLOBAL_SERVERS.value.sort(
            (a, b) => Math.abs(a.long - long) - Math.abs(b.long - long)
        );
        const primaryUrl = GLOBAL_SERVERS.value[0].url;
        try {
            await fetch(primaryUrl, { method: "GET" });
        } catch (error) {}
        console.log("Warmed up backend:", primaryUrl);
        isBackendReady.value = true;
    }

    async function makeRequest(method, path, kwargs = {}) {
        kwargs.method = method;
        kwargs.url = GLOBAL_SERVERS.value[0].url + path;
        kwargs.timeout = 5000;
        kwargs.validateStatus = (status) => status == 200;
        try {
            const response = await axios(kwargs);
            return response.data;
        } catch (error) {
            let promises = [];
            for (const server of GLOBAL_SERVERS.value) {
                kwargs.url = server.url + path;
                promises.push(axios(kwargs));
            }
            const response = await Promise.race(promises);
            return response.data;
        }
    }

    return {
        isBackendReady,
        warmUpBackend,
        makeRequest,
    };
});
