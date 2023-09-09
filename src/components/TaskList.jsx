import React from "react";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import TaskItem from "./TaskIItem";
import useToken from "../myHooks/useToken";
import UserService from "../service/userService";
import { Notify } from "notiflix";


function TaskList (props) {
    const {tasks, setTasks, setVisible, btnType, onTaskReplace} = props;
    const token = useToken();

    if(tasks.length === 0){
      return (<h3 style={{textAlign: "center"}}>Список пустий.</h3>)
    };

    if(setVisible){
      if(tasks.length === 0){
        setVisible(false);
        return
      }
    };

    async function onTaskDelete (task) {
      const {id} = task;
      try {
        const res = await UserService.delete(token, id);
        setTasks(tasks.filter(task => task.id !== id))
      } catch (e) {
        Notify.failure("Щось пішло не так =(");
        return
      }
    };

    
    return (<TransitionGroup>
            {tasks.map(task => 
              <CSSTransition
                  key={task.id}
                  classNames="task"
                  timeout={500}
                  >
                  <TaskItem 
                  task={task} 
                  onTaskDelete={onTaskDelete}
                  btnType={btnType}
                  onTaskReplace={onTaskReplace}
                  startPoint={null}
                  endPoint={null}
                  />
              </CSSTransition>            
            )}
        </TransitionGroup>)
    
}

export default TaskList