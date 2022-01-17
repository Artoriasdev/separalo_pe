import { handleGetTerms } from "../helpers/handlers";
import { types } from "../types/types";
import { modalErr } from "./modal";

export const termsLoad = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetTerms(id);
      dispatch(terms(data.data));
    } catch (error) {
      console.log(error);
      dispatch(modalErr());
    }
  };
};

const terms = (data) => ({
  type: types.termsLoad,
  payload: data,
});
