import { types } from "../types/types";
import { modalOpen } from "./modal";

export const checkShoppingItems = () => {
  return async (dispatch) => {
    try {
      if (localStorage.getItem("Car Items") !== null) {
        const { shoppingCarItems } = JSON.parse(
          localStorage.getItem("Car Items")
        );
        if (shoppingCarItems.length > 0) {
          var oneMinute = 1000 * 60 * 10;
          for (let i = 0; i < shoppingCarItems.length; i++) {
            if (new Date().getTime() - shoppingCarItems[i].time > oneMinute) {
              shoppingCarItems[i].state = "Caducado";
            }
          }
          dispatch(shoppingCarLoad(shoppingCarItems));
        } else if (shoppingCarItems.length < 1) {
          localStorage.removeItem("Car Items");
        }
      }
    } catch (error) {
      console.log(error);
      dispatch(modalOpen(""));
    }
  };
};

export const addItemCar = (item) => {
  return async (dispatch) => {
    try {
      const identifiers = {
        time: new Date().getTime(),
        discount: 0,
      };

      const itemsAdded = Object.assign(item[0], identifiers);
      dispatch(shoppingCar([itemsAdded]));
    } catch (error) {
      console.log(error);
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

export const shoppingCarDeleteItems = (items) => ({
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
