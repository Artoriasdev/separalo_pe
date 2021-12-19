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
      return {
        ...state,
        shoppingCarItems: [],
      };
    case types.shoppingCarRemoveItems:
      const items = state.shoppingCarItems.filter(
        (item) => !action.payload.includes(item.codeReservation)
      );
      return {
        ...state,
        shoppingCarItems: items,
      };

    default:
      return state;
  }
};
