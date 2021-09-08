import axios from "axios";

const DATASET_URL = 'http://127.0.0.1:8000/api/data_sets/';


const getBySchema = (schema) => {
    return axios.get(DATASET_URL + `?schema__id=${schema}`, {
        headers: {
            'Content-type': 'application/json',
        }
    })
}

const create = (data) => {
    return axios.post(DATASET_URL, data, {
        headers: {
            'Content-type': 'application/json',
        }
    })
}
const update = (id,data) => {
    return axios.patch(DATASET_URL + id + '/', data, {
        headers: {
            'Content-type': 'application/json',
        }
    })
}

const getProgress = (dataSetId) => {
    return axios.get(`http://localhost:8000/celery-progress/${dataSetId}/`)
}

const DataSetsService = {
    getBySchema,
    create,
    update,
    getProgress
}
export default DataSetsService;