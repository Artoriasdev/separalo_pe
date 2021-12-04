import { handleGetCategorys } from "../helpers/handlers";
import { types } from "../types/types";
import { modalOpen } from "./modal";

export const loadCategorys = () => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetCategorys();
      dispatch(category(data));
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

export const category = (category) => ({
  type: types.loadCategory,
  payload: [...category.data],
});
