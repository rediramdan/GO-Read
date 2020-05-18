import { getAllGenreType, postGenreType, putGenreType,deleteGenreType, resetGenreType } from "./actionType";
import { getGenre,postGenre,putGenre, deleteGenre } from "../../utils/http";

export const getAllGenreActionCreator = (body) => {
  return {
    type: getAllGenreType,
    payload: getGenre(body),
  }
}

export const postGenreActionCreator = (body) => {
  return {
    type: postGenreType,
    payload: postGenre(body),
  }
}
export const putGenreActionCreator = (body,id) => {
  return {
    type: putGenreType,
    payload: putGenre(body,id),
  }
}

export const deleteGenreActionCreator = (id) => {
  return {
    type: deleteGenreType,
    payload: deleteGenre(id),
  }
}

export const resetGenreStatus = () => {
  return {
    type: resetGenreType,
  }
}