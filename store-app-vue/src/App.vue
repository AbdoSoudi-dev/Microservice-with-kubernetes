<script setup>
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
</script>

<template>
    <div class="flex flex-col h-screen">
        <the-header />

        <div class="flex-1">
            <router-view />
        </div>

        <the-footer />
    </div>
</template>

<style scoped>

</style>
