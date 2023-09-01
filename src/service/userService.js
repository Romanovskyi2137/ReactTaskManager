import axios from "axios";

const mainURL = "https://task-server-m418.onrender.com/task_space";
const testURL = "http://localhost:5000/task_space"

const token = localStorage.getItem("token");

class UserService {
    async getCurrent () {
        const data = await axios({
            method: "get",
            url: `${mainURL}/current`,
            headers: {
                "authorization": token
            }
        });
        return data
    };
    async getComplete () {
        const data = await axios({
            method: "get",
            url: `${mainURL}/complete`,
            headers: {
                "authorization": token
            }
        });
        return data
    };
};

export default new UserService