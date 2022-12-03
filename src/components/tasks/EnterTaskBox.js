import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import { addTask } from '../../firebase/firebaseInit';
import { setHastaskClass } from '../../redux/task.actions';

function EnterTaskBox (props) {
    const { currentUser, changeTaskView, currentDaySelected, hasTask, setHastaskClass } = props;

    const addTaskHandler = (e) => {
        e.preventDefault();
        let taskTitle = e.target.querySelector('[name=title]').value;
        let taskDescription = e.target.querySelector('[name=content]').value;
        
        let taskDataToDB = {
            dayTimestamp: currentDaySelected[1].timestamp,
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
                    console.log(currentDaySelected[1].timestamp, hasTask);
                    document.querySelector('.errorMsg').style.color = '#28b940';
                    document.querySelector('.errorMsg').innerText = 'Task added'; 
                    if(!hasTask.includes(currentDaySelected[1].timestamp)) setHastaskClass(currentDaySelected[1].timestamp);
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

    useEffect(()=> {
        console.log(hasTask);
        if(hasTask.includes(currentDaySelected[1].timestamp)) {
            let button = document.createElement('button');
            button.setAttribute('class', 'taskBoxCTA viewTasks');
            button.onclick = changeTaskView;
            button.innerText = 'View tasks';
            document.querySelector('#changeContent').appendChild(button);
        }
    }, [hasTask]);


    return (
        <div id='enterTaskBox'>
            <div className='d-flex justify-content-between'>
                <p>add task and stuff</p>
                <div id='changeContent'></div>
            </div>
            <div>
                <p className='errorMsg'></p>
                <form onSubmit={addTaskHandler}>
                    <input type="text" name="title" className="w-100"/>
                    <textarea name="content" className="w-100"></textarea>
                    {currentUser ? <input type="submit"/> : <input type="button" disabled value="You must be signed in to be able to submit a task"/>}
                </form>
            </div>    
        </div>
    )
    
}

const stateToProps = (state) => ({
    currentDaySelected: state.task.setCurrentDayClicked,
    currentUser: state.user.currentUser,
    hasTask: state.task.hasTask
});
const dispatchToProps = dispatch => ({
    setHastaskClass: (dayTimestamp) => dispatch(setHastaskClass(dayTimestamp))
});

export default connect(stateToProps, dispatchToProps)(EnterTaskBox);