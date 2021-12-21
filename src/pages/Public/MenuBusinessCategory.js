import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import { MyModal } from "../../components/Modal";
import { PublicBusiness } from "../../components/PublicBusiness";
import { MySearchHomeInput } from "../../components/Fields";
import { loadSearch } from "../../actions/search";
import { loadBusinessCategorys } from "../../actions/categoryByBusiness";
import Banner from "../../components/BannerCategory";
import { PublicBusinessMobile } from "../../components/PublicBusinessMobile";

export const MenuBusinessCategory = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { categorysByBusiness } = useSelector(
    (state) => state.categoryBusiness
  );
  const cat = useSelector((state) => state.category.categorys);

  const category = cat.find(
    (typeCategory) => typeCategory.id === JSON.parse(params.value)
  );
  var values;

  const [windowWith, setWindowWith] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", function (event) {
      setWindowWith(window.innerWidth);
    });
  }, [windowWith]);

  const handleInputChange = ({ target }) => {
    const val = target.value;
    values = val;
    dispatch(loadSearch(values));
  };

  useEffect(() => {
    dispatch(loadBusinessCategorys(params.value));
  }, [dispatch, params.value]);

  return (
    <>
      <MyModal />
      {category && (
        <Banner
          image={JSON.stringify(category.imageBig)}
          name={category.name}
          description={category.description}
        />
      )}
      <div className="page-container" style={{ margin: "0 auto" }}>
        <div className="home-container">
          <div className="home-text">
            <h1>Nuestros negocios</h1>

            <h3 className="register__subtitle">
              Al alcance de todos y a tan solo un click
            </h3>
          </div>
          <div className="home-search">
            <MySearchHomeInput
              label="Busca tus negocios"
              name="values"
              value={values}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flip-container">
          {windowWith > 768 ? (
            <PublicBusiness
              typeBusiness={categorysByBusiness}
              category={params.value}
            />
          ) : (
            <PublicBusinessMobile
              typeBusiness={categorysByBusiness}
              category={params.value}
            />
          )}
        </div>
      </div>
    </>
  );
};
