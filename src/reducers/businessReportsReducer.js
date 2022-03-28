import { types } from "../types/types";
const initialState = {
  rankOfTime: "",
  listMonth: [],
  listDays: [],
  sales: [],
};

export const businessReportsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.BusinessReportsMonth:
      return {
        ...state,
        rankOfTime: action.payload.rank,
        listMonth: action.payload.listMonth,
      };
    case types.BusinessReportsDays:
      return {
        ...state,
        rankOfTime: action.payload.rank,
        listDays: action.payload.listDays,
      };
    case types.BusinessReportsSales:
      return {
        ...state,
        sales: action.payload.list,
      };
    case types.BusinessReportsClear:
      return {
        rankOfTime: "",
        listMonth: [],
        listDays: [],
      };

    default:
      return state;
  }
};
