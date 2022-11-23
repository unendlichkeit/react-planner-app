export const setTaskBoxState = {
    type: "SET_MENU_STATE"
}
export const setCurrentDayClicked = (day) => ({
    type: "SET_CURRENT_DAY_CLICKED",
    payload: day
});

export const setDbDayTimestamp = (timestamp) => ({
    type: "SET_DB_DAY_TIMESTAMP",
    payload: timestamp
});

export const setHastaskClass = (value) => ({
    type: "SET_HASTASK_CLASS",
    payload: value
});

export const changeTaskBoxView = {
    type: 'CHANGE_TASK_VIEW'
}

export const deleteTaskAction = (currentDayTasksLeft) => ({
    type: 'DELETE_TASK',
    payload: currentDayTasksLeft
})

export const setCurrentDayTasksList = (tasksList) => ({
    type: 'SET_CURRENT_DAY_TASKS',
    payload: tasksList
})