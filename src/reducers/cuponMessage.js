import { types } from "../types/types";
const initialState = {
  show: false,
  valid: false,
  message: "",
  coupon: "noCoupon",
};

export const cuponMessage = (state = initialState, action) => {
  switch (action.type) {
    case types.cuponValid:
      return {
        show: true,
        valid: true,
        message: action.payload.message,
        coupon: action.payload.coupon,
      };
    case types.cuponInvalid:
      return {
        show: true,
        valid: false,
        message: action.payload,
        coupon: "noCoupon",
      };

    case types.cuponEmpty:
      return {
        show: false,
        valid: false,
        message: "",
        coupon: "noCoupon",
      };
    default:
      return state;
  }
};
