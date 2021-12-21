import React, { useState } from "react";
import { useHistory } from "react-router";

import { Breadcrumbs, Link, MenuItem, Select } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";

import VerticalBar from "../../components/VerticalBar";
import { MyModal } from "../../components/Modal";

export const BusinessReports = () => {
  const history = useHistory();

  const [fecha, setFecha] = useState("");
  const [ventas, setVentas] = useState(0);

  const handleDocumentChange = (e) => {
    const value = e.target.value;
    const formField = e.target.name;
    if (formField === "fecha") {
      setFecha(value);
    } else if (formField === "venta") {
      setVentas(value);
    }
  };

  const handleClick = (id) => {
    switch (id) {
      case 1:
        history.push("/");
        break;
      case 2:
        history.push("/business/reports");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <MyModal />
      <div className="page-container" style={{ padding: 0 }}>
        <Breadcrumbs
          separator={<NavigateNext fontSize="medium" />}
          aria-label="breadcrumb"
          className="font"
        >
          <Link
            color="textPrimary"
            style={{ cursor: "pointer", textDecoration: "none" }}
            onClick={() => handleClick(2)}
          >
            Inicio
          </Link>
          <Link
            color="textSecondary"
            style={{ cursor: "pointer", textDecoration: "none" }}
            onClick={() => handleClick(2)}
          >
            Mis Reportes
          </Link>
        </Breadcrumbs>
        <h1>Mis reportes</h1>
        <h3 className="register__subtitle">
          Estos son los reportes obtenidos hasta la fecha <br />
          Podrá ver los resultados diarios, semanales y mensuales
        </h3>
        <div>
          <div className="vertical-bar">
            <div className="files">
              <div className="txt-left-nomid">
                <p>Resultado por :</p>
                <Select
                  value={fecha}
                  name="fecha"
                  onChange={handleDocumentChange}
                  required
                  variant="outlined"
                  fullWidth
                  displayEmpty
                >
                  <MenuItem selected={true} disabled value={""}>
                    Seleccione
                  </MenuItem>
                  <MenuItem value={"D"}>Días</MenuItem>
                  {/* <MenuItem value={"S"}>Semanas</MenuItem>  */}
                  <MenuItem value={"M"}>Meses</MenuItem>
                </Select>
              </div>
              <div className="txt-right-nomid">
                <p>Tipo:</p>
                <Select
                  value={ventas}
                  name="venta"
                  onChange={handleDocumentChange}
                  required
                  variant="outlined"
                  fullWidth
                  displayEmpty
                >
                  <MenuItem selected={true} disabled value={0}>
                    Seleccione
                  </MenuItem>
                  <MenuItem value={1}>Cantidad</MenuItem>
                  <MenuItem value={2}>Ventas</MenuItem>
                </Select>
              </div>
            </div>
          </div>

          <VerticalBar fecha={fecha} venta={ventas} />
        </div>
      </div>
    </>
  );
};
