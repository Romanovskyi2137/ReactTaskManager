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
import { useDispatch, useSelector } from 'react-redux';
import { addManyTasks } from '../store/tasksReducer';



function Task_space () {
  const tasks = useSelector(state => state.tasks.currentTasks)
  const [CTModalVisible, setCTModalVisible] = useState(false);
  const [completedTaskModalVisible, setCompletedTaskModalVisible] = useState(false);
  const [filter, setFilter] = useState({sort: null, query: ""});
  const [isLoading, setIsLoading] = useState(true);
  const token = useToken();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await UserService.getCurrent(token);
        dispatch(addManyTasks(res.data));
        setIsLoading(false)
      } catch (e) {
        if (e.response.status === 400) {
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

  const onComplTasksModalOpen = () => {
    setCompletedTaskModalVisible(true)
  };
  const onCreateTaskModalOpen = () => {
    setCTModalVisible(true)
  }

  const filteredTasks = useList(tasks, filter.sort, filter.query);

  return (
    <div className="App">
      <div className="tasks">
        <div className="tasks__list">
          {CTModalVisible
          ?
            <CreateTaskModal 
              visible={CTModalVisible} 
              setVisible={setCTModalVisible}
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
              btnType="До виконаних"
            />
          }          
          

        </div>
      </div>
    </div>
  );
}

export default Task_space;
