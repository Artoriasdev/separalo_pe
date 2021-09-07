import {
  Breadcrumbs,
  Button,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { NavigateNext } from "@material-ui/icons";
import Axios from "axios";
import React from "react";
import { Component } from "react";
import Container from "../Modal/Container/ContainerService";
import ModalError from "./ModalError";

class BusinessServicesCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      triggerText: "Agregar servicio",
      disclaimerModal: "",
      showModalError: false,
    };
  }

  componentDidMount() {
    try {
      const tk = sessionStorage.getItem("tk");
      var headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${tk}`,
      };

      let linkDocumentsApi =
        "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/business/getBusiness";

      const rspApi = Axios.get(linkDocumentsApi, {
        headers: headers,
      })
        .then((response) => {
          if (response.data.response === "true") {
            this.handleGetList();
          } else {
            this.setState({
              showModalError: true,
              disclaimerModal:
                "Usted no esta autorizado para ver esta información",
            });
          }

          return response;
        })
        .catch((error) => {
          const { status } = error.response;
          if (status === 401) {
            sessionStorage.removeItem("tk");
            sessionStorage.removeItem("logo");
            sessionStorage.removeItem("logged");
            sessionStorage.removeItem("workflow");
            sessionStorage.removeItem("tradename");
            sessionStorage.removeItem("info");
            sessionStorage.removeItem("id");
            this.setState({
              showModalError: true,
              disclaimerModal:
                "Sesión expirada, porfavor vuelva a iniciar sesión",
            });
          }
        });
      return rspApi;
    } catch (error) {
      console.log(error);
    }
  }

  handleGetList = () => {
    const id = sessionStorage.getItem("id");
    const cat = this.props.match.params.value;
    const tk = sessionStorage.getItem("tk");

    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${tk}`,
    };

    let linkDocumentsApi = `http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/service/getServicesByBusinessAndCategory/${id}/${cat}`;

    const rspApi = Axios.get(linkDocumentsApi, {
      headers: headers,
    }).then((response) => {
      const { data } = response.data;

      this.setState({
        dataList: data,
      });

      return response;
    });
    return rspApi;
  };

  toggleModalError = () => {
    this.setState({
      showModalError: false,
    });
    this.props.history.push("/login/B");
    this.props.history.go();
  };

  handleTemp = () => {
    this.props.history.push("/business/services/details");
  };

  handleEdit = (id) => {
    this.props.history.push(`/business/services/details/${id}`);
  };

  handleAppointment = (id) => {
    this.props.history.push(`/business/services/appointment/${id}`);
  };

  render() {
    return (
      <>
        <ModalError
          show={this.state.showModalError}
          closeCallback={this.toggleModalError}
        >
          <React.Fragment>
            <div
              dangerouslySetInnerHTML={{ __html: this.state.disclaimerModal }}
            />
          </React.Fragment>
        </ModalError>

        <div className="page-container" style={{ padding: "0" }}>
          <Breadcrumbs
            separator={<NavigateNext fontSize="medium" />}
            aria-label="breadcrumb"
            className="font"
          >
            <Link color="inherit" href="/">
              Inicio
            </Link>
            <Link
              color="textPrimary"
              href="/business/services"
              // onClick={handleClick}
            >
              Mis servicios
            </Link>
          </Breadcrumbs>
          <h1>Mis servicios</h1>
          <h3>Tus servicios</h3>
          <Container
            triggerText={this.state.triggerText}
            value={this.props.match.params.value}
            history={this.props.history}
          />

          <div style={{ display: "block" }}>
            <h3>Estos son los servicios que han sido registrados</h3>
          </div>

          <TableContainer className="table">
            <Table sx={{ minWidth: 650 }}>
              <TableHead className="table-head">
                <TableRow>
                  <TableCell className="font-tittle">Servicio</TableCell>
                  <TableCell className="font-tittle">Descripcion</TableCell>
                  <TableCell className="font-tittle">Duración</TableCell>
                  <TableCell className="font-tittle" width="12%">
                    Precio
                  </TableCell>
                  <TableCell className="font-tittle" align="center">
                    Citas
                  </TableCell>
                  <TableCell className="font-tittle" align="center">
                    Editar
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.dataList.map(
                  ({
                    id,
                    title,
                    description,
                    duration,
                    currencySymbol,
                    price,
                  }) => (
                    <TableRow key={id}>
                      <TableCell className="font">{title}</TableCell>
                      <TableCell className="font" width="30%">
                        {description}
                      </TableCell>
                      <TableCell className="font">{duration}</TableCell>
                      <TableCell className="font">
                        {currencySymbol + " " + price}
                      </TableCell>
                      <TableCell className="font" align="center">
                        <button
                          className="font"
                          onClick={() => this.handleAppointment(id)}
                        >
                          Ver citas pendientes
                        </button>
                      </TableCell>
                      <TableCell className="font" align="center">
                        <button
                          className="font"
                          onClick={() => this.handleEdit(id)}
                        >
                          Editar servicio
                        </button>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </>
    );
  }
}

export default BusinessServicesCategory;
