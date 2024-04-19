// In store/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserDetails {
  // Define your user details interface
}

// Define an async thunk to fetch user details
export const fetchUserDetails = createAsyncThunk(
  'user/fetchUserDetails',
  async (userId: string) => {
    const response = await axios.post("/api/authentication/getuserdetails", { id: userId });
    return response.data; // Assuming response contains user details
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userDetails: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        // @ts-ignore
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
