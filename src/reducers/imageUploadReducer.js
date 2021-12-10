import { types } from "../types/types";
const initialState = {
  redirect: false,
};

export const imageUpload = (state = initialState, action) => {
  switch (action.type) {
    case types.imageUploaded:
      return {
        redirect: true,
      };
    case types.imageUploadedFinished:
      return {
        redirect: false,
      };

    default:
      return state;
  }
};
