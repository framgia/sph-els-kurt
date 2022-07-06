import { createSlice } from "@reduxjs/toolkit";
import axios from "lib/axios";

export const initialState = {
  data: [],
  errors: null,
  message: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    getCategories: (state, { payload }) => {
      state.data = payload.data;
      state.message = null;
      state.errors = null;
    },
    getCategory: (state, { payload }) => {
      state.data = payload.data;
      state.message = null;
      state.errors = null;
    },
    getCategoryFailure: (state, { payload }) => {
      state.errors = payload;
      state.message = null;
    },
    deleteCategory: (state, { payload }) => {
      state.data = state.data.filter(
        (category) => category.id !== payload.data.id
      );
      state.message = payload.message;
    },
    editCategory: (state, { payload }) => {
      state.data = payload.data;
      state.message = payload.message;
      state.errors = null;
    },
    editCategoryFailure: (state, { payload }) => {
      state.errors = payload;
      state.message = null;
    },
    createCategory: (state, { payload }) => {
      state.data = payload;
      state.message = payload.message;
      state.errors = null;
    },
    createCategoryFailure: (state, { payload }) => {
      state.errors = payload;
      state.message = null;
    },
    createWord: (state, { payload }) => {
      state.data.words = payload;
      state.message = payload.message;
      state.errors = null;
    },
    createWordFailure: (state, { payload }) => {
      state.errors = payload;
      state.message = null;
    },
  },
});

export const {
  getCategories,
  getCategory,
  getCategoryFailure,
  deleteCategory,
  editCategory,
  editCategoryFailure,
  createWord,
  createWordFailure,
  createCategory,
  createCategoryFailure,
} = categoriesSlice.actions;

export const categoriesSelector = (state) => state.categories;

export default categoriesSlice.reducer;

const csrf = () => axios.get("/sanctum/csrf-cookie");

export function fetchCategories() {
  return async (dispatch) => {
    await csrf();

    await axios.get("/api/categories").then((response) => {
      dispatch(getCategories(response.data));
    });
  };
}

export function fetchCategory(id) {
  return async (dispatch) => {
    await csrf();

    await axios
      .get(`/api/categories/${id}`)
      .then((response) => {
        dispatch(getCategory(response.data));
      })
      .catch((error) => {
        dispatch(
          getCategoryFailure(Object.values(error.response.data.errors).flat())
        );
      });
  };
}

export function storeCategory(values) {
  return async (dispatch) => {
    await csrf();

    await axios
      .post("/api/categories", values)
      .then((response) => {
        dispatch(createCategory(response.data));
      })
      .catch((error) => {
        dispatch(
          createCategoryFailure(
            Object.values(error.response.data.errors).flat()
          )
        );
      });
  };
}

export function destroyCategory(id) {
  return async (dispatch) => {
    await csrf();

    await axios.delete(`/api/categories/${id}`).then((response) => {
      dispatch(deleteCategory(response.data));
    });
  };
}

export function updateCategory(id, values) {
  return async (dispatch) => {
    await csrf();

    await axios
      .put(`/api/categories/${id}`, values)
      .then((response) => {
        dispatch(editCategory(response.data));
      })
      .catch((error) => {
        dispatch(editCategoryFailure(error.response.data));
      });
  };
}

export function storeWord(values) {
  return async (dispatch) => {
    await csrf();

    await axios
      .post("/api/words", values)
      .then((response) => {
        dispatch(createWord(response.data));
      })
      .catch((error) => {
        if (error.response?.status !== 422) throw error;

        dispatch(
          createWordFailure(Object.values(error.response.data.errors).flat())
        );
      });
  };
}
