import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "../reducers/authReducer";
import { categoryReducer } from "../reducers/categoryReducer";
import { checkingReducer } from "../reducers/checkingReducer";
import { dialogReducer } from "../reducers/dialogReducer";
import { modalReducer } from "../reducers/modalReducer";
import { searchReducer } from "../reducers/searchReducer";
import { categorysByBusiness } from "../reducers/categoryByBusiness";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const reducers = combineReducers({
  category: categoryReducer,
  search: searchReducer,
  modal: modalReducer,
  dialog: dialogReducer,
  auth: authReducer,
  checking: checkingReducer,
  categoryBusiness: categorysByBusiness,
});

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
