import { types } from "../types/types";
const initialState = {
  terms: [],
};

export const termsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.termsLoad:
      return {
        ...state,
        terms: action.payload,
      };
    default:
      return state;
  }
};
