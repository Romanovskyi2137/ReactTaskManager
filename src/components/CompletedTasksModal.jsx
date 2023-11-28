import {React, useEffect, useState} from "react";
import ModalWindow from "./ModalWindow/ModalWindow";
import Input from "./UI/Input/Input";
import TaskList from "./TaskList";
import { useList } from "../myHooks/useList";
import UserService from "../service/userService";
import useToken from "../myHooks/useToken";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addManyCompletedTasks, removeCompletedTask, toCurrentReplace } from "../store/tasksReducer";


function CompletedTasksModal ({visible, setVisible}) {
    const completedTasks = useSelector(state => state.tasks.completedTasks);
    const dispatch = useDispatch();
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
          dispatch(addManyCompletedTasks(res.data));
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

    const onTaskDelete = async (id) => {
      const res = await UserService.delete(token, id);
      dispatch(removeCompletedTask(id));
    };
    const onTaskReplace = async (id) => {
      const res = await UserService.replace(token, id, "to_current");
      dispatch(toCurrentReplace(id));
    }


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
                btnType="До поточних"
                taskDelete={onTaskDelete}
                taskReplace={onTaskReplace}
              />
            }
          </ModalWindow>
    )
};

export default CompletedTasksModal