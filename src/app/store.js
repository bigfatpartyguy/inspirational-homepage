import {configureStore} from '@reduxjs/toolkit';
import bgImagesReducer from '../features/bgImages/bgImagesSlice';
import quoteReducer from '../features/quote/quoteSlice';
import todosReducer from '../features/todos/todosSlice';

export const store = configureStore({
  reducer: {
    bgImages: bgImagesReducer,
    quote: quoteReducer,
    todos: todosReducer,
  },
});
