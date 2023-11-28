import React, { useEffect, useState } from "react";
import UserService from "../service/userService";
import useToken from "../myHooks/useToken";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addManyToday, removeCurrentTask, removeTodayTask, toCompleteReplace } from "../store/tasksReducer";
import TaskList from "../components/TaskList";



export default function TodayPage () {
    const token = useToken();
    const tasks = useSelector(state => state.tasks.todayTasks);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
          if (tasks.length != 0) {
            setIsLoading(false)
            return
          };
          try {
            const res = await UserService.getToday(token);
            dispatch(addManyToday(res.data));
            setIsLoading(false)
          } catch (e) {
            if (e.response.status === 400) {
              navigate("/auth", {
                state: {
                  from: location
                },
                replace: true
              })
            }
          }
        };
        fetchData();
      }, []);
    
    const onTaskDelete = async (id) => {
      const res = await UserService.delete(token, id);
      dispatch(removeCurrentTask(id));
      dispatch(removeTodayTask(id));
    };
    const onTaskReplace = async (id) => {
      const res = await UserService.replace(token, id, "to_complete");
      dispatch(toCompleteReplace(id));
      dispatch(removeTodayTask(id))
    }


    return (
        <div className="TodayPage_wrapper">
            {isLoading ? 
                <h1 style={{textAlign: "center"}}>loading...</h1> 
            :
                <TaskList 
                    tasks={tasks}
                    btnType="До виконаних"
                    taskDelete={onTaskDelete}
                    taskReplace={onTaskReplace}
                />
            }          
        </div>
    )
}