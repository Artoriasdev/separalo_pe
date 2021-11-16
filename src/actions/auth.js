import {
  handleCheckCustomer,
  handleCheckDataBusiness,
  handleLogin,
} from "../helpers/handlers";
import { types } from "../types/types";
import { finishChecking, startChecking } from "./checking";
import { modalOpen } from "./modal";

export const login = (infoLogin, workflow) => {
  return async (dispatch) => {
    try {
      dispatch(startChecking());
      const info = await handleLogin(infoLogin);
      console.log(info);
      if (info.data.response === "false") {
        dispatch(modalOpen(info.data.message));
        dispatch(finishChecking());
      } else if (info.data.response === "true") {
        const { data } = info.data;
        dispatch(loginSync(data, workflow));
        localStorage.setItem("data", JSON.stringify(data));
        localStorage.setItem("workflow", JSON.stringify(workflow));
        dispatch(finishChecking());
      }
    } catch (error) {
      console.log(error);
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
    dispatch(logoutSync());
  };
};
