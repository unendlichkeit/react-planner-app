import React from 'react';
import {connect} from 'react-redux';
// import { addTask } from '../../firebase/firebaseInit';
import { setTaskBoxState } from '../../redux/task.actions';
import monthsNames from '../../stuff/monthsNames';
import './TaskBox.scss';
import ViewTasksBox from './ViewTasksBox';
import EnterTaskBox from './EnterTaskBox';
import { changeTaskBoxView } from '../../redux/task.actions';

class TaskBox extends React.Component {
                                                                                                                                                                 
    render() {
        let { currentDaySelected, currentUser, viewTasksMode, handleTaskBoxContent } = this.props;
        
        return (
            <div onClick={(e) => { this.props.dispatch(setTaskBoxState) } } className='taskBox align-items-center flex-column justify-content-center no-gutters row'>
                <div onClick={(e) => {e.stopPropagation();} } className='taskBoxContent col-md-8 d-flex justify-content-center p-3'>
                    <div className="insideWidth">
                        <h3>{monthsNames[currentDaySelected[1].month]}, {currentDaySelected[1].date}</h3>
                        {viewTasksMode ? <ViewTasksBox changeTaskView={handleTaskBoxContent}/> : <EnterTaskBox changeTaskView={handleTaskBoxContent}/>}
                    </div>
                </div>
            </div>
        );
    }  
    
}

const stateToProps = (state) => ({
    currentDaySelected: state.task.setCurrentDayClicked,
    dayTimestamp: state.task.dayTimestamp,
    currentUser: state.user.currentUser,
    viewTasksMode: state.task.viewTasksMode
});
const dispatchToProps = (dispatch) => ({
    handleTaskBoxContent: () => dispatch(changeTaskBoxView)
});


export default connect(stateToProps, dispatchToProps)(TaskBox);