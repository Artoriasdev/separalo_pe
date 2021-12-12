import { types } from "../types/types";
const initialState = {
  dataBank: [],
};

export const businessDataBankReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.businessDataBank:
      return {
        dataBank: [action.payload],
      };
    case types.clientLogout:
      return {
        dataBank: [],
      };

    default:
      return state;
  }
};
