import axios from "axios";

const USERS_URL = "http://localhost:8000/api/accounts/";

const register = (username, password) => {
    return axios.post(USERS_URL + "create/", {
        username,
        password,
    });
};

const login = (username, password) => {
    return axios
        .post(USERS_URL + "login/", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data.user));
                localStorage.setItem("token", JSON.stringify(response.data.token));
            }

            return response.data;
        });
};



const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem('token');
};


export default {
    register,
    login,
    logout,
};
