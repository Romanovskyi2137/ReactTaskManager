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
      endPoint: null
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
        try {
          const res = await UserService.create(token, newTask);
          onCreate(newTask);
          setNewTask(taskSample);
          setVisible(false);
        } catch (e) {
          Notify.failure("Щось пішло не так =(");
          return
        }
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