import {
  getAllAuthorType,
  postAuthorType,
  putAuthorType,
  deleteAuthorType,
  resetAuthorType,
  pending,
  rejected,
  fulfilled,
} from "../actions/actionType";

const initialValue = {
  responseAPI: [],
  type:null,
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
};

const author = (prevState = initialValue, action) => {
  switch (action.type) {
    case getAllAuthorType + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      }
    case getAllAuthorType + rejected:
      return {
        ...prevState,
        isRejected: true,
        isLoading: false,
        type:1,
      }
    case getAllAuthorType + fulfilled:
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
        type:1,
        responseAPI: action.payload.data.data,
      }
    case postAuthorType + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      }
    case postAuthorType + rejected:
      return {
        ...prevState,
        isRejected: true,
        isLoading: false,
        type:2,
      }
    case postAuthorType + fulfilled:
      prevState.responseAPI.push(action.payload.data.data)
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
        type:2,
        responseAPI: prevState.responseAPI,
      }
    case putAuthorType + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      }
    case putAuthorType + rejected:
      return {
        ...prevState,
        isRejected: true,
        isLoading: false,
        type:3,
      }
    case putAuthorType + fulfilled:
      const dataAfterEdit = prevState.responseAPI.map (response => {
        if (response.id === parseInt(action.payload.data.data.id)) {
          return action.payload.data.data;
        }
        return response;
      });
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
        type:3,
        responseAPI: dataAfterEdit,
      }
    case deleteAuthorType + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      }
    case deleteAuthorType + rejected:
      return {
        ...prevState,
        isRejected: true,
        isLoading: false,
        type:4,
      }
    case deleteAuthorType + fulfilled:
      const dataAfterDelete = prevState.responseAPI.filter (
        response => response.id !== parseInt(action.payload.data.data.id)
      );
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
        type:4,
        responseAPI: dataAfterDelete,
      }
    case resetAuthorType :
      return {
        ...prevState,
        isFulfilled: false,
        isLoading: false,
        isRejected:false,
      }
    default:
      return {
        ...prevState,
      };
  }
};

export default author;