import { types } from "../types/types";
const initialState = {
  servicesListByCategory: [],
};

export const servicesListByCategory = (state = initialState, action) => {
  switch (action.type) {
    case types.loadServiceListCategory:
      return {
        ...state,
        servicesListByCategory: [...action.payload],
      };

    default:
      return state;
  }
};
