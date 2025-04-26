<template>
  <div class="max-w-4xl mx-auto p-4">
    <h1 class="text-3xl font-bold text-center mb-8">待辦事項清單</h1>
    
    <!-- 新增表單 -->
    <form @submit.prevent="handleSubmit" class="mb-8 bg-white p-6 rounded-lg shadow">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
          標題
        </label>
        <input
          v-model="formData.title"
          type="text"
          id="title"
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          required
        >
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
          描述
        </label>
        <textarea
          v-model="formData.description"
          id="description"
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          rows="3"
        ></textarea>
      </div>
      <button
        type="submit"
        class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
      >
        {{ isEditing ? '更新' : '新增' }}
      </button>
    </form>

    <!-- 待辦事項列表 -->
    <div v-if="todos.length > 0">
      <Todo
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @toggle-complete="toggleComplete"
        @edit="startEdit"
        @delete="deleteTodo"
      />
    </div>
    <div v-else class="text-center text-gray-500 mt-8">
      目前沒有待辦事項
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import Todo from './Todo.vue'
  import todolistApi from '@/api/todolistApi'

  const todos = ref([])
  const formData = ref({
    title: '',
    description: '',
  })
  const isEditing = ref(false)
  const editingId = ref(null)

  // 獲取所有待辦事項
  const fetchTodos = async () => {
    try {
      const response = await todolistApi.getTodolists()
      todos.value = response.data
    } catch (error) {
      console.error('獲取待辦事項失敗:', error)
    }
  }

  // 新增或更新待辦事項
  const handleSubmit = async () => {
    try {
      if (isEditing.value) {
        await todolistApi.updateTodolist(editingId.value, formData.value)
      } else {
        await todolistApi.createTodolist(formData.value)
      }
      await fetchTodos()
      resetForm()
    } catch (error) {
      console.error(isEditing.value ? '更新待辦事項失敗:' : '新增待辦事項失敗:', error)
    }
  }

  // 切換完成狀態
  const toggleComplete = async (id) => {
    try {
      const todo = todos.value.find(t => t.id === id)
      if (todo) {
        await todolistApi.updateTodolist(id, {
          ...todo,
          completed: !todo.completed
        })
        await fetchTodos()
      }
    } catch (error) {
      console.error('切換待辦事項狀態失敗:', error)
    }
  }

  // 開始編輯
  const startEdit = (todo) => {
    formData.value = { ...todo }
    isEditing.value = true
    editingId.value = todo.id
  }

  // 刪除待辦事項
  const deleteTodo = async (id) => {
    try {
      await todolistApi.deleteTodolist(id)
      await fetchTodos()
    } catch (error) {
      console.error('刪除待辦事項失敗:', error)
    }
  }

  // 重置表單
  const resetForm = () => {
    formData.value = {
      title: '',
      description: '',
    }
    isEditing.value = false
    editingId.value = null
  }

  onMounted(fetchTodos)
</script>
  