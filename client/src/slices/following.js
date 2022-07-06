import { createSlice } from "@reduxjs/toolkit";
import axios from "lib/axios";

//initial state
export const initialState = {
  data: [],
};

//Slice
const followingSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getFollowing: (state, { payload }) => {
      state.data = payload.data;
    },
  },
});

// Actions generated from the slice
export const { getFollowing } = followingSlice.actions;

// Selector
export const followingSelector = (state) => state.following;

// Reducer
export default followingSlice.reducer;

//CSRF
const csrf = () => axios.get("/sanctum/csrf-cookie");

// Async Thunk action
export function fetchFollowing(id) {
  return async (dispatch) => {
    await csrf();

    await axios.get(`/api/following/${id}`).then((response) => {
      dispatch(getFollowing(response.data));
    });
  };
}
