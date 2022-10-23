const INITIAL_STATE = {
    taskBoxState: "hidden",
    setCurrentDayClicked: null,
    dayTimestamp: null,
    hasTask: [],
    viewTasksMode: false
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

        case "CHANGE_TASK_VIEW":
            return {
                ...state,
                viewTasksMode: state.viewTasksMode ? false : true
            }    

        default:
            return state
    }
};
export default taskReducer;