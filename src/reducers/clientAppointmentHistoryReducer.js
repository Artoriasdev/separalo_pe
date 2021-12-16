import { types } from "../types/types";
const initialState = {
  data: [],
};

export const clientAppointmentHistory = (state = initialState, action) => {
  switch (action.type) {
    case types.clientAppointmentsHistory:
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
