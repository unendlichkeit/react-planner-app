import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import taskReducer from './task.reducer';
import monthPickerReducer from './monthPicker.reducer';

export default combineReducers({
    user: userReducer,
    task: taskReducer,
    monthPicker: monthPickerReducer
})  