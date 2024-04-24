import {React} from "react";
import ModalWindow from "./ModalWindow/ModalWindow";
import TaskForm from "./TaskForm";
import { useDispatch, useSelector } from "react-redux";
import { hideCreateTaskModal } from "../store/modalVisibleReducer";
import UserService from "../service/userService";
import {Notify} from "notiflix";
import { addOneCurrentTask } from "../store/tasksReducer";
import { resetEditTask } from "../store/taskEditReducer";
import useToken from "../myHooks/useToken";


function CreateTaskModal () {
    const createTaskModalVisible = useSelector(state => state.modalVisible.createTaskModalVisible); 
    const dispatch = useDispatch();
    const token = useToken();  

    async function onTaskCreate (e, task) {
        e.preventDefault();
        if (task.title === "") {
          Notify.failure("Вкажіть назву задачі.");
          return
        };
        if (task.prior === ""){
          Notify.failure("Виберіть пріоритет задачі.");
          return
        };
        try {
          const res = await UserService.create(token, task);
          dispatch(addOneCurrentTask(task));
          dispatch(resetEditTask());
          dispatch(hideCreateTaskModal())
        } catch (e) {
          Notify.failure("Щось пішло не так =(");
          return
        }
      } 
      
    return(
        <ModalWindow 
            visible={createTaskModalVisible} 
            setVisible={() => dispatch(hideCreateTaskModal())}
        >
            <TaskForm
              visible={createTaskModalVisible}
              onFormSubmit={onTaskCreate}
            />
        </ModalWindow>
    )
};


export default CreateTaskModal