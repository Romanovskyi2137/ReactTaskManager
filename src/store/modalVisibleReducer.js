import { createSlice } from "@reduxjs/toolkit";



const slice = createSlice({
    name: 'modalVisible',
    initialState: {
        createTaskModalVisible: false,
        completedTasksModalVisible: false,
        editTaskModalVisible: false
    },
    reducers: {
        showCompletedTasksModal (state, action) {
            state.completedTasksModalVisible = true
        },
        hideCompletedTasksModal (state, action) {
            state.completedTasksModalVisible = false
        },
        showCreateTaskModal (state, action) {
            state.createTaskModalVisible = true
        },
        hideCreateTaskModal (state, action) {
            state.createTaskModalVisible = false
        },
        showEditTaskModal (state, action) {
            state.editTaskModalVisible = true
        },
        hideEditTaskModal (state, action) {
            state.editTaskModalVisible = false
        }
    }
});

export default slice.reducer;
export const {
    showCompletedTasksModal,
    hideCompletedTasksModal,
    showCreateTaskModal,
    hideCreateTaskModal,
    showEditTaskModal,
    hideEditTaskModal
} = slice.actions