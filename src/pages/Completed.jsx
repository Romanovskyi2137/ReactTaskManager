import {React, useEffect, useState} from "react";
import TaskList from "../components/TaskList";
import UserService from "../service/userService";
import useToken from "../myHooks/useToken";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addManyCompletedTasks, removeCompletedTask, toCurrentReplace } from "../store/tasksReducer";


export default function Completed ({visible, setVisible}) {
    const completedTasks = useSelector(state => state.tasks.completedTasks);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const token = useToken();
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
      const fetchData = async () => {
        if (completedTasks.length != 0) {
          setIsLoading(false)
          return
        };
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
        <div>
            {isLoading ?
                <h1>Loading...</h1>
            :
              <TaskList 
                tasks={completedTasks}
                btnType="До поточних"
                taskDelete={onTaskDelete}
                taskReplace={onTaskReplace}
              />
            }
        </div>
    )
};

