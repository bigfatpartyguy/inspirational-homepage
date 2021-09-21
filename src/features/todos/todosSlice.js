import {createSlice} from '@reduxjs/toolkit';

const todos = createSlice({
  name: 'todos',
  initialState: {},
  reducers: {
    addTodo(state, action) {
      state[action.payload.id] = action.payload;
    },
    removeTodo(state, action) {
      delete state[action.payload];
    },
    markAsCompleted(state, action) {
      state[action.payload].completed = true;
    },
  },
});

export const selectTodos = state => Object.values(state.todos);

export const {addTodo, removeTodo, markAsCompleted} = todos.actions;

export default todos.reducer;
