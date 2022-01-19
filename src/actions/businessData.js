import { handleGetDataBusiness } from "../helpers/handlers";
import { types } from "../types/types";
import history from "../helpers/history";

export const businessData = (token) => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetDataBusiness(token);

      dispatch(business(...data.data));
    } catch (error) {
      console.log(error);
      history.push("/error");
    }
  };
};

export const business = (data) => ({
  type: types.businessData,
  payload: data,
});
