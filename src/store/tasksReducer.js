import { createSlice } from "@reduxjs/toolkit";


const slice = createSlice({
    name: "tasks",
    initialState: {
        currentTasks: [],
        completedTasks: [],
        todayTasks: [],
        urgentlyTasks: [],
        majorTasks: []
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
        addManyToday (state, action) {
            state.todayTasks = action.payload
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
        removeTodayTask (state, action) {
            const id = action.payload;
            state.todayTasks = state.todayTasks.filter(task => task.id !== id)
        },
        toCurrentReplace (state, action) {
            const id = action.payload;
            let replacebleTask;
            state.completedTasks.forEach(task => {
                if (task.id === id) {
                    replacebleTask = task;
                    state.currentTasks = [replacebleTask, ...state.currentTasks]
                    state.completedTasks = state.completedTasks.filter(task => task.id !== id)
                };
            })
        },
        toCompleteReplace (state, action) {
            const id = action.payload;
            let replacebleTask;
            state.currentTasks.forEach(task => {
                if (task.id === id) {
                    replacebleTask = task;
                    state.completedTasks = [replacebleTask, ...state.completedTasks];
                    state.currentTasks = state.currentTasks.filter(task => task.id !== id) 
                }
            })    
        },
        removeUrgentlyTask (state, action) {
            const id = action.payload;
            state.urgentlyTasks = state.urgentlyTasks.filter(task => task.id !== id)
        },
        addManyUrgently (state, action) {
            state.urgentlyTasks = action.payload
        },
        removeMajorTask (state, action) {
            const id = action.payload;
            state.majorTasks = state.majorTasks.filter(task => task.id !== id)
        },
        addManyMajor (state, action) {
            state.majorTasks = action.payload
        },
        

    }
});
export default slice.reducer;
export const {
    addManyTasks, 
    addManyCompletedTasks,
    addManyToday,
    addOneCurrentTask, 
    updateCurrentTasks, 
    addOneCompletedTask, 
    removeCurrentTask, 
    removeCompletedTask,
    removeTodayTask,
    toCompleteReplace,
    toCurrentReplace,
    removeUrgentlyTask,
    addManyUrgently,
    removeMajorTask,
    addManyMajor
} = slice.actions;






