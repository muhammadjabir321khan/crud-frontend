<script setup>
import { ref, defineEmits, defineProps, watch } from 'vue';
import { useTasks } from '@/composables/tasks';
import Errors from '@components/core/Errors.vue';

const { addTask, updateTask, errors } = useTasks();
const emit = defineEmits(['taskAdded', 'taskUpdated', 'closeModal']);
const myTask = ref(null)

const props = defineProps({
    isEditing: Boolean,
    existingTask: Object
});

const task = ref({
    task: '',
    description: ''
});

// Watch for changes when editing
watch(() => props.existingTask, (newTask) => {
    if (newTask) {
        task.value = { ...newTask };
    }
}, { immediate: true });

const submitTask = async () => {
    try {
        if (props.isEditing) {
            const response = await updateTask(task.value.id, task.value, myTask.value);
            emit('taskUpdated', response.data);
        } else {
            const response = await addTask(task.value, myTask.value);
            emit('taskAdded', response.data);
        }
        closeModal();
    } catch (error) {
        console.error('Error submitting task:', error);
    }
};

// Close Modal
const closeModal = () => {
    emit('closeModal');
};
</script>

<template>
    <div class="modal fade show d-block" tabindex="-1" role="dialog" >
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content"  ref="myTask">
                <div class="modal-header">
                    <h5 class="modal-title">{{ isEditing ? 'Edit Task' : 'Add Task' }}</h5>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="submitTask">
                        <div class="mb-3">
                            <label class="form-label">Task</label>
                            <input type="text" class="form-control" v-model="task.task" />
                            <Errors v-if="errors?.task" :message="errors.task[0]" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Description</label>
                            <textarea class="form-control" v-model="task.description"></textarea>
                            <Errors v-if="errors?.description" :message="errors.description[0]" />
                        </div>
                        <div class="text-end">
                            <button type="button" class="btn btn-secondary me-2" @click="closeModal">Cancel</button>
                            <button type="submit" class="btn btn-primary">{{ isEditing ? 'Update Task' : 'Add Task' }}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal {
    background: rgba(0, 0, 0, 0.5);
}
</style>
