import {React, useState} from "react";
import ModalWindow from "./ModalWindow/ModalWindow";
import Input from "./UI/Input/Input";
import TaskList from "./TaskList";
import { useList } from "../myHooks/useList";


function CompletedTasksModal ({visible, setVisible, setTasks}) {
    const [completedTasks, setCompletedTasks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const filtered = useList(completedTasks, "", searchQuery);

    function toCurrent (task) {
        // http req
        setCompletedTasks(completedTasks.filter(t => t.title !== task.title))
      };
    return (
        <ModalWindow 
            visible={visible} 
            setVisible={setVisible}
          >
            <Input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Пошук..."
            />
            <hr
              style={{margin: "15px 0"}}
            />
            <TaskList 
              tasks={filtered}
              setTasks={setCompletedTasks}
              setVisible={setVisible}
              btnType="До поточних"
              onTaskReplace={toCurrent}
            />
          </ModalWindow>
    )
};

export default CompletedTasksModal