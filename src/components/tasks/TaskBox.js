import React from 'react';
import {connect} from 'react-redux';

const Task = ({currentDaySelected}) => {
    return (
        <div className='taskBox'>
            <p>add task and stuff</p>
            <div>
                form here
                <p>currentDaySelected node e inutil aici</p>
            </div>
        </div>
    );
}

const stateToProps = (state) => ({
    currentDaySelected: state.task.setCurrentDayClicked
});

export default connect(stateToProps)(Task);