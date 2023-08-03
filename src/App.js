import './App.css';
import React, { useEffect, useState } from 'react';
import Button from './components/UI/Button/Button';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import { useList } from './myHooks/useList';
import ModalWindow from './components/ModalWindow/ModalWindow';
import Input from './components/UI/Input/Input';
import Error from './components/UI/Error/Error'

function App() {
  const [tasks, setTasks] = useState([
    {
      title: "title of the task 1",
      body: "body of the task",
      prior: "3",
      iconClassName: "fi fi-rs-flame",
      startPoint: null,
      endPoint: null
    },
    {
      title: "title of the task 2",
      body: "body of the task",
      prior: "1",
      iconClassName: "fi fi-ss-flame"
    },
    {
      title: "title of the task 3",
      body: "body of the task",
      prior: "2",
      iconClassName: "fi fi-bs-flame"
    }
  ]);
  const [completedTasks, setCompletedTasks] = useState([
    {
      title: "title of the completed task 1",
      body: "body of the task",
      prior: "3",
      iconClassName: "fi fi-rs-flame"
    },
    {
      title: "title of the the completed task 2",
      body: "body of the task",
      prior: "1",
      iconClassName: "fi fi-ss-flame"
    },
    {
      title: "title of the the completed task 3",
      body: "body of the task",
      prior: "2",
      iconClassName: "fi fi-bs-flame"
    },
  ])
  const [CTModalVisible, setCTModalVisible] = useState(false);
  const [completedTaskModalVisible, setcompletedTaskModalVisible] = useState(false);
  const [newTask, setNewTask] = useState({title: "", body: "", prior: "", iconClassName: ""});
  const [filter, setFilter] = useState({sort: null, query: ""});
  const [completedTaskSearchQuery, setCompletedTaskSearchQuery] = useState("")

  const filteredTasks = useList(tasks, filter.sort, filter.query);
  const filteredCompletedTasks = useList(completedTasks, "", completedTaskSearchQuery)
  

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
 
  const toCompleteReplace = (task) => {
    setCompletedTasks([task, ...completedTasks]);
    setTasks(tasks.filter(t => t.title !== task.title))
  }

  function toCurrentReplace (task) {
    setTasks([task, ...tasks])
    setCompletedTasks(completedTasks.filter(t => t.title !== task.title))
  }

  return (
    <div className="App">

      {/* тут має бути компонент, з реєстрацією/авторизацією користувача */}

      <div className="tasks">
        <div className="tasks__list">
          <ModalWindow visible={CTModalVisible} setVisible={setCTModalVisible}>
            <TaskForm
              setNewTask={setNewTask}
              onTaskCreate={onTaskCreate}
              newTask={newTask}
              visible={CTModalVisible}
            />
          </ModalWindow>

          <ModalWindow 
            visible={completedTaskModalVisible} 
            setVisible={setcompletedTaskModalVisible}
          >
            <Input
              type="text"
              value={completedTaskSearchQuery}
              onChange={e => setCompletedTaskSearchQuery(e.target.value)}
              placeholder="Пошук..."
            />
            <hr
              style={{margin: "15px 0"}}
            />
            <TaskList 
              tasks={filteredCompletedTasks}
              setTasks={setCompletedTasks}
              setVisible={setcompletedTaskModalVisible}
              btnType="До поточних"
              onTaskReplace={toCurrentReplace}
            />
          </ModalWindow>

          <div className="tasks__list_header">
            <h2>React Task Manager</h2>
            <div className='header__btns'>
              <Button
                onClick={e => setcompletedTaskModalVisible(true)}
              >
                Виконані задачі
              </Button>
              <Button
                style={{marginLeft: "15px"}}
                onClick={e => setCTModalVisible(true)}
              >
                Створити задачу
              </Button>
            </div>
          </div>
          
          <hr style={{margin: "30px 0"}}/>

          <TaskFilter
            filter={filter}
            setFilter={setFilter}
          />
          <Error
            message={"error text"}
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

export default App;
