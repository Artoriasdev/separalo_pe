import { types } from "../types/types";
const initialState = {
  categoryComplaintList: [],
};

export const categoryComplaintReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.categoryComplaintList:
      return {
        categoryComplaintList: action.payload,
      };

    default:
      return state;
  }
};
