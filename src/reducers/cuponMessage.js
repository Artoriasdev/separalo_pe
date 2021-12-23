import { types } from "../types/types";
const initialState = {
  show: false,
  valid: false,
  message: "",
};

export const cuponMessage = (state = initialState, action) => {
  switch (action.type) {
    case types.cuponValid:
      return {
        show: true,
        valid: true,
        message: action.payload,
      };
    case types.cuponInvalid:
      return {
        show: true,
        valid: false,
        message: action.payload,
      };

    case types.cuponEmpty:
      return {
        show: false,
        valid: false,
        message: "",
      };
    default:
      return state;
  }
};
