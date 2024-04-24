import { configureStore } from '@reduxjs/toolkit';
import countReducer from './slice';
import userReducer from './userDetailsSlice'
import aspectRationReducer from './aspectRationSlice';
import imageDetailsReducer from './imageDetailsSlice';
import userImageReducer from './userImageSlice';

const store = configureStore({
  reducer: {
    count: countReducer,
    userdetail: userReducer,
    aspectRatio: aspectRationReducer,
    imageData: imageDetailsReducer,
    userImageData : userImageReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
