import { handleGetBusinessByCategory } from "../helpers/handlers";
import { types } from "../types/types";
import { modalOpen } from "./modal";

export const loadBusinessCategorys = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetBusinessByCategory(id);
      dispatch(loadCategory(data));
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

export const loadCategory = (category) => ({
  type: types.loadBusinessByCategory,
  payload: [...category.data],
});
