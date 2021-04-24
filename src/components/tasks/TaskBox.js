import React from 'react';
import {connect} from 'react-redux';

const TaskBox = ({currentDaySelected}) => {
    return (
        <div className='taskBox'>
            <p>add task and stuff</p>
            <div>
                form here
                <p>currentDaySelected node e inutil aici</p>
                <p>de setat un prop cu data pt fiecare zi si de bagat prop-ul in TaskBox</p>
            </div>
        </div>
    );
}

const stateToProps = (state) => ({
    currentDaySelected: state.task.setCurrentDayClicked
});

export default connect(stateToProps)(TaskBox);