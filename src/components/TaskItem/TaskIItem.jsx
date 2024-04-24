import React from 'react';
import "./TaskItem.css"
import TaskTimer from '../UI/TaskTimer/TaskTimer';
import { Notify } from "notiflix";
import { IconButton } from '@mui/material';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import { useDispatch } from 'react-redux';
import { toEditTask } from '../../store/taskEditReducer';
import { showEditTaskModal } from '../../store/modalVisibleReducer';


function TaskItem ({task, taskReplace, taskDelete}) {
    const dispatch = useDispatch();
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
                await taskDelete(id)
            } catch (e) {
                console.log(e)
                Notify.failure("Щось пішло не так =(");
            }
    };
    const onTaskEdit = (task) => {
        dispatch(toEditTask(task));
        dispatch(showEditTaskModal())
    }
    return (
        <div className='task_item__container'>
            <div className={task__item_className}>
                <div className='task_item__content'>
                    <h3 className={task.prior}>{task.title}</h3>
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
                    <IconButton onClick={() => onTaskReplace(task.id)}>
                        
                        <CheckCircleOutlineIcon
                            fontSize='large'
                        />

                    </IconButton>
                    <IconButton
                        onClick={() => onTaskEdit(task)}
                    >
                        <CreateRoundedIcon
                            fontSize='large'
                        />
                    </IconButton>
                    <IconButton 
                        onClick={() => onTaskDelete(task.id)}
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