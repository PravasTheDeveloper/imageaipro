import { configureStore } from '@reduxjs/toolkit';
import countReducer from './slice';
import userReducer from './userDetailsSlice'
import aspectRationReducer from './aspectRationSlice';
import imageDetailsReducer from './imageDetailsSlice';

const store = configureStore({
  reducer: {
    count: countReducer,
    userdetail: userReducer,
    aspectRatio: aspectRationReducer,
    imageData: imageDetailsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
