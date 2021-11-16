import { handleGetCategorys } from "../helpers/handlers";
import { types } from "../types/types";

export const loadCategorys = () => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetCategorys();
      dispatch(category(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const category = (category) => ({
  type: types.loadCategory,
  payload: [...category.data],
});
