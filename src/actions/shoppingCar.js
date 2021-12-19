import { types } from "../types/types";

export const checkShoppingItems = () => {
  return async (dispatch) => {
    try {
      if (localStorage.getItem("Car Items") !== null) {
        const { shoppingCarItems } = JSON.parse(
          localStorage.getItem("Car Items")
        );
        if (shoppingCarItems.length > 0) {
          dispatch(shoppingCarLoad(shoppingCarItems));
        } else if (shoppingCarItems.length < 1) {
          localStorage.removeItem("Car Items");
        }
      }
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
