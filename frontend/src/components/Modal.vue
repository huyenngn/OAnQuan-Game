<script setup>
import Button from '@/components/Button.vue';
import Medal from '@/components/Medal.vue';
import { useLanguage } from '@/stores/language';
import { addEntry, getRank } from '@/supabase';
import { onMounted, ref } from 'vue';

const language = useLanguage();
const props = defineProps(["score", "level"]);
const rank = ref(null);
const name = ref(null);
const country = ref(null);

async function getCountry() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        return data.country_code.toLowerCase();
    } catch (error) {
        console.error("Error fetching country code:", error);
        return "xx";
    }
};

function showModal() {
    document.querySelector('.modal-backdrop').classList.remove('hidden');
}

function hideModal() {
    document.querySelector('.modal-backdrop').classList.add('hidden');
}

defineExpose({ showModal });

async function saveScore() {
    if (rank.value < 100) {
        await addEntry(name.value.value, props.score, country.value, props.level);
    }
    hideModal();
}

onMounted(async () => {
    name.value.focus();
    rank.value = await getRank(props.score, props.level);
    country.value = await getCountry();
});
</script>


<template>
    <div class="modal-backdrop">
        <div class="card">
            <div class="modal-header">
                <h2>{{ language.getText("congrats") }}</h2>
                <div>
                    <Button color="red" @click="hideModal">
                        x
                    </Button>
                </div>
            </div>
            <div class="modal-content">
                <div v-if="rank < 100">
                    <p>{{ language.getText("rankPre") }} {{ rank + 1 }} {{ language.getText("rankMain") }} "{{
                        language.getText(props.level.toLowerCase()) }}" {{ language.getText("rankPost") }}</p>
                    <table>
                        <div class="row">
                            <div class="column">
                                <Medal :rank="rank + 1" />
                            </div>
                            <div class="column">
                                <input type="text" ref="name" :value="language.getText('unknown')" />
                            </div>
                            <div class="column">
                                {{ props.score }}</div>
                            <div class="column">
                                <span :class="'fi fi-' + language.getCountry()"></span>
                            </div>
                        </div>
                    </table>
                </div>
                <p v-else>{{ language.getText("noRank") }}</p>
                <Button color="green" @click="async () => await saveScore()">
                    {{ language.getText("save") }}
                </Button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.hidden {
    display: none !important;
}

.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    white-space: nowrap;
    overflow: hidden;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.modal-header>h2 {
    flex-grow: 1;
}

.modal-header>div>* {
    padding: 0 14px 2px;
}

.modal-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1em;
    max-width: min-content;
}

input {
    background-color: transparent;
    border: 3px solid transparent;
    font-size: inherit;
    color: inherit;
    text-shadow: inherit;
    border-radius: 8px;
    text-align: center;
    font-weight: inherit;
    max-width: 250px;
}

input:focus {
    outline: none;
    border-color: var(--color-text);
}
</style>