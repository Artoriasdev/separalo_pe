import { types } from "../types/types";
const initialState = {
  business: [],
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.searchBusiness:
      return {
        ...state,
        business: [...action.payload],
      };

    case types.searchClean:
      return {
        business: [],
      };

    default:
      return state;
  }
};
