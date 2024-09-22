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
    <div class="modal-backdrop hidden">
        <div class="modal">
            <div class="modal-content">
                <h1>{{ language.getText("congrats") }}</h1>
                <div v-if="rank < 100">
                    <p>{{ language.getText("rankPre") }} {{ rank + 1 }} {{ language.getText("rankMain") }} "{{
                        language.getText(props.level.toLowerCase()) }}" {{ language.getText("rankPost") }}</p>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <Medal :rank="rank + 1" />
                                </td>
                                <td><input type="text" ref="name" value="Unknown" /></td>
                                <td>{{ props.score }}</td>
                                <td><span :class="'fi fi-' + language.getCountry()"></span></td>
                            </tr>
                        </tbody>
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
}

.modal {
    text-shadow: 2px 2px 1px #0066a2, -2px 2px 1px #0066a2, 2px -2px 1px #0066a2, -2px -2px 1px #0066a2, 0px 2px 1px #0066a2, 0px -2px 1px #0066a2, 0px 4px 1px #004a87, 2px 4px 1px #004a87, -2px 4px 1px #004a87;
    border: none;
    margin: 15px 15px 30px;
    background: repeating-linear-gradient(45deg, #3ebbf7, #3ebbf7 5px, #45b1f4 5px, #45b1f4 10px);
    border-bottom: 3px solid rgba(16, 91, 146, 0.5);
    border-top: 3px solid rgba(255, 255, 255, .3);
    color: #fff !important;
    border-radius: 8px;
    padding: 8px 15px 10px;
    box-shadow: 0 6px 0 #266b91, 0 8px 1px 1px rgba(0, 0, 0, .3), 0 10px 0 5px #12517d, 0 12px 0 5px #1a6b9a, 0 15px 0 5px #0c405e, 0 15px 1px 6px rgba(0, 0, 0, .3);
    max-width: 600px;
}

.modal-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

input {
    background-color: transparent;
    border: 3px solid transparent;
    font-size: inherit;
    color: inherit;
    text-shadow: inherit;
    width: 50%;
    border-radius: 0.25rem;
}

input:focus {
    outline: none;
    border-color: #0066a2;
}
</style>