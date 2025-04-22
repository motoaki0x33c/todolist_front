import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Spring Boot 的 API 位置
});

export default {
  getTodolists: () => api.get('/todolist'),
  getTodolist: (id) => api.get(`/todolist/${id}`),
  createTodolist: (data) => api.post('/todolist', data),
  updateTodolist: (id, data) => api.put(`/todolist/${id}`, data),
  deleteTodolist: (id) => api.delete(`/todolist/${id}`),
};