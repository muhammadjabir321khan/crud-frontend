<template>
    <div v-show="message" class="mt-1">
        <p class="invalid-feedback d-block mb-0">
            {{marginCalss}}
            {{ message }}
        </p>
    </div>
</template>

<script setup>
const props = defineProps({
    message: String,
})
</script>

<style></style>