import { handleGetCategoryComplaint } from "../helpers/handlers";
import { types } from "../types/types";
import { modalErr } from "./modal";

export const categoryComplaint = (value) => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetCategoryComplaint(value);
      dispatch(complaint(data.data));
    } catch (error) {
      console.log(error);
      dispatch(modalErr());
    }
  };
};

export const complaint = (payload) => ({
  type: types.categoryComplaintList,
  payload,
});
