import {DATASET_RETRIEVE, DATASET_CREATE, PROGRESS_BAR, DATASET_UPDATE} from "../actions/types";

const initialState = {
    items: [],
    progress: {},
    data: [],

}


function dataSetReducer(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case DATASET_CREATE:
            return {
                ...state,
                items: [
                    ...state.items, payload
                ]
            }
        case DATASET_UPDATE:
            return state.items.map((dataset) => {
                if (dataset.id === payload.id) {
                    return {
                        ...dataset,
                        ...payload,
                    };
                } else {
                    return dataset;
                }
            });
        case DATASET_RETRIEVE:
            return {
                ...state,
                items: [
                    ...action.payload
                ]
            }
        case PROGRESS_BAR:
            return {
                ...state,
                progress: action.payload,
            };


        default:
            return state;
    }
}

export default dataSetReducer;