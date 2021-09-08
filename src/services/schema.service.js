import axios from "axios";

const SCHEMA_URL = 'http://127.0.0.1:8000/api/schema/';

const getAll = () => {
    return axios.get(SCHEMA_URL, {
        headers: {
           'Content-type': 'application/json'
        }
    })
}

const get = (id) => {
    return axios.get(SCHEMA_URL + id + '/' , {
        headers: {
            'Content-type': 'application/json',
        }
    })
}

const update = (id, data) => {
    return axios.patch(SCHEMA_URL + id+'/', data , {
        headers: {
            'Content-type': 'application/json',
        }
    })
}
const create = (data) => {
    return axios.post(SCHEMA_URL, data , {
        headers: {
            'Content-type': 'application/json',
        }
    })
}

const remove = (id) => {
    return axios.delete(SCHEMA_URL + id, {
        headers: {
            'Content-type': 'application/json',
        }
    })
}

const SchemaService = {
    getAll,
    get,
    create,
    update,
    remove,
}
export default SchemaService;