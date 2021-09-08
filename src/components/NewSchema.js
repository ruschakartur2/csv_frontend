import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createSchema} from "../actions/schema";
import {retrieveDataType} from "../actions/dataType";

const NewSchema = () => {

    const dispatch = useDispatch();
    const [columns, setColumns] = useState([{
        name: 'name',
        data_type: 'type',
        id: 1,
    }])
    const dataTypes = useSelector(state => state.dt.items);

    const [schemaName, setSchemaName] = useState('')
    const [schemaColumnSeparator, setSchemaColumnSeparator] = useState('Comma (,)')
    const [schemaStringCharacter, setSchemaStringCharacter] = useState('Double-quote ("")')
    const [error,setError] = useState('')
    useEffect(() => {
        dispatch(retrieveDataType())
    }, [dispatch])

    const handleAddColumn = () => {
        setColumns([...columns, {
            name: 'name',
            data_type: 'type',
            order: 1,
        }])
    }

    const handleRemoveColumn = index => {
        const columns_list = [...columns];
        columns_list.splice(index, 1)
        setColumns(columns_list)
    }

    const handleChange = (e, index) => {
        const {name, value} = e.target;
        const columns_list = [...columns];

        if(name === 'data_type') {
            if(value === ''){
                console.log('h')
            }
            else {
                columns_list[index][name] = dataTypes.filter(obj => {return obj.name === value})[0].id
            }
        }
        else {
            columns_list[index][name] = value;
        }
        setColumns(columns_list)
        console.log(columns_list)
    }
    console.log(columns.data_type)
    const handleNewSchema = () => {
        dispatch(createSchema({
                'name': schemaName,
                'column_separator': schemaColumnSeparator,
                'string_character': schemaStringCharacter,
                'columns': columns
            }))
                .then((res) => {
                    console.log(res)
                })
                .catch((e) => {
                    console.log(e)
                })
    }

    return (
        <div>
            <div className="title col-9 d-flex justify-content-between">
                <h2>New schema</h2>
                <button className="btn btn-primary" onClick={handleNewSchema}>Submit</button>
            </div>
            <form className="col-6">
                <div className="form-group">
                    <label htmlFor="schemaName">Name</label>
                    <input type="text"
                           className="form-control"
                           id="schemaName"
                           aria-describedby="name"
                           value={schemaName}
                           onChange={(e) => {
                               setSchemaName(e.target.value)
                           }}
                    />
                    <label htmlFor="columnSeparator" className="mt-3">Column separator</label>
                    <select id="columnSeparator" value={schemaColumnSeparator} onChange={(e) => {
                        setSchemaColumnSeparator(e.target.value)
                    }} className="form-control">
                        <option selected>Comma (,)</option>
                        <option>Tab ( )</option>
                    </select>
                    <label htmlFor="stringCharacter" className="mt-3">String character</label>
                    <select id="stringCharacter"
                            className="form-control"
                            value={schemaStringCharacter}
                            onChange={(e) => {
                                setSchemaStringCharacter(e.target.value)
                            }}>
                        <option selected>Double-quote ("")</option>
                        <option>Quote ('')</option>
                    </select>
                </div>

            </form>
            <div className="title col-9 d-flex justify-content-between">
                <h2>Schema columns</h2>
            </div>
            {error}
            {columns.map((column, index) => (
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
                                    <option></option>

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
                                   name="order"
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

export default NewSchema