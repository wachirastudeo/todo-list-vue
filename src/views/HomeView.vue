<script>
import { onMounted, ref,computed } from "vue";
import { useTodoStore } from "../stores/todo";
import { RouterLink } from "vue-router";
export default {
  setup() {
    const todoStore = useTodoStore();
    const todoText = ref("");
    const IsLoading = ref(false);
    const selectedStatus = ref('Pending')

  const filterTodoList = computed(()=>{
    return todoStore.list.filter(todo=>todo.status===selectedStatus.value)
  })

    onMounted(async () => {
      IsLoading.value = true;
      await todoStore.loadTodos();
      IsLoading.value = false;
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
    const deleteTodo = async (todoId) => {
      await todoStore.removeTodo(todoId);
      await todoStore.loadTodos();
    };
    const changStatus = async(event,todoId)=>{
        IsLoading.value = true;

        try {
            
            if(event.target.checked){
            await todoStore.editTodo({status: 'Done'},todoId);
            
        }else{
            await todoStore.editTodo({status: 'Doing'},todoId);
        }
        await todoStore.loadTodos();
        } catch (error) {
            
        }
        IsLoading.value = false;

       

    }
const   changSelectedStatus=async(newStatus)=>{
selectedStatus.value = newStatus

}
    
    return {
      todoStore,
      todoText,
      addTodo,
      editStatus,
      deleteTodo,
      IsLoading,
      changStatus,
      selectedStatus, 
      changSelectedStatus,
      filterTodoList,
    };
  },
};
</script>

<template>
    <div class="flex items-center justify-center p-4">    <h1 >My Todo list</h1> </div>
  <div class="flex">
    <input
      class="input input-bordered w-full"
      placeholder="item name"
      type="text"
      v-model="todoText"
    />
    <button class="btn btn-primary ml-2" @click="addTodo(todoText)">Add</button>
  </div>
  <div v-if="IsLoading" class="flex item-center bg-black bg-opacity-10 fixed inset-0 justify-center" >
    <span class="loading loading-dots loading-lg"></span>

  </div>

  <div class="tabs tabs-boxed my-2">


    <a   :class="status === selectedStatus ? 'tab tab-active':'tab'"
   v-for="status in todoStore.statuses"
   @click="changSelectedStatus(status)"
   >{{ status }}</a>
  

  
</div>

  <div class="flex items-center justify-between my-2" v-for="todo in filterTodoList" :key="todo.id">
    <input type="checkbox" :checked="todo.status=='Done'" class="checkbox" @change="changStatus($event,todo.id)" />

    <div :class="todo.status=='Done'? 'line-through':''">{{ todo.name }} </div>
  <div>
    <RouterLink :to="{ name: 'todo-edit', params: { id: todo.id } }">
      <button class="btn btn-square btn-outline ml-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 512 512"
        >
          <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path
            d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
          />
        </svg>
      </button>
    </RouterLink>
    <button class="btn btn-square btn-outline ml-2" @click="deleteTodo(todo.id)">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 448 512"
      >
        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
          d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
        />
      </svg>
    </button>
</div>
  </div>
</template>
<style scoped>
.btn-outline:hover {
  fill: white;
}
</style>