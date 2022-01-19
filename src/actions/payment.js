import { handleCreatePayment } from "../helpers/handlers";
import { types } from "../types/types";
import { modalOpen } from "./modal";
import history from "../helpers/history";

export const payment = (token) => {
  return async (dispatch) => {
    try {
      const { data } = await handleCreatePayment(token);
      if (data.response === "true") {
        console.log(data);
        dispatch(paymentData(data.data));
      } else if (data.response === "false") {
        dispatch(modalOpen(data.message));
      }
    } catch (error) {
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
