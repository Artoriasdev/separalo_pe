import { handleGetTerms } from "../helpers/handlers";
import { types } from "../types/types";
import { modalOpen } from "./modal";

export const termsLoad = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetTerms(id);
      dispatch(terms(data.data));
    } catch (error) {
      console.log(error);
      dispatch(
        modalOpen(
          "Ha ocurrido un error porfavor refresque la pagina o vuelva a intentarlo luego"
        )
      );
    }
  };
};

const terms = (data) => ({
  type: types.termsLoad,
  payload: data,
});
