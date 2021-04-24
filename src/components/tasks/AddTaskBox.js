import React from 'react';
import { connect } from 'react-redux';

const AddTaskBox = ({currentDayClicked}) => {
    
    return (
        <div>ceva</div>
    )
}

const stateToProps = ({task}) => (
    {
        currentDayClicked: task.setCurrentDayClicked
    }
);

export default connect(stateToProps)(AddTaskBox);