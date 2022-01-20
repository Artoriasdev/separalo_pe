import { types } from "../types/types";
import history from "../helpers/history";
import { checkShoppingItemsInvited } from "./shoppingCar";

export const checkEmailReservation = () => {
  return async (dispatch) => {
    const mail = localStorage.getItem("email") || "";
    try {
      if (mail !== "" && mail !== null) {
        dispatch(emailReservation(mail));
        dispatch(checkShoppingItemsInvited(mail));
      }
    } catch (error) {
      console.log(error);
      history.push("/error");
    }
  };
};

export const emailReservation = (email) => ({
  type: types.saveEmail,
  payload: email,
});

export const deleteServiceFinish = () => ({
  type: types.deleteEmail,
});
