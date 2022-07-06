import { createSlice } from "@reduxjs/toolkit";
import axios from "lib/axios";

//initial state
export const initialState = {
  data: [],
};

//Slice
const followersSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getFollowers: (state, { payload }) => {
      state.data = payload.data;
    },
  },
});

// Actions generated from the slice
export const { getFollowers } = followersSlice.actions;

// Selector
export const followersSelector = (state) => state.followers;

// Reducer
export default followersSlice.reducer;

//CSRF
const csrf = () => axios.get("/sanctum/csrf-cookie");

// Async Thunk action
export function fetchFollowers(id) {
  return async (dispatch) => {
    await csrf();

    await axios.get(`/api/followers/${id}`).then((response) => {
      dispatch(getFollowers(response.data));
    });
  };
}
