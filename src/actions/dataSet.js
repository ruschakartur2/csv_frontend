import {
    DATASET_CREATE,
    DATASET_RETRIEVE,
    DATATYPE_RETRIEVE,
    DATATYPE_UPDATE, PROGRESS_BAR, SCHEMA_CREATE,
} from './types'

import DataTypeService from '../services/dataType.service';
import DataSetsService from "../services/dataSets.service";
import SchemaService from "../services/schema.service";

export const retrieveDataSets = (schema) => async (dispatch) => {
    try {
        const res = await DataSetsService.getBySchema(schema);
        dispatch({
            type: DATASET_RETRIEVE,
            payload: res.data,

        });
        return Promise.resolve(res.data);

    } catch (err) {
        console.log(err);
    }
}

export const createDataSet = (data) => async (dispatch) => {
    try {
        const res = await DataSetsService.create(data);
        dispatch({
            type: DATASET_CREATE,
            payload: res.data,
        })

        return Promise.resolve(res.data);
    } catch (e) {
        return Promise.reject(e);
    }
}

export const updateDataSet = (id, data) => async (dispatch) => {
    try {
        const res = await DataSetsService.update(id, data);
        dispatch({
            type: DATASET_CREATE,
            payload: data,
        })

        return Promise.resolve(res.data);
    } catch (e) {
        return Promise.reject(e);
    }
}


export const getProgress = (dataSetId) => async (dispatch) => {
    try {
        const res = await DataSetsService.getProgress(dataSetId);
        dispatch({
            type: PROGRESS_BAR,
            payload: {dataSetId: dataSetId, ...res.data}
        })
        if (!res.data.complete && !res.data?.progress?.pending) {
                setTimeout(()=>{
                    return dispatch(getProgress(dataSetId))

                },  4000)
        }
    } catch (err) {
        console.log(err)
    }
};
