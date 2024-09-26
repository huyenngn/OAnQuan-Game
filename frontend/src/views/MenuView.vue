<script setup>
import Button from '@/components/Button.vue';
import { useLanguage } from '@/stores/language';
import { RouterLink } from 'vue-router';

const language = useLanguage();
</script>

<template>
    <nav>
        <RouterLink to="/game/easy">
            <Button color="green">🍃{{ language.getText("easy") }}</Button>
        </RouterLink>
        <RouterLink to="/game/normal">
            <Button>🌊{{ language.getText("normal") }}</Button>
        </RouterLink>
        <RouterLink to="/game/hard">
            <Button color="red">🔥{{ language.getText("hard") }}</Button>
        </RouterLink>
        <RouterLink to="leaderboard">
            <Button color="orange">🏆{{ language.getText("leaderboard") }}</Button>
        </RouterLink>
    </nav>
    <p>
        {{ language.getText("credit") }} <a href="https://huyenngn.github.io/" target="_blank">Huyen Nguyen</a>
    </p>
    <p>
        <a :href="language.getText('privacyLink')" target="_blank">
            {{ language.getText("privacy") }}</a>
    </p>
</template>

<style scoped>
nav {
    display: flex;
    flex-direction: column;
    gap: 0.75em;
    margin: 0.75em;
}

p {
    font-size: 1rem;
    font-weight: normal;
    margin-top: 0.25em;
}
</style>
