import { handleGetProvinces } from "../helpers/handlers";
import { types } from "../types/types";
import { modalErr } from "./modal";

export const provinces = () => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetProvinces();
      dispatch(loadProvinces(data.data));
    } catch (error) {
      console.log(error);
      dispatch(modalErr());
    }
  };
};

export const loadProvinces = (data) => ({
  type: types.provincesLoaded,
  payload: {
    provinces: data,
  },
});
