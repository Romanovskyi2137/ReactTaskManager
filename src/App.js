import './App.css';
import React, { useEffect, useState } from 'react';
import TaskItem from './components/TaskIItem';
import CreateTaskModal from './components/CreateTaskModal/CreateTaskModal';
import Button from './components/UI/Button/Button';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';



function App() {
  const [tasks, setTasks] = useState([
    {
      title: "title of the task 1",
      body: "body of the task",
      prior: "1",
      iconClassName: "fi fi-rs-flame"
    },
    {
      title: "title of the task 2",
      body: "body of the task",
      prior: "3",
      iconClassName: "fi fi-ss-flame"
    },
    {
      title: "title of the task 3",
      body: "body of the task",
      prior: "2",
      iconClassName: "fi fi-bs-flame"
    }
  ]);
  const [CTModalVisible, setCTModalVisible] = useState(false);
  const [newTask, setNewTask] = useState({title: "", body: "", prior: "", iconClassName: ""});
  

  function onTaskCreate () {
    if (newTask.title === "") {
      alert("Вкажіть назву задачі.");
      return
    }
    if (newTask.prior === ""){
      alert("Виберіть пріорітет задачі.");
      return
    }
    setTasks([newTask, ...tasks])
    setCTModalVisible(false)
    setNewTask({title: "", body: "", prior: "", iconClassName: ""})
  }

  return (
    <div className="App">
      <div className="tasks">
        <div className="tasks__list">
          <CreateTaskModal visible={CTModalVisible} setVisible={setCTModalVisible}>
            <TaskForm
              setNewTask={setNewTask}
              onTaskCreate={onTaskCreate}
              newTask={newTask}
              visible={CTModalVisible}
            />
          </CreateTaskModal>
          <div className="tasks__list_header">
            <h2>list title</h2>
            <Button
              onClick={e => setCTModalVisible(true)}
            >
              Create task
            </Button>
          </div>
          
          <hr style={{margin: "30px 0"}}/>
          
          <TaskList tasks={tasks} setTasks={setTasks}/>

        </div>
      </div>
    </div>
  );
}

export default App;
