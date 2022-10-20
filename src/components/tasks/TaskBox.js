import React from 'react';
import {connect} from 'react-redux';
import { addTask } from '../../firebase/firebaseInit';
import { setMenuState } from '../../redux/task.actions';
import monthsNames from '../../stuff/monthsNames';
import './TaskBox.scss';

class TaskBox extends React.Component {
    addTaskHandler = (e) => {
        e.preventDefault();
        let currentUser = this.props.currentUser;
        let taskTitle = e.target.querySelector('[name=title]').value;
        let taskDescription = e.target.querySelector('[name=content]').value;
        
        let taskDataToDB = {
            dayTimestamp: this.props.dayTimestamp,
            taskTitle: taskTitle,
            content: taskDescription,
            owner: currentUser.uid,
        };
        if(currentUser) {
            if(taskTitle !== '' && taskDescription !== '') {
                console.log('conditie ok pt introdus task');
                document.querySelector('.errorMsg').innerText = '';
                addTask(taskDataToDB);                
            }
            else {
                console.log('not ok pt introdus task');
                document.querySelector('.errorMsg').innerText = 'Title and/or description missing';
            }
        }
        else {
            //ca masura secundara de 'protectie' impotriva introducerii unui task fara sa fie logat
            document.querySelector('.errorMsg').innerText = 'You must be logged in';
        }
        
    }

                                                                                                                                                                 
    render() {
        let currentDaySelected = this.props.currentDaySelected;
        let currentUser = this.props.currentUser;
        
        return (
            <div onClick={(e) => { this.props.dispatch(setMenuState) } } className='taskBox align-items-center flex-column justify-content-center no-gutters row'>
                <div onClick={(e) => {e.stopPropagation();} } className='taskBoxContent col-md-8 d-flex justify-content-center p-3'>
                    <div className="insideWidth">
                        <h3>{monthsNames[currentDaySelected[1].month]}, {currentDaySelected[1].date}</h3>
                        <p>add task and stuff</p>
                        <div>
                            <p className='errorMsg'></p>
                            <form onSubmit={this.addTaskHandler}>
                                <input type="text" name="title" className="w-100"/>
                                <textarea name="content" className="w-100"></textarea>
                                {currentUser ? <input type="submit"/> : <input type="button" disabled value="You must be signed in to be able to submit a task"/>}
                            </form>
                            <p>currentDaySelected node e inutil aici</p>
                            <p>add task to component Day to firebase</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }  
    
}

const stateToProps = (state) => ({
    currentDaySelected: state.task.setCurrentDayClicked,
    dayTimestamp: state.task.dayTimestamp,
    currentUser: state.user.currentUser
});
//const dispatchToProps = (dispatch) => ({

// });

export default connect(stateToProps)(TaskBox);