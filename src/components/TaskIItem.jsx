import React from 'react';
import Button from './UI/Button/Button';


function TaskItem (props) {

    return (
        <div className="task__item">
            <div style={{maxWidth: "75%"}}>
                <h3 style={{marginBottom: "12px"}}>{props.task.title}</h3>
                <h4 style={{marginBottom: "10px"}}> {props.task.prior} - priority</h4>
                <p>{props.task.body}</p>
            </div>
            <div className="taskItem__btns">
                <Button>Complete task</Button>  
                <Button 
                    style={{marginTop: "10px"}}
                    onClick={() => props.onTaskDelete(props.task.title)}    
                >
                    Delete task
                </Button>
            </div>
        </div>
    )
}

export default TaskItem