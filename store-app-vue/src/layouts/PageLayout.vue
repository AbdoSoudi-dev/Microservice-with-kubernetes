<script setup>

import TheFooter from '../components/TheFooter.vue'
import TheHeader from '../components/TheHeader.vue'

</script>

<template>
    <div class="flex flex-col h-screen">
        <the-header />

        <div class="flex-1">
            <slot />
        </div>

        <the-footer />
    </div>

</template>

<style scoped></style>
