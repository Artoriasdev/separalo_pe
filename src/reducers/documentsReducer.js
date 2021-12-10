import { types } from "../types/types";
const initialState = {
  documentsList: [],
};

export const documentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.documentsLoaded:
      return {
        ...state,
        documentsList: [...action.payload.documents],
      };

    default:
      return state;
  }
};
