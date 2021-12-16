import { types } from "../types/types";
const initialState = {
  serviceHoursAttentioList: [],
};

export const serviceHoursAttentionReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.serviceHoursAttentionLoad:
      return {
        ...state,
        serviceHoursAttentioList: [...action.payload],
      };

    default:
      return state;
  }
};
