import { handleGetDistrics } from "../helpers/handlers";
import { types } from "../types/types";
import { modalOpen } from "./modal";

export const districs = (id) => {
  return async (dispatch) => {
    try {
      console.log(id);
      const { data } = await handleGetDistrics(id);
      console.log(data);
      dispatch(loadDistrics(data.data));
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

export const loadDistrics = (data) => ({
  type: types.districsLoaded,
  payload: {
    districs: data,
  },
});
