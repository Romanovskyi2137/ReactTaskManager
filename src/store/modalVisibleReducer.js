import { createSlice } from "@reduxjs/toolkit";



const slice = createSlice({
    name: 'modalVisible',
    initialState: {
        createTaskModalVisible: false,
        completedTasksModalVisible: false
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
        }
    }
});

export default slice.reducer;
export const {
    showCompletedTasksModal,
    hideCompletedTasksModal,
    showCreateTaskModal,
    hideCreateTaskModal
} = slice.actions