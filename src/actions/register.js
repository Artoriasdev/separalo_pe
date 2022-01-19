import {
  handleRegisterBusiness,
  handleRegisterCustomer,
} from "../helpers/handlers";
import { modalOpen, modalRedirect } from "./modal";
import history from "../helpers/history";

export const registerCustomer = (CustomerModel) => {
  return async (dispatch) => {
    try {
      const { data } = await handleRegisterCustomer(CustomerModel);
      if (data.response === "true") {
        dispatch(modalOpen(data.message));
        dispatch(modalRedirect());
      } else if (data.response === "false") {
        dispatch(modalOpen(data.message));
      }
    } catch (error) {
      console.log(error);
      history.push("/error");
    }
  };
};
export const registerBusiness = (BusinessModel) => {
  return async (dispatch) => {
    try {
      const { data } = await handleRegisterBusiness(BusinessModel);
      console.log(data);
      if (data.response === "true") {
        dispatch(modalOpen(data.message));
        dispatch(modalRedirect());
      } else if (data.response === "false") {
        dispatch(modalOpen(data.message));
      }
    } catch (error) {
      console.log(error);
      history.push("/error");
    }
  };
};
