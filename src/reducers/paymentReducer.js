import { types } from "../types/types";
const initialState = {
  token: "",
};

export const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.clientPayment:
      return {
        token: action.payload,
      };
    default:
      return state;
  }
};
