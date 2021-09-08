import axios from "axios";

const DT_URL = 'http://127.0.0.1:8000/api/data_types/';

const getAll = () => {
    return axios.get(DT_URL, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

const get = (id) => {
    return axios.get(DT_URL + id , {
        headers: {
            'Content-type': 'application/json',
        }
    })
}

const update = (id, data) => {
    return axios.patch(DT_URL + id, data , {
        headers: {
            'Content-type': 'application/json',
        }
    })
}

const DataTypeService = {
    getAll,
    get,
    update,

}
export default DataTypeService;