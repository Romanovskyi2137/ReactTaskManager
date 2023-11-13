import {React} from "react";
import ModalWindow from "./ModalWindow/ModalWindow";
import TaskForm from "./TaskForm";

function CreateTaskModal ({visible, setVisible}) {   
    return(
        <ModalWindow visible={visible} setVisible={setVisible}>
            <TaskForm
              visible={visible}
              setVisible={setVisible}
            />
        </ModalWindow>
    )
};


export default CreateTaskModal