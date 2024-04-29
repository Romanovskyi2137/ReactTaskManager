
function deployToStateHelper (task) {
    const oneDay = 1000 * 60 * 60 * 24;
    const urgentTime = 1000 * 60 * 60 * 24 * 3;
    const {endPoint} = task;
    return {
        isCurrentTasks: true,
        isTodayTasks: (endPoint - Date.now()) < oneDay,
        isUrgentlyTasks: (endPoint - Date.now()) < urgentTime
    }
};

export {deployToStateHelper}

