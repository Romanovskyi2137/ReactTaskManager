import { combineReducers, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension";
import tasksReducer from "./tasksReducer";
import modalReducer from "./modalVisibleReducer";




const rootReducer = combineReducers({
   tasks: tasksReducer,
   modalVisible: modalReducer 
});



export const store = createStore(rootReducer, composeWithDevTools())