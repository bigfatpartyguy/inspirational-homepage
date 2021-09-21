import {configureStore} from '@reduxjs/toolkit';
import bgImagesReducer from '../features/bgImages/bgImagesSlice';
import quoteReducer from '../features/quote/quoteSlice';
import todosReducer from '../features/todos/todosSlice';
import weatherReducer from '../features/weather/weather';

export const store = configureStore({
  reducer: {
    bgImages: bgImagesReducer,
    quote: quoteReducer,
    todos: todosReducer,
    weather: weatherReducer,
  },
});
