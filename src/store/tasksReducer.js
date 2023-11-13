import { createSlice } from "@reduxjs/toolkit";


const slice = createSlice({
    name: "tasks",
    initialState: {
        currentTasks: [],
        completedTasks: []
    },
    reducers: {
        addManyTasks (state, action) {
            action.payload.forEach(item => state.currentTasks.push(item))
        },
        addManyCompletedTasks (state, action) {
            state.completedTasks = action.payload
        },
        addOneCurrentTask (state, action) {
            state.currentTasks = [action.payload, ...state.currentTasks]
        },
        updateCurrentTasks (state, action) {
            state.currentTasks = action.payload
        },  
        addOneCompletedTask (state, action) {
            state.completedTasks = [action.payload, ...state.completedTasks]
        },
        removeCurrentTask (state, action) {
            const id = action.payload;
            state.currentTasks = state.currentTasks.filter(task => task.id !== id) 
        },
        removeCompletedTask (state, action) {
            const id = action.payload;
            state.completedTasks = state.completedTasks.filter(task => task.id !== id) 
        },
        toCurrentReplace (state, action) {
            const {id, ...rest} = action.payload;
            state.completedTasks.forEach(task => {
                if (task.id === id) {
                    state.currentTasks = [action.payload, ...state.currentTasks]
                    state.completedTasks = state.completedTasks.filter(task => task.id !== id)
                };
            })
        },
        toCompleteReplace (state, action) {
            const {id, ...rest} = action.payload;
            state.currentTasks.forEach(task => {
                if (task.id === id) {
                    state.completedTasks = [action.payload, ...state.completedTasks];
                    state.currentTasks = state.currentTasks.filter(task => task.id !== id) 
                }
            })    
        }
        

    }
});
export default slice.reducer;
export const {
    addManyTasks, 
    addManyCompletedTasks,
    addOneCurrentTask, 
    updateCurrentTasks, 
    addOneCompletedTask, 
    removeCurrentTask, 
    removeCompletedTask,
    toCompleteReplace,
    toCurrentReplace
} = slice.actions;






