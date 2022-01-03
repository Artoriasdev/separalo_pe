import {
  handleUploadBannerBusiness,
  handleUploadLogoBusiness,
} from "../helpers/handlers";
import { types } from "../types/types";
import { modalOpen } from "./modal";

export const logoUpload = (file, token) => {
  return async (dispatch) => {
    try {
      const { data } = await handleUploadLogoBusiness(file, token);
      if (data.response === "true") {
        dispatch(upload(data.message));
      } else {
        console.log(data);
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
export const bannerUpload = (file, token) => {
  return async (dispatch) => {
    try {
      const { data } = await handleUploadBannerBusiness(file, token);
      if (data.response === "true") {
        dispatch(upload(data.message));
      } else {
        console.log(data);
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

export const upload = (message) => ({
  type: types.imageUploaded,
  payload: message,
});
export const finish = () => ({
  type: types.imageUploadedFinished,
});
