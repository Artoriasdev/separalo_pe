import { handleSales, handleGetSalesConsolidate } from "../helpers/handlers";
import { types } from "../types/types";
import history from "../helpers/history";

export const loadReports = (token, date, fecha) => {
  return async (dispatch) => {
    try {
      const { data } = await handleSales(token, date, fecha);
      if (data.data.listMonths !== undefined) {
        dispatch(reportsMonth(data.data));
      } else if (data.data.listDays) {
        dispatch(reportsDays(data.data));
      }
      console.log(data);
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
      console.log(data);
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
