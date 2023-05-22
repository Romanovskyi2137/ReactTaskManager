import React from "react";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import TaskItem from "./TaskIItem";


function TaskList (props) {
    const {tasks, setTasks, setVisible, listType} = props;

    function onTaskDelete (title) {
        setTasks(tasks.filter(task => task.title !== title))
      }
      if(setVisible){
        if(tasks.length === 0){
          setVisible(false);
          return
        }
      }

    
      if(listType === "current"){
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
                        itemType={listType}
                      />
                    </CSSTransition>            
                  )}
                </TransitionGroup>)
      }else if(listType === "completed"){
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
                        itemType={listType}
                      />
                    </CSSTransition>            
                  )}
                </TransitionGroup>)
      }
        
      
    
}

export default TaskList