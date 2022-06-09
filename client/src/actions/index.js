import {
  REGISTER,
  REGISTER_ERROR,
  SIGN_IN,
  SIGN_IN_ERROR,
  SIGN_OUT,
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
