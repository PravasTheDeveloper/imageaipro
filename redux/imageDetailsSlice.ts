import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for your aspect ratio state
interface AspectRatioState {
    width: number;
    height: number;
    publicId: string;
}

// Define the initial state
const initialState: AspectRatioState = {
    width: 0,
    height: 0,
    publicId: "",
};

// Create a slice
const aspectRatioSlice = createSlice({
    name: 'imageDetailsData',
    initialState,
    reducers: {
        setDimensions(state, action: PayloadAction<{ width: number; height: number; publicId: string }>) {
            const { width, height, publicId } = action.payload;
            state.width = width;
            state.height = height;
            state.publicId = publicId;
        }
    },
});

// Export actions and reducer
export const { setDimensions } = aspectRatioSlice.actions;
export default aspectRatioSlice.reducer;
