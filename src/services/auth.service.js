import axios from "axios";

const USERS_URL = "http://localhost:8000/api/accounts/";

const register = (email, password) => {
    return axios.post(USERS_URL + "create/", {
        email,
        password,
    });
};

const login = (email, password) => {
    return axios
        .post(USERS_URL + "login/", {
            email,
            password,
        })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data.user));
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
