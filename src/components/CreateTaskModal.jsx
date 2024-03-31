import {React} from "react";
import ModalWindow from "./ModalWindow/ModalWindow";
import TaskForm from "./TaskForm";
import { useDispatch, useSelector } from "react-redux";
import { hideCreateTaskModal } from "../store/modalVisibleReducer";

function CreateTaskModal () {
    const createTaskModalVisible = useSelector(state => state.modalVisible.createTaskModalVisible);
    const dispatch = useDispatch();   
    return(
        <ModalWindow 
            visible={createTaskModalVisible} 
            setVisible={() => dispatch(hideCreateTaskModal())}
        >
            <TaskForm
              visible={createTaskModalVisible}
              setVisible={() => dispatch(hideCreateTaskModal())}
            />
        </ModalWindow>
    )
};


export default CreateTaskModal