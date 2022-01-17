import {
  handleRegisterBusiness,
  handleRegisterCustomer,
} from "../helpers/handlers";
import { modalErr, modalOpen, modalRedirect } from "./modal";

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
      dispatch(modalErr());
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
      dispatch(modalErr());
    }
  };
};
