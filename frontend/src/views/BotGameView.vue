<script setup>
import Game from "@/components/Game.vue";
import Modal from "@/components/Modal.vue";
import { useLanguage } from "@/stores/language";
import { useStore } from "@/stores/state";
import { delay } from "@/utils";
import axios from "axios";
import { onMounted, ref } from "vue";

const INITIAL_BOARD = [10, 5, 5, 5, 5, 5, 10, 5, 5, 5, 5, 5];
const INITIAL_SCORE = { PLAYER: 0, COMPUTER: 0 };

const language = useLanguage();
const store = useStore();
const props = defineProps(["level"]);

const game = ref(null);
const modal = ref(null);
const displayModal = ref(false);

async function startGame() {
    while (language.isBackendReady == false) {
        await delay(500);
    }
    try {
        const response = await axios.get(language.BACKEND_URL + "/game/start/" + props.level);
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

const gameEnded = () => {
    if (game.value.winner == "PLAYER") {
        displayModal.value = true;
        modal.value.showModal();
    }
};

const levelBonus = { "easy": 1, "normal": 2, "hard": 3 };
function getGameScore() {
    const result = (game.value.score["PLAYER"] - game.value.score["COMPUTER"] + (levelBonus[props.level] * 70) + (game.value.hintsLeft * 10)) * 100;
    return Math.round(result);
}

function getEmoji() {
    if (props.level == "easy") {
        return "🍃";
    } else if (props.level == "normal") {
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
    <Game :level="level" @gameEnded="gameEnded" ref="game" />
    <Modal v-if="displayModal" :score="getGameScore()" :level="level" ref="modal" />
</template>