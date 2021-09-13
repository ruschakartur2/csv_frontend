/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {Router, Switch, Route, Link} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Schemas from "./components/Schemas";


import {history} from "./helpers/history";
import NewSchema from "./components/NewSchema";
import DataSets from "./components/DataSets";
import ProgressBarUi from "./components/Loader";
import EditSchema from "./components/EditSchema";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "./actions/auth";
import Login from "./components/Login";
import Register from "./components/Register";


const App = (props) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const logOut = () => {
        dispatch(logout());
    };
    return (
        <Router history={history}>
            <div>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                <link rel="stylesheet"
                      href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css"
                      integrity="sha256-aAr2Zpq8MZ+YA/D6JtRD3xtrwpEz2IqOS+pWD/7XKIw=" crossOrigin="anonymous"/>

                <link rel="stylesheet"
                      href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-tagsinput/0.8.0/bootstrap-tagsinput.css"
                      integrity="sha512-xmGTNt20S0t62wHLmQec2DauG9T+owP9e6VU8GigI0anN7OXLip9i7IwEhelasml2osdxX71XcYm6BQunTQeQg=="
                      crossOrigin="anonymous"/>

                <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js"/>

                <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/js/bootstrap.min.js"
                        integrity="sha256-OFRAJNoaD8L3Br5lglV7VyLRf0itmoBzWUoM+Sji4/8="
                        crossOrigin="anonymous"/>

                <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-tagsinput/0.8.0/bootstrap-tagsinput.js"
                        integrity="sha512-VvWznBcyBJK71YKEKDMpZ0pCVxjNuKwApp4zLF3ul+CiflQi6aIJR+aZCP/qWsoFBA28avL5T5HA+RE+zrGQYg=="
                        crossOrigin="anonymous"/>

                <script
                    src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-tagsinput/0.8.0/bootstrap-tagsinput-angular.min.js"
                    integrity="sha512-KT0oYlhnDf0XQfjuCS/QIw4sjTHdkefv8rOJY5HHdNEZ6AmOh1DW/ZdSqpipe+2AEXym5D0khNu95Mtmw9VNKg=="
                    crossOrigin="anonymous"/>


                <nav className="navbar navbar-expand navbar-light pl-3 pr-3">
                    <Link to={"/"} className="navbar-brand">
                        CSV
                    </Link>

                    <Link to={'/'}>Schemas</Link>
                    <Link to={'/new'} className="ml-3">New</Link>


                    {user ? (<div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            {user.username}
                        </li>
                        <li className="nav-item">
                            <a href="/login" className="nav-link" onClick={logOut}>
                                LogOut
                            </a>
                        </li>
                    </div>) : (<div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link">
                                Login
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/register"} className="nav-link">
                                Sign Up
                            </Link>
                        </li>
                    </div>)}


                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/home"]} component={Schemas}/>
                        <Route exact path={"/new"} component={NewSchema}/>
                        <Route exact path={"/login"} component={Login}/>
                        <Route exact path={"/register"} component={Register}/>

                        <Route exact path={"/edit/:id"} component={EditSchema}/>
                        <Route exact path={"/schema/:id"} component={DataSets}/>
                        <Route exact path={"/loader"} component={ProgressBarUi}/>
                    </Switch>
                </div>
            </div>
        </Router>
    );
};

export default App;
