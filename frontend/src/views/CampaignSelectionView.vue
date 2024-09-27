<script setup>
import Button from '@/components/Button.vue';
import { useLanguage } from '@/stores/language';
import { RouterLink } from 'vue-router';

const language = useLanguage();
</script>

<template>
    <RouterLink to="/">
        <Button color="orange">
            {{ language.getText("back") }}
        </Button>
    </RouterLink>
</template>