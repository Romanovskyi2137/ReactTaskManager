import axios from "axios";

const mainURL = "https://task-server-m418.onrender.com/task_space"

class UserService {
    async getCurrent (token) {
        const data = await axios({
            method: "get",
            url: `${mainURL}/current`,
            headers: {
                "authorization": token
            }
        });
        return data
    };
    async getComplete (token) {
        const data = await axios({
            method: "get",
            url: `${mainURL}/complete`,
            headers: {
                "authorization": token
            }
        });
        return data
    };
    async create (token, task) {
        const res = await axios({
            method: "post",
            url: `${mainURL}/create`,
            headers: {
                "authorization": token
            },
            body: task
        })
        return res
    }
};

export default new UserService