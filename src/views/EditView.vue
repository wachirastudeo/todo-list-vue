<script>
import { useTodoStore } from "../stores/todo";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { RouterLink } from "vue-router";

export default {
  setup() {
    const todoStore = useTodoStore();
    const route = useRoute();
    const todoId = ref(-1);
    const IsLoading = ref(false);
    const IsSeccess = ref(false);

    onMounted(async () => {
      try {
        await todoStore.loadTodoById(route.params.id);
        todoId.value = parseInt(route.params.id);
        IsLoading.value = true;
      } catch (error) {
        console.error("Failed to load todo:", error);
      }
    });

    const editTodo = async (selectedTodo) => {
      try {
        const bodyTodo = {
          name: selectedTodo.name,
          status: selectedTodo.status,
        };

        await todoStore.editTodo(bodyTodo, todoId.value);
        IsSeccess.value=true;
        setTimeout(() => {
          IsSeccess.value=false;

        }, 3000);

      } catch (error) {
        console.error("Failed to edit todo:", error);
      }

    };

    return {
      todoStore,
      todoId,
      editTodo,
      IsLoading,
      IsSeccess,
    };
  },
};
</script>

<template>


  <div v-if="IsLoading">
    <transition
      name="fade"
      enter-active-class="transition ease-in-out duration-500"
      leave-active-class="transition ease-in-out duration-500"
      enter-from-class="opacity-0"
      enter-to-class="opacity-500"
      leave-from-class="opacity-500"
      leave-to-class="opacity-0"
    >
    <div v-if="IsSeccess" role="alert" class="ease-in-out duration-300 alert alert-success ">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-6 w-6 shrink-0 stroke-current"
    fill="none"
    viewBox="0 0 24 24">
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <span>Update success!</span>
</div>

</transition>



<div class="w-1/2 mx-auto">
      <div class="text-lg">ID:  <div class="badge badge-neutral ">{{ todoId }}</div>
    </div>

   
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text text-lg	">Name :</span>
        </div>
        <input
          type="text"
          v-model="todoStore.selectedTodo.name"
          class="input input-bordered w-full"
        />
      </label>
   
    
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text text-lg">Status:</span>
        </div>
        <select class="select select-bordered w-full" v-model="todoStore.selectedTodo.status">
          <option
          v-for="status in todoStore.statuses"
          :key="status"
          :value="status"
        >
          {{ status }}
        </option></select>
      </label>

      <div class=" flex justify-between   mt-4"> 
        <RouterLink  :to="{ name: 'todo-list' }"><button class="btn bg-primary btn-square">
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
        </button></RouterLink>

        <button class="btn btn-primary " @click="editTodo(todoStore.selectedTodo)">Edit</button>
      </div>
    
   
  </div>
  
  </div>


  <div v-else>Loading...</div>
</template>
