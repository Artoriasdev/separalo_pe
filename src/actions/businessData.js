import { handleGetDataBusiness } from "../helpers/handlers";
import { types } from "../types/types";
import { modalErr } from "./modal";

export const businessData = (token) => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetDataBusiness(token);

      dispatch(business(...data.data));
    } catch (error) {
      console.log(error);
      dispatch(modalErr());
    }
  };
};

export const business = (data) => ({
  type: types.businessData,
  payload: data,
});
