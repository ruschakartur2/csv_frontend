import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteSchema, retrieveSchemas} from "../actions/schema";

const Schemas = (props) => {
    const dispatch = useDispatch();

    const schemas = useSelector(state => state.schema.items)
    const {user,isLoggedIn} = useSelector(state=>state.auth);

    if (isLoggedIn !== true) {
        props.history.push('/login')
    }
    useEffect(() => {
        if (user && user.id) {
            dispatch(retrieveSchemas(user.id));
        }
        }, [dispatch, user])

    return (
        <div>
            <div className="title col-9 d-flex justify-content-between">
                <h2>Data schemas</h2>
                <Link to={'/new'} className="btn btn-success">New schema</Link>
            </div>
            <table className="table col-9 mt-5">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Modified</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {schemas && schemas.length >= 1 && schemas.map((schema, index) => (
                    <tr key={index}>
                        <th scope="row">{schema.id}</th>
                        <td><Link to={"/schema/" + schema.id}>{schema.name}</Link></td>
                        <td>{schema.modified}</td>
                        <td>
                            <div className="buttons">
                                <Link to={"/edit/" + schema.id}>Edit scheme</Link>
                                <Link className="text-danger ml-3" onClick={() => {
                                        dispatch(deleteSchema(schema.id)).then(()=>{console.log('deleted')})
                                }}
                                >Delete</Link>
                            </div>
                        </td>
                    </tr>
                ))}

                </tbody>
            </table>
        </div>
    )
}

export default Schemas