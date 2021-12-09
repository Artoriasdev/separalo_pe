import { handleGetList } from "../helpers/handlers";
import { types } from "../types/types";
import { modalOpen } from "./modal";

export const serviceList = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetList(id);
      dispatch(list(data.data));
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

export const list = (list) => ({
  type: types.loadServiceList,
  payload: [...list],
});
