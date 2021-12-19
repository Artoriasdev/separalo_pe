import { types } from "../types/types";

export const shoppingCarDone = (payload) => ({
  type: types.shoppingCarItemsPayed,
  payload,
});
