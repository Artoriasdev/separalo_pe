import { types } from "../types/types";
const initialState = {
  districsList: [],
};

export const districsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.districsLoaded:
      return {
        ...state,
        districsList: [...action.payload.districs],
      };

    default:
      return state;
  }
};
