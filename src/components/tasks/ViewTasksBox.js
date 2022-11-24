import React from 'react';
import {connect} from 'react-redux';
import {retrieveTask, deleteTask, updateTask} from '../../firebase/firebaseInit';
import ViewTaskDoc from './ViewTaskDoc';
import { setCurrentDayTasksList, deleteTaskAction, enableUpdateTasksList, updateTaskList } from '../../redux/task.actions';


class ViewTasksBox extends React.Component {
    deleteHandler = (dayTimestamp, currentUserId, docId) => {
        const { setCurrentDayTasksList } = this.props;
        console.log('delete');
        let daysLeft = [];
        
        deleteTask(dayTimestamp, currentUserId, docId)
        .then(result => {
            // console.log(result);
            retrieveTask(dayTimestamp, currentUserId)
            .then(result => {
                result.docs.forEach( (thedoc) => {
                    // console.log(thedoc);
                    daysLeft.push(<ViewTaskDoc key={thedoc.id} taskId={thedoc.id} taskTitle={thedoc.data().taskTitle} taskBody={thedoc.data().content} deleteHandler={() => this.deleteHandler(dayTimestamp, currentUserId, thedoc.id)} enableUpdateHandler={(e) => this.enableUpdateHandler(thedoc.id, e)} enableEdit={false} updateHandler={() => this.updateTasksList(thedoc.id)}/>);
                });
                setCurrentDayTasksList(daysLeft);
            })
            .catch();
        })
        .catch(error => console.log(error));

        // deleteTaskAction(daysLeft);
    }

    enableUpdateHandler = (docId, e) => {
        const { currentDayTasks, enableUpdateTasksList } = this.props;
        let updatedList = [];
        currentDayTasks.forEach(docComponent => {
            if(docComponent.key === docId) {
                updatedList.push({...docComponent, props: {...docComponent.props, enableEdit: true}}) 
            }
            else updatedList.push(docComponent);
        });
        console.log(updatedList);
        enableUpdateTasksList(updatedList);
    }

    updateTasksList = (docId) => {
        const { currentDaySelected, currentUser, currentDayTasks, updateTaskList } = this.props;
        let updatedList = [];
        let newTitleValue = document.querySelector('.viewTaskDoc [name=editTaskTitle]').value;
        let newBodyValue = document.querySelector('.viewTaskDoc [name=editTaskBody]').value;

        currentDayTasks.forEach(docComponent => {
            if(docComponent.key === docId) {
                updatedList.push({...docComponent, props: {...docComponent.props, taskTitle: newTitleValue, taskBody: newBodyValue, enableEdit: false}});
            }
            else updatedList.push(docComponent);
        });
        updateTaskList(updatedList);
        updateTask(currentDaySelected[1].timestamp, currentUser.uid, docId, newTitleValue, newBodyValue)
        .then(result => console.log(result));
    }

    componentDidMount() {
        const { currentDaySelected, currentUser, setCurrentDayTasksList } = this.props;
        // console.log(currentDaySelected[1].timestamp);
        let tasksList = [];
        retrieveTask(currentDaySelected[1].timestamp, currentUser.uid)
        .then(result => {
            result.docs.forEach( (thedoc) => {
                // console.log(thedoc);
                tasksList.push(<ViewTaskDoc key={thedoc.id} taskId={thedoc.id} taskTitle={thedoc.data().taskTitle} taskBody={thedoc.data().content} deleteHandler={() => this.deleteHandler(currentDaySelected[1].timestamp, currentUser.uid, thedoc.id)} enableUpdateHandler={() => this.enableUpdateHandler(thedoc.id)} enableEdit={false} updateHandler={() => this.updateTasksList(thedoc.id)}/>);
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
    deleteTaskAction: (list) => dispatch(deleteTaskAction(list)),
    enableUpdateTasksList: (list) => dispatch(enableUpdateTasksList(list)),
    updateTaskList: (list) => dispatch(updateTaskList(list)),
});

export default connect(stateToProps, dispatchToProps)(ViewTasksBox);