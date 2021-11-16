import { types } from "../types/types";
const initialState = {
  categorysByBusiness: [],
};

export const categorysByBusiness = (state = initialState, action) => {
  switch (action.type) {
    case types.loadBusinessByCategory:
      return {
        ...state,
        categorysByBusiness: [...action.payload],
      };

    default:
      return state;
  }
};
