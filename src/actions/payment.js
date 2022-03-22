import {
  handleCreatePayment,
  handleCreatePaymentInvited,
} from "../helpers/handlers";
import { types } from "../types/types";
import { modalOpen } from "./modal";
import history from "../helpers/history";
import { finishChecking } from "./checking";

export const payment = (token, cupon) => {
  return async (dispatch) => {
    try {
      const { data } = await handleCreatePayment(token, cupon);
      if (data.response === "true") {
        dispatch(paymentData(data.data));
        dispatch(finishChecking());
        history.push("/payment");
      } else if (data.response === "false") {
        dispatch(modalOpen(data.message));
      }
    } catch (error) {
      dispatch(finishChecking());
      console.log(error);
      history.push("/error");
    }
  };
};

export const paymentInvited = (email, cupon) => {
  return async (dispatch) => {
    try {
      const { data } = await handleCreatePaymentInvited(email, cupon);
      if (data.response === "true") {
        console.log(data);
        dispatch(paymentData(data.data));
        dispatch(finishChecking());
        history.push("/payment");
      } else if (data.response === "false") {
        dispatch(modalOpen(data.message));
      }
    } catch (error) {
      dispatch(finishChecking());
      console.log(error);
      history.push("/error");
    }
  };
};

const paymentData = (data) => ({
  type: types.clientPayment,
  payload: data,
});

export const paymentDone = () => ({
  type: types.clientPaymentCompleted,
});
