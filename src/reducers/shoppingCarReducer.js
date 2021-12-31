import { types } from "../types/types";
const initialState = {
  shoppingCarItems: [],
};

export const shoppingCarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.shoppingCarItemsAdd:
      return {
        ...state,
        shoppingCarItems: [...state.shoppingCarItems, ...action.payload],
      };
    case types.shoppingCarItemsLoad:
      return {
        ...state,
        shoppingCarItems: action.payload,
      };
    case types.shoppingCarItemsPayed:
      localStorage.removeItem("Car Items");
      return {
        ...state,
        shoppingCarItems: [],
      };
    case types.shoppingCarRemoveItems:
      console.log(action.payload);
      const items = state.shoppingCarItems.filter(
        (item) => item.codeReservation !== action.payload
      );
      if (items.length === 0) {
        localStorage.removeItem("Car Items");
      }
      return {
        ...state,
        shoppingCarItems: items,
      };

    case types.shoppingCarDiscount:
      return {
        ...state,
        shoppingCarItems: state.shoppingCarItems.map((item) =>
          item.titleService === "Chancha 69"
            ? { ...item, discount: action.payload }
            : item
        ),
      };

    default:
      return state;
  }
};
