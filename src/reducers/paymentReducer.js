import { types } from "../types/types";
const initialState = {
  data: [],
};

export const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.clientPayment:
      return {
        data: action.payload,
      };
    default:
      return state;
  }
};
