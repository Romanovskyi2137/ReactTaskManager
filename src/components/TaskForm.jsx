import React from "react";
import Input from "./UI/Input/Input";
import TextArea from "./UI/TextArea/TextArea";
import Button from "./UI/Button/Button";
import PriorPicker from "./UI/PriorPicker/PriorPicker";
import DataPicker from "./UI/DataPicker/DataPicker";

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
              placeholder="Назва"  
            />
             <TextArea 
              value={newTask.body}
              onChange={e => setNewTask({...newTask, body: e.target.value})}
              placeholder="Опис"  
            />
            <div>

            <PriorPicker 
              getPrior={getPrior}
              visible={visible} 
            />

            <DataPicker
              onChange={(value) => setNewTask({...newTask, endPoint: value})}
            />
      

            </div>

            <div style={{display: "flex", justifyContent: "flex-end"}}>
              <Button
                type= "submit"
                onClick={e => onTaskCreate()}
              >
                Створити задачу
              </Button>
            </div>

        </form>
    )
}

export default TaskForm