import React from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Flippy, { FrontSide, BackSide } from "react-flippy";

import { cleanSearch } from "../actions/search";

export const ItemCategory = () => {
  const { categorys } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleRedirect = (id) => {
    dispatch(cleanSearch());
    history.push(`/services-menu/${id}`);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {categorys &&
        categorys.map(({ id, image, name, description }) => (
          <div className="flip-home" key={id}>
            <Flippy
              flipOnHover={true}
              flipOnClick={false}
              flipDirection="horizontal"
              className="flip-home-container"
            >
              <FrontSide
                className="flip-home-front"
                style={{
                  backgroundImage: `url(${image})`,
                }}
              ></FrontSide>
              <BackSide
                className="flip-home-back"
                onClick={() => handleRedirect(id)}
              >
                <div dangerouslySetInnerHTML={{ __html: description }} />
              </BackSide>
            </Flippy>
            <h3>{name}</h3>
          </div>
        ))}
    </div>
  );
};
