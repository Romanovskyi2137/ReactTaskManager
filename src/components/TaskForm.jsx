import React from "react";
import Input from "./UI/Input/Input";
import TextArea from "./UI/TextArea/TextArea";
import Button from "./UI/Button/Button";
import PriorPicker from "./UI/PriorPicker/PriorPicker";

function TaskForm ({setNewTask, onTaskCreate, newTask, visible}) {
    const getPrior = ({number, iconClass}) => {
      setNewTask({...newTask, prior: number, iconClassName: iconClass});
      }

    return (
        <form 
          onSubmit={e => e.preventDefault()}
        >
            <Input 
              type="text"
              value={newTask.title}
              onChange={e => setNewTask({...newTask, title: e.target.value})}
              placeholder="Title of the task"  
            />
             <TextArea 
              value={newTask.body}
              onChange={e => setNewTask({...newTask, body: e.target.value})}
              placeholder="Description of the task"  
            />
            <div>

            <PriorPicker 
              getPrior={getPrior}
              visible={visible} 
            />
      

            </div>

            <div style={{display: "flex", justifyContent: "flex-end"}}>
              <Button
                type= "submit"
                onClick={e => onTaskCreate()}
              >
                Create task
              </Button>
            </div>

        </form>
    )
}

export default TaskForm