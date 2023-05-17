import React from "react";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import TaskItem from "./TaskIItem";


function TaskList (props) {
    const {tasks, setTasks} = props;

    function onTaskDelete (title) {
        setTasks(tasks.filter(task => task.title !== title))
      }

    return (
        <TransitionGroup>
          {tasks.map(task => 
            <CSSTransition
            key={task.title}
            classNames="task"
            timeout={500}
            >
              <TaskItem task={task} onTaskDelete={onTaskDelete}/>
            </CSSTransition>            
          )}
        </TransitionGroup>
    )
}

export default TaskList