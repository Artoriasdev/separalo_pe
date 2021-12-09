import { types } from "../types/types";
const initialState = {
  servicesList: [],
};

export const servicesList = (state = initialState, action) => {
  switch (action.type) {
    case types.loadServiceList:
      return {
        ...state,
        servicesList: [...action.payload],
      };

    default:
      return state;
  }
};
