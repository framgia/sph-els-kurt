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
  GET_CATEGORIES,
  CREATE_CATEGORY,
  CREATE_CATEGORY_ERROR,
  DELETE_CATEGORY,
  EDIT_USER,
  EDIT_USER_ERROR,
  GET_CATEGORY,
  EDIT_CATEGORY,
  EDIT_CATEGORY_ERROR,
  GET_CATEGORY_ERROR,
  CREATE_WORD,
  CREATE_ANSWER,
  CREATE_ANSWER_ERROR,
  GET_USER_CATEGORY_ANSWERS,
  DELETE_USER,
} from "./types";
import axios from "lib/axios";

const csrf = () => axios.get("/sanctum/csrf-cookie");

export const signIn = (values) => async (dispatch) => {
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

export const signUp = (values) => async (dispatch) => {
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

export const deleteUser = (id) => async (dispatch) => {
  await csrf();

  const response = await axios.delete("api/users/" + id);

  dispatch({ type: DELETE_USER, payload: response.data });
};

export const updateUser = (id, values) => async (dispatch) => {
  await csrf();

  await axios
    .put("/api/users/" + id, values)
    .then((response) => {
      dispatch({ type: EDIT_USER, payload: response.data });
    })
    .catch((error) => {
      if (error.response.status !== 422) throw error;

      dispatch({
        type: EDIT_USER_ERROR,
        payload: Object.values(error.response.data.errors).flat(),
      });
    });
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

export const fetchCategories = () => async (dispatch) => {
  const response = await axios.get("/api/categories");

  dispatch({ type: GET_CATEGORIES, payload: response.data });
};

export const fetchCategory = (id) => async (dispatch) => {
  await axios
    .get("/api/categories/" + id)
    .then((response) => {
      dispatch({ type: GET_CATEGORY, payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: GET_CATEGORY_ERROR, payload: error.response.data });
    });
};

export const storeCategory = (values) => async (dispatch) => {
  await csrf();

  await axios
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

export const updateCategory = (id, values) => async (dispatch) => {
  await csrf();

  await axios
    .put("/api/categories/" + id, values)
    .then((response) => {
      dispatch({ type: EDIT_CATEGORY, payload: response.data });
    })
    .catch((error) => {
      if (error.response.status !== 422) throw error;

      dispatch({
        type: EDIT_CATEGORY_ERROR,
        payload: Object.values(error.response.data.errors).flat(),
      });
    });
};

export const deleteCategory = (id) => async (dispatch) => {
  await csrf();

  const response = await axios.delete("/api/categories/" + id);

  dispatch({ type: DELETE_CATEGORY, payload: response.data });
};

export const storeWord = (values) => async (dispatch) => {
  await csrf();

  await axios
    .post("/api/words", values)
    .then((response) => {
      dispatch({ type: CREATE_WORD, payload: response.data });
    })
    .catch((error) => {
      if (error.response.status !== 422) throw error;

      dispatch({
        type: CREATE_CATEGORY_ERROR,
        payload: Object.values(error.response.data.errors).flat(),
      });
    });
};

export const storeAnswer = (values) => async (dispatch) => {
  await csrf();

  await axios
    .post("/api/answers/", values)
    .then((response) => {
      dispatch({ type: CREATE_ANSWER, payload: response.data });
    })
    .catch((error) => {
      if (error.response.status !== 422) throw error;

      dispatch({
        type: CREATE_ANSWER_ERROR,
        payload: Object.values(error.response.data.errors).flat(),
      });
    });
};

export const fetchUserCategoryAnswers =
  (userId, categoryId) => async (dispatch) => {
    await csrf();

    const response = await axios.get(
      `/api/users/${userId}/categories/${categoryId}/answers`
    );

    dispatch({ type: GET_USER_CATEGORY_ANSWERS, payload: response.data });
  };
