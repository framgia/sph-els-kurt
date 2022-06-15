import {
  REGISTER,
  REGISTER_ERROR,
  SIGN_IN,
  SIGN_IN_ERROR,
  SIGN_OUT,
  GET_USERS,
  GET_USER,
  GET_FOLLOWERS,
  GET_FOLLOWING,
  FOLLOW_USER,
  UNFOLLOW_USER,
} from "./types";
import axios from "lib/axios";

const csrf = () => axios.get("/sanctum/csrf-cookie");

export const signIn = (values) => async (dispatch, errors) => {
  await csrf();

  const response = await axios.post("/login", values).catch((error) => {
    if (error.response.status !== 422) throw error;

    dispatch({
      type: SIGN_IN_ERROR,
      payload: Object.values(error.response.data.errors).flat(),
    });
  });
  dispatch({ type: SIGN_IN, payload: response.data });
};

export const signUp = (values) => async (dispatch, errors) => {
  await csrf();

  const response = await axios.post("/register", values).catch((error) => {
    if (error.response.status !== 422) throw error;

    dispatch({
      type: REGISTER_ERROR,
      payload: Object.values(error.response.data.errors).flat(),
    });
  });

  dispatch({ type: REGISTER, payload: response.data });
};

export const signOut = () => async (dispatch) => {
  await csrf();

  await axios.post("logout");

  dispatch({ type: SIGN_OUT });
};

export const fetchUsers = () => async (dispatch) => {
  await csrf();

  const response = await axios.get("api/users");

  dispatch({ type: GET_USERS, payload: response.data });
};

export const fetchUser = (id) => async (dispatch) => {
  await csrf();

  const response = await axios.get("api/users/" + id);

  dispatch({ type: GET_USER, payload: response.data });
};

export const fetchFollowers = (id) => async (dispatch) => {
  await csrf();

  const response = await axios.get("api/followers/" + id);

  dispatch({ type: GET_FOLLOWERS, payload: response.data });
};

export const fetchFollowing = (id) => async (dispatch) => {
  await csrf();

  const response = await axios.get("api/following/" + id);

  dispatch({ type: GET_FOLLOWING, payload: response.data });
};

export const followUser = (id) => async (dispatch) => {
  await csrf();

  const response = await axios.post("api/followers/" + id);

  dispatch({ type: FOLLOW_USER, payload: response.data });
};

export const unfollowUser = (id) => async (dispatch) => {
  await csrf();

  const response = await axios.delete("api/followers/" + id);

  dispatch({ type: UNFOLLOW_USER, payload: response.data });
};
