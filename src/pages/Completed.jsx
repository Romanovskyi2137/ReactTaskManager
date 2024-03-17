import {React, useEffect, useState} from "react";
import TaskList from "../components/TaskList";
import UserService from "../service/userService";
import useToken from "../myHooks/useToken";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addManyCompletedTasks, removeCompletedTask, toCurrentReplace } from "../store/tasksReducer";
import { Notify } from "notiflix";
import "../css/Completed.css"
import PageHeader from "../components/PageHeader/PageHeader";
import { useList } from "../myHooks/useList";
import { Loading } from 'notiflix/build/notiflix-loading-aio';


export default function Completed () {
    const completedTasks = useSelector(state => state.tasks.completedTasks);
    const [filter, setFilter] = useState({sort: "prior", query: ""});
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const token = useToken();
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
      const fetchData = async () => {
        if (completedTasks.length != 0) {
          setIsLoading(false)
          Loading.remove()
          return
        };
        try {
          const res = await UserService.getComplete(token);
          dispatch(addManyCompletedTasks(res.data));
          setIsLoading(false)
          Loading.remove()
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
      try {
        const res = await UserService.delete(token, id);
        dispatch(removeCompletedTask(id));
      } catch {
        Notify.failure("sometihg goes wrong...=)")
      }
    };
    const onTaskReplace = async (id) => {
      try {
        const res = await UserService.replace(token, id, "to_current");
        dispatch(toCurrentReplace(id));
      } catch {
        Notify.failure("sometihg goes wrong...=)")
      }
    }

    const filteredTasks = useList(completedTasks, filter.sort, filter.query)

    return (
        <div className="Completed_wrapper">
          <div className="Completed__container">
            <PageHeader
              filter={filter}
              setFilter={setFilter}
              location={"Виконані"}
            />
            {isLoading ?
                  Loading.circle({
                    svgSize: "128px",
                    svgColor: "#F36D0C"
                  })
              :
                <TaskList 
                  tasks={filteredTasks}
                  btnType="До поточних"
                  taskDelete={onTaskDelete}
                  taskReplace={onTaskReplace}
                />
              }
          </div>
        </div>
    )
};

