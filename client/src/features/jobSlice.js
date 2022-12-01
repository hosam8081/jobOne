import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { deleteJobThunk, updateJobThunk, postJobThunk } from "./jobThunk";

const initialState = {
  job: [],
  loading: false,
  data: {
    position: "",
    company: "",
    location: "",
    status: "pending",
    type: "full-time",
  },
  isEdit: false,
};

// post Job
export const postJob = createAsyncThunk("job/postJob", postJobThunk);

// delete job
export const deleteJob = createAsyncThunk("job/deleteJob", deleteJobThunk);

// update job
export const updateJob = createAsyncThunk("job/updateJob", updateJobThunk);

export const AllJobsSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setValues: (state, { payload }) => {
      let { name, value } = payload;
      state.data[name] = value;
    },
    setIsEdit: (state, { payload }) => {
      return {
        ...state,
        isEdit: payload.id,
        data: { ...payload.data },
      };
    },
    clearValues : (state) => {
       return {...state, isEdit:false ,data: {
        position: "",
        company: "",
        location: "",
        status: "pending",
        type: "full-time",
       }}
    }
  },
  extraReducers: {
    // post Job
    [postJob.pending]: (state) => {
      state.loading = true;
    },
    [postJob.fulfilled]: (state, action) => {
      state.loading = false;
      toast.success("Job Created");
    },
    [postJob.rejected]: (state, { payload }) => {
      state.loading = false;
      toast.error(payload);
    },
    // delete job 
    [deleteJob.fulfilled]: (state, action) => {
      toast.success("Job deleted");
    },
    [deleteJob.rejected]: (state, { payload }) => {
      toast.error(payload);
    },
    // updatejob
    [updateJob.pending]: (state) => {
      state.loading = true;
    },
    [updateJob.fulfilled]: (state, action) => {
      toast.success("job updated");
    },
    [updateJob.rejected]: (state, { payload }) => {
      state.loading = false;
      toast.error(payload);
    },
  },
});

export const { setValues, setIsEdit, clearValues } = AllJobsSlice.actions;

export default AllJobsSlice.reducer;
