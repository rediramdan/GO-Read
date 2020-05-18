import { getAllAuthorType, postAuthorType, putAuthorType,deleteAuthorType, resetAuthorType } from "./actionType";
import { getAuthor,postAuthor,putAuthor, deleteAuthor } from "../../utils/http";

export const getAllAuthorActionCreator = (body) => {
  return {
    type: getAllAuthorType,
    payload: getAuthor(body),
  }
}

export const postAuthorActionCreator = (body) => {
  return {
    type: postAuthorType,
    payload: postAuthor(body),
  }
}
export const putAuthorActionCreator = (body,id) => {
  return {
    type: putAuthorType,
    payload: putAuthor(body,id),
  }
}

export const deleteAuthorActionCreator = (id) => {
  return {
    type: deleteAuthorType,
    payload: deleteAuthor(id),
  }
}

export const resetAuthorStatus = () => {
  return {
    type: resetAuthorType,
  }
}