// aspectRatioSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for your aspect ratio state
interface AspectRatioState {
  aspectRatio: string;
  loading: boolean
}

// Define the initial state
const initialState: AspectRatioState = {
  aspectRatio: "",
  loading: false
};

// Create a slice
const aspectRatioSlice = createSlice({
  name: 'aspectRatio',
  initialState,
  reducers: {
    setAspectRatio(state, action: PayloadAction<string>) {
      state.aspectRatio = action.payload;
      state.loading = true
    },
    setLoadingFalse(state) {
      state.loading = false;
    }
  },
});

// Export actions and reducer
export const { setAspectRatio, setLoadingFalse } = aspectRatioSlice.actions;
export default aspectRatioSlice.reducer;
