import {configureStore} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import bgImagesReducer from '../features/bgImages/bgImagesSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    bgImages: bgImagesReducer,
  },
});
