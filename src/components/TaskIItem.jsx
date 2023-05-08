import React from 'react';


function TaskItem (props) {
    

    return (
        <div className="task__item">
            <h3>{props.task.title}</h3>
            <p>{props.task.body}</p>
        </div>
    )
}

export default TaskItem