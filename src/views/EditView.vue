<script>

import { useTodoStore } from "../stores/todo";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const todoStore = useTodoStore();
    const route = useRoute();

    onMounted(() => {
      console.log(route.params.id);
    });

    return {
      todoStore,
      route
    };
  }
};
</script>
<template>

    edit
</template>