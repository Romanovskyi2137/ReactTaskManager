import {React, useState} from "react";
import ModalWindow from "./ModalWindow/ModalWindow";
import TaskForm from "./TaskForm";
import {Notify} from "notiflix";
import {v4 as uuidv4} from "uuid";
import UserService from "../service/userService";
import useToken from "../myHooks/useToken";



function CreateTaskModal ({visible, setVisible, onCreate}) {
    const taskSample = {
      title: "", 
      body: "", 
      prior: "", 
      iconClassName: "", 
      id: uuidv4(), 
      startPoint: "", 
      endPoint: ""
    };
    const token = useToken();
    const [newTask, setNewTask] = useState(taskSample);
    async function onTaskCreate () {
        if (newTask.title === "") {
          Notify.failure("Вкажіть назву задачі.");
          return
        };
        if (newTask.prior === ""){
          Notify.failure("Виберіть пріорітет задачі.");
          return
        };
        onCreate(newTask);
        // const res = await UserService.create(token, newTask);
        // sending empty {}
        setNewTask(taskSample);
        setVisible(false);
      }
    
    return(
        <ModalWindow visible={visible} setVisible={setVisible}>
            <TaskForm
              setNewTask={setNewTask}
              onTaskCreate={onTaskCreate}
              newTask={newTask}
              visible={setVisible}
            />
          </ModalWindow>
    )
};


export default CreateTaskModal