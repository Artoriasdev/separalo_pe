import { handleGetTerms } from "../helpers/handlers";
import { types } from "../types/types";
import history from "../helpers/history";

export const termsLoad = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetTerms(id);
      dispatch(terms(data.data));
    } catch (error) {
      console.log(error);
      history.push("/error");
    }
  };
};

const terms = (data) => ({
  type: types.termsLoad,
  payload: data,
});
