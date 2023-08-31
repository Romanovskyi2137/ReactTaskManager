import axios from "axios";


const mainURL = "https://task-server-m418.onrender.com";
const testURL = "http://localhost:5000/task_space";

class AuthServise {
    async isValidToken (token) {
        const res = await axios({
            method: "get",
            url: `${testURL}/current`,
            headers: {
                "authorization": token
            }
        });
        return res
    };

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
     }

};



export default new AuthServise;