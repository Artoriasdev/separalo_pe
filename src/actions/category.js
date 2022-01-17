import { handleGetCategorys } from "../helpers/handlers";
import { types } from "../types/types";
import { modalErr } from "./modal";

export const loadCategorys = () => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetCategorys();
      dispatch(category(data));
    } catch (error) {
      console.log(error);
      dispatch(modalErr());
    }
  };
};

export const category = (category) => ({
  type: types.loadCategory,
  payload: [...category.data],
});
