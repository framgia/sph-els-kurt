import {
  EDIT_USER,
  EDIT_USER_ERROR,
  GET_USER,
  GET_USERS,
} from "../actions/types";

const INITIAL_STATE = {
  data: [],
  errors: null,
  message: null,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        data: action.payload.data,
        message: null,
        errors: null,
      };
    case GET_USER:
      return {
        ...state,
        data: action.payload.data,
        message: null,
        errors: null,
      };
    case EDIT_USER:
      return {
        ...state,
        data: action.payload.data,
        message: action.payload.message,
        errors: null,
      };
    case EDIT_USER_ERROR:
      return { ...state, errors: action.payload, message: null };
    default:
      return state;
  }
};
