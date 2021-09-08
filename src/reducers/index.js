import { combineReducers } from "redux";
import schema from './schema';
import dt from './dataType'
import ds from './dataSet'
export default combineReducers({
    schema,
    dt,
    ds,
});
