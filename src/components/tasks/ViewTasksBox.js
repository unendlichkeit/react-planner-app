import React from 'react';

class ViewTasksBox extends React.Component {
    render() {
        const { changeTaskView } = this.props;

        return (
            <div id='viewTasksBox'>
                <button className='taskBoxCTA taskBack' onClick={changeTaskView}>back</button>
            </div>
        )
    }
}

export default ViewTasksBox;