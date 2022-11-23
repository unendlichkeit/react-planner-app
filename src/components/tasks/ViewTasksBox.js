import React from 'react';
import {connect} from 'react-redux';
import {retrieveTask, deleteTask} from '../../firebase/firebaseInit';
import ViewTaskDoc from './ViewTaskDoc';
import { setCurrentDayTasksList, deleteTaskAction } from '../../redux/task.actions';


class ViewTasksBox extends React.Component {
    deleteHandler = (dayTimestamp, currentUserId, docId) => {
        const { setCurrentDayTasksList } = this.props;
        console.log('delete');
        let daysLeft = [];
        
        deleteTask(dayTimestamp, currentUserId, docId)
        .then(result => {
            console.log(result);
            retrieveTask(dayTimestamp, currentUserId)
            .then(result => {
                result.docs.forEach( (thedoc) => {
                    console.log(thedoc);
                    daysLeft.push(<ViewTaskDoc key={thedoc.id} taskTitle={thedoc.data().taskTitle} taskBody={thedoc.data().content} deleteHandler={() => this.deleteHandler(dayTimestamp, currentUserId, thedoc.id)}/>);
                });
                setCurrentDayTasksList(daysLeft);
            })
            .catch();
        })
        .catch(error => console.log(error));

        // deleteTaskAction(daysLeft);
    };

    componentDidMount() {
        const { currentDaySelected, currentUser, setCurrentDayTasksList } = this.props;
        // console.log(currentDaySelected[1].timestamp);
        let tasksList = [];
        retrieveTask(currentDaySelected[1].timestamp, currentUser.uid)
        .then(result => {
            result.docs.forEach( (thedoc) => {
                // console.log(thedoc);
                tasksList.push(<ViewTaskDoc key={thedoc.id} taskTitle={thedoc.data().taskTitle} taskBody={thedoc.data().content} deleteHandler={() => this.deleteHandler(currentDaySelected[1].timestamp, currentUser.uid, thedoc.id)}/>);
            });
            setCurrentDayTasksList(tasksList);
        })
        .catch(error=>console.log(error));
    }

    render() {
        const { changeTaskView, currentDayTasks } = this.props;
        console.log(currentDayTasks);
        return (
            <div id='viewTasksParent'>
                <button className='taskBoxCTA taskBack' onClick={changeTaskView}>back</button>
                <div id="dbResult">
                    {currentDayTasks.map(task => task)}
                </div>
            </div>
        )
    }
}

const stateToProps = ({task, user}) => ({
    currentDaySelected: task.setCurrentDayClicked,
    currentUser: user.currentUser,
    currentDayTasks: task.currentDayTasks
});
const dispatchToProps = dispatch => ({
    setCurrentDayTasksList: (list) => dispatch(setCurrentDayTasksList(list)),
    deleteTaskAction: (list) => dispatch(deleteTaskAction(list))
});

export default connect(stateToProps, dispatchToProps)(ViewTasksBox);