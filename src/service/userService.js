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
    async getToday (token) {
        const data = await axios({
            method: "get",
            url: `${mainURL}/today`,
            headers: {
                "authorization": token
            }
        });
        return data
    };
    async getUrgently (token) {
        const data = await axios({
            method: "get",
            url: `${mainURL}/urgently`,
            headers: {
                "authorization": token
            }
        });
        return data
    };
    async getMajor (token) {
        const data = await axios({
            method: "get",
            url: `${mainURL}/major`,
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
            data: task
        })
        return res
    };
    async delete (token, id) {
        const res = await axios({
            method: "delete",
            url: `${mainURL}/delete/${id}`,
            headers: {
                "authorization": token
            }
        })
        return res
    };
    async replace (token, id, replaceType) {
        const res = await axios({
            method: "put",
            url: `${mainURL}/replace`,
            headers: {
                "authorization": token
            },
            data: {
                id: id,
                replaceType: replaceType
            }
        })
        return res
    };
    async change (token, task) {
        const res = await axios({
            method: "put",
            url: `${mainURL}/change`,
            headers: {
                "authorization": token
            },
            data: task
        });
        return res
    };
};

export default new UserService