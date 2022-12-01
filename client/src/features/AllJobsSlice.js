import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  jobs: [],
  loading: false,
  filter: {
    search: "",
    sort: "latest",
    type: "all",
    status: "all",
  },
  page:1,
  numOfPages:1,
  totalJobs:1
};

// Fetch All Jobs
export const getJobs = createAsyncThunk("jobs/getJobs", async (_, ThunkApi) => {
  const { search, status, type, sort } = ThunkApi.getState().allJobs.filter;
  const page = ThunkApi.getState().allJobs.page
  try {
    const res = await axios.get(
      `https://jobone.herokuapp.com/api/v1/jobs?status=${status}&type=${type}&search=${search}&sort=${sort}&page=${page}`
    );
    return res.data;
  } catch (error) {
    return ThunkApi.rejectWithValue(error.response.data.msg);
  }
});

export const AllJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    setFilter: (state, { payload }) => {
      const { name, value } = payload;
      state.page = 1
      state.filter[name] = value;
    },
    setChangePage : (state, {payload}) => {
      state.page = payload
    },
    clearFilter : (state) => {
      state.filter = {
        search: "",
        sort: "latest",
        type: "all",
        status: "all",
      }
    }
  },
  extraReducers: {
    [getJobs.pending]: (state) => {
      state.loading = true;
    },
    [getJobs.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.jobs = payload.job;
      state.numOfPages = payload.numOfPages;
      state.totalJobs = payload.totalJobs;
    },
    [getJobs.rejected]: (state) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFilter, setChangePage, clearFilter } = AllJobsSlice.actions;

export default AllJobsSlice.reducer;
