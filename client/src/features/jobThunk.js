import axios from "axios";
import {clearValues} from '../features/jobSlice'
import { getJobs } from "./AllJobsSlice";

export const postJobThunk = async (_, ThunkApi) => {
  try {
    const { token } = ThunkApi.getState().user.user;
    const { data } = ThunkApi.getState().job;
    const res = await axios.post(
      "https://jobone.herokuapp.com/api/v1/jobs",
      { ...data },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    ThunkApi.dispatch(clearValues())
    return res.data;
  } catch (error) {
    return ThunkApi.rejectWithValue(error.response.data.msg);
  }
}

export const deleteJobThunk = async (id, ThunkApi) => {
  try {
    const { token } = ThunkApi.getState().user.user;
    const res = await axios.delete("https://jobone.herokuapp.com/api/v1/jobs/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    ThunkApi.dispatch(getJobs())
    return res.data;
  } catch (error) {
    return ThunkApi.rejectWithValue(error.response.data.msg);
  }
};

export const updateJobThunk = async (id, ThunkApi) => {
  try {
    const { token } = ThunkApi.getState().user.user;
    const { data } = ThunkApi.getState().job;
    const res = await axios.patch("https://jobone.herokuapp.com/api/v1/jobs/" + id, {...data},{
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    ThunkApi.dispatch(clearValues())
    return res.data;
  } catch (error) {
    return ThunkApi.rejectWithValue(error.response.data.msg);
  }
};
