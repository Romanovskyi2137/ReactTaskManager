import axios from "axios";

const mainURL = "https://task-server-m418.onrender.com";


class userService {
    async getCurrent () {
        const data = await axios({
            method: "get",
            url: `${mainURL}/###`
        });
        return data
    };
    async getComplete () {
        const data = await axios({
            method: "get",
            url: `${mainURL}/###`
        });
        return data
    };
};

export default new userService