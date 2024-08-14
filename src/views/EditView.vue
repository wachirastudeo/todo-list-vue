<script>
import { useTodoStore } from "../stores/todo";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

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
      } catch (error) {}
    });
    const editTodo = async (selectedTodo) => {
      try {
        const bodyTodo = {
          name: selectedTodo.name,
          status: selectedTodo.status
        }

        await todoStore.editTodo(bodyTodo, todoId);
        alert('edit complete')
      } catch (error) {}
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
    id: {{ todoId }}
    Name :
    <input type="text" v-model="todoStore.selectedTodo.name" />

    <div>
      Status:
      <select
        v-model="todoStore.selectedTodo.status"
        @change="editStatus(todoId, todoStore.selectedTodo.status)"
      >
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
  </div>
  <div v-else>Loading...</div>
</template>
