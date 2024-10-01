<script setup>
import Button from '@/components/Button.vue';
import ChallengeButton from '@/components/ChallengeButton.vue';
import { useLanguage } from '@/stores/language';
import { getNumberOfChallenges } from '@/supabase';
import { computed, onBeforeMount, ref } from 'vue';

const language = useLanguage();
const progress = ref(0);
const totalChallenges = ref(0);
const displayedChallenges = computed(() => {
    const n = progress.value + 20
    if (n < totalChallenges.value) {
        return n;
    } else {
        return totalChallenges.value;
    }
});

const SINE_WAVE = [-1, -20, -30, -20, 0, 20, 30, 20];

function getX(index) {
    return SINE_WAVE[index % SINE_WAVE.length] + '%';
}

onBeforeMount(async () => {
    try {
        progress.value = localStorage.getItem('progress') || 0;
    }
    catch (error) {
        console.error("Error fetching progress:", error);
    }
    totalChallenges.value = await getNumberOfChallenges();
});
</script>

<template>
    <Button color="orange" @click="$router.push('/')">
        {{ language.getText("back") }}
    </Button>
    <div class="challenge-selection">
        <div class="container">
            <ChallengeButton v-for="(level, index) in displayedChallenges"
                :solved="index < progress ? true : (index > progress) ? null : false" :style="{ left: getX(index) }"
                :key="index" @click="$router.push('/challenge/' + index)">
                {{ level }}
            </ChallengeButton>
            <ChallengeButton :solved="null" :style="{ left: getX(displayedChallenges) }">
                {{ displayedChallenges + 1 }}
            </ChallengeButton>
        </div>
        <div class="gradient"></div>
    </div>
</template>

<style scoped>
.challenge-selection {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 3rem;
}

.container {
    width: 300px;
    display: flex;
    flex-direction: column;
    gap: 4rem;
    align-items: center;
    overflow: hidden;

}

.gradient {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 7rem;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, var(--color-background) 60%);
    z-index: 1;
}
</style>