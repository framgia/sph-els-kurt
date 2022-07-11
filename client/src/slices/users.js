import { createSlice } from "@reduxjs/toolkit";
import axios from "lib/axios";

//initial state
export const initialState = {
  data: [],
  errors: null,
  message: null,
};

//Slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsers: (state, { payload }) => {
      state.data = payload.data;
      state.message = null;
      state.errors = null;
    },
    getUser: (state, { payload }) => {
      state.data = payload.data;
      state.message = null;
      state.errors = null;
    },
    editUser: (state, { payload }) => {
      state.data = payload.data;
      state.message = payload.message;
      state.errors = null;
    },
    editUserFailure: (state, { payload }) => {
      state.errors = payload;
      state.message = null;
    },
    deleteUser: (state, { payload }) => {
      state.data = state.data.filter((user) => user.id !== payload.data.id);
    },
    FOLLOW_USER: (state, { payload }) => {
      state.data = payload.data;
    },
    UNFOLLOW_USER: (state, { payload }) => {
      state.data = payload.data;
    },
  },
});

// Actions generated from the slice
export const {
  getUsers,
  getUser,
  editUser,
  editUserFailure,
  deleteUser,
  FOLLOW_USER,
  UNFOLLOW_USER,
} = usersSlice.actions;

// Selector
export const usersSelector = (state) => state.users;

// Reducer
export default usersSlice.reducer;

//CSRF
const csrf = () => axios.get("/sanctum/csrf-cookie");

// Async Thunk action
export function fetchUsers() {
  return async (dispatch) => {
    await csrf();

    await axios.get("/api/users").then((response) => {
      dispatch(getUsers(response.data));
    });
  };
}

export function fetchUser(id) {
  return async (dispatch) => {
    await csrf();

    await axios.get("/api/users/" + id).then((response) => {
      dispatch(getUser(response.data));
    });
  };
}

export function updateUser(id, values) {
  return async (dispatch) => {
    await csrf();

    await axios
      .put("/api/users/" + id, values)
      .then((response) => {
        dispatch(editUser(response.data));
      })
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        dispatch(
          editUserFailure(Object.values(error.response.data.errors).flat())
        );
      });
  };
}

export function destroyUser(id) {
  return async (dispatch) => {
    await csrf();

    await axios.delete("/api/users/" + id).then((response) => {
      dispatch(deleteUser(response.data));
    });
  };
}

export function followUser(id) {
  return async (dispatch) => {
    await csrf();

    await axios.post("/api/followers/" + id).then((response) => {
      dispatch(FOLLOW_USER(response.data));
    });
  };
}

export function unfollowUser(id) {
  return async (dispatch) => {
    await csrf();

    await axios.delete("/api/followers/" + id).then((response) => {
      dispatch(UNFOLLOW_USER(response.data));
    });
  };
}
