import React from "react";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import TaskItem from "./TaskIItem";


function TaskList (props) {
    const {tasks, setTasks, setVisible, btnType, onTaskReplace} = props;

    if(tasks.length === 0){
      return (<h3 style={{textAlign: "center"}}>Список пустий.</h3>)
    }

    if(setVisible){
      if(tasks.length === 0){
        setVisible(false);
        return
      }
    }

    function onTaskDelete (title) {
      setTasks(tasks.filter(task => task.title !== title))
    }

    
    return (<TransitionGroup>
            {tasks.map(task => 
              <CSSTransition
                  key={task.title}
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