import { combineReducers, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension";
import tasksReducer from "./tasksReducer";
import modalReducer from "./modalVisibleReducer";
import taskEditReducer from "./taskEditReducer";
import updMarkersReducer from "./updMarkersReducer";



const rootReducer = combineReducers({
   tasks: tasksReducer,
   modalVisible: modalReducer,
   taskEdit: taskEditReducer,
   isPageUpd: updMarkersReducer  
});



export const store = createStore(rootReducer, composeWithDevTools())