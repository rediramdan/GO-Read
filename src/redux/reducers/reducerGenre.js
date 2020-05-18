import {
  getAllGenreType,
  postGenreType,
  putGenreType,
  deleteGenreType,
  resetGenreType,
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

const genre = (prevState = initialValue, action) => {
  switch (action.type) {
    case getAllGenreType + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      }
    case getAllGenreType + rejected:
      return {
        ...prevState,
        isRejected: true,
        isLoading: false,
        type:1,
      }
    case getAllGenreType + fulfilled:
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
        type:1,
        responseAPI: action.payload.data.data,
      }
    case postGenreType + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      }
    case postGenreType + rejected:
      return {
        ...prevState,
        isRejected: true,
        isLoading: false,
        type:2,
      }
    case postGenreType + fulfilled:
      prevState.responseAPI.push(action.payload.data.data)
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
        type:2,
        responseAPI: prevState.responseAPI,
      }
    case putGenreType + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      }
    case putGenreType + rejected:
      return {
        ...prevState,
        isRejected: true,
        isLoading: false,
        type:3,
      }
    case putGenreType + fulfilled:
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
    case deleteGenreType + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      }
    case deleteGenreType + rejected:
      return {
        ...prevState,
        isRejected: true,
        isLoading: false,
        type:4,
      }
    case deleteGenreType + fulfilled:
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
    case resetGenreType :
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

export default genre;