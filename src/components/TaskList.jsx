import React from "react";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import TaskItem from "./TaskIItem";

// переробити компонент, навіщо вкидати одночасно усі масиви через пропси у все підряд? це тупо.

function TaskList (props) {
    const {curTasks, setCurTasks, setVisible, listType, complTasks, setComplTask} = props;

    function onTaskDelete (title) {
      setCurTasks(curTasks.filter(task => task.title !== title))
    }
    const toCompleteReplace = (task) => {
      setComplTask([task, ...complTasks]);
      onTaskDelete(task.title)
    }

    function toCurrentReplace (task) {
      setCurTasks([task, ...curTasks])
      onTaskDelete(task.title)
      // setComplTask(complTasks.filter(task => task.title !== title))
    }
    if(curTasks.length === 0){
      return (<h3 style={{textAlign: "center"}}>Список пустий.</h3>)
    }

    if(setVisible){
      if(complTasks.length === 0){
        setVisible(false);
        return
      }
    }

    
    if(listType === "current"){
        return (<TransitionGroup>
                  {curTasks.map(task => 
                    <CSSTransition
                    key={task.title}
                    classNames="task"
                    timeout={500}
                    >
                      <TaskItem 
                        task={task} 
                        onTaskDelete={onTaskDelete}
                        itemType={listType}
                        toComplete={toCompleteReplace}
                      />
                    </CSSTransition>            
                  )}
                </TransitionGroup>)
      }else if(listType === "completed"){
        return (<TransitionGroup>
                  {complTasks.map(task => 
                    <CSSTransition
                    key={task.title}
                    classNames="task"
                    timeout={500}
                    >
                      <TaskItem 
                        task={task} 
                        onTaskDelete={onTaskDelete}
                        itemType={listType}
                        toCurrent={toCurrentReplace}
                      />
                    </CSSTransition>            
                  )}
                </TransitionGroup>)
      }
        
      
    
}

export default TaskList