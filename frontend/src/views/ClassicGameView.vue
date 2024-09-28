<script setup>
import ClassicModal from "@/components/ClassicModal.vue";
import Game from "@/components/Game.vue";
import { useLanguage } from "@/stores/language";
import { useStore } from "@/stores/state";
import { delay } from "@/utils";
import axios from "axios";
import { onMounted, ref } from "vue";

const INITIAL_BOARD = [10, 5, 5, 5, 5, 5, 10, 5, 5, 5, 5, 5];
const INITIAL_SCORE = { PLAYER: 0, COMPUTER: 0 };

const language = useLanguage();
const store = useStore();
const props = defineProps(["difficulty"]);

const game = ref(null);
const modal = ref(null);
const displayModal = ref(false);

async function startGame() {
    while (language.isBackendReady == false) {
        await delay(500);
    }
    try {
        const response = await axios.get(language.BACKEND_URL + "/game/start/" + props.difficulty);
        store.addState(response.data);
        game.value.board = INITIAL_BOARD;
        game.value.score = INITIAL_SCORE;
        game.value.winner = "";
        const next_move = response.data.last_move;
        if (next_move) {
            game.value.turn = "COMPUTER";
            game.value.isTurn = false;
            await game.value.animateMove(next_move.pos, next_move.direction);
            game.value.isTurn = true;
        }
        else {
            game.value.isTurn = true;
            game.value.turn = "PLAYER"
        }

    } catch (error) {
        console.error("Error fetching game state:", error);
    }
}

async function gameEnded() {
    if (game.value.winner == "PLAYER") {
        displayModal.value = true;
        while (modal.value == null) {
            await delay(100);
        }
        modal.value.showModal();
    }
};

const difficultyBonus = { "easy": 1, "normal": 2, "hard": 3 };
function getGameScore() {
    const result = (game.value.score["PLAYER"] - game.value.score["COMPUTER"] + (difficultyBonus[props.difficulty] * 70) + (game.value.hintsLeft * 10)) * 100;
    return Math.round(result);
}

function getEmoji() {
    if (props.difficulty == "easy") {
        return "🍃";
    } else if (props.difficulty == "normal") {
        return "🌊";
    } else {
        return "🔥";
    }
}

onMounted(async () => {
    await startGame();
});
</script>

<template>
    <span>{{ getEmoji() }}</span>
    <Game :difficulty="difficulty" @gameEnded="gameEnded" ref="game" />
    <ClassicModal v-if="displayModal" :score="getGameScore()" :difficulty="difficulty" ref="modal" />
</template>

<style scoped>
span {
    margin-bottom: 0.5em;
}
</style>