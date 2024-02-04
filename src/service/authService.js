import axios from "axios";


const mainURL = "https://task-server-m418.onrender.com";

class AuthServise {

    async registration (username, password) {
        const userData = {
            "username": username,
            "password": password
        };
        const user = await axios({
            method: "post",
            url: `${mainURL}/authorization/registration`,
            data: userData,
        });
            return user
     };

     async login (username, password) {
        const userData = {
            "username": username,
            "password": password
        };
        const userToken = await axios({
            method: "post",
            url: `${mainURL}/authorization/login`,
            data: userData,
        });
        return userToken
     };

     async google_login (username, password) {
        const userData = {
            "username": username,
            "password": password
        };
        const userToken = await axios({
            method: "post",
            url: `${mainURL}/authorization/google_login`,
            data: userData
        });
        return userToken
     }

};



export default new AuthServise;