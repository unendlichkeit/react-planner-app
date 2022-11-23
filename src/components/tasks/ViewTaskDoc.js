import React from 'react';
import {connect} from 'react-redux';


class ViewTaskDoc extends React.Component {

    render() {
        const {taskTitle, taskBody, deleteHandler} = this.props;

        return (
            <article className="viewTaskDoc">
                <h4 className="viewTaskTitle">{taskTitle}</h4>
                <div className="viewTaskBody">
                    <p>{taskBody}</p>
                    <button className="deleteTaskBtn" onClick={deleteHandler}>Delete task</button>
                </div>
            </article>
        )
    }
}

const stateToProps = ({task, user}) => ({
    currentDaySelected: task.setCurrentDayClicked,
    currentUser: user.currentUser,
});

export default connect(stateToProps)(ViewTaskDoc);