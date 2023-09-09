import {React, useEffect, useState} from "react";
import ModalWindow from "./ModalWindow/ModalWindow";
import Input from "./UI/Input/Input";
import TaskList from "./TaskList";
import { useList } from "../myHooks/useList";
import UserService from "../service/userService";
import useToken from "../myHooks/useToken";
import { Notify } from "notiflix";
import { useLocation, useNavigate } from "react-router-dom";


function CompletedTasksModal ({visible, setVisible, toCurrentReplace}) {
    const [completedTasks, setCompletedTasks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const filtered = useList(completedTasks, "", searchQuery);
    const token = useToken();
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await UserService.getComplete(token);
          setCompletedTasks(res.data);
          setIsLoading(false)
        } catch (e) {
          if (e.response.status == 400) {
            navigate("/auth", {
              state: {
                from: location
              },
              replace: true
            })
          }
          return
        }
      };
      fetchData()
    }, [])


    async function toCurrent (task) {
        const {id} = task;
        try {
          const res = await UserService.replace(token, id, "to_current"); 
          setCompletedTasks(completedTasks.filter(t => t.id !== task.id));
          toCurrentReplace(task)
        } catch (e) {
          Notify.failure("Щось пішло не так =(")
        }
      };
    return (
        <ModalWindow 
            visible={visible} 
            setVisible={setVisible}
          >
            <Input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Пошук..."
            />
            <hr
              style={{margin: "15px 0"}}
            />
            {isLoading ?
            <h1>Loading...</h1>
            :
              <TaskList 
                tasks={filtered}
                setTasks={setCompletedTasks}
                setVisible={setVisible}
                btnType="До поточних"
                onTaskReplace={toCurrent}
              />
            }
          </ModalWindow>
    )
};

export default CompletedTasksModal