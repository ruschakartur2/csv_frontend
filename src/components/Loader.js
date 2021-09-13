import React, {useEffect} from "react";
import {ProgressBar} from "react-bootstrap";
import {getProgress, retrieveDataSets, updateDataSet} from "../actions/dataSet";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

const ProgressBarUi = (props) => {
    const dispatch = useDispatch();
    const ds_id = props.location.state.id
    const data_set_id = props.location.state.data_set_id
    const schemaId = props.location.state.schema
    useEffect(() => {
        dispatch(getProgress(data_set_id))
    })
    const percent = useSelector(state => state.ds?.progress?.progress?.percent)

    return (
        <div>
            <ProgressBar
                now={percent}
                animated
                variant="success"
                label={`${percent}%`}
            />
                <Link to={'/schema/'+schemaId}>Back to Data sets</Link>
        </div>
    );

}

export default ProgressBarUi;
