const INITIAL_STATE = {
    menuState: "hidden",
    setCurrentDayClicked: null
};

const taskReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "SET_MENU_STATE":
            return {
                ...state,
                menuState: state.menuState === "hidden" ? "show" : "hidden"
            }

        case "SET_CURRENT_DAY_CLICKED":
            return {
                ...state,
                setCurrentDayClicked: state.menuState === "show" ? action.payload : state.setCurrentDayClicked
            }

        default:
            return state
    }
};
export default taskReducer;