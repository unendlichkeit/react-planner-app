import React from 'react';
import {connect} from 'react-redux';
import { addTask } from '../../firebase/firebaseInit';

class EnterTaskBox extends React.Component {
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
                addTask(taskDataToDB)
                .then((response) => {
                    console.log(response);
                    document.querySelector('.errorMsg').style.color = '#28b940';
                    document.querySelector('.errorMsg').innerText = 'Task added'; 
                })
                .catch();
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
        const { currentUser, changeTaskView } = this.props;
        
        return (
            <div id='enterTaskBox'>
                <div className='d-flex justify-content-between'>
                    <p>add task and stuff</p>
                    <button className='taskBoxCTA viewTasks' onClick={changeTaskView}>view tasks</button>
                </div>
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
        )
    }
}

const stateToProps = (state) => ({
    currentDaySelected: state.task.setCurrentDayClicked,
    dayTimestamp: state.task.dayTimestamp,
    currentUser: state.user.currentUser,
    viewTasksMode: state.task.viewTasksMode
});

export default connect(stateToProps)(EnterTaskBox);