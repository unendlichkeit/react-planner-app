import React from 'react';
import {connect} from 'react-redux';
import {retrieveTask} from '../../firebase/firebaseInit';

class ViewTasksBox extends React.Component {
    componentDidMount() {
        const { currentDaySelected } = this.props;
        retrieveTask(currentDaySelected[1].timestamp)
        .then(result => {
            console.log(result);
        })
        .catch()
    }

    render() {
        const { changeTaskView } = this.props;

        return (
            <div id='viewTasksBox'>
                <button className='taskBoxCTA taskBack' onClick={changeTaskView}>back</button>
            </div>
        )
    }
}

const stateToProps = ({task, user}) => ({
    currentDaySelected: task.setCurrentDayClicked,
    currentUser: user.currentUser,
});

export default connect(stateToProps)(ViewTasksBox);