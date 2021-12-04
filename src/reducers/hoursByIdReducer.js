import { types } from "../types/types";
const initialState = {
  hoursById: [],
};

export const hoursById = (state = initialState, action) => {
  switch (action.type) {
    case types.hoursById:
      return {
        ...state,
        hoursById: [...action.payload.hoursById],
      };

    default:
      return state;
  }
};
