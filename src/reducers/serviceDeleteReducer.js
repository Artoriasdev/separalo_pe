import { types } from "../types/types";
const initialState = {
  deleted: false,
};

export const serviceDeleteReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.serviceDelete:
      return {
        deleted: true,
      };
    case types.serviceDeleteFinish:
      return {
        deleted: false,
      };
    default:
      return state;
  }
};
