import { types } from "../types/types";

export const modalOpen = (message) => ({
  type: types.modalOpen,
  payload: message,
});
export const modalClose = () => ({
  type: types.modalClose,
});

export const modalRedirect = () => ({
  type: types.modalRedirect,
});
export const modalRedirectFinished = () => ({
  type: types.modalRedirectDone,
});
export const modalErr = () => ({
  type: types.modalError,
});
export const modalErrClose = () => ({
  type: types.modalErrorClose,
});
