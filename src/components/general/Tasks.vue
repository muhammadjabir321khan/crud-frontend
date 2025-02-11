<script setup>
import { ref, onMounted } from 'vue';
import Pagination from '@components/core/Pagination.vue';
import { useTasks } from '@/composables/tasks';
import Table from '@components/core/Table.vue';
import TaskModal from '@components/modal/TaskModal.vue';

const { getTasks, meta, tasks, deleteTask } = useTasks();
const currentPage = ref(1);
const showModal = ref(false);
const isEditing = ref(false);
const selectedTask = ref(null);

// Open modal (Add or Edit)
const openModal = (task = null) => {
  if (task) {
    isEditing.value = true;
    selectedTask.value = task;
  } else {
    isEditing.value = false;
    selectedTask.value = null;
  }
  showModal.value = true;
};

// Close modal
const closeModal = () => {
  showModal.value = false;
};

// Handle new task addition
const addTask = (newTask) => {
  tasks.value.unshift(newTask);
  closeModal();
};

// Handle task update
const updateTask = (updatedTask) => {
  const index = tasks.value.findIndex(task => task.id === updatedTask.data.id);
  if (index !== -1) {
    tasks.value[index] = updatedTask.data;
  }
  closeModal();
};

// Fetch previous page
const previousPage = async () => {
  currentPage.value--;
  await getTasks({ page: currentPage.value, limit: 10 });
};

// Fetch next page
const nextPage = async () => {
  currentPage.value++;
  await getTasks({ page: currentPage.value, limit: 10 });
};

onMounted(async () => {
  await getTasks({ limit: 10 });
});

</script>

<template>
  <div class="container mt-5">
    <div class="card">
      <div class="d-flex justify-content-end pt-4 pe-4">
        <button class="btn btn-primary" @click="openModal()">Add Task</button>
      </div>
      <div class="card-body">
        <Table>
          <template #content>
            <thead>
              <tr>
                <th>Task</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(task, index) in tasks" :key="task.id">
                <td>{{ task.task }}</td>
                <td>{{ task.description }}</td>
                <td>
                  <div class="d-flex">
                    <button @click="openModal(task)" class="btn btn-warning btn-sm">Edit</button>
                    <button @click="deleteTask(task.id)" class="btn btn-danger btn-sm ms-2">Delete</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </template>

          <template #pagination>
            <Pagination :meta="meta" @previousPage="previousPage" @nextPage="nextPage" />
          </template>
        </Table>
      </div>
    </div>
  </div>

  <!-- Add/Edit Task Modal -->
  <TaskModal v-if="showModal" :isEditing="isEditing" :existingTask="selectedTask" @taskAdded="addTask"
    @taskUpdated="updateTask" @closeModal="closeModal" />
</template>
