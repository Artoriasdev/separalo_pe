import { types } from "../types/types";
const initialState = {
  opened: false,
  message: "",
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.modalOpen:
      return {
        opened: true,
        message: action.payload,
      };
    case types.modalClose:
      return {
        opened: false,
        message: "",
      };

    default:
      return state;
  }
};
