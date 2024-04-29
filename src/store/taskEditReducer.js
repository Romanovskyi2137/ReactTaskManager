import { createSlice } from "@reduxjs/toolkit";
import {v4 as uuidv4} from "uuid";


const task = {
    title: "", 
    body: "", 
    prior: "", 
    iconClassName: "", 
    id: uuidv4(),  
    endPoint: null
};

const slice = createSlice({
    name: "taskEdit",
    initialState: {
        task: task
    },
      reducers: {
        toEditTask (state, action) {
            state.task = action.payload
        },
        resetEditTask (state, action) {
            state.task = {...task, id: uuidv4()}
        },
        editTaskData (state, action) {
            state.task = action.payload
        }
      }
});

export default slice.reducer;
export const {
    toEditTask,
    resetEditTask,
    editTaskData
} = slice.actions

