import { types } from "../types/types";

export const modalOpen = (message) => ({
  type: types.modalOpen,
  payload: message,
});
export const modalClose = () => ({
  type: types.modalClose,
});
