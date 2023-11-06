import { combineReducers, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension";
import { completedTasksReducer } from "./completedTasksReducer";




const rootReducer = combineReducers({
   completedTasks: completedTasksReducer 
});



export const store = createStore(rootReducer, composeWithDevTools())