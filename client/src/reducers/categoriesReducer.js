import {
  CREATE_CATEGORY,
  CREATE_CATEGORY_ERROR,
  GET_CATEGORIES,
} from "../actions/types";

const INITIAL_STATE = {
  errors: null,
  message: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      delete state["message"];
      delete state["errors"];
      return { ...state, data: action.payload.data };
    case CREATE_CATEGORY:
      let newState = Object.assign({}, state);

      newState.data.push(action.payload.data);
      newState.message = action.payload.message;

      delete newState["errors"];

      return newState;
    case CREATE_CATEGORY_ERROR:
      delete state["message"];
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
