<script setup>
import Button from '@/components/Button.vue';
import router from "@/router";
import { useLanguage } from '@/stores/language';

const language = useLanguage();
const props = defineProps(['success', 'id']);

defineExpose({ showModal });

function showModal() {
    document.querySelector('.modal-backdrop').classList.remove('hidden');
}

function hideModal() {
    document.querySelector('.modal-backdrop').classList.add('hidden');
}

function goToNextChallenge() {
    hideModal();
    router.replace(`/challenge/${+props.id + 1}`);
}

function goToSelection() {
    hideModal();
    router.replace('/challenges');
}

</script>


<template>
    <div class="modal-backdrop">
        <div class="modal card">
            <div class="modal-header">
                <h2></h2>
                <div>
                    <Button color="red" @click="hideModal">
                        x
                    </Button>
                </div>
            </div>
            <div v-if="success" class="modal-content">
                {{ language.getText("success") }}
            </div>
            <div v-else class="modal-content">
                {{ language.getText("fail") }}
            </div>
            <div class="modal-footer">
                <Button @click="$router.go()">
                    <img src="../assets/reload.png" />
                </Button>
                <Button v-if="success" color="orange" @click="goToNextChallenge">
                    {{ language.getText("next") }}
                </Button>
                <Button v-else color="orange" @click="goToSelection">
                    {{ language.getText("back") }}
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
    padding: 1rem;
    max-width: min-content;
}

.modal-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: -0.5rem -0.5rem 0 0;
}

.modal-header>h2 {
    flex-grow: 1;
}

.modal-header>div>* {
    padding: 0 1rem 0.1rem;
}


.modal-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem 0;
    gap: 1rem;
    max-width: min-content;
}

.modal-footer {
    display: flex;
    justify-content: center;
    padding-bottom: 0.75rem;
}

img {
    filter: invert(100%) drop-shadow(0.5px 0.5px 0.5px #0066a2) drop-shadow(-0.5px -0.5px 0.5px #0066a2) drop-shadow(0.5px -0.5px 0.5px #0066a2) drop-shadow(-0.5px 0.5px 0.5px #0066a2) drop-shadow(2px 0 0.5px #0066a2) drop-shadow(0 3px 0.5px #004a87);
    width: 1.5rem;
}
</style>