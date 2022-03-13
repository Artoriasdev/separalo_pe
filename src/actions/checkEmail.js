import { handleValidateCustomer } from "../helpers/handlers";
import { types } from "../types/types";
import history from "../helpers/history";

export const validateEmail = (email, token) => {
  return async (dispatch) => {
    try {
      const { data } = await handleValidateCustomer(email, token);

      if (data.response === "true") {
        dispatch(verifiedEmail(data));
      } else if (data.response === "false") {
        dispatch(invitedEmail(data));
      }
    } catch (error) {
      console.log(error);
      history.push("/error");
    }
  };
};

const verifiedEmail = (payload) => (
  console.log(payload, "payload"),
  {
    type: types.emailClient,
    payload: {
      data: { ...payload.data },
      message: payload.message,
    },
  }
);

const invitedEmail = (payload) => ({
  type: types.emailInvited,
  payload: { message: payload.message },
});
export const reservationCompleted = () => ({
  type: types.Reserved,
});
