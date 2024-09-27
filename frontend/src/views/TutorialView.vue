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
div {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 800px;
    margin: 1em 1em;
}

h1 {
    font-size: 23px;
    font-weight: bold;
}

p {
    font-size: 20px;
    font-weight: normal;
}
</style>