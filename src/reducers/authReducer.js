import { types } from "../types/types";
const initialState = {
  logged: false,
  data: [],
  workflow: "",
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.clientLoging:
      return {
        logged: true,
        data: action.payload.data,
        workflow: action.payload.workflow,
      };
    case types.clientLogout:
      return {
        logged: false,
        data: [],
        workflow: "",
      };

    default:
      return state;
  }
};
