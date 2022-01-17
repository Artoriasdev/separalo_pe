import { handleGetDocuments } from "../helpers/handlers";
import { types } from "../types/types";
import { modalErr } from "./modal";

export const documents = () => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetDocuments();
      dispatch(loadDocuments(data.data));
    } catch (error) {
      console.log(error);
      dispatch(modalErr());
    }
  };
};

export const loadDocuments = (data) => ({
  type: types.documentsLoaded,
  payload: {
    documents: data,
  },
});
