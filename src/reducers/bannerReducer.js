import { types } from "../types/types";
const initialState = {
  Adds: [],
};

export const bannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.BannerAdds:
      return {
        Adds: action.payload,
      };
    default:
      return state;
  }
};
