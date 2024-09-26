<script setup>
import Counter from "@/components/Counter.vue";

const props = defineProps(['id', 'count', 'pickedUp']);

</script>


<template>
    <div :class="'citizen' + (pickedUp[0] == id ? (' ' + pickedUp[1]) : '')" :id="'field' + id">
        <Counter :count="count" :id="'counter' + id" />
    </div>
</template>

<style scoped>
.citizen {
    grid-row: span 1;
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 0.93;
    pointer-events: none;
    position: relative;
}

.green {
    background-color: #8ae994;
    mix-blend-mode: multiply;
}

.blue {
    background-color: #aadefd;
    mix-blend-mode: multiply;
}
</style>