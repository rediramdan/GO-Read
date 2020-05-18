import { combineReducers } from "redux";
import book from "./reducerBook";
import auth from "./reducerAuth";
import genre from "./reducerGenre";
import author from "./reducerAuthor";

const rootReducer = combineReducers({
  auth,
  book,
  genre,
  author,
});

export default rootReducer;