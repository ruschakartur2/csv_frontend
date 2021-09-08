import {DATATYPE_RETRIEVE, SCHEMA_CREATE, SCHEMA_RETRIEVE} from "../actions/types";

const initialState = {
    items: [],

}


function dataTypeReducer(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case DATATYPE_RETRIEVE:
            return {
                ...state,
                items: [
                    ...action.payload
                ]
            }

        default:
            return state;
    }
}
export default dataTypeReducer;