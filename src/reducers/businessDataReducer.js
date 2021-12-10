import { types } from "../types/types";
const initialState = {
  data: [],
};

export const businessData = (state = initialState, action) => {
  switch (action.type) {
    case types.businessData:
      return {
        data: [action.payload],
      };
    case types.clientLogout:
      return {
        data: [],
      };

    default:
      return state;
  }
};
