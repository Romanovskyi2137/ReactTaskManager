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
import { Notify } from "notiflix";
import { Loading } from 'notiflix/build/notiflix-loading-aio';


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
            navigate("/login", {
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
              Loading.circle({
                svgSize: "128px",
                svgColor: "#F36D0C"
              })
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