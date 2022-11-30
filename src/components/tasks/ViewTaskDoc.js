import React from 'react';
import {connect} from 'react-redux';
import './TaskBox.scss';


class ViewTaskDoc extends React.Component {
    
    render() {
        const {taskTitle, taskBody, deleteHandler, enableEdit, taskId, updateHandler, enableUpdateHandler} = this.props;
        console.log(enableEdit);
        return (
            <article className="viewTaskDoc">
                {enableEdit ? <input name='editTaskTitle' defaultValue={taskTitle}/> : <h4 className="viewTaskTitle">{taskTitle}</h4>}
                <div className="viewTaskBody">
                    {enableEdit ? <textarea name='editTaskBody' defaultValue={taskBody}/> : <p>{taskBody}</p>}
                    <hr/>
                    {enableEdit ? <button className="updateTaskBtn" onClick={updateHandler}>Done</button> : <button className="updateTaskBtn" onClick={enableUpdateHandler}>Edit</button>}
                    <button className="deleteTaskBtn" onClick={deleteHandler}>Delete task</button>
                </div>
            </article>
        )
    }
}

const stateToProps = ({task, user}) => ({
    currentDaySelected: task.setCurrentDayClicked,
    currentUser: user.currentUser,
    editTaskOn: task.editTaskOn
});
// const dispatchToProps = (dispatch) => ({
//     enableTaskUpdate: dispatch(enableUpdateTask)
// });

export default connect(stateToProps)(ViewTaskDoc);