const INITIAL_STATE = {
    monthPickState: 'hide'
}

const monthPickerReducer = (state = INITIAL_STATE, action) => {
    switch(action.type)
    {
        case 'TOGGLE_MONTH_PICKER_POPUP':
            return {
                ...state,
                monthPickState: state.monthPickState === 'show' ? 'hide' : 'show'
            };

        default:
            return state;
    }
}

export default monthPickerReducer;