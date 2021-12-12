import { types } from "../types/types";
const initialState = {
  banksType: [],
};

export const banksAccountTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.loadBanksType:
      return {
        banksType: action.payload,
      };
    case types.clientLogout:
      return {
        banksType: [],
      };

    default:
      return state;
  }
};
