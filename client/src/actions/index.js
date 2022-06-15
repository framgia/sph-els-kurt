import {
  GET_CATEGORIES,
  CREATE_CATEGORY,
  CREATE_CATEGORY_ERROR,
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

export const fetchCategories = () => async (dispatch) => {
  const response = await axios.get("/api/categories");

  dispatch({ type: GET_CATEGORIES, payload: response.data });
};

export const storeCategory = (values) => async (dispatch) => {
  await csrf();

  const response = await axios
    .post("/api/categories", values)
    .then((response) => {
      dispatch({ type: CREATE_CATEGORY, payload: response.data });
    })
    .catch((error) => {
      if (error.response.status !== 422) throw error;

      dispatch({
        type: CREATE_CATEGORY_ERROR,
        payload: Object.values(error.response.data.errors).flat(),
      });
    });
};
