import React from "react";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import TaskItem from "./TaskIItem";


function TaskList (props) {
    const {tasks, btnType, taskDelete, taskReplace} = props;
    if(!tasks.length){
      return (<h3 style={{textAlign: "center"}}>Список пустий.</h3>)
    };

    
    return (
        <div className="tasks">
          <TransitionGroup>
            {tasks.map(task => 
              <CSSTransition
                  key={task.id}
                  classNames="task"
                  timeout={500}
                  >
                  <TaskItem 
                    task={task} 
                    btnType={btnType}
                    startPoint={null}
                    endPoint={null}
                    taskDelete={taskDelete}
                    taskReplace={taskReplace}
                  />
              </CSSTransition>            
            )}
          </TransitionGroup>
        </div>
        )
    
}

export default TaskList