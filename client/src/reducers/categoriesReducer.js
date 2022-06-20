import {
  CREATE_CATEGORY,
  CREATE_CATEGORY_ERROR,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
  EDIT_CATEGORY_ERROR,
  GET_CATEGORIES,
  GET_CATEGORY,
  GET_CATEGORY_ERROR,
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
    case GET_CATEGORY:
      return {
        ...state,
        data: action.payload.data,
        message: null,
        errors: null,
      };
    case GET_CATEGORY_ERROR:
      return {
        ...state,
        errors: action.payload,
        message: null,
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
    case EDIT_CATEGORY:
      return {
        ...state,
        data: action.payload.data,
        message: action.payload.message,
        errors: null,
      };
    case EDIT_CATEGORY_ERROR:
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
