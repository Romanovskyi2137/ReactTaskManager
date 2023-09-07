import {React, useEffect, useState} from "react";
import ModalWindow from "./ModalWindow/ModalWindow";
import Input from "./UI/Input/Input";
import TaskList from "./TaskList";
import { useList } from "../myHooks/useList";
import UserService from "../service/userService";
import useToken from "../myHooks/useToken";


function CompletedTasksModal ({visible, setVisible, setTasks}) {
    const [completedTasks, setCompletedTasks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const filtered = useList(completedTasks, "", searchQuery);
    const token = useToken();

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await UserService.getComplete(token);
          setCompletedTasks(res.data);
          setIsLoading(false)
        } catch (e) {
          return
        }
      };
      fetchData()
    }, [])


    function toCurrent (task) {
        // http req for replacement
        setCompletedTasks(completedTasks.filter(t => t.title !== task.title))
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