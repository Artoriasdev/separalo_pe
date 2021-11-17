import { types } from "../types/types";
const initialState = {
  categorysByServices: [],
};

export const categorysByServices = (state = initialState, action) => {
  switch (action.type) {
    case types.loadServicesByCategory:
      return {
        ...state,
        categorysByServices: [...action.payload],
      };

    default:
      return state;
  }
};
