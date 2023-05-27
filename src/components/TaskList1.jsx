import React from "react";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import TaskItem from "./TaskIItem";

// переробити компонент, навіщо вкидати одночасно усі масиви через пропси у все підряд? це тупо. Взаємодія із списками і стейтами де вони зберігаються має відбуватись через колбеки.

function TaskList (props) {
    const {tasks, setTasks, setVisible, listType} = props;

    function onTaskDelete (title) {
      setTasks(tasks.filter(task => task.title !== title))
    }
    const toCompleteReplace = (task) => {
      setTasks([task, ...tasks]);
      onTaskDelete(task.title)
    }

    function toCurrentReplace (task) {
      setTasks([task, ...tasks])
      onTaskDelete(task.title)
    }

    if(tasks.length === 0){
      return (<h3 style={{textAlign: "center"}}>Список пустий.</h3>)
    }

    if(setVisible){
      if(tasks.length === 0){
        setVisible(false);
        return
      }
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
                itemType={listType}
                toComplete={toCompleteReplace}
                />
            </CSSTransition>            
            )}
        </TransitionGroup>)
    
}

export default TaskList