import { handleSales, handleGetSalesConsolidate } from "../helpers/handlers";
import { types } from "../types/types";
import history from "../helpers/history";

export const loadReports = (token, date, fecha) => {
  return async (dispatch) => {
    try {
      const { data } = await handleSales(token, date, fecha);
      // console.log(data.data, "data.data");
      // console.log(data, "data total");

      if (fecha === "M" && data.data !== undefined) {
        dispatch(reportsMonth(data.data));
      } else if (fecha === "M" && data.data === undefined) {
        dispatch(reportsMonth({ rankOfTime: date, listMonths: [] }));
      } else if (fecha === "D" && data.data !== undefined) {
        dispatch(reportsDays(data.data));
      } else if (fecha === "D" && data.data === undefined) {
        dispatch(reportsDays({ rankOfTime: date, listDays: [] }));
      }
    } catch (error) {
      console.log(error);
      history.push("/error");
    }
  };
};
export const loadSales = (token, date, fecha) => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetSalesConsolidate(token, date, fecha);
      dispatch(sales(data.data));
      // console.log(data);
    } catch (error) {
      console.log(error);
      history.push("/error");
    }
  };
};

const reportsMonth = (data) => ({
  type: types.BusinessReportsMonth,
  payload: { rank: data.rankOfTime, listMonth: data.listMonths },
});
const reportsDays = (data) => ({
  type: types.BusinessReportsDays,
  payload: { rank: data.rankOfTime, listDays: data.listDays },
});

const sales = (data) => ({
  type: types.BusinessReportsSales,
  payload: { list: data },
});
