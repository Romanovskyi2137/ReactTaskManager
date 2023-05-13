import React, { useState } from "react";
import Input from "./UI/Input/Input";
import TextArea from "./UI/TextArea/TextArea";
import Button from "./UI/Button/Button";
import PriorPicker from "./UI/PriorPicker/PriorPicker";

function TaskForm ({setNewTask, onTaskCreate, newTask}) {
    const [prior, setPrior] = useState("");
    function onPriorClick (e) {
      setPrior(e.target.value);
      setNewTask({...newTask, prior: prior});
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
            {/* <i class="fi fi-ss-flame"></i> */}

            <PriorPicker/>
      

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