import { types } from "../types/types";
const initialState = {
  opened: false,
  message: "",
};

export const dialogReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.dialogOpen:
      return {
        opened: action.payload.boolean,
        message: action.payload.message,
      };
    case types.dialogClose:
      return {
        opened: false,
        message: "",
      };

    default:
      return state;
  }
};
