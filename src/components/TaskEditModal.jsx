import {React} from "react";
import ModalWindow from "./ModalWindow/ModalWindow";
import TaskForm from "./TaskForm";
import {Notify} from "notiflix";
import UserService from "../service/userService";
import { useDispatch, useSelector } from "react-redux";
import { hideEditTaskModal } from "../store/modalVisibleReducer";
import { resetEditTask } from "../store/taskEditReducer";
import useToken from "../myHooks/useToken";
import { addOneCurrentTask, removeCurrentTask } from "../store/tasksReducer";

function TaskEditModal () {
    const editTaskModalVisible = useSelector(state => state.modalVisible.editTaskModalVisible);
    const newTask = useSelector(state => state.taskEdit.task) 
    const dispatch = useDispatch();
    const token = useToken();

    async function onTaskEdit (e) {
        e.preventDefault();
        if (newTask.title === "") {
          Notify.failure("Вкажіть назву задачі.");
          return
        };
        // if (newTask.prior === ""){
        //   Notify.failure("Виберіть пріоритет задачі.");
        //   return
        // };
        try {
          const res = await UserService.change(token, newTask);
          dispatch(removeCurrentTask(newTask.id))
          dispatch(addOneCurrentTask(newTask));
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
            setVisible={() => {
              dispatch(hideEditTaskModal());
              dispatch(resetEditTask())
            }}
        >
            <TaskForm
              visible={editTaskModalVisible}
                onFormSubmit={onTaskEdit}
            />
        </ModalWindow>
    )
};


export default TaskEditModal