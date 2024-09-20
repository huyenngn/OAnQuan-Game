<script setup>
import Button from '@/components/Button.vue';
import { RouterLink } from 'vue-router';
</script>

<template>
    <nav>
        <RouterLink to="/game/easy">
            <Button color="green">EASY</Button>
        </RouterLink>
        <RouterLink to="/game/normal">
            <Button>NORMAL</Button>
        </RouterLink>
        <RouterLink to="/game/hard">
            <Button color="red">HARD</Button>
        </RouterLink>
        <RouterLink to="leaderboard">
            <Button color="orange">🏆 Leaderboard</Button>
        </RouterLink>
        <p>
            Created by <a href="https://huyenngn.github.io/" target="_blank">Huyen Nguyen</a>
        </p>
    </nav>
</template>

<style scoped>
nav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

p {
    margin-top: 1em;
    font-size: 1rem;
}

a {
    font-weight: bold;
}
</style>
