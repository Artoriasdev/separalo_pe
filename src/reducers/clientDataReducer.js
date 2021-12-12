import { types } from "../types/types";
const initialState = {
  data: [],
};

export const clientData = (state = initialState, action) => {
  switch (action.type) {
    case types.clientData:
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
