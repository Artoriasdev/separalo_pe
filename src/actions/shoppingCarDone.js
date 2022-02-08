import {
  handleGetReservationByOrderId,
  handleGetReservationByOrderIdInvited,
} from "../helpers/handlers";
import { types } from "../types/types";
import history from "../helpers/history";
import { paymentDone } from "./payment";

export const shoppingCarCompleted = (cod, token) => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetReservationByOrderId(cod, token);
      if (data.response === "true") {
        dispatch(shoppingCarDone(data.data));
        history.push("/reservations-completed");
        dispatch(paymentDone());
      }
    } catch (error) {
      console.log(error);
      history.push("/error");
    }
  };
};

export const shoppingCarInvitedCompleted = (cod) => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetReservationByOrderIdInvited(cod);
      if (data.response === "true") {
        dispatch(shoppingCarDone(data.data));
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
