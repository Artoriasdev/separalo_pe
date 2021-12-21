import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";

// import Container from "../Modal/Container/Container";

import { Breadcrumbs, Link } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";
import { loadCategorys } from "../../actions/category";

import { MyModal } from "../../components/Modal";

export const BusinessCategory = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { categorys } = useSelector((state) => state.category);

  useEffect(() => {
    if (categorys.length === 0) {
      dispatch(loadCategorys());
    }
  }, [dispatch, categorys.length]);

  const handleRedirect = (id) => {
    history.push(`/business/services-category/${id}`);
  };

  const handleClick = (id) => {
    switch (id) {
      case 1:
        history.push("/");
        break;
      case 2:
        history.push("/business/category");
        break;
      default:
        break;
    }
  };

  return (
    <div className="page-container" style={{ padding: "0" }}>
      <MyModal />
      <div className="category">
        <Breadcrumbs
          separator={<NavigateNext fontSize="medium" />}
          aria-label="breadcrumb"
          className="font"
        >
          <Link
            color="textPrimary"
            style={{ cursor: "pointer", textDecoration: "none" }}
            onClick={() => handleClick(1)}
          >
            Inicio
          </Link>
          <Link
            color="textSecondary"
            style={{ cursor: "pointer", textDecoration: "none" }}
            onClick={() => handleClick(2)}
          >
            Categorías
          </Link>
        </Breadcrumbs>
        <h1>Categorías</h1>
        {/* <div>
            <h3
              style={{ marginTop: "30px", marginBottom: "5px" }}
              className="register__subtitle"
            >
              Si no ubicas tu categoría, ingresa a cuál perteneces.
            </h3>
            <TextField
              className="TxtField"
              name="searchText"
              placeholder="¿Qué estás buscando?"
              variant="standard"
              label="Buscador"
              style={{ margin: "0 20px 20px 0", width: "40%" }}
            />

            <Button
              size="large"
              color="primary"
              variant="contained"
              className="btn-primary"
              style={{ margin: "5px 0" }}
              type="submit"
            >
              Buscar
            </Button>
          </div> */}

        {/* <Container
            triggerText={this.state.triggerText}
            history={this.props.history}
          /> */}

        <div className="category-container">
          <ul>
            {categorys &&
              categorys.map(({ id, image, logo, name }) => (
                <li key={id} onClick={() => handleRedirect(id)}>
                  <div
                    style={{
                      backgroundImage: `url(${image})`,
                    }}
                    className="card"
                  >
                    <div className="container">
                      <span className="svg">
                        <img src={logo} alt={name} title={name} />
                      </span>
                      <span className="name">
                        <p>{name}</p>
                      </span>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
