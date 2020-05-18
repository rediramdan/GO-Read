import {
  postLoginType,
  postRegisterType,
  pending,
  rejected,
  fulfilled,
  resetAuthType,
} from "../actions/actionType";

const initialValue = {
  responseAPI: {},
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
};

const auth = (prevState = initialValue, action) => {
  switch (action.type) {
    case postLoginType + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      }
    case postLoginType + rejected:
      return {
        ...prevState,
        isRejected: true,
        isLoading: false,
        responseAPI: action.payload.response.data
      }
    case postLoginType + fulfilled:
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
        responseAPI: action.payload.data.data
      }
    case postRegisterType + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      }
    case postRegisterType + rejected:
      return {
        ...prevState,
        isRejected: true,
        isLoading: false,
        responseAPI: action.payload.response.data
      }
    case postRegisterType + fulfilled:
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
        responseAPI: action.payload.data.data
      }
    case resetAuthType:
      return {
        ...prevState,
        isFulfilled: false,
        isLoading: false,
        isRejected:false
      }
    default:
      return {
        ...prevState,
      };
  }
};

export default auth;