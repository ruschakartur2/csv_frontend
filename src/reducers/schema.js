import {SCHEMA_CREATE, SCHEMA_RETRIEVE} from "../actions/types";

const initialState = {
    items: [],
}


function schemaReducer(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case SCHEMA_RETRIEVE:
            return {
                ...state,
                items: [
                    ...action.payload
                ]
            }

        case SCHEMA_CREATE:
            return {
                ...state,
                items: [
                    ...state.items, payload
                ]
            }
        default:
            return state;
    }
}
export default schemaReducer;