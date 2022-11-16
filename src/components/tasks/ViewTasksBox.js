import React from 'react';
import {connect} from 'react-redux';
import {retrieveTask} from '../../firebase/firebaseInit';

class ViewTasksBox extends React.Component {
    componentDidMount() {
        const { currentDaySelected, currentUser } = this.props;
        console.log(currentDaySelected[1].timestamp);
        retrieveTask(currentDaySelected[1].timestamp, currentUser.uid)
        .then(result => {
            const fragment = new DocumentFragment();
            result.docs.forEach( (thedoc) => {
                console.log(thedoc.data());
                const viewTaskDoc = document.createElement('article');
                viewTaskDoc.setAttribute('class', 'viewTaskDoc');
                const viewTaskTitle = document.createElement('h4');
                viewTaskTitle.setAttribute('class', 'viewTaskTitle');
                viewTaskTitle.innerText = thedoc.data().taskTitle;
                viewTaskDoc.appendChild(viewTaskTitle);
                const viewTaskBody = document.createElement('div');
                viewTaskBody.setAttribute('class', 'viewTaskBody');
                viewTaskBody.innerHTML = `<p> ${thedoc.data().content} </p>`;
                viewTaskDoc.appendChild(viewTaskBody);
                fragment.append(viewTaskDoc);
            });
            document.querySelector('#dbResult').append(fragment);
        })
        .catch(error=>console.log(error));
    }

    render() {
        const { changeTaskView } = this.props;

        return (
            <div id='viewTasksParent'>
                <button className='taskBoxCTA taskBack' onClick={changeTaskView}>back</button>
                <div id="dbResult"></div>
            </div>
        )
    }
}

const stateToProps = ({task, user}) => ({
    currentDaySelected: task.setCurrentDayClicked,
    currentUser: user.currentUser,
});

export default connect(stateToProps)(ViewTasksBox);