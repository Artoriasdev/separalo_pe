import { types } from "../types/types";
const initialState = {
  provincesList: [],
};

export const provincesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.provincesLoaded:
      return {
        ...state,
        provincesList: [...action.payload.provinces],
      };

    default:
      return state;
  }
};
