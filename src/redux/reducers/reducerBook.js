import {
  getAllBooksType,
  getHistoryType,
  deleteHistoryType,
  addHistoryType,
  pending,
  rejected,
  fulfilled,
} from "../actions/actionType";

const initialValue = {
  responseAPI: [],
  bookHistory:[],
  pagination:{},
  nextPage:"",
  isEnd:false,
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
};

const book = (prevState = initialValue, action) => {
  switch (action.type) {
    case getAllBooksType + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case getAllBooksType + rejected:
      return {
        ...prevState,
        isRejected: true,
        isLoading: false,
        responseAPI: [],
      };
    case getAllBooksType + fulfilled:
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
        responseAPI: action.payload.data.data,
        pagination: action.payload.data.pagination,
      };
    case getHistoryType + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case getHistoryType + rejected:
      return {
        ...prevState,
        isRejected: true,
        isLoading: false,
        bookHistory: [],
      };
    case getHistoryType + fulfilled:
      let isEnd = true
      if(action.payload.data.data.length !== 0)
      {
        action.payload.data.data.forEach(response => {
          prevState.bookHistory.push(response) 
        });
        isEnd = false
      }
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
        isEnd :isEnd,
        bookHistory: prevState.bookHistory,
        nextPage: action.payload.data.pagination.nextPage,
      };
    case addHistoryType:
        const newData = [
          action.value
        ]
        Array.prototype.push.apply(newData,prevState.bookHistory) 
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
        bookHistory: newData,
      };
    case deleteHistoryType + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case deleteHistoryType + rejected:
      return {
        ...prevState,
        isRejected: true,
        isLoading: false,
      };
    case deleteHistoryType + fulfilled:
      const dataAfterDelete = prevState.bookHistory.filter (
        response => response.id !== parseInt(action.payload.data.data.id)
      );
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
        bookHistory: dataAfterDelete,
      };
    default:
      return {
        ...prevState,
      };
  }
};

export default book;