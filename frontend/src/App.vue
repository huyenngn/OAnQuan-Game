<script setup>
import { useLanguage } from '@/stores/language';
import { RouterView } from 'vue-router';

const language = useLanguage();
</script>

<template>
    <select v-model="language.language" id="lang">
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
    margin: 10px;
}
</style>