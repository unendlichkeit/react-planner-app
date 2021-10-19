const INITIAL_STATE = {
    menuState: "hidden",
    setCurrentDayClicked: null,
    dayTimestamp: null,
    hasTask: []
};

const taskReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "SET_MENU_STATE":
            return {
                ...state,
                menuState: state.menuState === "hidden" ? "show" : "hidden"
            };

        case "SET_CURRENT_DAY_CLICKED":
            return {
                ...state,
                setCurrentDayClicked: state.menuState === "show" ? action.payload : state.setCurrentDayClicked
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

        default:
            return state
    }
};
export default taskReducer;