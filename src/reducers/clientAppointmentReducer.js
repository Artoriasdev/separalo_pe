import { types } from "../types/types";
const initialState = {
  data: [],
};

export const clientAppointment = (state = initialState, action) => {
  switch (action.type) {
    case types.clientAppointments:
      return {
        data: action.payload,
      };
    case types.clientLogout:
      return {
        data: [],
      };

    default:
      return state;
  }
};
