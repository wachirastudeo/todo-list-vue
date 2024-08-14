<script>
import { onMounted,ref} from 'vue';
import { useTodoStore } from "../stores/todo";

export default {
  setup() {
    const todoStore = useTodoStore();
    const todoText = ref('');

    onMounted(async () => {
      await todoStore.loadTodos();
      console.log(todoStore.list);
    });

    const addTodo = async (todoText) => {
        await todoStore.addTodo(todoText);
      
    };
    return {
      todoStore,
      todoText,
      addTodo

    };
  }
};
</script>

<template>
    <div>
        <input type="text" v-model="todoText" > <button @click="addTodo(todoText)">Add</button>
    </div>
  <div>
    <ul>
        <li v-for="todo in todoStore.list" :key="todo.id">
            {{ todo.name }} {{ todo.status }} 
        <button>Edit</button>
        <button>Delete</button>
           
        </li>
    </ul>
  </div>
</template>
