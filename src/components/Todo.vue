<template>
  <div class="flex items-center justify-between p-4 bg-white rounded-lg shadow mb-4">
    <div class="flex items-center space-x-4">
      <input
        type="checkbox"
        :checked="todo.completed"
        @change="$emit('toggle-complete', todo.id)"
        class="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
      >
      <div>
        <h3 :class="{'line-through': todo.completed}" class="text-lg font-semibold">{{ todo.title }}</h3>
        <p class="text-gray-600">{{ todo.description }}</p>
        <span class="text-sm text-gray-500">{{ formatDate(todo.createdAt) }}</span>
      </div>
    </div>
    <div class="flex space-x-2">
      <button
        @click="$emit('edit', todo)"
        class="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-md"
      >
        編輯
      </button>
      <button
        @click="$emit('delete', todo.id)"
        class="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md"
      >
        刪除
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString('zh-TW');
}
</script> 