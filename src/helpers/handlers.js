import axios from "axios";

export const handleLogin = async (LoginModel) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "",
  };
  let linkLoginApi = `${process.env.REACT_APP_PATH_SERVICE}/user/authenticate`;

  const rspApi = axios
    .post(linkLoginApi, LoginModel, {
      headers: headers,
    })
    .then((response) => {
      return response;
    })
    .catch(({ response }) => {
      return response;
    });
  return rspApi;
};

export const handleGetDataCustomer = (tk) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${tk}`,
  };

  let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/customer/getCustomer`;

  const rspApi = axios
    .get(linkDocumentsApi, {
      headers: headers,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
  return rspApi;
};

export const handleCheckCustomer = () => {
  const data = JSON.parse(localStorage.getItem("data")) || "";
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${data.token}`,
  };

  let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/customer/getCustomer`;

  const rspApi = axios
    .get(linkDocumentsApi, {
      headers: headers,
    })
    .then((response) => {
      return response;
    })
    .catch(({ response }) => {
      return response;
    });
  return rspApi;
};

export const handleGetDataBusiness = async (tk) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${tk}`,
  };

  let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/business/getBusiness`;

  const rspApi = await axios
    .get(linkDocumentsApi, {
      headers: headers,
    })
    .then((response) => {
      // if (response.data.response === "true") {
      //   const { data } = response.data;
      //   console.log(data);
      //   sessionStorage.setItem("tradename", data[0].name);
      //   this.setState({
      //     typeData: data,
      //     logo: data[0].logo,
      //     name: data[0].name,
      //   });
      //   sessionStorage.setItem("logo", this.state.typeData[0].logo);

      //   const Formik = this.form;
      //   Formik.setFieldValue("nombreCompañia", this.state.typeData[0].name);
      //   Formik.setFieldValue(
      //     "nombreComercial",
      //     this.state.typeData[0].tradename
      //   );
      //   Formik.setFieldValue(
      //     "numeroDocumento",
      //     this.state.typeData[0].documentNumber
      //   );
      //   Formik.setFieldValue("correo", this.state.typeData[0].email);
      // } else {
      //   this.setState({
      //     modal: true,
      //     message: "Usted no está autorizado para ver esta información",
      //     forceRedirect: true,
      //   });
      // }
      return response;
    })
    .catch(({ response }) => {
      return response;
      // const { status } = error.response;
      // if (status === 401) {
      //   sessionStorage.removeItem("tk");
      //   sessionStorage.removeItem("logo");
      //   sessionStorage.removeItem("logged");
      //   sessionStorage.removeItem("workflow");
      //   sessionStorage.removeItem("tradename");
      //   sessionStorage.removeItem("info");
      //   sessionStorage.removeItem("id");
      //   this.setState({
      //     modal: true,
      //     message: "Sesión expirada, porfavor vuelva a iniciar sesión",
      //     isLoading: false,
      //     forceRedirect: true,
      //   });
      // } else {
      //   this.setState({
      //     modal: true,
      //     message:
      //       "Ha ocurrido un error, porfavor refresque la página o intentelo más tarde",
      //   });
      // }
    });
  return rspApi;
};

export const handleCheckDataBusiness = async () => {
  const data = JSON.parse(localStorage.getItem("data")) || "";
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${data.token}`,
  };

  let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/business/getBusiness`;

  const rspApi = await axios
    .get(linkDocumentsApi, {
      headers: headers,
    })
    .then((response) => {
      return response;
    })
    .catch(({ response }) => {
      return response;
    });
  return rspApi;
};

export const handleGetTerms = (id) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "",
  };

  let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/generic/getTemplates/${id}`;

  const rspApi = axios
    .get(linkDocumentsApi, {
      headers: headers,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
  return rspApi;
};

export const handleGetCategorys = async () => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "",
  };

  let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/category/getCategories`;

  const rspApi = axios
    .get(linkDocumentsApi, {
      headers: headers,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
  return rspApi;
};

export const handleGetBusinessByFilter = async (name) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: ``,
  };

  let empresaApi = `${process.env.REACT_APP_PATH_SERVICE}/business/getBusinessByFilter/${name}`;

  const responseEmp = axios
    .get(empresaApi, {
      headers: headers,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });

  return responseEmp;
};

export const handleGetBusinessByCategory = (cat) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "",
  };

  let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/business/getBusinessByCategory/${cat}`;

  const rspApi = axios
    .get(linkDocumentsApi, {
      headers: headers,
    })
    .then((response) => {
      return response;
    })
    .catch(({ response }) => {
      return response;
    });
  return rspApi;
};

// handleLogin = async (LoginModel) => {
//   var headers = {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//     Authorization: "",
//   };
//   let linkLoginApi = `${process.env.REACT_APP_PATH_SERVICE}/user/authenticate`;

//   const rspApi = axios
//     .post(linkLoginApi, LoginModel, {
//       headers: headers,
//     })
//     .then((response) => {
//       this.setState({
//         isLoading: true,
//       });
//       if (response.data.response === "true") {
//         sessionStorage.setItem("tk", response.data.data.token);
//         sessionStorage.setItem("logged", response.data.response);
//         sessionStorage.setItem(
//           "info",
//           JSON.stringify(response.data.data.listMenu)
//         );
//         sessionStorage.setItem("workflow", LoginModel.workflow);

//         if (LoginModel.workflow === "B") {
//           setTimeout(() => {
//             this.setState({
//               isLoading: false,
//             });
//             this.props.history.push("/business/category");
//             this.props.history.go();
//           }, 500);
//         }

//         if (LoginModel.workflow === "C") {
//           this.handleGetDataCustomer();
//           if (localStorage.getItem("reserve") === "true") {
//             this.props.history.push(`/reserve/${localStorage.getItem("id")}`);
//             localStorage.removeItem("reserve");
//             localStorage.removeItem("id");
//             this.props.history.go();
//           } else {
//             setTimeout(() => {
//               this.setState({
//                 isLoading: false,
//               });
//               this.props.history.go();
//               this.props.history.push("/");
//             }, 500);
//           }
//         }
//       }
//       console.log(response);
//       return response;
//     })
//     .catch(({ response }) => {
//       console.log(response);
//       if (response.data.response === "false") {
//         this.setState({
//           modal: true,
//           message: response.data.message,
//         });
//       } else {
//         this.setState({
//           modal: true,
//           message:
//             "Ha ocurrido un error, porfavor refresque la página o intentelo más tarde",
//         });
//       }
//     });
//   return rspApi;
// };
