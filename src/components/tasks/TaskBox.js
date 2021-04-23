import React from 'react';
import {connect} from 'react-redux';

const Task = ({currentDaySelected}) => {
    return (
        <div className='taskBox'>
            <p>add task and stuff</p>
            { document.querySelector('.calendarHeader').appendChild(currentDaySelected) }
        </div>
    );
}

const stateToProps = (state) => ({
    currentDaySelected: state.task.setCurrentDayClicked
});

export default connect(stateToProps)(Task);