import { types } from "../types/types";
const initialState = {
  reservationConfirm: [],
  reservationHistory: [],
};

export const reservationList = (state = initialState, action) => {
  switch (action.type) {
    case types.reservationConfirmList:
      return {
        ...state,
        reservationConfirm: [...action.payload.reservationConfirm],
      };
    case types.reservationHistoryList:
      return {
        ...state,
        reservationHistory: [...action.payload.reservationHistory],
      };
    default:
      return state;
  }
};
