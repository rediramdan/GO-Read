import { getAllBooksType, postBookType, getHistoryType, deleteHistoryType,addHistoryType } from "./actionType";
import { getAllBooks, postBook, getHistory, deleteHistory } from "../../utils/http";

export const getUserActionCreator = (body) => {
  return {
    type: getAllBooksType,
    payload: getAllBooks(body),
  }
}

export const getHistoryActionCreator = (body) => {
  return {
    type: getHistoryType,
    payload: getHistory(body),
  }
}

export const postBookActionCreator = (body) => {
  return {
    type: postBookType,
    payload: postBook(body),
  }
}

export const deleteHistoryActionCreator = (body) => {
  return {
    type: deleteHistoryType,
    payload: deleteHistory(body),
  }
}

export const addHistoryActionCreator = (value) => {
  return {
    type: addHistoryType,
    value
  }
}