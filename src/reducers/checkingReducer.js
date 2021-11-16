import { types } from "../types/types";
const initialState = {
  check: true,
};

export const checkingReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.startChecking:
      return {
        check: true,
      };
    case types.finishChecking:
      return {
        check: false,
      };

    default:
      return state;
  }
};
