import { handleGetPromotionalAds } from "../helpers/handlers";
import { types } from "../types/types";
import history from "../helpers/history";

export const loadBanners = () => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetPromotionalAds();

      dispatch(adds(data));
    } catch (error) {
      console.log(error);
      history.push("/error");
    }
  };
};

const adds = (banners) => ({
  type: types.BannerAdds,
  payload: [...banners.data],
});
