import './App.css';
import React, { useState } from 'react';
import TaskItem from './components/TaskIItem';
import CreateTaskModal from './components/CreateTaskModal/CreateTaskModal';
import Input from './components/UI/Input/Input';
import Button from './components/UI/Button/Button';

function App() {
  const [tasks, setTasks] = useState([
    {
      title: "title of the task",
      body: "body of the task",
    }
  ]);
  const [CTModalVisible, setCTModalVisible] = useState(false);
  const [newTask, setNewTask] = useState({title: "", body: ""})
  

  function onTaskCreate (e) {
    setTasks([newTask, ...tasks])
    setCTModalVisible(false)
    setNewTask({title: "", body: ""})
  }


  return (
    <div className="App">
      <div className="tasks">
        <div className="tasks__list">
          <CreateTaskModal visible={CTModalVisible} setVisible={setCTModalVisible}>
            <Input 
              type={"text"}
              value={newTask.title}
              onChange={e => setNewTask({...newTask, title: e.target.value})}
              placeholder="Title of the task"  
            />
             <Input 
              type={"text"}
              value={newTask.body}
              onChange={e => setNewTask({...newTask, body: e.target.value})}
              placeholder="Body of the task"  
            />
            <Button
              onClick={onTaskCreate}
            >
              Create task
            </Button>
            
          </CreateTaskModal>
          <div className="tasks__list_header">
            <h2>list title</h2>
            <button
              onClick={e => setCTModalVisible(true)}
            >
              Create task
            </button>
          </div>
          
          <hr style={{margin: "30px 0"}}/>

        {tasks.map(task => <TaskItem task={task}  key={task.title}/>)}

        </div>
      </div>
    </div>
  );
}

export default App;
