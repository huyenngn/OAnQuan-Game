<script setup>
import Button from '@/components/Button.vue';

const props = defineProps({
    solved: {
        type: [Boolean, null],
        required: true
    }
});
</script>

<template>
    <Button v-if="solved == null" color="grey" class="circular no-click">
        <slot></slot>
    </Button>
    <Button v-else-if="solved == true" color="green" class="circular">
        <slot></slot>
    </Button>
    <Button v-else color="blue" class="circular">
        <slot></slot>
    </Button>
</template>

<style scoped>
.circular {
    border-radius: 50%;
    width: 65px;
    height: 55px;
}

.circular::before {
    right: 30%;
    top: 0%;
    width: 15%;
    transform: rotate(10deg);
}

.circular::after {
    right: 15%;
    width: 10%;
    top: 10%;
    transform: rotate(45deg);
}

.no-click {
    pointer-events: none;
    cursor: pointer;
}
</style>