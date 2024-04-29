import { createSlice } from "@reduxjs/toolkit";



const slice = createSlice({
    name: "updMarkers",
    initialState: {
        isCurrentTasksUpd: false,
        isUrgentlyTasksUpd: false,
        isTodayTasksUpd: false,
        isCompletedTasksUpd: false
    },
    reducers: {
        setIsCurrentTasksUpd (state, action) {
            state.isCurrentTasksUpd = action.payload
        },
        setIsUrgentlyTasksUpd (state, action) {
            state.isUrgentlyTasksUpd = action.payload
        },
        setIsTodayTasksUpd (state, action) {
            state.isTodayTasksUpd = action.payload
        },
        setIsCompletedTasksUpd (state, action) {
            state.isCompletedTasksUpd = action.payload
        }
    }
});

export default slice.reducer;
export const {
    setIsCurrentTasksUpd,
    setIsUrgentlyTasksUpd,
    setIsTodayTasksUpd,
    setIsCompletedTasksUpd
} = slice.actions