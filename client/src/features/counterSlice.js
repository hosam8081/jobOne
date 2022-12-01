import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  value: 0,
  posts: [],
  loading: false,
};

// Fetch All Posts
export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, ThunkApi) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MzZhZTVmZWJkOWFlOTBiZTBlZTkyZTQiLCJuYW1lIjoiaG9zYW0gc2FsYWgiLCJpYXQiOjE2Njc5NTAwNzksImV4cCI6MTY3MDU0MjA3OX0.uMzGnHKMP-BkE7__ejBK-YwEFsREcb5Mq-QffAT46fM";

    const res = await axios
      .get("http://localhost:5000/api/v1/jobs", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .catch((err) => console.log(err));
    return res.data.job;
  }
);

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: {
    [getPosts.pending]: (state) => {
      state.loading = true;
    },
    [getPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    [getPosts.rejected]: (state) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
