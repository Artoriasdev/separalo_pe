import { types } from "../types/types";
const initialState = {
  banks: [],
};

export const banksReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.loadBanks:
      return {
        banks: action.payload,
      };
    case types.clientLogout:
      return {
        banks: [],
      };

    default:
      return state;
  }
};
