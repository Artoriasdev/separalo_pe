import {
  handleDeleteShoppingCartItem,
  handleDeleteShoppingCartItemInvited,
  handleGetShoppingCart,
  handleGetShoppingCartInvited,
  handleValidateCoupon,
  handleValidateCouponInvited,
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
        dispatch(checkShoppingItems(token));
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
        dispatch(checkShoppingItemsInvited(email));
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

export const shoppingDiscountInvited = (email, code) => {
  return async (dispatch) => {
    try {
      const { data } = await handleValidateCouponInvited(email, code);
      if (data.response === "true") {
        dispatch(cuponValid(code, data.message));
        dispatch(shoppingCarLoad(data.data));
      } else if (data.response === "false") {
        dispatch(cuponInvalid(data.message));
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
};
export const shoppingDiscount = (code, token) => {
  return async (dispatch) => {
    try {
      const { data } = await handleValidateCoupon(code, token);
      if (data.response === "true") {
        dispatch(cuponValid(code, data.message));
        dispatch(shoppingCarLoad(data.data));
      } else if (data.response === "false") {
        dispatch(cuponInvalid(data.message));
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
};

const cuponValid = (code, message) => ({
  type: types.cuponValid,
  payload: { message: message, coupon: code },
});
const cuponInvalid = (message) => ({
  type: types.cuponInvalid,
  payload: message,
});

export const cuponClear = () => ({
  type: types.cuponEmpty,
});
