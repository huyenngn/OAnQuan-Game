<script setup>
import Button from "@/components/Button.vue";
import Game from "@/components/Game.vue";
import Medal from "@/components/Medal.vue";
import Modal from "@/components/Modal.vue";
import { useLanguage } from "@/stores/language";
import { useStore } from "@/stores/state";
import { addEntry, getRank } from '@/supabase';
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
const rank = ref(null);
const name = ref(null);
const score = ref(0);

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

async function saveScore() {
    await addEntry(name.value.value, score.value, language.country, props.difficulty);
    modal.value.hideModal();
}


async function gameEnded() {
    if (game.value.winner == "PLAYER") {
        score.value = getGameScore();
        rank.value = await getRank(score.value, props.difficulty);
        displayModal.value = true;
        while (modal.value == null) {
            await delay(100);
        }
        modal.value.showModal();
        if (rank.value < 100) {
            name.value.focus();
        }
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
    <span class="view-title">{{ getEmoji() }}</span>
    <Game :difficulty="difficulty" @gameEnded="gameEnded" ref="game" />
    <Modal v-if="displayModal" ref="modal">
        <template #title>{{ language.getText("congrats") }}</template>
        <template v-if="rank < 100" #content>
            <p>{{ language.getText("rankPre") }} {{ rank + 1 }} {{ language.getText("rankMain") }} "{{
                language.getText(props.difficulty.toLowerCase()) }}" {{ language.getText("rankPost") }}</p>
            <div class="row">
                <div class="column">
                    <Medal :rank="rank + 1" />
                </div>
                <div class="column">
                    <input type="text" spellcheck="false" ref="name" :value="language.getText('unknown')" />
                </div>
                <div class="column">
                    {{ score }}</div>
                <div class="column">
                    <span :class="'fi fi-' + language.country"></span>
                </div>
            </div>
        </template>
        <template v-else #content>
            {{ language.getText("noRank") }}
        </template>
        <template #footer>
            <Button color="green" @click="saveScore">
                {{ language.getText("save") }}
            </Button>
        </template>
    </Modal>
</template>

<style scoped>
.view-title {
    margin-bottom: 1rem;
}

input {
    background-color: transparent;
    border: 0.2rem solid transparent;
    font-size: inherit;
    color: inherit;
    text-shadow: inherit;
    border-radius: 0.5rem;
    text-align: center;
    font-weight: inherit;
    max-width: 15rem;
}

input:focus {
    outline: none;
    border-color: var(--color-text);
}
</style>