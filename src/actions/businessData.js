import { handleGetDataBusiness } from "../helpers/handlers";
import { types } from "../types/types";
import { modalOpen } from "./modal";

export const businessData = (token) => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetDataBusiness(token);

      dispatch(business(...data.data));
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

export const business = (data) => ({
  type: types.businessData,
  payload: data,
});
