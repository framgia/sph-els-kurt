import {
  CREATE_CATEGORY,
  CREATE_CATEGORY_ERROR,
  DELETE_CATEGORY,
  GET_CATEGORIES,
} from "../actions/types";

const INITIAL_STATE = {
  data: [],
  errors: null,
  message: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        data: action.payload.data,
        message: null,
        errors: null,
      };
    case CREATE_CATEGORY:
      return {
        ...state,
        data: action.payload.data,
        message: action.payload.message,
        errors: null,
      };
    case CREATE_CATEGORY_ERROR:
      return { ...state, errors: action.payload, message: null };
    case DELETE_CATEGORY:
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload.data.id),
      };
    default:
      return state;
  }
};
