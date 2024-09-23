<script setup>
import Button from '@/components/Button.vue';
import Counter from '@/components/Counter.vue';
import Game from '@/components/Game.vue';
import { useLanguage } from '@/stores/language';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const language = useLanguage();

const game = ref(null);

function toggleFast() {
    if (game.value) {
        game.value.toggleFast();
    }
}

function getHint() {
    if (game.value) {
        game.value.getHint();
    }
}

function isFast() {
    return game.value && game.value.fast;
}

function getHintsLeft() {
    return game.value && game.value.hintsLeft;
}

function undo() {
    if (game.value) {
        game.value.undo();
    }
}
</script>

<template>
    <div class="controls">
        <Button @click="undo()">
            <img src="../assets/undo.svg" />
        </Button>
        <Button @click="$router.go()">
            <img src="../assets/reload.png" />
        </Button>
        <RouterLink to="/">
            <Button color="orange">
                {{ language.getText("back") }}
            </Button>
        </RouterLink>
        <Button v-if="isFast()" @click="toggleFast()" class="green exclude-click-outside">
            <img src="../assets/pause.png" class="green" />
        </Button>
        <Button v-else @click="toggleFast()" class="exclude-click-outside">
            <img src="../assets/fast_forward.png" />
        </Button>
        <Button @click="getHint()" class="exclude-click-outside">
            <img src="../assets/hint.svg" />
        </Button>
        <span class="hint-tracker">
            <Counter :count="getHintsLeft()" id="hints-counter" />/3
        </span>
    </div>
    <Game :level="$route.params.level" ref="game" />
</template>

<style scoped>
.controls,
.controls>div {
    display: grid;
    grid-template-columns: repeat(5, auto);
    align-items: center;
}

.hint-tracker {
    grid-column-start: 5;
    grid-column-end: 6;
    font-size: 20px;
    font-weight: 900;
    display: flex;
    justify-content: center;
}

img {
    filter: invert(100%) drop-shadow(0.5px 0.5px 0.5px #0066a2) drop-shadow(-0.5px -0.5px 0.5px #0066a2) drop-shadow(0.5px -0.5px 0.5px #0066a2) drop-shadow(-0.5px 0.5px 0.5px #0066a2) drop-shadow(2px 0 0.5px #0066a2) drop-shadow(0 3px 0.5px #004a87);
    width: 20px;
}

img.green {
    filter: invert(100%) drop-shadow(0.5px 0.5px 0.5px #54d440) drop-shadow(-0.5px -0.5px 0.5px #54d440) drop-shadow(0.5px -0.5px 0.5px #54d440) drop-shadow(-0.5px 0.5px 0.5px #54d440) drop-shadow(2px 0 0.5px #54d440) drop-shadow(0 3px 0.5px #1d4c16);
}
</style>
