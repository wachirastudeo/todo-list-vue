<script>
import { useTodoStore } from "../stores/todo";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { RouterLink } from 'vue-router';

export default {
  setup() {
    const todoStore = useTodoStore();
    const route = useRoute();
    const todoId = ref(-1);
    const IsLoading = ref(false);

    onMounted(async () => {
      try {
        await todoStore.loadTodoById(route.params.id);
        todoId.value = parseInt(route.params.id);
        IsLoading.value = true;
      } catch (error) {
        console.error('Failed to load todo:', error);
      }
    });

    const editTodo = async (selectedTodo) => {
      try {
        const bodyTodo = {
          name: selectedTodo.name,
          status: selectedTodo.status
        };

        await todoStore.editTodo(bodyTodo, todoId.value);
        alert('Edit complete');
      } catch (error) {
        console.error('Failed to edit todo:', error);
      }
    };

    return {
      todoStore,
      todoId,
      editTodo,
      IsLoading,
    };
  },
};
</script>

<template>
  <div v-if="IsLoading">
    <div>
      id: {{ todoId }}
    </div>
    <div>
      Name:
      <input type="text" v-model="todoStore.selectedTodo.name" />
    </div>
    <div>
      Status:
      <select v-model="todoStore.selectedTodo.status">
        <option>Select status</option>
        <option
          v-for="status in todoStore.statuses"
          :key="status"
          :value="status"
        >
          {{ status }}
        </option>
      </select>
    </div>
    <button @click="editTodo(todoStore.selectedTodo)">Edit</button>
    <RouterLink :to="{ name: 'todo-list' }">Back</RouterLink>
  </div>
  <div v-else>Loading...</div>
</template>
