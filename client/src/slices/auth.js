import { createSlice } from "@reduxjs/toolkit";
import axios from "lib/axios";

const localStore = () => {
  if (localStorage.getItem("user")) {
    return JSON.parse(localStorage.getItem("user"));
  } else {
    return false;
  }
};

//initial state
export const initialState = {
  isSignedIn: localStore().isSignedIn,
  user: localStore().user,
  errors: {},
};

//Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInSuccess: (state, { payload }) => {
      localStorage.setItem(
        "user",
        JSON.stringify({
          isSignedIn: true,
          user: payload,
          errors: {},
        })
      );

      state.isSignedIn = true;
      state.user = payload;
      state.errors = {};
    },
    signInFailure: (state, { payload }) => {
      state.errors = payload;
    },
    signOutSuccess: (state) => {
      localStorage.removeItem("user");

      state.isSignedIn = false;
      state.user = null;
      state.errors = {};
    },
    registerSuccess: (state, { payload }) => {
      localStorage.setItem(
        "user",
        JSON.stringify({
          isSignedIn: true,
          user: payload,
          errors: {},
        })
      );

      state.isSignedIn = true;
      state.user = payload;
      state.errors = {};
    },
    registerFailure: (state, { payload }) => {
      state.errors = payload;
    },
  },
});

// Actions generated from the slice
export const {
  signInFailure,
  signInSuccess,
  signOutSuccess,
  registerFailure,
  registerSuccess,
} = authSlice.actions;

// Selector
export const authSelector = (state) => state.auth;

// Reducer
export default authSlice.reducer;

//CSRF
const csrf = () => axios.get("/sanctum/csrf-cookie");

// Async Thunk action
export function signIn(values) {
  return async (dispatch) => {
    await csrf();

    await axios
      .post("/login", values)
      .then((response) => {
        dispatch(signInSuccess(response.data));
      })
      .catch((error) => {
        if (error.response.status !== 422) throw error;
        dispatch(
          signInFailure(Object.values(error.response.data.errors).flat())
        );
      });
  };
}

export function signOut() {
  return async (dispatch) => {
    await csrf();

    await axios.post("/logout").then(() => {
      dispatch(signOutSuccess());
    });
  };
}

export function signUp(values) {
  return async (dispatch) => {
    await csrf();

    await axios
      .post("/register", values)
      .then((response) => {
        dispatch(registerSuccess(response.data));
      })
      .catch((error) => {
        if (error.response.status !== 422) throw error;
        dispatch(
          registerFailure(Object.values(error.response.data.errors).flat())
        );
      });
  };
}
