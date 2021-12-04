import { handleGetServicesByBusiness } from "../helpers/handlers";
import { types } from "../types/types";
import { modalOpen } from "./modal";

export const loadServicesCategorys = (id, cat) => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetServicesByBusiness(id, cat);

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
  type: types.loadServicesByCategory,
  payload: [...category.data],
});
