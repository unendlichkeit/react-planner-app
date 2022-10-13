const INITIAL_STATE = {
    monthPickState: 'hide',
    monthPicked: []
}

const monthPickerReducer = (state = INITIAL_STATE, action) => {
    switch(action.type)
    {
        case 'TOGGLE_MONTH_PICKER_POPUP':
            return {
                ...state,
                monthPickState: state.monthPickState === 'show' ? 'hide' : 'show'
            };

        case 'SET_MONTH_PICKED':
            return {
                ...state,
                monthPicked: action.payload
            }

        default:
            return state;
    }
}

export default monthPickerReducer;