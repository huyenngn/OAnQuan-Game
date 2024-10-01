<script setup>
import { useLanguage } from '@/stores/language';
import { RouterView } from 'vue-router';

const language = useLanguage();

function setLocalStorage() {
    const lang = document.getElementById("lang").value;
    try {
        localStorage.setItem("language", lang);
    } catch (error) { }
}
</script>

<template>
    <select @change="setLocalStorage" v-model="language.language" id="lang">
        <option value="en">English</option>
        <option value="de">Deutsch</option>
        <option value="vn">Tiếng Việt</option>
    </select>
    <RouterView :key="$route.fullPath" />
</template>

<style scoped>
select {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0.75rem;
}
</style>