import { types } from "../types/types";
const initialState = {
  categorys: [],
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.loadCategory:
      return {
        ...state,
        categorys: [...action.payload],
      };

    default:
      return state;
  }
};
