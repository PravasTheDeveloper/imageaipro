// imageSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Image {
  id: string;
  title: string;
  // Add other properties as needed
}

interface FetchImagesByAuthorIdArgs {
  authorId: string;
}

export const fetchImagesByAuthorId = createAsyncThunk(
  'images/fetchByAuthorId',
  async ({ authorId }: FetchImagesByAuthorIdArgs, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/mainuserprojectdata/mainuserproljectdata', { authorId });
      return response.data;
    } catch (error) {
        // @ts-ignore
      return rejectWithValue(error.message);
    }
  }
);

const imageSlice = createSlice({
  name: 'images',
  initialState: {
    images: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImagesByAuthorId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchImagesByAuthorId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.images = action.payload;
      })
      .addCase(fetchImagesByAuthorId.rejected, (state, action) => {
        state.status = 'failed';
        // @ts-ignore
        state.error = action.payload as string;
      });
  },
});

export default imageSlice.reducer;
