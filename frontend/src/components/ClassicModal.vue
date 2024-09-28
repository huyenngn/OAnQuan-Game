<script setup>
import Button from '@/components/Button.vue';
import Medal from '@/components/Medal.vue';
import { useLanguage } from '@/stores/language';
import { addEntry, getRank } from '@/supabase';
import { onMounted, ref } from 'vue';

const language = useLanguage();
const props = defineProps(["score", "difficulty"]);
const rank = ref(null);
const name = ref(null);

defineExpose({ showModal });

function showModal() {
    document.querySelector('.modal-backdrop').classList.remove('hidden');
}

function hideModal() {
    document.querySelector('.modal-backdrop').classList.add('hidden');
}


async function saveScore() {
    if (rank.value < 100) {
        await addEntry(name.value.value, props.score, language.country, props.difficulty);
    }
    hideModal();
}

onMounted(async () => {
    name.value.focus();
    rank.value = await getRank(props.score, props.difficulty);
});
</script>


<template>
    <div class="modal-backdrop">
        <div class="modal card">
            <div class="modal-header">
                <h2>{{ language.getText("congrats") }}</h2>
                <div>
                    <Button color="red" @click="hideModal">
                        x
                    </Button>
                </div>
            </div>
            <div class="modal-content" v-if="rank < 100">
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
                        {{ props.score }}</div>
                    <div class="column">
                        <span :class="'fi fi-' + language.country"></span>
                    </div>
                </div>
            </div>
            <div class="modal-content" v-else>{{ language.getText("noRank") }}</div>
            <div class="modal-footer">
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

.modal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 15px;
    max-width: min-content;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: -10px -10px 0 0;
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
    padding: 0.5em 0;
    gap: 0.5em;
    max-width: min-content;
}

.modal-footer {
    display: flex;
    justify-content: center;
    padding-bottom: 7px;
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