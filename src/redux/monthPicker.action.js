export const setMonthPickerPopupState = {
    type: 'TOGGLE_MONTH_PICKER_POPUP'
} 
export const setMonthPicked = (pickerSelection) => ({
    type: 'SET_MONTH_PICKED',
    payload: pickerSelection
})