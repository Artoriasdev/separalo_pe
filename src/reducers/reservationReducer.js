import { types } from "../types/types";
const initialState = {
  reservationUser: [],
};

export const reservation = (state = initialState, action) => {
  switch (action.type) {
    case types.reservation:
      return {
        ...state,
        reservationUser: [...action.payload],
      };

    default:
      return state;
  }
};
