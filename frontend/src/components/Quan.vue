<script setup>
import Counter from "@/components/Counter.vue";

const props = defineProps(['id', 'count', 'highlightedField']);

</script>

<template>
    <div class="quan" :id="'field' + id" :style="highlightedField == id ? 'background-color: #ff9595' : ''">
        <Counter :count="count" :id="'counter' + id" />
    </div>
</template>

<style scoped>
.quan {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>