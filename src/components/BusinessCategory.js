import React from "react";
import { Component } from "react";
import Axios from "axios";
import Container from "../Modal/Container/Container";
import { Button, TextField } from "@material-ui/core";

class BusinessMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typeCategorys: [],
      triggerText: "Agregar categoria",
    };
  }

  componentDidMount() {
    try {
      this.handleGetCategorys();
    } catch (e) {
      console.log(e);
    }
  }

  handleGetCategorys = () => {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    };

    let linkDocumentsApi =
      "http://separalo-core.us-east-2.elasticbeanstalk.com/api/separalo-core/category/getCategories";

    const rspApi = Axios.get(linkDocumentsApi, {
      headers: headers,
    }).then((response) => {
      const { data } = response.data;
      this.setState({
        typeCategorys: data,
      });

      return response;
    });
  };

  render() {
    return (
      <div>
        <div style={{ marginLeft: "20px" }}>
          <h3>Inicio &gt; Categorias </h3>
        </div>
        <div style={{ marginLeft: "20px" }}>
          <h2>Categorias</h2>
          <h4>Ingresa la categoría que deseas buscar</h4>
        </div>

        <form style={{ marginLeft: "20px" }}>
          <TextField
            className="TxtField"
            name="searchText"
            placeholder="¿Qué estás buscando?"
            variant="standard"
            label="Buscador"
            style={{ margin: "0 20px 20px 0", width: "80vh" }}
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
        </form>

        {/* aqui va el container */}
        <Container triggerText={this.state.triggerText} />

        <ul>
          {this.state.typeCategorys &&
            this.state.typeCategorys.map(({ id, image, logo, name }) => (
              <li
                key={id}
                style={{ display: "inline-block", position: "relative" }}
              >
                <a
                  style={{
                    backgroundImage: `url(${image})`,
                    textDecoration: "none",
                  }}
                  className="card"
                  href="#"
                >
                  <div
                    style={{
                      width: "100%",
                      display: "block",
                      textAlign: "center",
                      background: "rgba(0, 0, 0, 0.3)",
                      paddingTop: "80px",
                    }}
                  >
                    <span
                      style={{
                        borderRadius: "50%",
                        backgroundColor: "#ffdd00",
                        paddingTop: "35px",
                        paddingLeft: "8px",
                        paddingRight: "8px",
                        paddingBottom: "5px",
                      }}
                    >
                      <img src={logo} alt={name} title={name} />
                    </span>
                    <span>
                      <p
                        style={{
                          color: "#ffff",
                          marginTop: "15px",
                          padding: "0px",
                          fontSize: "18px",
                        }}
                      >
                        {name}
                      </p>
                    </span>
                  </div>
                </a>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default BusinessMenu;
