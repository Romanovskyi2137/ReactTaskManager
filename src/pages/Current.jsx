import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TaskList from '../components/TaskList';
import { useList } from '../myHooks/useList';
import UserService from '../service/userService';
import useToken from '../myHooks/useToken';
import { useDispatch, useSelector } from 'react-redux';
import { addManyTasks, removeCurrentTask, removeMajorTask, removeTodayTask, removeUrgentlyTask, toCompleteReplace } from '../store/tasksReducer';
import { Notify } from 'notiflix';
import PageHeader from '../components/PageHeader/PageHeader';



export default function Current () {
  const tasks = useSelector(state => state.tasks.currentTasks)
  const [filter, setFilter] = useState({sort: "prior", query: ""});
  const [isLoading, setIsLoading] = useState(true);
  const token = useToken();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      if (tasks.length != 0) {
        setIsLoading(false)
        return
      };
      try {
        const res = await UserService.getCurrent(token);
        dispatch(addManyTasks(res.data));
        setIsLoading(false)
      } catch (e) {
        if (e.response.status === 400) {
          navigate("/login", {
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

  const onTaskDelete = async (id) => {
    try {
      const res = await UserService.delete(token, id);
      dispatch(removeCurrentTask(id));
      dispatch(removeMajorTask(id));
      dispatch(removeUrgentlyTask(id))
      dispatch(removeTodayTask(id))
    } catch (e) {
      console.log(e);
      Notify.failure("something goes wrong...=)")
    }
  };
  const onTaskReplace = async (id) => {
    try {
      const res = await UserService.replace(token, id, "to_complete");
      dispatch(toCompleteReplace(id));
      dispatch(removeMajorTask(id));
      dispatch(removeUrgentlyTask(id))
      dispatch(removeTodayTask(id))
    } catch (e) {
      console.log(e);
      Notify.failure("something goes wrong...=)")
    }
  };

  const filteredTasks = useList(tasks, filter.sort, filter.query);

  return (
    <div className="current">
        <PageHeader
          filter={filter}
          setFilter={setFilter}
        />  
        <div className="tasks__list">        
          {isLoading ? 
            <h1>loading...</h1> 
          :
            <TaskList 
              tasks={filteredTasks}
              btnType="До виконаних"
              taskDelete={onTaskDelete}
              taskReplace={onTaskReplace}
            />
          }          
          

        </div>
    </div>
  );
}

