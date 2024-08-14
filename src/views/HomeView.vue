<script>
import { onMounted, ref } from "vue";
import { useTodoStore } from "../stores/todo";

export default {
    setup() {
        const todoStore = useTodoStore();
        const todoText = ref("");

        onMounted(async () => {
            await todoStore.loadTodos();
            console.log(todoStore.list);
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
        };
    },
};
</script>

<template>
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

                <button>Edit</button>
                <button @click="deleteTodo(todo.id)">Delete</button>
            </li>
        </ul>
    </div>
</template>
