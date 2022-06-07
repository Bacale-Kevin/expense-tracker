import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signupUser = createAsyncThunk("api/signup", async (signupValues) => {
  const { data } = await axios.post("http://localhost:8080/api/signup", signupValues);
  console.log(data);
  return data;
});

const authSlice = createSlice({
  name: "User",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  extraReducers: {
    [signupUser.pending]: (state, action) => {
      state.loading = true;
    },
    [signupUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = [action.payload];
    },
    [signupUser.rejected]: (state, action) => {
      console.log("Payload ", action);
      state.loading = false;
      state.error = [action.error.message];
    },
  },
});

export default authSlice.reducer;
