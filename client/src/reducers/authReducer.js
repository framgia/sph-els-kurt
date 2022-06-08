import {
  SIGN_IN,
  SIGN_IN_ERROR,
  REGISTER,
  REGISTER_ERROR,
  SIGN_OUT,
} from "../actions/types";

const localStore = () => {
  if (localStorage.getItem("user")) {
    return JSON.parse(localStorage.getItem("user"));
  } else {
    return false;
  }
};

const INITIAL_STATE = {
  isSignedIn: localStore().isSignedIn,
  user: localStore().user,
  errors: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...state,
          isSignedIn: true,
          user: action.payload,
          errors: {},
        })
      );

      return { ...state, isSignedIn: true, user: action.payload, errors: {} };
    case SIGN_IN_ERROR:
      return { ...state, errors: action.payload };
    case SIGN_OUT:
      localStorage.removeItem("user");

      return { ...state, isSignedIn: false, user: null };
    case REGISTER:
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...state,
          isSignedIn: true,
          user: action.payload,
          errors: {},
        })
      );

      return { ...state, isSignedIn: true, user: action.payload };
    case REGISTER_ERROR:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
