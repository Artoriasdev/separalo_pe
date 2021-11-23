import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// import { BackSide, Flippy, FrontSide } from "react-flippy";
// import { RatingService } from "../helpers/RatingService";
// import Banner from "../components/BannerBusiness";
import { MyModal } from "../components/Modal";
import { loadServicesCategorys } from "../actions/categoryByServices";
import { useParams } from "react-router";

export const MenuServicesBusiness = () => {
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(loadServicesCategorys(params.id, params.category));
  }, [dispatch, params.id, params.category]);

  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     typeCategorys: [],
  //     business: "",
  //     image: "",
  //     modal: false,
  //     message: "",
  //   };
  // }

  // componentDidMount() {
  //   if (sessionStorage.getItem("workflow") === "B") {
  //     this.props.history.push("/business/category");
  //   } else {
  //     try {
  //       this.handleGetServicesByBusiness();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }

  // handleGetServicesByBusiness = () => {
  //   const id = this.props.match.params.id;
  //   const cat = this.props.match.params.category;
  //   var headers = {
  //     "Content-Type": "application/json",
  //     Accept: "application/json",
  //     Authorization: "",
  //   };

  //   let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/service/getServicesByBusinessAndCategory/${id}/${cat}`;

  //   const rspApi = axios
  //     .get(linkDocumentsApi, {
  //       headers: headers,
  //     })
  //     .then((response) => {
  //       const { data } = response.data;
  //       console.log(data);

  //       this.setState({
  //         typeCategorys: data,
  //         business: data[0].tradenameBusiness,
  //         image: data[0].imageBig,
  //       });

  //       return response;
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       this.setState({
  //         modal: true,
  //         message:
  //           "Es posible que este negocio no tenga servicios dentro de esta categoría",
  //       });
  //     });

  //   return rspApi;
  // };

  // handleRedirect = (title, id) => {
  //   if (sessionStorage.getItem("tk") === null) {
  //     this.props.history.push(`/confirm/${title}/${id}`);
  //   } else {
  //     this.props.history.push(`/reserve/${id}`);
  //   }
  // };

  // handleClose = () => {
  //   this.setState({
  //     modal: false,
  //   });
  //   this.props.history.goBack();
  // };

  return (
    <>
      <h1>Hola</h1>
      <MyModal />
      {/* <Banner negocio={this.state.business} imagen={this.state.image} /> */}
      <div
        className="page-container"
        style={{ padding: "50px 0 0 0 ", width: "90%", margin: " auto" }}
      >
        <div className="flip-container">
          {/* {this.state.typeCategorys.map(
            ({ id, title, description, currencySymbol, price, duration }) => (
              <Flippy
                flipOnHover={true} // default false
                flipOnClick={false} // default false
                flipDirection="horizontal" // horizontal or vertical
                className="flip-card"
                key={id}
              >
                <FrontSide className="flip-card-background">
                  <div
                    className="flip-card-service"
                    style={{
                      height: "100%",
                    }}
                  >
                    <h3>{title}</h3>
                    <RatingService rate={5} />
                    <span>
                      <br></br>
                    </span>
                    <p className="text">Precio</p>
                    <div className="price">
                      {currencySymbol} {price}
                    </div>
                    <p className="font-p text">Duración : {duration}</p>
                  </div>
                </FrontSide>
                <BackSide className="flip-card-background">
                  <div
                    className="flip-card-service"
                    style={{
                      height: "92%",
                    }}
                  >
                    <h3>{title}</h3>
                    <h4 style={{ textAlign: "justify" }}>{description}</h4>
                    <p>Duración : {duration}</p>
                  </div>
                  <Button
                    size="large"
                    color="primary"
                    variant="contained"
                    className=" btn_card"
                    onClick={() => this.handleRedirect(title, id)}
                    fullWidth
                  >
                    Separar cita
                  </Button>
                </BackSide>
              </Flippy>
            )
          )} */}
        </div>
      </div>
    </>
  );
};
