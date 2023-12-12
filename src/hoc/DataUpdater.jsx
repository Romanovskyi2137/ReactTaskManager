import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserService from "../service/userService";
import { updateMajorTasks, updateTodayTasks, updateUrgentlyTasks } from "../store/tasksReducer";
import { Notify } from "notiflix";
import useToken from "../myHooks/useToken";


export default function DataUpdater ({children}) {
    const currentTasks = useSelector(state => state.tasks.currentTasks);
    const dispatch = useDispatch();
    const token = useToken();
    useEffect(() => {
        async function updateData () {
            try {
                const res = await Promise.all([
                    UserService.getToday(token),
                    UserService.getMajor(token),
                    UserService.getUrgently(token)
                ]);
                dispatch(updateTodayTasks(res[0].data));
                dispatch(updateMajorTasks(res[1].data));
                dispatch(updateUrgentlyTasks(res[2].data))
            } catch {
                Notify.failure("something goes wrong...=)")
            }
        };
        updateData();
    }, [currentTasks])

    return (
        <>{children}</>
    )
}