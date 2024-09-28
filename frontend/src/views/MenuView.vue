<script setup>
import Button from '@/components/Button.vue';
import { useLanguage } from '@/stores/language';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const language = useLanguage();
const difficultySelect = ref(null);

function focusSelect() {
    difficultySelect.value.focus();
}
</script>

<template>
    <nav>
        <Button color="red" @click="focusSelect">
            {{ language.getText("classic") }}
            <select name="difficulty" id="difficulty" @change="$router.push($event.target.value)"
                ref="difficultySelect">
                <option style="display:none"> </option>
                <option value="/game/easy">🍃 {{ language.getText("easy") }}</option>
                <option value="/game/normal">🌊 {{ language.getText("normal") }}</option>
                <option value="/game/hard">🔥 {{ language.getText("hard") }}</option>
            </select>
        </Button>
        <RouterLink to="/challenges">
            <Button color="blue">
                {{ language.getText("challenges") }}
            </Button>
        </RouterLink>
        <RouterLink to="/tutorial">
            <Button color="green">
                {{ language.getText("tutorial") }}
            </Button>
        </RouterLink>
        <RouterLink to="leaderboard">
            <Button color="orange">🏆 {{ language.getText("leaderboard") }}</Button>
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

select {
    font-size: inherit;
    line-height: inherit;
    letter-spacing: inherit;
    text-shadow: inherit;
    font-weight: inherit;
    color: inherit;
    background-color: transparent;
    border: none;
    padding: 0;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border: none;
    overflow: hidden;
    text-align: center;
    height: fit-content;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 140%;
}

select:focus {
    outline: none;
    border: none;
}

option {
    color: var(--color-text);
}

p {
    font-size: 1rem;
    font-weight: normal;
    margin-top: 0.25em;
}
</style>
