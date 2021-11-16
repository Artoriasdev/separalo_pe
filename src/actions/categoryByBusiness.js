import { handleGetBusinessByCategory } from "../helpers/handlers";
import { types } from "../types/types";

export const loadBusinessCategorys = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetBusinessByCategory(id);
      dispatch(loadCategory(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const loadCategory = (category) => ({
  type: types.loadBusinessByCategory,
  payload: [...category.data],
});
