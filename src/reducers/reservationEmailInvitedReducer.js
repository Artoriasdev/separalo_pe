import { types } from "../types/types";
const initialState = {
  email: "",
};

export const reservationEmailInvitedReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case types.saveEmail:
      return {
        email: action.payload,
      };
    case types.deleteEmail:
      return {
        email: "",
      };
    default:
      return state;
  }
};
