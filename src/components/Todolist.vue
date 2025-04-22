<template>
    <div class="p-4">
      <h2 class="text-xl font-bold mb-4">代辦清單</h2>
      <ul>
        <li v-for="todo in todos" :key="todo.id" class="mb-2">
          ✅ {{ todo.title }} - {{ todo.description }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import TodolistApi from '@/api/todolistApi';
  
  const todolist = ref([]);
  
  onMounted(async () => {
    const res = await TodolistApi.getTodolists();
    todolist.value = res.data;
  });
  </script>
  