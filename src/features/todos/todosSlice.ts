import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';

interface TodosState {
  [index: string]: {
    value: string;
    id: string;
    completed: boolean;
  };
}

const initialState: TodosState = {};

const todos = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action) {
      state[action.payload.id] = action.payload;
    },
    removeTodo(state, action) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete state[action.payload];
    },
    markAsCompleted(state, action) {
      state[action.payload].completed = true;
    },
  },
});

export const selectTodos = (state: RootState) => Object.values(state.todos);

export const {addTodo, removeTodo, markAsCompleted} = todos.actions;

export default todos.reducer;
