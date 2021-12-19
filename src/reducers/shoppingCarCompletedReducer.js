import { types } from "../types/types";
const initialState = {
  shoppingDetails: [],
};

export const shoppingCarCompletedReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.shoppingCarItemsPayed:
      return {
        ...state,
        shoppingDetails: [...action.payload],
      };

    default:
      return state;
  }
};
