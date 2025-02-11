<script setup>
import { useRoute } from 'vue-router'
const props = defineProps({
    meta: Object,
});
const route = useRoute();
const emit = defineEmits();

const previousPage = () => {
    emit('previousPage');
}
const nextPage = () => {
    emit('nextPage');
}
</script>
<template>
    <div class="mt-2 row pb-0 align-items-center px-4">
    <div class="col-md-6 text-center text-md-start">
        Showing {{ meta?.from ?? '0' }} to {{ meta?.to ?? '0' }} of {{ meta?.total ?? '0' }}
    </div>
    <div class="col-md-6 d-flex justify-content-md-end justify-content-center mt-3 mt-md-0">
        <button type="button" class="btn btn-primary" @click="previousPage"
            :disabled="meta?.current_page === 1">Previous</button>
        <button type="button" class="btn btn-primary ms-2" @click="nextPage"
            :disabled="meta?.current_page === meta?.last_page">Next</button>
    </div>
</div>

</template>