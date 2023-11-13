import { combineReducers, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension";
import tasksReducer from "./tasksReducer";




const rootReducer = combineReducers({
   tasks: tasksReducer 
});



export const store = createStore(rootReducer, composeWithDevTools())