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
      return response;
    })
    .catch(({ response }) => {
      return response;
    });

  return rspApi;
};
export const handleRegisterReservationBusiness = (reserveModel, token) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  let linkRegisterApi = `${process.env.REACT_APP_PATH_SERVICE}/reservation/registerReservationBusiness`;

  const rspApi = axios
    .post(linkRegisterApi, reserveModel, {
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

export const handleRegisterBusinessBankData = async (BankModel, tk) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${tk}`,
  };
  let linkRegisterApi = `${process.env.REACT_APP_PATH_SERVICE}/business/registerBusinessBankData`;

  const rspApi = axios
    .post(linkRegisterApi, BankModel, {
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

export const handleUpdateBusinessBankData = async (bankModel, tk) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${tk}`,
  };
  let linkEditApi = `${process.env.REACT_APP_PATH_SERVICE}/business/updateBusinessBankData`;

  const rspApi = axios
    .put(linkEditApi, bankModel, {
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

export const handleGetBanks = () => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "",
  };

  let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/generic/getBanks`;

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

export const handleGetBanksAccountType = (id) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "",
  };

  let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/generic/getBanksAccountType/${id}`;

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

export const handleGetBusinessBankData = async (tk) => {
  try {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${tk}`,
    };

    let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/business/getBusinessBankData`;

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
  } catch (error) {
    console.log(error);
  }
};

export const handleUpdateCustomer = async (dataModel, tk) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${tk}`,
  };
  let linkEditApi = `${process.env.REACT_APP_PATH_SERVICE}/customer/updateCustomer`;

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

export const handleGetReservationByCustomer = (tk) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${tk}`,
  };

  let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/reservation/getReservationByCustomer`;

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

export const handleGetReservationHistoryByCustomer = (tk) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${tk}`,
  };

  let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/reservation/getReservationHistoryByCustomer`;

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

export const handleRegisterReservation = (reserveModel, tk) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${tk}`,
  };

  let linkRegisterApi = `${process.env.REACT_APP_PATH_SERVICE}/reservation/registerReservation`;

  const rspApi = axios
    .post(linkRegisterApi, reserveModel, {
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

export const handleGeneratePasswordRecovery = async (RecoveryModel) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "",
  };
  let linkLoginApi = `${process.env.REACT_APP_PATH_SERVICE}/user/generatePasswordRecovery`;

  const rspApi = axios
    .post(linkLoginApi, RecoveryModel, {
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

export const handleValidatePasswordRecovery = async (RecoveryModel) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "",
  };
  let linkLoginApi = `${process.env.REACT_APP_PATH_SERVICE}/user/validatePasswordRecovery`;

  const rspApi = axios
    .post(linkLoginApi, RecoveryModel, {
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

export const handlePasswordRestore = async (RecoveryModel) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "",
  };
  let linkLoginApi = `${process.env.REACT_APP_PATH_SERVICE}/user/passwordRestore`;

  const rspApi = axios
    .post(linkLoginApi, RecoveryModel, {
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

export const handleGetCategoryComplaint = (id) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "",
  };

  let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/complaint/getCategoryComplaint/${id}`;

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

export const handleRegisterComplaint = (complainModel) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: ``,
  };

  let linkRegisterApi = `${process.env.REACT_APP_PATH_SERVICE}/complaint/registerComplaint`;

  const rspApi = axios
    .post(linkRegisterApi, complainModel, {
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

export const handleRegisterCustomer = (CustomerModel) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "",
  };

  let linkRegisterApi = `${process.env.REACT_APP_PATH_SERVICE}/customer/registerCustomer`;

  const rspApi = axios
    .post(linkRegisterApi, CustomerModel, {
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

export const handleRegisterBusiness = async (BusinessModel) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "",
  };
  let linkRegisterApi = `${process.env.REACT_APP_PATH_SERVICE}/business/registerBusiness`;

  const rspApi = axios
    .post(linkRegisterApi, BusinessModel, {
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

export const handleChangePassword = (passwordModel, tk) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${tk}`,
  };
  let linkEditApi = `${process.env.REACT_APP_PATH_SERVICE}/user/passwordChange`;

  const rspApi = axios
    .post(linkEditApi, passwordModel, {
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

export const handleGetHoursAttentionService = () => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "",
  };

  let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/service/getHoursAttentionService`;

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

export const handleGetHoursDurationService = () => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "",
  };

  let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/service/getHoursDurationService`;

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

export const handleEditService = async (dataModel, tk) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${tk}`,
  };
  let linkEditApi = `${process.env.REACT_APP_PATH_SERVICE}/service/editService`;

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

export const handleDeleteService = (id, tk) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${tk}`,
  };

  let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/service/deleteService/${id}`;

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

export const handleRegisterService = (formModel, tk) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${tk}`,
  };
  let linkRegisterApi = `${process.env.REACT_APP_PATH_SERVICE}/service/registerService`;

  const rspApi = axios
    .post(linkRegisterApi, formModel, {
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

export const handleGetShoppingCart = (tk) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${tk}`,
  };

  let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/shopping/getShoppingCart`;

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

export const handleCreatePayment = (tk, cupon) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${tk}`,
  };

  let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/payment/createPayment/${cupon}`;

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

export const handleCreatePaymentInvited = (email, cupon) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: ``,
  };

  let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/payment/createPaymentInvited/${email}/${cupon}`;

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

export const handleDeleteShoppingCartItem = (item, tk) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${tk}`,
  };
  let linkRegisterApi = `${process.env.REACT_APP_PATH_SERVICE}/shopping/deleteShoppingCartItem/${item}`;

  const rspApi = axios
    .post(linkRegisterApi, item, {
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

export const handleDeleteShoppingCartItemInvited = (email, code) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: ``,
  };
  let linkRegisterApi = `${process.env.REACT_APP_PATH_SERVICE}/shopping/deleteShoppingCartItemInvited/${code}/${email}`;

  const rspApi = axios
    .post(linkRegisterApi, {
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

export const handleGetReservationByOrderId = (code, tk) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${tk}`,
  };

  let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/reservation/getReservationByOrderId/${code}`;

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

export const handleGetReservationByOrderIdInvited = (code) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: ``,
  };

  let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/reservation/getReservationByOrderIdInvited/${code}`;

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

export const handleGetShoppingCartInvited = (email) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: ``,
  };

  let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/shopping/getShoppingCartInvited/${email}`;

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

export const handleValidateCustomer = (email, token) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/customer/validateCustomer/${email}`;

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
export const handleValidateCoupon = (coupon, token) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/coupon/validateCoupon/${coupon}`;

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
export const handleValidateCouponInvited = (email, coupon) => {
  var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: ``,
  };

  let linkDocumentsApi = `${process.env.REACT_APP_PATH_SERVICE}/coupon/validateCouponInvited/${email}/${coupon}`;

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
