import { handleGetReservationByOrderId } from "../helpers/handlers";
import { types } from "../types/types";
import { modalErr } from "./modal";

export const shoppingCarCompleted = (cod, token) => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetReservationByOrderId(cod, token);
      if (data.response === "true") {
        dispatch(shoppingCarDone(data.data));
      }
    } catch (error) {
      console.log(error);
      dispatch(modalErr());
    }
  };
};

const shoppingCarDone = (payload) => ({
  type: types.shoppingCarItemsPayed,
  payload,
});
