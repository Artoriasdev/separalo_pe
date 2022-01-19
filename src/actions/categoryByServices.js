import { handleGetServicesByBusiness } from "../helpers/handlers";
import { types } from "../types/types";
import history from "../helpers/history";

export const loadServicesCategorys = (id, cat) => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetServicesByBusiness(id, cat);

      dispatch(loadCategory(data));
    } catch (error) {
      console.log(error);
      history.push("/error");
    }
  };
};

export const loadCategory = (category) => ({
  type: types.loadServicesByCategory,
  payload: [...category.data],
});
