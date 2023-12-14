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
        addManyMajor (state, action) {
            state.majorTasks = action.payload
        },
        addManyToday (state, action) {
            state.todayTasks = action.payload
        },
        addManyUrgently (state, action) {
            state.urgentlyTasks = action.payload
        },
        addOneCurrentTask (state, action) {
            state.currentTasks = [action.payload, ...state.currentTasks]
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
        removeUrgentlyTask (state, action) {
            const id = action.payload;
            state.urgentlyTasks = state.urgentlyTasks.filter(task => task.id !== id)
        },
        removeMajorTask (state, action) {
            const id = action.payload;
            state.majorTasks = state.majorTasks.filter(task => task.id !== id)
        },
        updateCurrentTasks (state, action) {
            state.currentTasks = action.payload
        },
        updateMajorTasks (state, action) {
            state.majorTasks = action.payload
        },
        updateUrgentlyTasks (state, action) {
            state.urgentlyTasks = action.payload
        },
        updateTodayTasks (state, action) {
            state.todayTasks = action.payload
        },
        toCurrentReplace (state, action) {
            const id = action.payload;
            state.completedTasks.forEach(task => {
                if (task.id === id) {
                    state.currentTasks = [task, ...state.currentTasks]
                    state.completedTasks = state.completedTasks.filter(task => task.id !== id)
                };
                if (task.prior == 1) {
                    state.major = [task, ...state.majorTasks];
                };
                if ((task.endPoint - Date.now()) < (1000 * 60 * 60 * 24)) {
                    state.todayTasks = [task, ...state.todayTasks];
                };
                if ((task.endPoint - Date.now()) < (1000 * 60 * 60 * 24 * 3)) {
                    state.urgentlyTasks = [task, ...state.urgentlyTasks]
                }
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
        }
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
    addManyMajor,
    updateMajorTasks,
    updateUrgentlyTasks,
    updateTodayTasks
} = slice.actions;






