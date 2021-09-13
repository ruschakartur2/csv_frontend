import {
    SCHEMA_CREATE,
    SCHEMA_RETRIEVE,
    SCHEMA_UPDATE,
    SCHEMA_DELETE
} from './types'

import SchemaService from '../services/schema.service';

export const createSchema = (data) => async (dispatch) => {
    try {
        const res = await SchemaService.create(data);
        dispatch({
            type: SCHEMA_CREATE,
            payload: res.data,
        })

        return Promise.resolve(res.data);
    } catch (e) {
        return Promise.reject(e);
    }
}


export const updateSchemas = (id,data) => async (dispatch) => {
    try {
        const res = await SchemaService.update(id,data);
        dispatch({
            type: SCHEMA_CREATE,
            payload: data,
        })

        return Promise.resolve(res.data);
    } catch (e) {
        return Promise.reject(e);
    }
}

export const retrieveSchemas = (author) => async (dispatch) => {
    try {
        const res = await SchemaService.getAll(author);
        dispatch({
            type: SCHEMA_RETRIEVE,
            payload: res.data,

        });
        return Promise.resolve(res.data);

    } catch (err) {
        console.log(err);
    }
}
export const retrieveSchema = (id) => async (dispatch) => {
    try {
        const res = await SchemaService.get(id);
        dispatch({
            type: SCHEMA_RETRIEVE,
            payload: res.data,

        });
        return Promise.resolve(res.data);

    } catch (err) {
        console.log(err);
    }
}
export const deleteSchema = (id) => async (dispatch) => {
    try {
        await SchemaService.remove(id);

        dispatch({
            type: SCHEMA_DELETE,
            payload: {id},
        });
    } catch (err) {
        console.log(err)
    }
}