import { types } from "../types/types";
const initialState = {
  serviceId: [],
  serviceDate: [],
};

export const servicesById = (state = initialState, action) => {
  switch (action.type) {
    case types.serviceById:
      return {
        ...state,
        serviceId: [...action.payload.serviceId],
        serviceDate: [...action.payload.serviceDate],
      };

    default:
      return state;
  }
};
