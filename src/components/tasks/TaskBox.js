import React from 'react';
import {connect} from 'react-redux';

class TaskBox extends React.Component {
    constructor() {
        super();

    }

    addTaskHandler = () => {
        
    }

    render() {
        return (
            <div className='taskBox'>
                <p>add task and stuff</p>
                <div>
                    <form onSubmit={this.addTaskHandler}>
                        <input type="text"/>
                        <input type="submit"/>
                    </form>
                    <p>currentDaySelected node e inutil aici</p>
                    <p>de setat un prop cu data pt fiecare zi si de bagat prop-ul in TaskBox</p>
                    <p>add task to component Day and to firebase</p>
                </div>
            </div>
        );
    }  
    
}

const stateToProps = (state) => ({
    currentDaySelected: state.task.setCurrentDayClicked
});

export default connect(stateToProps)(TaskBox);