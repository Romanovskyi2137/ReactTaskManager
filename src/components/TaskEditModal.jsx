import {React} from "react";
import ModalWindow from "./ModalWindow/ModalWindow";
import TaskForm from "./TaskForm";
import {Notify} from "notiflix";
import UserService from "../service/userService";
import { useDispatch, useSelector } from "react-redux";
import { hideEditTaskModal } from "../store/modalVisibleReducer";
import { resetEditTask } from "../store/taskEditReducer";
import useToken from "../myHooks/useToken";

function TaskEditModal () {
    const editTaskModalVisible = useSelector(state => state.modalVisible.editTaskModalVisible);
    const newTask = useSelector(state => state.taskEdit.task) 
    const dispatch = useDispatch();
    const token = useToken();
    async function onTaskEdit (e, task) {
        e.preventDefault();
        if (newTask.title === "") {
          Notify.failure("Вкажіть назву задачі.");
          return
        };
        if (newTask.prior === ""){
          Notify.failure("Виберіть пріоритет задачі.");
          return
        };
        try {
          const res = await UserService.create(token, task);
        //   dispatch(addOneCurrentTask(newTask));
          dispatch(resetEditTask());
          dispatch(hideEditTaskModal())
        } catch (e) {
          Notify.failure("Щось пішло не так =(");
          return
        }
      }    
    return(
        <ModalWindow 
            visible={editTaskModalVisible} 
            setVisible={() => dispatch(hideEditTaskModal())}
        >
            <TaskForm
              visible={editTaskModalVisible}
                onFormSubmit={() => "#"}
            />
        </ModalWindow>
    )
};


export default TaskEditModal