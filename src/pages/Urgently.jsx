import React, { useEffect, useState } from "react";
import UserService from "../service/userService";
import useToken from "../myHooks/useToken";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addManyUrgently, removeCurrentTask, removeMajorTask, removeTodayTask, removeUrgentlyTask, toCompleteReplace } from "../store/tasksReducer";
import TaskList from "../components/TaskList";
import { Notify } from "notiflix";



export default function Urgently () {
    const token = useToken();
    const tasks = useSelector(state => state.tasks.urgentlyTasks);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    useEffect(() => {
        const fetchData = async () => {
          if (tasks.length !== 0) {
            setIsLoading(false)
            return
          };
          try {
            const res = await UserService.getUrgently(token);
            dispatch(addManyUrgently(res.data));
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
      try {
        const res = await UserService.delete(token, id);
        dispatch(removeCurrentTask(id));
        dispatch(removeUrgentlyTask(id));
        dispatch(removeTodayTask(id));
        dispatch(removeMajorTask(id))
      } catch {
        Notify.failure("somthing goes wrong...=)")
      }
    };
    const onTaskReplace = async (id) => {
      try {
        const res = await UserService.replace(token, id, "to_complete");
        dispatch(toCompleteReplace(id));
        dispatch(removeUrgentlyTask(id));
        dispatch(removeTodayTask(id));
        dispatch(removeMajorTask(id))
      } catch {
        Notify.failure("somthing goes wrong...=)")
      }
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