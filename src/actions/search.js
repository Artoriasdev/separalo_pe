import { handleGetBusinessByFilter } from "../helpers/handlers";
import { types } from "../types/types";
import history from "../helpers/history";

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
      history.push("/error");
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
