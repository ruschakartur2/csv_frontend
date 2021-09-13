import axios from "axios";

const SCHEMA_COLUMN_URL = 'http://127.0.0.1:8000/api/columns/'

const remove = (id) => {
    return axios.delete(SCHEMA_COLUMN_URL + id + '/', {
        headers: {
            'Content-type': 'application/json',
        }
    })
}


const SchemaColumnService = {
    remove,
}
export default SchemaColumnService;