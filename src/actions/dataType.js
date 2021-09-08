import {
    DATATYPE_RETRIEVE,
    DATATYPE_UPDATE,
} from './types'

import DataTypeService from '../services/dataType.service';

export const retrieveDataType = () => async (dispatch) => {
    try {
        const res = await DataTypeService.getAll();
        dispatch({
            type: DATATYPE_RETRIEVE,
            payload: res.data,

        });
        return Promise.resolve(res.data);

    } catch (err) {
        console.log(err);
    }
}
