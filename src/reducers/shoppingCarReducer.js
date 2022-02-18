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
    // case types.shoppingCarItemsPayed:
    //   return {
    //     ...state,
    //     shoppingCarItems: [],
    //   };
    case types.shoppingCarRemoveItems:
      const items = state.shoppingCarItems.filter(
        (item) => item.preCodeReservation !== action.payload
      );
      console.log(action.payload);
      console.log("lista nueva reducer", items);
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
    case types.clientLogout:
      return {
        shoppingCarItems: [],
      };

    default:
      return state;
  }
};
