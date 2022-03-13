import { types } from "../types/types";
const initialState = {
  disabled: true,
  data: {},
  message: "",
};

export const checkEmail = (state = initialState, action) => {
  switch (action.type) {
    case types.emailClient:
      return {
        ...state,
        data: action.payload.data,
        message: action.payload.message,
        disabled: true,
      };
    case types.emailInvited:
      return {
        data: {},
        disabled: false,
        message: action.payload.message,
      };
    case types.Reserved:
      return {
        data: {},
        disabled: true,
        message: "",
      };
    default:
      return state;
  }
};
