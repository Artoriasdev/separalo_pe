import {
  handleCheckCustomer,
  handleCheckDataBusiness,
  handleLogin,
} from "../helpers/handlers";
import { types } from "../types/types";
import { finishChecking, startChecking } from "./checking";
import { modalOpen } from "./modal";
import history from "../helpers/history";

export const login = (infoLogin, workflow) => {
  return async (dispatch) => {
    try {
      dispatch(startChecking());
      const info = await handleLogin(infoLogin);
      if (info.data.response === "false") {
        dispatch(modalOpen(info.data.message));
        dispatch(finishChecking());
      } else if (info.data.response === "true") {
        const { data } = info.data;
        dispatch(loginSync(data, workflow));
        if (localStorage.getItem("log_invited") === "true") {
          history.push(
            `/customer/reserve/${localStorage.getItem(
              "service_id"
            )}/${localStorage.getItem("business_id")}/${localStorage.getItem(
              "category_id"
            )}`
          );
          localStorage.removeItem("service_id");
          localStorage.removeItem("business_id");
          localStorage.removeItem("category_id");
          localStorage.removeItem("log_invited");
        } else if (localStorage.getItem("email_registered") !== null) {
          if (localStorage.getItem("email_registered") === infoLogin.username) {
            history.push(
              `/customer/reserve/${localStorage.getItem(
                "service_id"
              )}/${localStorage.getItem("business_id")}/${localStorage.getItem(
                "category_id"
              )}`
            );
          } else {
            history.push("/");
          }
          localStorage.removeItem("service_id");
          localStorage.removeItem("business_id");
          localStorage.removeItem("category_id");
          localStorage.removeItem("email_registered");
        }

        localStorage.setItem("data", JSON.stringify(data));
        localStorage.setItem("workflow", JSON.stringify(workflow));
        dispatch(finishChecking());
      }
    } catch (error) {
      console.log(error);
      history.push("/error");
    }
  };
};

export const checkAuth = () => {
  return async (dispatch) => {
    const workflow = JSON.parse(localStorage.getItem("workflow")) || "";
    try {
      if (workflow === "C") {
        const { data } = await handleCheckCustomer();
        if (data.response === "true") {
          const login = JSON.parse(localStorage.getItem("data"));
          dispatch(loginSync(login, workflow));
          dispatch(finishChecking());
        } else {
          localStorage.removeItem("data");
          localStorage.removeItem("workflow");
          dispatch(finishChecking());
        }
      } else if (workflow === "B") {
        const { data } = await handleCheckDataBusiness();
        if (data.response === "true") {
          const login = JSON.parse(localStorage.getItem("data"));
          dispatch(loginSync(login, workflow));
          dispatch(finishChecking());
        } else {
          dispatch(finishChecking());
          localStorage.removeItem("data");
          localStorage.removeItem("workflow");
        }
      } else {
        dispatch(finishChecking());
      }
    } catch (error) {
      console.log(error);
      history.push("/error");
    }
  };
};

export const loginSync = (data, workflow) => ({
  type: types.clientLoging,
  payload: { data, workflow },
});

export const logoutSync = () => ({ type: types.clientLogout });

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("data");
    localStorage.removeItem("workflow");
    dispatch(startChecking());
    setTimeout(() => {
      try {
        dispatch(logoutSync());
        dispatch(finishChecking());
      } catch (error) {
        console.log(error);
        dispatch(finishChecking());
        history.push("/error");
      }
    }, 1000);
  };
};
