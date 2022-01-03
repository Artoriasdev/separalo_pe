import { types } from "../types/types";
const initialState = {
  uploaded: false,
  response: "",
};

export const imageUpload = (state = initialState, action) => {
  switch (action.type) {
    case types.imageUploaded:
      return {
        uploaded: true,
        response: action.payload,
      };
    case types.imageUploadedFinished:
      return {
        uploaded: false,
        response: "",
      };

    default:
      return state;
  }
};
