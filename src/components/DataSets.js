import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {Link} from "react-router-dom";
import {createDataSet, retrieveDataSets} from "../actions/dataSet";

const DataSets = (props) => {

    const dataSets = useSelector(state => state.ds.items);
    const dispatch = useDispatch();

    const [rows, setRows] = useState(0)

    useEffect(() => {
        dispatch(retrieveDataSets(props.match.params.id))
    }, [props.match.params.id, dispatch])

    const generateNewDataSet = () => {
        dispatch(createDataSet(
            {
                'schema': props.match.params.id,
                'rows': rows,
                'status': 'PROCESSING',
            }
        )).then((res) => {
            props.history.push({
                pathname: '/loader',
                state: {
                    data_set_id: res.data_set_id,
                    id: res.id,
                    schema: res.schema_id,
                },
            })
        })
    }
    return (
        <div>

            <div className="title col-9 d-flex justify-content-between">
                <h2>Data schemas</h2>
                <div>Rows: <input className="ml-1 mr-2" type="text" size="3" value={rows} onChange={(e) => {
                    setRows(e.target.value)
                }}/> <Link className="btn btn-success" onClick={generateNewDataSet}>Generate data</Link></div>
            </div>
            <table className="table col-9 mt-5">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Created</th>
                    <th scope="col">Status<img
                        src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/000000/external-refresh-basic-ui-elements-flatart-icons-outline-flatarticons.png"
                        width={20}
                        height={20}
                        className='logo'
                        onClick={(e)=>{dispatch(retrieveDataSets(props.match.params.id))}}
                    /></th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {dataSets && dataSets.length >= 1 && dataSets.map((dataSet, index) => (
                    <tr key={index}>
                        <th scope="row">{dataSet.id}</th>
                        <th scope="row">{dataSet.created}</th>
                        <td>
                            <div type="submit"
                                className={dataSet.status === 'READY' && ('badge badge-success') || dataSet.status === 'PROCESSING' && ('badge badge-dark')}>{dataSet.status}</div>
                        </td>
                        <td>
                            <div className="buttons">
                                <a className={dataSet.filepath !== null ? ('') : ('disabled')} href={"http://localhost:8000/media/files/"+dataSet.filepath} disabled={true} download>Download</a>
                            </div>
                        </td>
                    </tr>
                ))}

                </tbody>
            </table>
        </div>
    )
}
export default DataSets;