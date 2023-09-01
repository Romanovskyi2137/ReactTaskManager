import '../App.css';
import React, { useEffect, useState } from 'react';
import Button from '../components/UI/Button/Button';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import TaskFilter from '../components/TaskFilter';
import { useList } from '../myHooks/useList';
import ModalWindow from '../components/ModalWindow/ModalWindow';
import Input from '../components/UI/Input/Input';
import UserService from "../service/userService"
import CreateTaskModal from '../components/CreateTaskModal';
import CompletedTasksModal from '../components/CompletedTasksModal';
import TaskSpaceHeader from '../components/TaskSpaceHeader';

function Task_space () {
  const [tasks, setTasks] = useState([]);
  const [CTModalVisible, setCTModalVisible] = useState(false);
  const [completedTaskModalVisible, setCompletedTaskModalVisible] = useState(false);
  const [filter, setFilter] = useState({sort: null, query: ""});
  
  // useEffect(() => {
  //   const getData = async () => {
  //     const taskData = await UserService.getCurrent();
  //     setTasks(taskData)
  //   };
  //   getData();    
  // }, []);
  const onCreate = (newTask) => {
    setTasks([newTask, ...tasks])
  };

  const onComplTasksModalOpen = () => {
    setCompletedTaskModalVisible(true)
  };
  const onCreateTaskModalOpen = () => {
    setCTModalVisible(true)
  }

  const filteredTasks = useList(tasks, filter.sort, filter.query);
 
  const toCompleteReplace = (task) => {
    // http req
    setTasks(tasks.filter(t => t.title !== task.title));
  };

  return (
    <div className="App">
      <div className="tasks">
        <div className="tasks__list">
          <CreateTaskModal 
            visible={CTModalVisible} 
            setVisible={setCTModalVisible}
            onCreate={onCreate}
          />

          <CompletedTasksModal
            visible={completedTaskModalVisible}
            setVisible={setCompletedTaskModalVisible}
          />

          <TaskSpaceHeader
            completeModalOpen={onComplTasksModalOpen}
            createModalOpen={onCreateTaskModalOpen}
          />

          <hr style={{margin: "30px 0"}}/>

          <TaskFilter
            filter={filter}
            setFilter={setFilter}
          />

          <hr style={{margin: "30px 0"}}/>
          
          <TaskList 
            tasks={filteredTasks}
            setTasks={setTasks}
            btnType="До виконаних"
            onTaskReplace={toCompleteReplace}
          />          
          

        </div>
      </div>
    </div>
  );
}

export default Task_space;
