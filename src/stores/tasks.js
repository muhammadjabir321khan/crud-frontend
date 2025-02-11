import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useTasksStore = defineStore("tasks", () => {

    const tasks = ref(null)
    const saveTasks = (data) => {
        tasks.value = data
    }

    const getStoreTasks = computed(() => {
        return tasks.value
    })

    return {
        saveTasks,
        getStoreTasks
    }
});