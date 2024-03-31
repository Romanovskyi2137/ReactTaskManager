import React, { useEffect, useState } from "react";
import UserService from "../service/userService";
import useToken from "../myHooks/useToken";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addManyMajor, removeCurrentTask, removeMajorTask, removeTodayTask, removeUrgentlyTask, toCompleteReplace } from "../store/tasksReducer";
import TaskList from "../components/TaskList";
import { Notify } from "notiflix";
import { Loading } from 'notiflix/build/notiflix-loading-aio';



export default function Major () {
    const [isLoading, setIsLoading] = useState(true);
    const token = useToken();
    const tasks = useSelector(state => state.tasks.majorTasks);
    const currentTasks = useSelector(state => state.tasks.currentTasks);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    useEffect(() => {
        const fetchData = async () => {
          if (tasks.length != 0) {
            setIsLoading(false);
            Loading.remove()
            return
          };
          try {
            const res = await UserService.getMajor(token);
            dispatch(addManyMajor(res.data));
            setIsLoading(false);
            Loading.remove()
          } catch (e) {
            if (e.response.status === 400) {
              Loading.remove();
              navigate("/login", {
                state: {
                  from: location
                },
                replace: true
              })
            }
          }
        };
        fetchData();
      }, [currentTasks]);
    
    const onTaskDelete = async (id) => {
      try {
        const res = await UserService.delete(token, id);
        dispatch(removeCurrentTask(id));
        dispatch(removeMajorTask(id));
        dispatch(removeTodayTask(id));
        dispatch(removeUrgentlyTask(id))
      } catch {
        Notify.failure("something goes wrong...=)")
      }
    };
    const onTaskReplace = async (id) => {
      try {
        const res = await UserService.replace(token, id, "to_complete");
        dispatch(toCompleteReplace(id));
        dispatch(removeMajorTask(id));
        dispatch(removeTodayTask(id));
        dispatch(removeUrgentlyTask(id))
      } catch {
        Notify.failure("something goes wrong...=)")
      }
    };
    const onTaskRedact = (task) => {
      
    }


    return (
        <div className="TodayPage_wrapper">
            {isLoading ? 
                Loading.circle({
                  svgSize: "128px",
                  svgColor: "#F36D0C"
                })
            :
                <TaskList 
                    tasks={tasks}
                    btnType="До виконаних"
                    taskDelete={onTaskDelete}
                    taskReplace={onTaskReplace}
                    onTaskRedact={onTaskRedact}
                />
            }          
        </div>
    )
}