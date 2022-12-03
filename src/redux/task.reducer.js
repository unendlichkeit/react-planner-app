const INITIAL_STATE = {
    taskBoxState: "hidden",
    setCurrentDayClicked: null,
    dayTimestamp: null,
    hasTask: [],
    viewTasksMode: false,
    currentDayTasks: [],
    editTaskOn: false,
};

const taskReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "SET_MENU_STATE":
            return {
                ...state,
                taskBoxState: state.taskBoxState === "hidden" ? "show" : "hidden"
            };

        case "SET_CURRENT_DAY_CLICKED":
            return {
                ...state,
                setCurrentDayClicked: state.taskBoxState === "show" ? action.payload : state.setCurrentDayClicked
            };

        case "SET_DB_DAY_TIMESTAMP":
            return {
                ...state,
                dayTimestamp: action.payload
            };

        case "SET_HASTASK_CLASS":
            return  {
                ...state,
                hasTask: [...state.hasTask, action.payload]
            };
        case "RESET_HASTASK_CLASS":
            return {
                ...state,
                hasTask: []
            }
        case "CHANGE_TASK_VIEW":
            return {
                ...state,
                viewTasksMode: state.viewTasksMode ? false : true
            };
        
        case "SET_CURRENT_DAY_TASKS":
            return {
                ...state,
                currentDayTasks: action.payload
            };

        case "DELETE_TASK":
            return {
                ...state,
                currentDayTasks: action.payload
            };

        case "ENABLE_UPDATE_TASKS_LIST":
            return {
                ...state,
                currentDayTasks: action.payload
            };
        
        case "UPDATE_TASKS_LIST":
            return {
                ...state,
                currentDayTasks: action.payload
            };

        default:
            return state
    }
};
export default taskReducer;