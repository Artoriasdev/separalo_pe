import {
  handleGetReservationByOrderId,
  handleGetReservationByOrderIdInvited,
} from "../helpers/handlers";
import { types } from "../types/types";
import history from "../helpers/history";
import { paymentDone } from "./payment";
import { checkShoppingItems, checkShoppingItemsInvited } from "./shoppingCar";

export const shoppingCarCompleted = (cod, token) => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetReservationByOrderId(cod, token);
      if (data.response === "true") {
        dispatch(shoppingCarDone(data.data));
        dispatch(checkShoppingItems(token));
        history.push("/reservations-completed");
        dispatch(paymentDone());
      }
    } catch (error) {
      console.log(error);
      history.push("/error");
    }
  };
};

export const shoppingCarInvitedCompleted = (cod, email) => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetReservationByOrderIdInvited(cod);
      if (data.response === "true") {
        dispatch(shoppingCarDone(data.data));
        dispatch(checkShoppingItemsInvited(email));
        history.push("/reservations-completed");
        dispatch(paymentDone());
      }
    } catch (error) {
      console.log(error);
      history.push("/error");
    }
  };
};

const shoppingCarDone = (payload) => ({
  type: types.shoppingCarItemsPayed,
  payload,
});
