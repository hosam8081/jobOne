import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const getLocalStoarge = () => {
  const result = localStorage.getItem("user");
  const user = result ? JSON.parse(result) : null;
  return user;
};

const initialState = {
  user: getLocalStoarge(),
  loading: false,
  isOpen:false
};

// register user
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (data, ThunkApi) => {
    try {
      const res = await axios.post(
        "https://jobone.herokuapp.com/api/v1/auth/register",
        data
      );
      return res.data.user;
    } catch (error) {
      return ThunkApi.rejectWithValue(error.response.data.msg);
    }
  }
);

// login user
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (data, ThunkApi) => {
    try {
      const res = await axios.post(
        "https://jobone.herokuapp.com/api/v1/auth/login",
        data
      );
      return res.data.user;
    } catch (error) {
      return ThunkApi.rejectWithValue(error.response.data.msg);
    }
  }
);

// update user
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (data, ThunkApi) => {
    try {
      const { token } = ThunkApi.getState().user.user;
      const res = await axios.patch(
        "https://jobone.herokuapp.com/api/v1/auth/updateUser",
        {
          ...data,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log(error);
      return ThunkApi.rejectWithValue(error.response.data.msg);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    setOpenSide : (state) => {
      state.isOpen = true
    },
    setCloseSide : (state) => {
      state.isOpen = false
    }
  },
  extraReducers: {
    // register
    [registerUser.pending]: (state) => {
      state.loading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      localStorage.setItem("user", JSON.stringify(state.user));
      toast.success(`hello ${payload.name}`);
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      toast.error(payload);
    },
    // login user
    [loginUser.pending]: (state) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      localStorage.setItem("user", JSON.stringify(state.user));
      toast.success(`welcome back ${payload.name}`);
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.loading = false;
      toast.error(payload);
    },
    // update user
    [updateUser.pending]: (state) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      console.log(payload)
      state.user = payload.user;
      localStorage.setItem("user", JSON.stringify(state.user));
      toast.success(`your profile updated ${payload.user.name} !`);
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.loading = false;
      toast.error(payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { logOut, setOpenSide, setCloseSide } = userSlice.actions;

export default userSlice.reducer;
