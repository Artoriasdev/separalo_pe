import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

import { Breadcrumbs, Link } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";

import Container from "../../Modal/Container/ContainerService";
import { ServiceListTable } from "../../components/ServiceListTable";
import { serviceListByCategory } from "../../actions/serviceListByCategory";
import { MyModal } from "../../components/Modal";

export const BusinessServicesCategory = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const { servicesListByCategory } = useSelector(
    (state) => state.serviceListByCategory
  );
  const { token, id } = useSelector((state) => state.auth.data);

  const cat = useSelector((state) => state.category.categorys);

  const category = cat.find(
    (typeCategory) => typeCategory.id === JSON.parse(params.value)
  );

  const { redirect } = useSelector((state) => state.modal);
  // const { data } = useSelector((state) => state.auth);

  if (redirect) {
    history.go();
  }

  const handleClick = (id) => {
    switch (id) {
      case 1:
        history.push("/");
        break;
      case 2:
        history.push(`/business/services-category/${params.value}`);
        break;
      case 3:
        history.push(`/business/services-category/${params.value}`);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    dispatch(serviceListByCategory(id, params.value, token));
  }, [dispatch, params.value, token, id]);

  return (
    <>
      <MyModal />

      <div className="page-container" style={{ padding: "0" }}>
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
            color="textPrimary"
            style={{ cursor: "pointer", textDecoration: "none" }}
            onClick={() => handleClick(2)}
          >
            Mis servicios
          </Link>
          <Link
            color="textSecondary"
            style={{ cursor: "pointer", textDecoration: "none" }}
            onClick={() => handleClick(3)}
          >
            {category && category.name}
          </Link>
        </Breadcrumbs>

        <div
          className="form-profile"
          style={{ width: "100%", marginLeft: "0", flexDirection: "row" }}
        >
          <h1>Mis servicios</h1>

          <Container
            triggerText={"Agregar servicio"}
            value={params.value}
            history={history}
          />
        </div>

        <hr />

        <h3>Estos son los servicios que han sido registrados</h3>

        <ServiceListTable
          list={servicesListByCategory}
          page={2}
          params={params.value}
        />
      </div>
    </>
  );
};
