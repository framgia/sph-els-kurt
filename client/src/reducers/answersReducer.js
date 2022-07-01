import {
  CREATE_ANSWER,
  CREATE_ANSWER_ERROR,
  GET_USER_ANSWERS,
  GET_USER_CATEGORY_ANSWERS,
} from "actions/types";

const INITIAL_STATE = {
  data: [],
  errors: null,
  message: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_ANSWER:
      return { ...state, data: action.payload.data };
    case CREATE_ANSWER_ERROR:
      return { ...state, errors: action.payload };
    case GET_USER_CATEGORY_ANSWERS:
      return { ...state, data: action.payload.data };
    case GET_USER_ANSWERS:
      return { ...state, data: action.payload.data };
    default:
      return state;
  }
};
