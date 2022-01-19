import {
  handleUploadBannerBusiness,
  handleUploadLogoBusiness,
} from "../helpers/handlers";
import { types } from "../types/types";
import history from "../helpers/history";

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
      history.push("/error");
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
      history.push("/error");
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
