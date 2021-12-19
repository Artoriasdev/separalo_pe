import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "../reducers/authReducer";
import { categoryReducer } from "../reducers/categoryReducer";
import { checkingReducer } from "../reducers/checkingReducer";
import { dialogReducer } from "../reducers/dialogReducer";
import { modalReducer } from "../reducers/modalReducer";
import { searchReducer } from "../reducers/searchReducer";
import { categorysByBusiness } from "../reducers/categoryByBusinessReducer";
import { categorysByServices } from "../reducers/categoryByServicesReducer";
import { servicesById } from "../reducers/servicesByIdReducer";
import { hoursById } from "../reducers/hoursByIdReducer";
import { reservation } from "../reducers/reservationReducer";
import { servicesList } from "../reducers/serviceListReducer";
import { servicesListByCategory } from "../reducers/serviceListByCategoryReducer";
import { businessData } from "../reducers/businessDataReducer";
import { reservationList } from "../reducers/reservationListReducer";
import { imageUpload } from "../reducers/imageUploadReducer";
import { districsReducer } from "../reducers/districsReducer";
import { provincesReducer } from "../reducers/provincesReducer";
import { documentsReducer } from "../reducers/documentsReducer";
import { businessDataBankReducer } from "../reducers/businessDataBankReducer";
import { banksReducer } from "../reducers/banksReducer";
import { banksAccountTypeReducer } from "../reducers/banksAccountTypeReducer";
import { clientData } from "../reducers/clientDataReducer";
import { clientAppointment } from "../reducers/clientAppointmentReducer";
import { clientAppointmentHistory } from "../reducers/clientAppointmentHistoryReducer";
import { categoryComplaintReducer } from "../reducers/categoryComplaintReducer";
import { termsReducer } from "../reducers/termsReducer";
import { serviceDeleteReducer } from "../reducers/serviceDeleteReducer";
import { serviceForEditReducer } from "../reducers/serviceForEditReducer";
import { serviceHoursReducer } from "../reducers/serviceHoursReducer";
import { serviceHoursAttentionReducer } from "../reducers/serviceHoursAttentionReducer";
import { shoppingCarReducer } from "../reducers/shoppingCarReducer";
import { shoppingCarCompletedReducer } from "../reducers/shoppingCarCompletedReducer";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const reducers = combineReducers({
  category: categoryReducer,
  search: searchReducer,
  modal: modalReducer,
  dialog: dialogReducer,
  auth: authReducer,
  checking: checkingReducer,
  categoryBusiness: categorysByBusiness,
  categoryServices: categorysByServices,
  serviceById: servicesById,
  serviceList: servicesList,
  serviceListByCategory: servicesListByCategory,
  hoursById: hoursById,
  reservation: reservation,
  businessData: businessData,
  businessDataBank: businessDataBankReducer,
  reservationList: reservationList,
  imageUpload: imageUpload,
  districsLoad: districsReducer,
  provinces: provincesReducer,
  documents: documentsReducer,
  banksList: banksReducer,
  banksTypeList: banksAccountTypeReducer,
  clientData: clientData,
  clientAppointment: clientAppointment,
  clientAppointmentHistory: clientAppointmentHistory,
  categoryComplaint: categoryComplaintReducer,
  terms: termsReducer,
  serviceDelete: serviceDeleteReducer,
  serviceForEdit: serviceForEditReducer,
  serviceHours: serviceHoursReducer,
  serviceHoursAttention: serviceHoursAttentionReducer,
  shoppingCar: shoppingCarReducer,
  shoppingDone: shoppingCarCompletedReducer,
});

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
