<script>
import { onMounted, ref } from "vue";
import { useTodoStore } from "../stores/todo";
import { RouterLink} from 'vue-router';
export default {
    setup() {
        const todoStore = useTodoStore();
        const todoText = ref("");
        const IsLoading = ref(false);

        onMounted(async () => {
            IsLoading.value = true;
            await todoStore.loadTodos();
            IsLoading.value=false;
        });

        const addTodo = async (todoText) => {
            await todoStore.addTodo(todoText);
        };

        const editStatus = async (todoId, todoStatus) => {
            await todoStore.editTodo(
                {
                    status: todoStatus,
                },
                todoId
            );
        };
        const deleteTodo = async(todoId)=>{
            await todoStore.removeTodo(todoId);
            await todoStore.loadTodos();

        }
        return {
            todoStore,
            todoText,
            addTodo,
            editStatus,
            deleteTodo,
            IsLoading,

        };
    },
};
</script>

<template>
    <div v-if="IsLoading">
        <h2>Loading</h2>
    </div>
    <div>
        <input type="text" v-model="todoText" />
        <button @click="addTodo(todoText)">Add</button>
    </div>
    <div>
        <ul>
            <li v-for="todo in todoStore.list" :key="todo.id">
                {{ todo.name }}

                <select v-model="todo.status" @change="editStatus(todo.id, todo.status)">
                    <option disabled>Select status</option>
                    <option v-for="status in todoStore.statuses" :key="status" :value="status">
                        {{ status }}
                    </option>
                </select>

               <RouterLink :to="{name:'todo-edit',params: { id: todo.id } }"> <button>Edit</button></RouterLink>
                <button @click="deleteTodo(todo.id)">Delete</button>
            </li>
        </ul>
    </div>
</template>
