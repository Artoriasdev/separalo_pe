import React, { useEffect } from "react";
// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
// import Typography from "@material-ui/core/Typography";
// import axios from "axios";
// import {
//   Backdrop,
//   Button,
//   Fade,
//   InputAdornment,
//   MenuItem,
//   Modal,
//   Paper,
//   TextField,
// } from "@material-ui/core";
// import Banner from "../components/BannerCategory";
import { MyModal } from "../components/Modal";
import { MySearchHomeInput } from "../components/Fields";
import { useDispatch, useSelector } from "react-redux";
import { loadSearch } from "../actions/search";
import { loadBusinessCategorys } from "../actions/categoryByBusiness";
import { useParams } from "react-router";
// import { Search } from "@material-ui/icons";

export const MenuBusinessCategory = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { categorysByBusiness } = useSelector(
    (state) => state.categoryBusiness
  );
  var values;

  const handleInputChange = ({ target }) => {
    const val = target.value;
    values = val;
    dispatch(loadSearch(values));
  };
  console.log(categorysByBusiness);

  useEffect(() => {
    dispatch(loadBusinessCategorys(params.value));
  }, [dispatch, params.value]);

  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     typeBusiness: [],
  //     category: [],
  //     identificadorName: "",
  //     enterprises: [],
  //     modal: false,
  //     message: "",
  //   };
  // }

  // componentDidMount() {
  //   if (sessionStorage.getItem("workflow") === "B") {
  //     this.props.history.push("/business/category");
  //   } else {
  //     try {
  //       (async () => {
  //         this.handleGetCategorys();
  //         await this.handleGetBusinessByCategory();
  //       })();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }

  // handleGetCategorys = () => {
  //   var headers = {
  //     "Content-Type": "application/json",
  //     Accept: "application/json",
  //     Authorization: "",
  //   };

  //   let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/category/getCategories`;

  //   const rspApi = axios
  //     .get(linkDocumentsApi, {
  //       headers: headers,
  //     })
  //     .then((response) => {
  //       const { data } = response.data;
  //       const category = data.find(
  //         (typeCategory) =>
  //           typeCategory.id === JSON.parse(this.props.match.params.value)
  //       );
  //       this.setState({
  //         category: category,
  //       });
  //       console.log(category);

  //       return response;
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       this.setState({
  //         modal: true,
  //         message:
  //           "Ha ocurrido un error, porfavor refresque la página o intentelo más tarde",
  //       });
  //     });
  //   return rspApi;
  // };

  // handleRedirect = (id) => {
  //   this.props.history.push(
  //     `/services-menu-category/${id}/${this.props.match.params.value}`
  //   );
  // };

  // handleClose = () => {
  //   this.setState({
  //     modal: false,
  //   });
  // };

  return (
    <>
      <MyModal />
      {/* <Banner
        image={this.state.category.imageBig}
        name={this.state.category.name}
        description={this.state.category.description}
      /> */}
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
          {/* {this.state.typeBusiness &&
            this.state.typeBusiness.map(({ id, tradename, logo }) => (
              <Card className="card-container" key={id}>
                <CardMedia
                  image={logo}
                  title={tradename}
                  className="card-media"
                />

                <CardContent className="card-content">
                  <Typography gutterBottom variant="h5" component="h2">
                    {tradename}
                  </Typography>
                </CardContent>

                <Button
                  size="large"
                  color="primary"
                  variant="contained"
                  className="btn_card"
                  style={{
                    margin: "0.5px 0",
                    textTransform: "none",
                  }}
                  fullWidth
                  onClick={() => this.handleRedirect(id)}
                >
                  Ver servicios
                </Button>
              </Card>
            ))} */}
        </div>
      </div>
    </>
  );
};
