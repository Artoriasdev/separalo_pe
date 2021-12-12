import { handleGetDocuments } from "../helpers/handlers";
import { types } from "../types/types";
import { modalOpen } from "./modal";

export const documents = () => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetDocuments();
      dispatch(loadDocuments(data.data));
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

export const loadDocuments = (data) => ({
  type: types.documentsLoaded,
  payload: {
    documents: data,
  },
});
