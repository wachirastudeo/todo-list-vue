import { defineStore } from 'pinia';
import axios from 'axios';

const BASE_URL = 'https://66bc104824da2de7ff693e44.mockapi.io';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    list: [],
    selectedTodo: {},
    statuses: ['Pending', 'Doing', 'Done']
  }),
  actions: {
    async loadTodos() {
      try {
        const response = await axios.get(`${BASE_URL}/todos`);
        this.list = response.data;
      } catch (error) {
        console.error('Failed to load todos:', error);
      }
    },
    async loadTodoById(id) {
      try {
        const response = await axios.get(`${BASE_URL}/todos/${id}`);
        this.selectedTodo = response.data;
        console.log(this.selectedTodo);

      } catch (error) {
        console.error('Failed to load todo:', error);
      }
    },

    async addTodo(todoText) {
      const bodyData = {
        name: todoText,
        status: 'Pending'
      };
      try {
        const response = await axios.post(`${BASE_URL}/todos`, bodyData);
        this.list.push(response.data);
        console.log('Todo added successfully');
      } catch (error) {
        console.error('Failed to add todo:', error);
      }
    },
    async editTodo(todoData, id) {
      try {
        const response = await axios.put(`${BASE_URL}/todos/${id}`, todoData);

        console.log('Todo edited successfully');
      } catch (error) {
        console.error('Failed to edit todo:', error);
      }
    },
    async removeTodo(id) {
      try {
        await axios.delete(`${BASE_URL}/todos/${id}`);
        console.log('Todo removed successfully');
      } catch (error) {
        console.error('Failed to remove todo:', error);
      }
    }
  }
});
