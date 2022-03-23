import React from 'react';
import {connect} from 'react-redux';
import { addTask } from '../../firebase/firebaseInit';
import { setMenuState } from '../../redux/task.actions';
import './TaskBox.scss';

class TaskBox extends React.Component {
    constructor() {
        super();

    }

    addTaskHandler = (e) => {
        e.preventDefault();
        console.log(e.target.querySelector('[name=title]').value);
        let taskDataToDB = {
            dayTimestamp: this.props.dayTimestamp,
            taskTitle: e.target.querySelector('[name=title]').value,
            content: e.target.querySelector('[name=content]').value,
            
        };
        addTask(taskDataToDB);
    }

                                                                                                                                                                 
    render() {
        return (
            <div onClick={(e) => { console.log(e.target); this.props.dispatch(setMenuState) } } className='taskBox align-items-center flex-column justify-content-center no-gutters row'>
                <div onClick={(e) => {e.stopPropagation();} } className='taskBoxContent col-md-8 d-flex justify-content-center p-3'>
                    <div className="insideWidth">
                        <p>add task and stuff</p>
                        <div>
                            <form onSubmit={this.addTaskHandler}>
                                <input type="text" name="title" className="w-100"/>
                                <textarea name="content" className="w-100"></textarea>
                                <input type="submit"/>
                            </form>
                            <p>currentDaySelected node e inutil aici</p>
                            <p>de setat un prop cu data pt fiecare zi si de bagat prop-ul in TaskBox</p>
                            <p>add task to component Day and to firebase</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }  
    
}

const stateToProps = (state) => ({
    currentDaySelected: state.task.setCurrentDayClicked,
    dayTimestamp: state.task.dayTimestamp
});
//const dispatchToProps = (dispatch) => ({

// });

export default connect(stateToProps)(TaskBox);