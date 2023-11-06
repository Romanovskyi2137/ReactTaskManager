
const ADD_MANY_TASKS = "ADD_MANY_TASKS";
const ADD_ONE_TASK = "ADD_ONE_TASK";
const REMOVE_ONE_TASK = "REMOVE_ONE_TASK";

const defaultState = {
    completedTasks: []
};

export const completedTasksReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_MANY_TASKS:
            return {...state, completedTasks: [...state.completedTasks, ...action.payload]};
        case ADD_ONE_TASK:
            return {...state, completedTasks: [action.payload, ...state.completedTasks]};
        case REMOVE_ONE_TASK:
            return {...state, completedTasks: state.completedTasks.filter(task => {
                return task.id !== action.payload  
            })}
    }
    return state
};

export const addManyCompletedTasksAction = (payload) => {
    return {type: ADD_MANY_TASKS, payload}
};
export const addOneCompletedTaskAction = (payload) => {
    return {type: ADD_ONE_TASK, payload}
};
export const removeOneComletedTask = (payload) => {
    return {type: REMOVE_ONE_TASK, payload}
};
