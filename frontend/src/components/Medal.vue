<script setup>
import { onBeforeMount, ref } from 'vue';


const props = defineProps(["rank"]);
const color = ref(null);
function setColor() {
    if (props.rank == 1) {
        return 'gold';
    } else if (props.rank == 2) {
        return 'silver';
    } else if (props.rank == 3) {
        return 'bronze';
    } else {
        return 'grey';
    }
};

onBeforeMount(() => {
    color.value = setColor();
});
</script>

<template>
    <div class="quiz-medal">
        <div :class="'quiz-medal__circle quiz-medal__circle--' + color">
            <span>
                {{ rank }}
            </span>
        </div>
        <div v-if="color != 'grey'" class="quiz-medal__ribbon quiz-medal__ribbon--left"></div>
        <div v-if="color != 'grey'" class="quiz-medal__ribbon quiz-medal__ribbon--right"></div>
    </div>
</template>

<style scoped>
/* https://codepen.io/virpo/pen/WNNoRKB */

.quiz-medal {
    position: relative;
}

.quiz-medal__circle {
    font-family: 'Roboto', sans-serif;
    font-size: 28px;
    font-weight: 500;
    width: 56px;
    height: 56px;
    border-radius: 100%;
    color: white;
    text-align: center;
    line-height: 46px;
    vertical-align: middle;
    position: relative;
    border-width: 0.2em;
    border-style: solid;
    z-index: 1;
    box-shadow: inset 0 0 0 #a7b2b8, 2px 2px 0 rgba(0, 0, 0, 0.08);
    border-color: #edeff1;
    text-shadow: 2px 2px 0 #98a6ad;
    background: linear-gradient(to bottom right, #d1d7da 50%, #c3cbcf 50%);
}

.quiz-medal__circle.quiz-medal__circle--gold {
    box-shadow: inset 0 0 0 #b67d05, 2px 2px 0 rgba(0, 0, 0, 0.08);
    border-color: #fadd40;
    text-shadow: 0 0 4px #9d6c04;
    background: linear-gradient(to bottom right, #f9ad0e 50%, #e89f06 50%);
}

.quiz-medal__circle.quiz-medal__circle--silver {
    box-shadow: inset 0 0 0 #a7b2b8, 2px 2px 0 rgba(0, 0, 0, 0.08);
    border-color: #edeff1;
    text-shadow: 0px 0px 4px #98a6ad;
    background: linear-gradient(to bottom right, #d1d7da 50%, #c3cbcf 50%);
}

.quiz-medal__circle.quiz-medal__circle--bronze {
    box-shadow: inset 0 0 0 #955405, 2px 2px 0 rgba(0, 0, 0, 0.08);
    border-color: #f7bb23;
    text-shadow: 0 0 4px #7d4604;
    background: linear-gradient(to bottom right, #df7e08 50%, #c67007 50%);
}

.quiz-medal__circle.quiz-medal__circle--grey {
    box-shadow: inset 0 0 0 #8a9398, 2px 2px 0 rgba(0, 0, 0, 0.08);
    border-color: #c4c6c7;
    text-shadow: 0px 0px 4px #626b6f;
    background: linear-gradient(to bottom right, #b2b7ba 50%, #9fa5a8 50%);
}

.quiz-medal__ribbon {
    content: "";
    display: block;
    position: absolute;
    border-style: solid;
    border-width: 6px 10px;
    width: 0;
    height: 20px;
    top: 50px;
}

.quiz-medal__ribbon--left {
    border-color: #fc402d #fc402d transparent #fc402d;
    left: 8px;
    transform: rotate(20deg) translateZ(-32px);
}

.quiz-medal__ribbon--right {
    left: 28px;
    border-color: #f31903 #f31903 transparent #f31903;
    transform: rotate(-20deg) translateZ(-48px);
}
</style>