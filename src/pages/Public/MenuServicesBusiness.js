import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router";

import Banner from "../../components/BannerBusiness";
import { MyModal } from "../../components/Modal";
import { loadServicesCategorys } from "../../actions/categoryByServices";
import { FlipServices } from "../../components/FlipServices";

export const MenuServicesBusiness = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const { categorysByServices } = useSelector(
    (state) => state.categoryServices
  );

  useEffect(() => {
    try {
      console.log(JSON.parse(params.id), JSON.parse(params.category));
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

      <div
        className="page-container"
        style={{ padding: "50px 0 0 0 ", width: "90%", margin: " auto" }}
      >
        <div className="flip-container">
          <FlipServices typeCategorys={categorysByServices} />
        </div>
      </div>
    </>
  );
};
