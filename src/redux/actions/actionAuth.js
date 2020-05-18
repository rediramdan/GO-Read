import { postLoginType,postRegisterType,resetAuthType } from "./actionType";
import { postLogin,postRegister } from "../../utils/http";

export const postLoginActionCreator = (body) => {
  return {
    type: postLoginType,
    payload: postLogin(body),
  }
}

export const postRegisterActionCreator = (body) => {
  return {
    type: postRegisterType,
    payload: postRegister(body),
  }
}

export const resetAuthActionCreator = () => {
  return {
    type: resetAuthType,
  }
}