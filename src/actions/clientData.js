import { handleGetDataCustomer } from "../helpers/handlers";
import { types } from "../types/types";
import history from "../helpers/history";

export const clientData = (token) => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetDataCustomer(token);

      dispatch(client(...data.data));
    } catch (error) {
      console.log(error);
      history.push("/error");
    }
  };
};

export const client = (data) => ({
  type: types.clientData,
  payload: data,
});
