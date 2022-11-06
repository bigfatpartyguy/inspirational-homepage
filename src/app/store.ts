import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import bgImagesReducer from '../features/bgImages/bgImagesSlice';
import quoteReducer from '../features/quote/quoteSlice';
import todosReducer from '../features/todos/todosSlice';
import weatherReducer from '../features/weather/weatherSlice';

export const store = configureStore({
  reducer: {
    bgImages: bgImagesReducer,
    quote: quoteReducer,
    todos: todosReducer,
    weather: weatherReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
