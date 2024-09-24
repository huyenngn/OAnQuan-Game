<script setup>
import Button from '@/components/Button.vue';
import Loading from '@/components/Loading.vue';
import Medal from '@/components/Medal.vue';
import { useLanguage } from '@/stores/language';
import { fetchEntries, getCountries } from '@/supabase';
import { computed, onBeforeMount, ref } from 'vue';
import { RouterLink } from 'vue-router';

const language = useLanguage();

const country = ref("all");
const level = ref("all");
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
        level: level.value,
        country: country.value,
    };
    for (let key in out) {
        if (out[key] == "all") {
            delete out[key];
        }
    }
    return out;
});

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
    <RouterLink to="/">
        <Button color="orange">
            {{ language.getText("back") }}
        </Button>
    </RouterLink>
    <div class="filters">
        <select v-model="time" id="time" @change="fetchAndSetEntries">
            <option value="week"> {{ language.getText("week") }}</option>
            <option value="month"> {{ language.getText("month") }}</option>
            <option value="ytd"> {{ language.getText("ytd") }}</option>
            <option value="all"> {{ language.getText("allTime") }}</option>
        </select>
        <select v-model="level" id="level" @change="fetchAndSetEntries">
            <option value="EASY"> {{ language.getText("easy") }}</option>
            <option value="NORMAL"> {{ language.getText("normal") }}</option>
            <option value="HARD"> {{ language.getText("hard") }}</option>
            <option value="all"> {{ language.getText("all") }}</option>
        </select>
        <select v-model="country" id="country" @change="fetchAndSetEntries">
            <option value="all"> {{ language.getText("all") }}</option>
            <option v-for="country in countries" :key="country" :value="country">{{ country.toUpperCase() }}</option>
        </select>
    </div>
    <div class="board" v-if="!loading">
        <div class="row" v-for="(entry, index) in entries" :key="entry.id">
            <div class="column">
                <Medal :rank="index + 1" />
            </div class="column">
            <div class="column">{{ entry.name }}</div class="column">
            <div class="column">{{ entry.score }}</div class="column">
            <div class="column"><span :class="'fi fi-' + entry.country"></span></div class="column">
        </div>
    </div>
    <Loading v-else />
</template>

<style scoped>
.board {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    min-width: 45%;
}

.row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin: 5px;
    text-shadow: 2px 2px 1px #0066a2, -2px 2px 1px #0066a2, 2px -2px 1px #0066a2, -2px -2px 1px #0066a2, 0px 2px 1px #0066a2, 0px -2px 1px #0066a2, 0px 4px 1px #004a87, 2px 4px 1px #004a87, -2px 4px 1px #004a87;
    background: repeating-linear-gradient(45deg, #3ebbf7, #3ebbf7 5px, #45b1f4 5px, #45b1f4 10px);
    border-bottom: 3px solid rgba(16, 91, 146, 0.5);
    border-top: 3px solid rgba(255, 255, 255, .3);
    color: #fff !important;
    border-radius: 8px;
    padding: 10px;
}

.row:nth-child(even) {
    background: repeating-linear-gradient(45deg, #54d440, #54d440 5px, #52cc3f 5px, #52cc3f 10px);
    border-bottom: 3px solid rgba(40, 117, 29, 0.5);
    text-shadow: 2px 2px 1px #348628, -2px 2px 1px #348628, 2px -2px 1px #348628, -2px -2px 1px #348628, 0px 2px 1px #348628, 0px -2px 1px #348628, 0px 4px 1px #1d4c16, 2px 4px 1px #1d4c16, -2px 4px 1px #1d4c16;
}

.column {
    text-align: center;
}

.filters>* {
    margin: 0 5px;
}
</style>