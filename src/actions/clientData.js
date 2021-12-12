import { handleGetDataCustomer } from "../helpers/handlers";
import { types } from "../types/types";
import { modalOpen } from "./modal";

export const clientData = (token) => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetDataCustomer(token);

      dispatch(client(...data.data));
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

export const client = (data) => ({
  type: types.clientData,
  payload: data,
});
