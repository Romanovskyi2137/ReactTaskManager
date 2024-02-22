import React, { useState } from 'react';
import "./TaskItem.css"
import TaskTimer from '../UI/TaskTimer/TaskTimer';
import { Notify } from "notiflix";
import { IconButton } from '@mui/material';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';




function TaskItem ({task, taskReplace,}) {
    const task__item_className = `task__item ${("prior_" + task.prior)}`;
    const onTaskReplace = async (id) => {
        try {
           await taskReplace(id)
        } catch (e) {
          Notify.failure("Щось пішло не так =(")
        }
      };
    const onTaskDelete = async (id) => {
            try {
                await taskReplace(id)
            } catch (e) {
                console.log(e)
                Notify.failure("Щось пішло не так =(");
            }
        };
    return (
        <div className='task_item__container'>
            <div className={task__item_className}>
                <div className='task_item__content'>
                    <h3>{task.title}</h3>
                    <p>{task.body}</p>
                    <div className='timer_component_container'>
                        {task.endPoint ?
                            <TaskTimer endPoint={task.endPoint}/>
                        :
                            null
                        }
                    </div>
                </div>
                <div className="taskItem__btns">
                    <IconButton onClick={e => onTaskReplace(task.id)}>
                        
                        <CheckCircleOutlineIcon
                            fontSize='large'
                        />
                        <UndoIcon
                            fontSize="large"
                        />
                    </IconButton>
                    <IconButton 
                        onClick={e => onTaskDelete(task.id)}
                    >
                        <HighlightOffIcon
                            fontSize='large'
                        />
                    </IconButton>
                </div>
            </div>
        </div>
            )
    
}

export default TaskItem