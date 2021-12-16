import { types } from "../types/types";
const initialState = {
  serviceData: [],
};

export const serviceForEditReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.serviceForEditData:
      return {
        serviceData: action.payload,
      };

    default:
      return state;
  }
};
