<script setup>
import Button from '@/components/Button.vue';

defineExpose({ showModal, hideModal });

function showModal() {
    document.querySelector('.modal-backdrop').classList.remove('hidden');
}

function hideModal() {
    document.querySelector('.modal-backdrop').classList.add('hidden');
}
</script>


<template>
    <div class="modal-backdrop">
        <div class="modal card">
            <div class="modal-header">
                <h2>
                    <slot name="title"></slot>
                </h2>
                <Button color="red" @click="hideModal">
                    x
                </Button>
            </div>
            <div class="modal-content">
                <slot name="content"></slot>
            </div>
            <div class="modal-footer">
                <slot name="footer"></slot>
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
    width: 100vw;
    height: 100vh;
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
    margin: -0.5rem 0 0 0;
    gap: 0.75rem;
}

.modal-header>h2 {
    flex-grow: 1;
}

.modal-header .game-button {
    line-height: 1.2rem;
}

.modal-content {
    padding: 1rem 0;
}

.modal-footer {
    display: flex;
    align-items: center;
    padding-bottom: 0.75rem;
    gap: 0.75rem;
}
</style>