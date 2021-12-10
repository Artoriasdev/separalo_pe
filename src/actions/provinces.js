import { handleGetProvinces } from "../helpers/handlers";
import { types } from "../types/types";
import { modalOpen } from "./modal";

export const provinces = () => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetProvinces();
      console.log(data);
      dispatch(loadProvinces(data.data));
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

export const loadProvinces = (data) => ({
  type: types.provincesLoaded,
  payload: {
    provinces: data,
  },
});