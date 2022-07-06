import { combineReducers } from "redux";
import authReducer from "./auth";
// import usersReducer from "./usersReducer";
// import followersReducer from "./followersReducer";
// import followingReducer from "./followingReducer";
// import categoriesReducer from "./categoriesReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  // users: usersReducer,
  // followers: followersReducer,
  // following: followingReducer,
  // categories: categoriesReducer,
});

export default rootReducer;
