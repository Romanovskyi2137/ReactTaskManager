import React, { useEffect, useState } from "react";
import Input from "./UI/Input/Input";
import TextArea from "./UI/TextArea/TextArea";
import Button from "./UI/Button/Button";
import PriorPicker from "./UI/PriorPicker/PriorPicker";
import { useDispatch } from "react-redux";
import { addOneCurrentTask } from "../store/tasksReducer";
import {Notify} from "notiflix";
import {v4 as uuidv4} from "uuid";
import UserService from "../service/userService";
import useToken from "../myHooks/useToken";
import { DateTimePicker } from "@mui/x-date-pickers";

function TaskForm ({visible, setVisible}) {
    const dispatch = useDispatch()
    const token = useToken();
    const taskSample = {
      title: "", 
      body: "", 
      prior: "", 
      iconClassName: "", 
      id: uuidv4(),  
      endPoint: null
    }; 
    const [newTask, setNewTask] = useState(taskSample);
    const getPrior = ({number, iconClass}) => {
      setNewTask({...newTask, prior: number, iconClassName: iconClass});
    };
    const getTime = (millis) => {
      if (newTask.endPoint == null) {
        Notify.failure("Оберіть дату!")
        return
      };
      setNewTask({...newTask, endPoint: (newTask.endPoint + millis)})
    };
    async function onTaskCreate (e) {
      e.preventDefault();
      if (newTask.title === "") {
        Notify.failure("Вкажіть назву задачі.");
        return
      };
      if (newTask.prior === ""){
        Notify.failure("Виберіть пріоритет задачі.");
        return
      };
      try {
        const res = await UserService.create(token, newTask);
        dispatch(addOneCurrentTask(newTask))
        setNewTask(taskSample);
        setVisible(false);
      } catch (e) {
        Notify.failure("Щось пішло не так =(");
        return
      }
    }
    return (
        <form 
          onSubmit={async e => onTaskCreate(e)}
          style={{display: "flex", flexDirection: "column"}}
        >
            <Input 
              type="text"
              value={newTask.title}
              onChange={e => setNewTask({...newTask, title: e.target.value})}
              placeholder="Назва"  
            />
             <TextArea 
              value={newTask.body}
              onChange={e => setNewTask({...newTask, body: e.target.value})}
              placeholder="Опис"  
            />
            <div className="TaskForm_pickers">

              <PriorPicker 
                getPrior={getPrior}
                visible={visible} 
              />

              <DateTimePicker
                ampm={false}
                ampmInClock={true}
                value={newTask.endPoint}
                onChange={value => setNewTask({...newTask, endPoint: value.$d.getTime()})}

              />

            </div>

            <div style={{display: "flex", justifyContent: "flex-end"}}>
              <Button
                type= "submit"
              >
                Створити
              </Button>
            </div>

        </form>
    )
}

export default TaskForm