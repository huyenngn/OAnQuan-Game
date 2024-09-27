<script setup>
import Button from '@/components/Button.vue';
import { useLanguage } from '@/stores/language';
import { RouterLink } from 'vue-router';

const language = useLanguage();
</script>

<template>
    <RouterLink to="/">
        <Button color="orange">
            {{ language.getText("back") }}
        </Button>
    </RouterLink>
    <div v-for="(step, index) in language.getTutorial()">
        <h1>{{ step.title }}</h1>
        <p>
            {{ step.text }}
        </p>
        <img :src="'src/assets/tutorial_imgs/' + index + '.png'" />
    </div>
</template>

<style scoped>
p {
    font-size: 1em;
    font-weight: normal;
}
</style>