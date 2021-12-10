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
      return response;
    })
    .catch(({ response }) => {
      return response;
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

export const handleGetServicesByBusiness = (id, cat) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "",
  };

  let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/service/getServicesByBusinessAndCategory/${id}/${cat}`;

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

export const handleGetServicesById = (id) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: ``,
  };

  let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/service/getServicesById/${id}`;

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

export const handleGetAvailableDateService = (id) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: ``,
  };

  let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/reservation/getAvailableDateService/${id}`;

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

export const handleGetAvailableScheduleService = (id, date) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: ``,
  };

  let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/reservation/getAvailableScheduleService/${id}/${date}`;

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

export const handleRegisterReservationInvited = (reserveModel) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: ``,
  };

  let linkRegisterApi = `${process.env.REACT_APP_PATH_SERVICE}/reservation/registerReservationInvited`;

  const rspApi = axios
    .post(linkRegisterApi, reserveModel, {
      headers: headers,
    })
    .then((response) => {
      // localStorage.setItem("data", JSON.stringify(data));
      // this.setState({ isLoading: true });

      // if (data.response === "true") {
      //   setTimeout(() => {
      //     this.setState({
      //       isLoading: false,
      //       modal: true,
      //       message: "¡Registro grabado satisfactoriamente!",
      //       response: true,
      //     });
      //   }, 500);
      // } else if (data.response === "false") {
      //   this.setState({
      //     modal: true,
      //     message: data.message,
      //     isLoading: false,
      //   });
      // }
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

export const handleGetList = (id) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "",
  };

  let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/service/getServicesByBusiness/${id}`;

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

export const handleGetListByCategory = (id, cat, tk) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${tk}`,
  };

  let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/service/getServicesByBusinessAndCategory/${id}/${cat}`;

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

export const handleGetServiceForEdit = (id, tk) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${tk}`,
  };

  let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/service/getServiceForEdit/${id}`;

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

export const handleGetReservationConfirmByBusiness = (id, tk) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${tk}`,
  };

  let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/reservation/getReservationConfirmByBusiness/${id}`;

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

export const handleGetReservationHistoryByBusiness = (id, tk) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${tk}`,
  };

  let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/reservation/getReservationHistoryByBusiness/${id}`;

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

export const handleUploadLogoBusiness = async (logo, tk) => {
  let data = new FormData();
  data.append("file", logo);
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${tk}`,
  };
  let linkEditApi = `${process.env.REACT_APP_PATH_SERVICE}/business/uploadLogoBusiness`;

  const rspApi = axios
    .post(linkEditApi, data, {
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
export const handleUploadBannerBusiness = async (banner, tk) => {
  let data = new FormData();
  data.append("file", banner);
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${tk}`,
  };
  let linkEditApi = `${process.env.REACT_APP_PATH_SERVICE}/business/uploadBannerBusiness?file`;

  const rspApi = axios
    .post(linkEditApi, data, {
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

export const handleEditDataBusiness = async (dataModel, tk) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${tk}`,
  };
  let linkEditApi = `${process.env.REACT_APP_PATH_SERVICE}/business/updateBusiness`;

  const rspApi = axios
    .put(linkEditApi, dataModel, {
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

export const handleGetDocuments = () => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "",
  };

  let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/generic/getDocumentTypes`;

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

export const handleGetProvinces = () => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "",
  };

  let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/generic/getProvinces`;

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

export const handleGetDistrics = (id) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "",
  };

  let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/generic/getDistricts/${id}`;

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
