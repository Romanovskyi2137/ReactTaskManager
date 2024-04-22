import React, { useEffect, useState } from "react";
import Input from "./UI/Input/Input";
import TextArea from "./UI/TextArea/TextArea";
import Button from "./UI/Button/Button";
import PriorPicker from "./UI/PriorPicker/PriorPicker";
import { useSelector, useDispatch } from "react-redux";
import {Notify} from "notiflix";
import { DateTimePicker } from "@mui/x-date-pickers";
import { editTaskData } from "../store/taskEditReducer";

function TaskForm ({visible, onFormSubmit}) {
    const task = useSelector(state => state.taskEdit.task);
    const dispatch = useDispatch();

    const getTime = (millis) => {
      if (task.endPoint == null) {
        Notify.failure("Оберіть дату!")
        return
      };
      dispatch(editTaskData({...task, endPoint: (task.endPoint + millis)}))
    };

    return (
        <form 
          onSubmit={e => onFormSubmit(e, task)}
          style={{display: "flex", flexDirection: "column"}}
        >
            <Input 
              type="text"
              value={task.title}
              onChange={e => dispatchEvent(editTaskData({...task, title: e.target.value}))}
              placeholder="Назва"  
            />
             <TextArea 
              value={task.body}
              onChange={e => dispatch(editTaskData({...task, body: e.target.value}))}
              placeholder="Опис"  
            />
            <div className="TaskForm_pickers">

              <PriorPicker 
                getPrior={(number, iconClass) => dispatch(editTaskData({...task, prior: number, iconClassName: iconClass}))}
                visible={visible} 
              />

              <DateTimePicker
                ampm={false}
                ampmInClock={true}
                value={task.endPoint}
                onChange={value => dispatch(editTaskData({...task, endPoint: value.$d.getTime()}))}

              />

            </div>

            <div style={{display: "flex", justifyContent: "flex-end"}}>
              <Button
                type= "submit"
              >
                Створити
              </Button>
            </div>

        </form>
    )
}

export default TaskForm