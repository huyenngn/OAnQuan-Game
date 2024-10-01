<script setup>
import Button from '@/components/Button.vue';
import Loading from '@/components/Loading.vue';
import Medal from '@/components/Medal.vue';
import { useLanguage } from '@/stores/language';
import { fetchEntries, getCountries } from '@/supabase';
import { computed, onBeforeMount, ref } from 'vue';

const language = useLanguage();

const country = ref("all");
const difficulty = ref("all");
const time = ref("all");
const countries = ref([]);
const entries = ref([]);
const loading = ref(false);

const filter = computed(() => {
    let timestamp = "all";
    if (time.value == "week") {
        timestamp = Date.now() - 7 * 24 * 60 * 60 * 1000;
    } else if (time.value == "month") {
        timestamp = Date.now() - 30 * 24 * 60 * 60 * 1000;
    } else if (time.value == "ytd") {
        timestamp = new Date(new Date().getFullYear(), 0, 1).getTime();
    }
    let out = {
        time: timestamp,
        difficulty: difficulty.value,
        country: country.value,
    };
    for (let key in out) {
        if (out[key] == "all") {
            delete out[key];
        }
    }
    return out;
});

function getdifficultyEmoji(difficulty) {
    if (difficulty == "EASY") {
        return "🍃";
    } else if (difficulty == "NORMAL") {
        return "🌊";
    } else if (difficulty == "HARD") {
        return "🔥";
    }
}

const fetchAndSetEntries = async () => {
    loading.value = true;
    entries.value = await fetchEntries(filter.value);
    loading.value = false;
};

onBeforeMount(async () => {
    fetchAndSetEntries();
    countries.value = await getCountries();
});
</script>

<template>
    <Button color="orange" @click="$router.push('/')">
        {{ language.getText("back") }}
    </Button>
    <div class="filters">
        <select v-model="time" id="time" @change="fetchAndSetEntries">
            <option value="week"> {{ language.getText("week") }}</option>
            <option value="month"> {{ language.getText("month") }}</option>
            <option value="ytd"> {{ language.getText("ytd") }}</option>
            <option value="all"> {{ language.getText("allTime") }}</option>
        </select>
        <select v-model="difficulty" id="difficulty" @change="fetchAndSetEntries">
            <option value="all">{{ language.getText("all") }}</option>
            <option value="EASY">🍃 {{ language.getText("easy") }}</option>
            <option value="NORMAL">🌊 {{ language.getText("normal") }}</option>
            <option value="HARD">🔥 {{ language.getText("hard") }}</option>
        </select>
        <select v-model="country" id="country" @change="fetchAndSetEntries">
            <option value="all"> {{ language.getText("all") }}</option>
            <option v-for="country in countries" :key="country" :value="country">{{ country.toUpperCase() }}</option>
        </select>
    </div>
    <div class="board" v-if="!loading">
        <div class="row card" v-for="(entry, index) in entries" :key="entry.id">
            <div class="column">
                <Medal :rank="index + 1" />
            </div>
            <p>{{ entry.name }}</p>
            <p>{{ getdifficultyEmoji(entry.difficulty) + entry.score }}</p>
            <div class="column"><span :class="'fi fi-' + entry.country"></span></div>
        </div>
    </div>
    <Loading v-else />
</template>

<style>
.row {
    display: grid;
    grid-template-columns: 1fr 2fr 2fr 1fr;
    gap: 0.75rem;
    padding: .2rem 1rem;
    align-items: center;
}

.column {
    display: flex;
    justify-content: center;
}

.column:first-child {
    justify-content: flex-start;
}

.column:last-child {
    justify-content: flex-end;
}
</style>

<style scoped>
.board {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    max-width: 600px;
    gap: 1rem;
}

p {
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    height: fit-content;
}

.filters {
    display: flex;
    margin: 2rem;
    gap: 0.75rem;
}

@media screen and (max-width: 600px) {
    p {
        font-size: 5cqw;
    }
}
</style>