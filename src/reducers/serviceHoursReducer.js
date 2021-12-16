import { types } from "../types/types";
const initialState = {
  serviceHoursList: [],
};

export const serviceHoursReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.serviceHoursListLoad:
      return {
        ...state,
        serviceHoursList: [...action.payload],
      };

    default:
      return state;
  }
};
