import {React, useState} from "react";
import ModalWindow from "./ModalWindow/ModalWindow";
import TaskForm from "./TaskForm";
import {Notify} from "notiflix";



function CreateTaskModal ({visible, setVisible, onCreate}) {
    const [newTask, setNewTask] = useState({title: "", body: "", prior: "", iconClassName: ""});
    function onTaskCreate () {
        if (newTask.title === "") {
          Notify.failure("Вкажіть назву задачі.");
          return
        }
        if (newTask.prior === ""){
          Notify.failure("Виберіть пріорітет задачі.");
          return
        }
        onCreate(newTask);
        setNewTask({title: "", body: "", prior: "", iconClassName: ""});
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