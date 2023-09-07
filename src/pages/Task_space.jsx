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
  }, [])

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
            />
          :
            <></>
          }

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
