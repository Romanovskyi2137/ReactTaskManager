import React, { useEffect, useState } from "react";
import UserService from "../service/userService";
import useToken from "../myHooks/useToken";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addManyToday, removeCurrentTask, removeMajorTask, removeTodayTask, removeUrgentlyTask, toCompleteReplace } from "../store/tasksReducer";
import TaskList from "../components/TaskList";
import { Notify } from "notiflix";
import "../css/TodayPage.css";
import PageHeader from "../components/PageHeader/PageHeader.jsx"
import { useList } from "../myHooks/useList.js";
import { Loading } from 'notiflix/build/notiflix-loading-aio';



export default function TodayPage () {
    const token = useToken();
    const tasks = useSelector(state => state.tasks.todayTasks);
    const [filter, setFilter] = useState({sort: "prior", query: ""});
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    useEffect(() => {
        const fetchData = async () => {
          if (tasks.length != 0) {
            setIsLoading(false)
            Loading.remove()
            return
          };
          try {
            const res = await UserService.getToday(token);
            dispatch(addManyToday(res.data));
            setIsLoading(false)
            Loading.remove()
          } catch (e) {
            if (e.response.status === 400) {
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
        dispatch(removeTodayTask(id));
        dispatch(removeMajorTask(id));
        dispatch(removeUrgentlyTask(id));
      } catch {
        Notify.failure('something goes wrong...=)')
      }
    };
    const onTaskReplace = async (id) => {
      try {
        const res = await UserService.replace(token, id, "to_complete");
        dispatch(toCompleteReplace(id));
        dispatch(removeTodayTask(id));
        dispatch(removeMajorTask(id));
        dispatch(removeUrgentlyTask(id));
      } catch {
        Notify.failure('something goes wrong...=)')
      }
    }

    const filteredTasks = useList(tasks, filter.sort, filter.query)
    return (
        <div className="TodayPage_wrapper">
          <div className="TodayPage__container">
            <PageHeader
              filter={filter}
              setFilter={setFilter}
              location="Сьогодні"
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