import './App.css';
import React, { useState } from 'react';
import TaskItem from './components/TaskIItem';
import CreateTaskModal from './components/CreateTaskModal/CreateTaskModal';
import Button from './components/UI/Button/Button';
import TaskForm from './components/TaskForm';

function App() {
  const [tasks, setTasks] = useState([
    {
      title: "title of the task 1",
      body: "body of the task",
      prior: "1"
    },
    {
      title: "title of the task 2",
      body: "body of the task",
      prior: "3"
    },
    {
      title: "title of the task 3",
      body: "body of the task",
      prior: "2"
    }
  ]);
  const [CTModalVisible, setCTModalVisible] = useState(false);
  const [newTask, setNewTask] = useState({title: "", body: "", prior: ""})
  

  function onTaskCreate () {
    setTasks([newTask, ...tasks])
    setCTModalVisible(false)
    setNewTask({title: "", body: "", prior: ""})
  }

  function onTaskDelete (title) {
    setTasks(tasks.filter(task => task.title !== title))
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

        {tasks.map(task => <TaskItem task={task}  key={task.title} onTaskDelete={onTaskDelete}/>)}

        </div>
      </div>
    </div>
  );
}

export default App;
