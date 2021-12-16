import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router";

import Banner from "../../components/BannerBusiness";
import { MyModal } from "../../components/Modal";
import { loadServicesCategorys } from "../../actions/categoryByServices";
import { FlipServices } from "../../components/FlipServices";
import { RatingService } from "../../helpers/RatingService";

export const MenuServicesBusiness = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const { categorysByServices } = useSelector(
    (state) => state.categoryServices
  );

  useEffect(() => {
    try {
      dispatch(loadServicesCategorys(params.id, params.category));
    } catch (error) {
      history.push("/");
    }
  }, [dispatch, params.id, params.category, history]);

  return (
    <>
      <MyModal />
      {categorysByServices[0] && (
        <Banner
          negocio={categorysByServices[0].businessName}
          imagen={JSON.stringify(categorysByServices[0].imageBig)}
          logo={categorysByServices[0].logoBusiness}
        />
      )}

      <div className="page-container" style={{ width: "90%", margin: " auto" }}>
        <div style={{ width: "100%", marginBottom: "30px" }}>
          <div className="service-description">
            <h1 style={{ marginRight: "30px", color: "black" }}>
              {categorysByServices[0] &&
                categorysByServices[0].tradenameBusiness}
            </h1>
            <RatingService rate={5} style={{ marginTop: "5px" }} />
            <h3>
              {categorysByServices[0] && categorysByServices[0].businessAddress}
            </h3>
          </div>
          <div>
            <p style={{ opacity: "0.8", margin: "0", padding: "0" }}>
              {categorysByServices[0] &&
                categorysByServices[0].businessDescription}
            </p>
          </div>
        </div>
        <div className="flip-container">
          <FlipServices typeCategorys={categorysByServices} />
        </div>
      </div>
    </>
  );
};
