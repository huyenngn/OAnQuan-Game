<script setup>
import ComputerCitizen from "@/components/ComputerCitizen.vue";
import Counter from "@/components/Counter.vue";
import Loading from "@/components/Loading.vue";
import Modal from "@/components/Modal.vue";
import Quan from "@/components/Quan.vue";
import UserCitizen from "@/components/UserCitizen.vue";
import { useLanguage } from "@/stores/language";
import { useStore } from "@/stores/state";
import axios from "axios";
import { onBeforeMount, onBeforeUnmount, ref } from "vue";

const props = defineProps(["level"]);
const store = useStore();
const language = useLanguage();

const BACKEND_URL = language.BACKEND_URL;
const DELAY = 700;
const FAST_DELAY = 200;
const QUAN_FIELDS = [0, 6];
const COMPUTER_FIELDS = [1, 2, 3, 4, 5];
const PLAYER_FIELDS = [11, 10, 9, 8, 7];
const INITIAL_BOARD = [10, 5, 5, 5, 5, 5, 10, 5, 5, 5, 5, 5];
const INITIAL_SCORE = { PLAYER: 0, COMPUTER: 0 };
const BOARD_SIZE = 12;

const fast = ref(false);
const board = ref([]);
const score = ref(INITIAL_SCORE);
const turn = ref("PLAYER");
const winner = ref("");
const selectedCitizen = ref(null);
const modal = ref(null);
const left = ref(true);
const right = ref(true);

function color_field(pos, color) {
    const field = document.getElementById(`field${pos}`);
    if (!field) return;
    field.classList.add(color);
}

function uncolor_field(pos, color) {
    const field = document.getElementById(`field${pos}`);
    if (!field) return;
    field.classList.remove(color);
}

function getNormalizedPos(pos) {
    let m = Math.floor(pos / BOARD_SIZE);
    return pos - m * BOARD_SIZE;
}

function toggleFast() {
    fast.value = !fast.value;
}

function setSelectedCitizen(citizen) {
    left.value = true;
    right.value = true;
    if (selectedCitizen.value == citizen) {
        selectedCitizen.value = null;
    } else {
        selectedCitizen.value = citizen;
    }
}

function undo() {
    store.undo();
    const lastGameState = store.getCurrentState().game;
    board.value = lastGameState.board;
    score.value = lastGameState.score;
    turn.value = lastGameState.turn ? "COMPUTER" : "PLAYER";
    winner.value = "";

}

let hintsLeft = ref(3);
function getHint() {
    if (hintsLeft.value == 0 || winner.value) {
        return;
    }
    const hint = store.getCurrentState().hint;
    hintsLeft.value -= 1;
    if (hint.direction == 1) {
        left.value = true;
        right.value = false;
    } else {
        left.value = false;
        right.value = true;
    }
    selectedCitizen.value = hint.pos;
}

defineExpose({
    fast,
    toggleFast,
    undo,
    getHint,
    hintsLeft,
});

async function checkEnd() {
    if (QUAN_FIELDS.every(pos => board.value[pos] == 0)) {
        score.value["PLAYER"] += board.value.slice(7, 12).reduce((a, b) => a + b, 0);
        score.value["COMPUTER"] += board.value.slice(1, 6).reduce((a, b) => a + b, 0);
        board.value = Array(12).fill(0);
        return true;
    }
    return false;
}

async function updateAllowedMoves() {
    let fields = turn.value == "COMPUTER" ? COMPUTER_FIELDS : PLAYER_FIELDS;
    let allowed_moves = fields.filter(pos => board.value[pos] > 0);
    let isEnd = await checkEnd();
    if (allowed_moves.length > 0 || isEnd) {
        return
    }
    score.value[turn.value] -= fields.length;
    for (let i = 0; i < fields.length; i++) {
        board.value[fields[i]] = 1;
    }
}

function switchTurn() {
    turn.value = turn.value == "COMPUTER" ? "PLAYER" : "COMPUTER";
}

function delay(time = fast.value ? FAST_DELAY : DELAY) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

const pickedUp = ref([null, null]);

const isTurn = ref(false);
async function animateMove(pos, direction) {
    pickedUp.value = [pos, (turn.value == "PLAYER" ? "blue" : "green")];
    let toDistribute = board.value[pos];
    board.value[pos] = 0;
    let index = pos;
    await delay();

    for (let i = 1; i <= toDistribute; i++) {
        index = getNormalizedPos(pos + i * direction);
        board.value[index] += 1;
        await delay();
    }

    pickedUp.value = [null, null];
    index = getNormalizedPos(index + direction);
    if (board.value[index] == 0) {
        let next_index = getNormalizedPos(index + direction);
        while ((board.value[index] == 0) && (board.value[next_index] != 0)) {
            color_field(index, "red");
            await delay();
            score.value[turn.value] += board.value[next_index];
            board.value[next_index] = 0;
            uncolor_field(index, "red");
            index = getNormalizedPos(next_index + direction);
            next_index = getNormalizedPos(index + direction);
        }

        switchTurn();
        await updateAllowedMoves();
    }
    else if (QUAN_FIELDS.includes(index)) {
        switchTurn();
        await updateAllowedMoves();
    } else {
        await animateMove(index, direction);
    }
    await delay();
}

async function start_game() {
    while (language.isBackendReady == false) {
        await delay(500);
    }
    try {
        const response = await axios.get(BACKEND_URL + "/game/start/" + props.level);
        store.addState(response.data);
        let next_move = response.data.last_move;
        board.value = INITIAL_BOARD;
        score.value = INITIAL_SCORE;
        winner.value = "";
        if (next_move) {

            turn.value = "COMPUTER";
            isTurn.value = false;
            await animateMove(next_move.pos, next_move.direction);
            isTurn.value = true;
        }
        else {
            isTurn.value = true;
            turn.value = "PLAYER"
        }

    } catch (error) {
        console.error("Error fetching game state:", error);
    }
}

async function makeMove(pos, direction) {
    pickedUp.value = [null, null];
    try {
        isTurn.value = false;
        turn.value = "PLAYER";
        await animateMove(pos, direction);
        const response = await axios.post(BACKEND_URL + "/game/move/" + props.level, {
            game: store.getCurrentState().game,
            move: { pos, direction },
        });
        store.addState(response.data);
        let next_move = response.data.last_move;
        if (next_move) {
            turn.value = "COMPUTER";
            await animateMove(next_move.pos, next_move.direction);
        }
        if (await checkEnd()) {
            isTurn.value = false;
            winner.value = response.data.winner;
            if (winner.value == "PLAYER") {
                while (modal.value == null) {
                    await delay(500);
                }
                modal.value.showModal();
            }
        }
        if (JSON.stringify(board.value) != JSON.stringify(store.getCurrentState().game.board)) {
            console.error("Board state mismatch:", board.value, store.getCurrentState().game.board);
        } else {
            isTurn.value = true;
        }
    } catch (error) {
        console.error("Error making move:", error);
    }
}

function getGameScore() {
    const levelBonus = { "easy": 1, "normal": 2, "hard": 3 };
    let result = (score.value["PLAYER"] - score.value["COMPUTER"] + (levelBonus[props.level] * 70) + (hintsLeft.value * 10)) * 100;
    return Math.round(result);
}

function handleClickOutside(event) {
    if (event.target.closest('.exclude-click-outside')) return;
    if (!event.target.closest('.citizen')) {
        selectedCitizen.value = null;
    }
}

onBeforeMount(async () => {
    document.addEventListener('click', handleClickOutside);
    await start_game();
});

onBeforeUnmount(() => {
    store.clearHistory();
    document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
    <span v-if="!board || board.length == 0">
        {{ language.getText("loading") }}
    </span>
    <span v-else-if="winner == 'Draw'">
        {{ language.getText("draw") }}
    </span>
    <span v-else-if="winner == 'PLAYER'">
        {{ language.getText("win") }}
    </span>
    <span v-else-if="winner == 'COMPUTER'">
        {{ language.getText("lose") }}
    </span>
    <span v-else-if="turn == 'PLAYER'">
        {{ language.getText("turn") }}
    </span>
    <span v-else>
        {{ language.getText("waiting") }}
    </span>
    <span>🤖
        <Counter :count="score['COMPUTER']" id="comp_score" />
    </span>
    <div v-if="board && board.length != 0" class="board">
        <Quan v-for="id in QUAN_FIELDS" :key="id" :id="id" :count="board[id]" />
        <ComputerCitizen v-for="id in COMPUTER_FIELDS" :key="id" :id="id" :count="board[id]" :pickedUp="pickedUp" />
        <UserCitizen v-for="id in PLAYER_FIELDS" :key="id" :id="id" :count="board[id]"
            :selectedCitizen="selectedCitizen" :makeMove="makeMove" :setSelectedCitizen="setSelectedCitizen"
            :left="left" :right="right" :isTurn="isTurn" :pickedUp="pickedUp" />
    </div>
    <Loading v-else />
    <span>🫵
        <Counter :count="score['PLAYER']" id="you_score" />
    </span>
    <Modal v-if="winner == 'PLAYER'" :score="getGameScore()" :level="props.level" ref="modal" />
</template>

<style scoped>
.board>* {
    font-size: 4cqw;
}

span {
    font-weight: 900;
    display: flex;
    flex-direction: row;
}

div {
    width: 100%;
}

.red {
    background-color: rgb(255, 155, 155);
    mix-blend-mode: multiply;
}

.board {
    display: grid;
    grid-template-columns: 1.25fr repeat(5, 1fr) 1.27fr;
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    background-image: url('@/assets/board.svg');
    background-repeat: no-repeat;
    background-size: 100%;
    z-index: 1;
}

#field0 {
    grid-area: 1 / 1 / 3 / 2;
    border-radius: 100% 0 0 100% / 50% 0 0 50%;
    margin: 5% 0 5% 2%;
}

#field6 {
    grid-area: 1 / 7 / 3 / 8;
    border-radius: 0 100% 100% 0 / 0 50% 50% 0;
    margin: 5% 10% 5% 0;
}
</style>