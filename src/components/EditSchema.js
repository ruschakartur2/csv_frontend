import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createSchema, updateSchemas} from "../actions/schema";
import {retrieveDataType} from "../actions/dataType";
import SchemaService from "../services/schema.service";
import SchemaColumnService from "../services/schemaColumns.service";

const EditSchema = (props) => {

    const dispatch = useDispatch();
    const dataTypes = useSelector(state => state.dt.items);
    const [newColumns, setNewColumns] = useState([]);
    const [newName, setNewName] = useState('');
    const [newColumnSeparator, setNewColumnSeparator] = useState('');
    const [newStringCharacter, setNewStringCharacter] = useState('');
    const initialSchemaState = {
        id: null,
        name: '',
        modified: '',
        column_separator: '',
        string_character: '',
        columns: [],
    }

    const [currentSchema, setCurrentSchema] = useState(initialSchemaState);


    const getSchema = id => {
        SchemaService.get(id)
            .then(response => {
                setCurrentSchema(response.data)
                setNewColumns(response.data.columns);
                setNewName(response.data.name);
                setNewStringCharacter(response.data.string_character);
                setNewColumnSeparator(response.data.column_separator);
            })
    }



    useEffect(() => {
        getSchema(props.match.params.id);
    }, [props.match.params.id, dispatch])

    useEffect(() => {
        dispatch(retrieveDataType())
    }, [dispatch])


    const handleAddColumn = () => {
        setNewColumns([...newColumns, {
            name: 'Name',
            data_type: 'type',
            order: 1,
        }])
    }

    const handleRemoveColumn = index => {
        const columns_list = [...newColumns];
        columns_list.splice(index, 1)
        setNewColumns(columns_list)
    }

    const handleChange = (e, index) => {
        const {name, value} = e.target;
        const columns_list = [...newColumns];
        if (name === 'data_type') {
            if (value === '') {
                console.log('h')
            } else {
                columns_list[index][name] = dataTypes.filter(obj => {
                    return obj.name === value
                })[0].id
            }
        } else {
            columns_list[index][name] = value;
        }
        setNewColumns(columns_list)
        console.log(columns_list)
    }

    const handleUpdateSchema = () => {
        dispatch(updateSchemas(currentSchema.id, {
            'id': currentSchema.id,
            'name': newName,
            'column_separator': newColumnSeparator,
            'string_character': newStringCharacter,
            'columns': newColumns
        }))
            .then((res) => {
                console.log(res)
                props.history.push('')
            })
            .catch((e) => {
                console.log(e)
            })
    }


    return (
        <div>
            <div className="title col-9 d-flex justify-content-between">
                <h2>Edit schema</h2>
                <button className="btn btn-primary" onClick={handleUpdateSchema}>Submit</button>
            </div>
            <form className="col-6">
                <div className="form-group">
                    <label htmlFor="schemaName">Name</label>
                    <input type="text"
                           className="form-control"
                           id="schemaName"
                           aria-describedby="name"
                           value={newName}
                           onChange={(e) => {
                               setNewName(e.target.value);
                           }}
                    />
                    <label htmlFor="columnSeparator" className="mt-3">Column separator</label>
                    <select id="columnSeparator"
                            value={newColumnSeparator}
                            onChange={(e) => {
                                setNewColumnSeparator(e.target.value)
                            }}
                            className="form-control">
                        <option selected>Comma (,)</option>
                        <option>Tab ( )</option>
                    </select>
                    <label htmlFor="stringCharacter" className="mt-3">String character</label>
                    <select id="stringCharacter"
                            className="form-control"
                            value={newStringCharacter}
                            onChange={(e) => {
                                setNewStringCharacter(e.target.value)
                            }}>
                        <option selected>Double-quote ("")</option>
                        <option>Quote ('')</option>
                    </select>
                </div>

            </form>
            <div className="title col-9 d-flex justify-content-between">
                <h2>Schema columns</h2>
            </div>

            {newColumns.map((column, index) => (
                <form className="col-12" key={index}>
                    <div className="form-row">
                        <div className="form-group col-3 mt-3">
                            <label htmlFor="columnName">Column name</label>
                            <input type="text"
                                   name="name"
                                   onChange={(e) => handleChange(e, index)}
                                   className="form-control"
                                   id="columnName"
                                   value={column.name}/>
                        </div>
                        <div className="form-group col-3">
                            <label htmlFor="columnType"
                                   className="mt-3">Type</label>
                            <select id="columnType"
                                    name="data_type"
                                    onChange={(e) => handleChange(e, index)}
                                    className="form-control">
                                <option>{dataTypes && dataTypes.map((e,i)=>(e.id === column.data_type && (e.name)))}</option>
                                {dataTypes && dataTypes.length >= 1 && dataTypes.map((data_type, index) => (
                                    <option>{data_type.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group col-2 mt-3">
                            <div className="d-flex">

                            </div>
                        </div>
                        <div className="form-group col-2 mt-3">
                            <label htmlFor="columnName">Order</label>
                            <input type="text"
                                   name="id"
                                   value={index}
                                   onChange={(e) => handleChange(e, index)}
                                   className="form-control"
                                   id="columnName"/>
                        </div>
                        <div className="form-group col-1 mt-5 ml-2">
                            <span
                                className="text-danger"
                                onClick={() => {
                                    handleRemoveColumn(index)
                                    SchemaColumnService.remove(column.id).then(r => console.log('Success' + r)).catch(e => console.log('Error' + e))
                                }}>Delete</span>
                        </div>
                    </div>
                </form>
            ))}

            <div className="button col-9">
                <button className="btn btn-primary" onClick={handleAddColumn}>Add column</button>
            </div>
        </div>
    )
}

export default EditSchema