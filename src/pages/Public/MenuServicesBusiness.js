import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router";

import Banner from "../../components/BannerBusiness";
import { MyModal } from "../../components/Modal";
import { loadServicesCategorys } from "../../actions/categoryByServices";
import { FlipServices } from "../../components/FlipServices";
import { RatingService } from "../../helpers/RatingService";
import { FlipServicesMobile } from "../../components/FlipServicesMobile";

export const MenuServicesBusiness = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const { categorysByServices } = useSelector(
    (state) => state.categoryServices
  );

  const [windowWith, setWindowWith] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", function (event) {
      setWindowWith(window.innerWidth);
    });
  }, [windowWith]);

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
        />
      )}

      <div className="page-container" style={{ width: "90%", margin: " auto" }}>
        <div className="logo-container-services">
          <img
            src={categorysByServices[0] && categorysByServices[0].logoBusiness}
            alt="logo"
          />
          <h1>
            {categorysByServices[0] && categorysByServices[0].tradenameBusiness}
          </h1>
          <RatingService rate={5} style={{ marginTop: "5px" }} />
        </div>
        <div style={{ width: "100%", marginBottom: "30px" }}>
          <div className="service">
            <div className="service-description">
              <h3>
                {categorysByServices[0] &&
                  categorysByServices[0].businessAddress}
              </h3>
              <p style={{ opacity: "0.8", marginTop: "0" }}>
                {categorysByServices[0] &&
                  categorysByServices[0].businessDescription}
              </p>
            </div>
          </div>
        </div>
        <div className="flip-container">
          {windowWith > 768 ? (
            <FlipServices
              typeCategorys={categorysByServices}
              businessId={params.id}
              categoryId={params.category}
            />
          ) : (
            <FlipServicesMobile typeCategorys={categorysByServices} />
          )}
        </div>
      </div>
    </>
  );
};
