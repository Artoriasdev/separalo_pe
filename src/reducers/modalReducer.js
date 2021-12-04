import { types } from "../types/types";
const initialState = {
  opened: false,
  message: "",
  redirect: false,
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.modalOpen:
      return {
        ...state,
        opened: true,
        message: action.payload,
      };
    case types.modalClose:
      return {
        ...state,
        opened: false,
        message: "",
      };
    case types.modalRedirect:
      return {
        ...state,
        redirect: true,
      };
    case types.modalRedirectDone:
      return {
        ...state,
        redirect: false,
      };

    default:
      return state;
  }
};
