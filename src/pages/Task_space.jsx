import '../App.css';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TaskList from '../components/TaskList';
import TaskFilter from '../components/TaskFilter';
import { useList } from '../myHooks/useList';
import CreateTaskModal from '../components/CreateTaskModal';
import CompletedTasksModal from '../components/CompletedTasksModal';
import TaskSpaceHeader from '../components/TaskSpaceHeader';
import UserService from '../service/userService';
import useToken from '../myHooks/useToken';
import { Notify } from 'notiflix';



function Task_space () {
  const [tasks, setTasks] = useState([]);
  const [CTModalVisible, setCTModalVisible] = useState(false);
  const [completedTaskModalVisible, setCompletedTaskModalVisible] = useState(false);
  const [filter, setFilter] = useState({sort: null, query: ""});
  const [isLoading, setIsLoading] = useState(true);
  const token = useToken();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await UserService.getCurrent(token);
        setTasks(res.data);
        setIsLoading(false)
      } catch (e) {
        if (e.response.status == 400) {
          navigate("/auth", {
            state: {
              from: location
            },
            replace: true
          })
        }
      }
    };
    fetchData();
  }, []);

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
 
  const toCompleteReplace = async (task) => {
    const {id} = task;
    try {
      const res = await UserService.replace(token, id, "to_complete")
      setTasks(tasks.filter(t => t.title !== task.title));
    } catch (e) {
      Notify.failure("Щось пішло не так =(")
    }
  };

  const toCurrentReplace = (task) => {
    setTasks([task, ...tasks])
  };

  return (
    <div className="App">
      <div className="tasks">
        <div className="tasks__list">
          {CTModalVisible
          ?
            <CreateTaskModal 
              visible={CTModalVisible} 
              setVisible={setCTModalVisible}
              onCreate={onCreate}
            />
          :
            <></>
          }
          {completedTaskModalVisible ?
            <CompletedTasksModal
            visible={completedTaskModalVisible}
            setVisible={setCompletedTaskModalVisible}
            toCurrentReplace={toCurrentReplace}
            />
          :
            <></>
          }

          <TaskSpaceHeader
            completeModalOpen={onComplTasksModalOpen}
            createModalOpen={onCreateTaskModalOpen}
          />

          <TaskFilter
            filter={filter}
            setFilter={setFilter}
          />

          <hr style={{margin: "30px 0"}}/>
          
          {isLoading ? 
            <h1>loading...</h1> 
          :
            <TaskList 
              tasks={filteredTasks}
              setTasks={setTasks}
              btnType="До виконаних"
              onTaskReplace={toCompleteReplace}
            />
          }          
          

        </div>
      </div>
    </div>
  );
}

export default Task_space;
