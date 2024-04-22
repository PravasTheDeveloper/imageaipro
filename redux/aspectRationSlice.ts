// aspectRatioSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for your aspect ratio state
interface AspectRatioState {
  aspectRatio: string;
}

// Define the initial state
const initialState: AspectRatioState = {
  aspectRatio: "",
};

// Create a slice
const aspectRatioSlice = createSlice({
  name: 'aspectRatio',
  initialState,
  reducers: {
    setAspectRatio(state, action: PayloadAction<string>) {
      state.aspectRatio = action.payload;
    },
  },
});

// Export actions and reducer
export const { setAspectRatio } = aspectRatioSlice.actions;
export default aspectRatioSlice.reducer;
