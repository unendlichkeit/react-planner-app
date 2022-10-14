import newArr from '../calendarDaysLogic';

const INITIAL_STATE = {
    calendarView: newArr
};

const calendarReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) 
    {
        case 'CHANGE_CALENDAR_CONTENT':
            return {
                ...state,
                calendarView: action.payload
            }
        default: 
            return {
                ...state
            }
    }
}

export default calendarReducer;