import { types } from "../types/types";
const initialState = {
  update: false,
  message: "",
  opened: false,
};

export const banksUpdateReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.banksUpdate:
      return {
        update: true,
        message: action.payload,
        opened: true,
      };
    case types.banksUpdateFinish:
      return {
        update: false,
        message: "",
        opened: false,
      };

    default:
      return state;
  }
};
