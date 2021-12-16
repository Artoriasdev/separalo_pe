import { handleGetBusinessByFilter } from "../helpers/handlers";
import { types } from "../types/types";
import { modalOpen } from "./modal";

export const loadSearch = (value) => {
  return async (dispatch) => {
    try {
      if (value.length > 2) {
        const { data } = await handleGetBusinessByFilter(value);
        dispatch(search(data));
      } else if (value.length <= 2) {
        dispatch(cleanSearch());
      }
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

export const search = (business) => ({
  type: types.searchBusiness,
  payload: [...business.data],
});

export const cleanSearch = () => ({
  type: types.searchClean,
});
