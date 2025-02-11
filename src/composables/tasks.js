
import { useTasksStore } from '@/stores/tasks';
import { inject, onMounted, ref } from 'vue';
import { useHelper } from './helper'
import { useToastr } from './toastr'



export const useTasks = () => {
    const $http = inject('$http');
    const { toast, confirm } = useToastr();

    const meta = ref({});
    const tasks = ref(null)
    const errors = ref([])
    const { saveTasks } = useTasksStore()
    const { showLoading, hideLoading } = useHelper()
    const getTasks = async (param) => {
        try {
            showLoading()
            const response = await $http.get('api/tasks', {
                params: param
            });
            tasks.value = response.data.data
            meta.value = response.data.meta
            saveTasks(response.data)
            hideLoading()
        } catch (error) {

            console.error('Error fetching tasks:', error);
            hideLoading()
        }

    }

    const addTask = async (taskData, component) => {
        try {
            showLoading(component)
            const response = await $http.post('/api/tasks', taskData);
            hideLoading()
            toast(response.data.message);
            return response.data;
        } catch (error) {
            errors.value = error.response.data.errors
            console.error('Error adding task:', error);
            hideLoading()
            throw error;
        }

    };

    const updateTask = async (taskId, taskData, component) => {

        try {
            showLoading(component)
            const response = await $http.put(`api/tasks/${taskId}`, taskData);
            toast(response.data.message);
            hideLoading()
            return response;
        }
        catch (error) {
            errors.value = error.response.data.errors
            console.error('Error adding task:', error);
            hideLoading()
            throw error;
        }
    };

    const deleteTask = async (taskId) => {
        try {
            const result = await confirm("Do you want to delete?", "Yes, Delete!");
            if (result.isConfirmed) {
                const response = await $http.delete(`api/tasks/${taskId}`);
                toast(response.data.message);

                await getTasks({ limit: 10 });
            }
        } catch (error) {
        }
    };

    return {
        getTasks,
        addTask,
        tasks,
        deleteTask,
        updateTask,
        meta,
        errors
    }

}