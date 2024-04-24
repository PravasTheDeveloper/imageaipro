import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for your aspect ratio state
interface AspectRatioState {
    width: number;
    height: number;
    publicId: string;
    original_filename: string,
    secureURL: string,
    iamgesize: number
}

// Define the initial state
const initialState: AspectRatioState = {
    width: 0,
    height: 0,
    publicId: "",
    original_filename: "",
    secureURL: "",
    iamgesize: 0
};

// Create a slice
const aspectRatioSlice = createSlice({
    name: 'imageDetailsData',
    initialState,
    reducers: {
        setDimensions(state, action: PayloadAction<{ width: number; height: number; publicId: string, original_filename: string, secureURL: string, imagesize: number }>) {
            const { width, height, publicId, original_filename, secureURL, imagesize } = action.payload;
            state.width = width;
            state.height = height;
            state.publicId = publicId;
            state.original_filename = original_filename;
            state.secureURL = secureURL,
                state.iamgesize = imagesize
        }
    },
});

// Export actions and reducer
export const { setDimensions } = aspectRatioSlice.actions;
export default aspectRatioSlice.reducer;
