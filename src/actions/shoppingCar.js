import {
  handleDeleteShoppingCartItem,
  handleDeleteShoppingCartItemInvited,
  handleGetShoppingCart,
  handleGetShoppingCartInvited,
} from "../helpers/handlers";
import { types } from "../types/types";
import { modalOpen } from "./modal";
import history from "../helpers/history";

export const checkShoppingItems = (token) => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetShoppingCart(token);

      if (data.response === "true") {
        dispatch(shoppingCarLoad(data.data));
      } else if (data.response === "false") {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      history.push("/error");
    }
  };
};
export const checkShoppingItemsInvited = (email) => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetShoppingCartInvited(email);
      if (data.response === "true") {
        dispatch(shoppingCarLoad(data.data));
      } else if (data.response === "false") {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      history.push("/error");
    }
  };
};

export const shoppingCarDelete = (item, token) => {
  return async (dispatch) => {
    try {
      const { data } = await handleDeleteShoppingCartItem(item, token);
      console.log(data);
      if (data.response === "true") {
        dispatch(shoppingCarDeleteItems(item));
      } else if (data.response === "false") {
        dispatch(modalOpen(data.message));
      }
    } catch (error) {
      console.log(error);
      history.push("/error");
    }
  };
};

export const shoppingCarDeleteInvited = (email, code) => {
  return async (dispatch) => {
    try {
      const { data } = await handleDeleteShoppingCartItemInvited(email, code);
      if (data.response === "true") {
        dispatch(shoppingCarDeleteItems(code));
      } else if (data.response === "false") {
        dispatch(modalOpen(data.message));
      }
    } catch (error) {
      console.log(error);
      history.push("/error");
    }
  };
};

export const shoppingCar = (item) => ({
  type: types.shoppingCarItemsAdd,
  payload: item,
});

const shoppingCarLoad = (item) => ({
  type: types.shoppingCarItemsLoad,
  payload: item,
});

const shoppingCarDeleteItems = (items) => ({
  type: types.shoppingCarRemoveItems,
  payload: items,
});

export const shoppingCarItemsPayed = () => ({
  type: types.shoppingCarItemsPayed,
});

export const shoppingDiscount = (code) => {
  return async (dispatch) => {
    try {
      const codesList = [
        "SEPARALO01",
        "SEPARALO02",
        "SEPARALO03",
        "SEPARALO04",
      ];
      if (codesList.includes(code)) {
        dispatch(discount(3.0));
        dispatch(cuponValid("Este cupón es válido"));
      } else {
        dispatch(cuponInvalid("Este cupón es inválido"));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const discount = (amount) => ({
  type: types.shoppingCarDiscount,
  payload: amount,
});

const cuponValid = (message) => ({
  type: types.cuponValid,
  payload: message,
});
const cuponInvalid = (message) => ({
  type: types.cuponInvalid,
  payload: message,
});

export const cuponClear = () => ({
  type: types.cuponEmpty,
});
