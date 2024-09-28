<script setup>
import ChallengeModal from "@/components/ChallengeModal.vue";
import Counter from "@/components/Counter.vue";
import Game from "@/components/Game.vue";
import { useLanguage } from "@/stores/language";
import { useStore } from "@/stores/state";
import { getChallenge } from "@/supabase";
import { delay } from "@/utils";
import { onMounted, ref, watch } from "vue";


const language = useLanguage();
const store = useStore();
const props = defineProps(["id"]);

const game = ref(null);
const modal = ref(null);
const displayModal = ref(false);
const ideal_moves = ref(0);
const success = ref(false);
const moves = ref(0);

watch(() => store.getStateHistory().length, (newVal, oldVal) => {
    moves.value += newVal - oldVal;
});

function getEmoji() {
    const numberEmoji = ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];
    return (+props.id + 1).toString().split("").map((digit) => numberEmoji[digit]).join("");
}
async function startGame() {
    const challenge = await getChallenge(props.id);
    ideal_moves.value = challenge.ideal_moves;
    while (language.isBackendReady == false) {
        await delay(500);
    }
    store.addState(challenge);
    game.value.board = challenge.game.board;
    game.value.score = challenge.game.score;
    game.value.winner = "";
    game.value.isTurn = true;
    game.value.turn = "PLAYER";
}

async function gameEnded() {
    if ((game.value.winner == "PLAYER") && moves.value - 1 <= ideal_moves.value) {
        success.value = true;
        try {
            if (localStorage.getItem('progress') < +props.id + 1) {
                localStorage.setItem('progress', +props.id + 1);
            }
        }
        catch (error) {
            console.error("Error saving progress:", error);
        }
    } else {
        success.value = false;
    }
    displayModal.value = true;
    while (modal.value == null) {
        await delay(100);
    }
    modal.value.showModal();
}

onMounted(async () => {
    await startGame();
});
</script>

<template>
    <span>{{ getEmoji() }} {{ language.getText("challengePre") }} {{ ideal_moves }} {{
        language.getText("challengePost") }} (
        <Counter class="moves-tracker" :count="moves - 1" id="moves-counter" />)
    </span>
    <Game difficulty="hard" @gameEnded="gameEnded" ref="game" />
    <ChallengeModal v-if="displayModal" :success="success" :id="props.id" ref="modal" />
</template>

<style scoped>
span {
    font-size: 1.5rem;
    font-weight: 900;
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
}
</style>