import "animate.css";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// import { useHistory } from "react-router";

import { ItemCarousel } from "../../components/CarouselItem";
import { MyModal } from "../../components/Modal";
import Carousel from "../../components/Carousel";
import trb2 from "../../assets/images/trabaja con nosotros 1325 x 325.jpg";
import trb4 from "../../assets/images/Transforma tu negocio 273 x 271.jpg";
import { MySearchHomeInput } from "../../components/Fields";
import { loadSearch } from "../../actions/search";
import { ItemCategory } from "../../components/ItemCategory";
import { loadBanners } from "../../actions/banner";

export const HomePage = () => {
  // const history = useHistory();

  const { categorys } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [windowWith, setWindowWith] = useState(window.innerWidth);
  var values;

  useEffect(() => {
    window.addEventListener("resize", function (event) {
      setWindowWith(window.innerWidth);
    });
  }, [windowWith]);

  useEffect(() => {
    dispatch(loadBanners());
  }, []);

  const handleInputChange = ({ target }) => {
    const val = target.value;
    values = val;
    dispatch(loadSearch(values));
  };

  return (
    <div>
      <MyModal />

      <Carousel />
      <div className="page-container">
        <div className="home-container">
          <div>
            {categorys &&
              categorys.map(({ id, logo, name }) =>
                logo !== undefined ? (
                  <img key={id} id={id} src={logo} alt={name} />
                ) : null
              )}
          </div>
          <div className="home-text">
            <h1>Nuestras categorías</h1>

            <h3 className="register__subtitle">
              Encuentra el servicio que estás buscando y sepáralo donde estés
              con toda seguridad
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
        <br />
        <div className="carousel">
          {windowWith > 500 ? <ItemCarousel /> : <ItemCategory />}
        </div>

        {windowWith > 1200 ? (
          <a
            href="https://wa.link/oki91a"
            target="_blank"
            rel="noreferrer"
            style={{
              cursor: "pointer",
              marginLeft: "50px",
              marginRight: "50px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={trb2}
              alt="Trabaja con nosotros"
              title="Trabaja con nosotros"
              style={{
                width: "100%",
                height: "100%",
                marginTop: "20px",
                maxWidth: "1325px",
                maxHeight: "325px",
              }}
            />
          </a>
        ) : (
          <a
            href="https://wa.link/oki91a"
            target="_blank"
            rel="noreferrer"
            style={{
              cursor: "pointer",
              marginLeft: "50px",
              marginRight: "50px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={trb4}
              alt="Trabaja con nosotros"
              title="Trabaja con nosotros"
              style={{
                width: "270px",
                height: "100%",
                marginLeft: window.innerWidth <= 360 ? "20px" : "0",
                marginTop: "20px",
                maxHeight: "325px",
              }}
            />
          </a>
        )}
      </div>
    </div>
  );
};
