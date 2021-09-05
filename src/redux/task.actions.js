export const setMenuState = {
    type: "SET_MENU_STATE"
}
export const setCurrentDayClicked = (element) => ({
    type: "SET_CURRENT_DAY_CLICKED",
    payload: element
});

export const setDbDayTimestamp = (timestamp) => ({
    type: "SET_DB_DAY_TIMESTAMP",
    payload: timestamp
});

export const setHastaskClass = (value) => ({
    type: "SET_HASTASK_CLASS",
    payload: value
});