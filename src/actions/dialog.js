import { types } from "../types/types";

export const dialogOpen = (boolean, message) => ({
  type: types.dialogOpen,
  payload: {
    boolean,
    message,
  },
});
export const dialogClose = () => ({
  type: types.dialogClose,
});
