import { combineReducers } from "redux";
import schema from './schema';
import dt from './dataType'
import ds from './dataSet'
import auth from "./auth";
import message from "./message";
export default combineReducers({
    schema,
    auth,
    message,
    dt,
    ds,
});
