import React, { useEffect, useState } from "react";
import UserService from "../service/userService";
import useToken from "../myHooks/useToken";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addManyUrgently, removeCurrentTask, removeMajorTask, removeTodayTask, removeUrgentlyTask, toCompleteReplace } from "../store/tasksReducer";
import TaskList from "../components/TaskList";
import { Notify } from "notiflix";
import { useList } from "../myHooks/useList";
import PageHeader from "../components/PageHeader/PageHeader";
import "../css/Urgently.css";
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { setIsUrgentlyTasksUpd } from "../store/updMarkersReducer";




export default function Urgently () {
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState({sort: "prior", query: ""});
    const updTrigger = useSelector(state => state.isPageUpd.isUrgentlyTasksUpd);
    const tasks = useSelector(state => state.tasks.urgentlyTasks);
    const filteredTasks = useList(tasks, filter.sort, filter.query);
    const token = useToken();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    useEffect(() => {
        const fetchData = async () => {
          if (updTrigger) {
            setIsLoading(false)
            Loading.remove()
            return
          };
          try {
            const res = await UserService.getUrgently(token);
            dispatch(addManyUrgently(res.data));
            dispatch(setIsUrgentlyTasksUpd(true));
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
      }, []);
    
    const onTaskDelete = async (id) => {
      try {
        const res = await UserService.delete(token, id);
        dispatch(removeCurrentTask(id));
        dispatch(removeUrgentlyTask(id));
        dispatch(removeTodayTask(id));
        dispatch(removeMajorTask(id))
      } catch {
        Notify.failure("something goes wrong...=)")
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
        Notify.failure("something goes wrong...=)")
      }
    }

    return (
        <div className="Urgently_wrapper">
            <div className="Urgently__container">
              <PageHeader
                filter={filter}
                setFilter={setFilter}
                location={"Термінові"}
              />
              {isLoading ? 
                  Loading.circle({
                    svgSize: "128px",
                    svgColor: "#F36D0C"
                  }) 
              :
                  <TaskList 
                      tasks={filteredTasks}
                      btnType="До виконаних"
                      taskDelete={onTaskDelete}
                      taskReplace={onTaskReplace}
                  />
              }          
            </div>
        </div>
    )
}