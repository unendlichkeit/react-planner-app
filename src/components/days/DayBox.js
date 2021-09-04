import React from 'react';
import ReactDOM from 'react-dom';
import { connect, batch  } from 'react-redux';
import { setMenuState, setCurrentDayClicked, setDbDayTimestamp } from '../../redux/task.actions';
import newArr from '../../calendarDaysLogic';
import {retrieveTask} from '../../firebase/firebaseInit';



class DayBox extends React.Component {
    //({day, empty, menuStateAction, menuState}) =>
    //ReactDOM.findDOMNode(this)
   
    componentDidUpdate() {
        console.log('dayBox component did update');
    }

    render() {
        const { menuState, menuStateAction, empty, day, currentDayClicked, timestamp, allData } = this.props;
        console.log(timestamp);
        //retrieve tasks from db
        newArr.map(row => {( 
            row.map(rowData => {
                //console.log(rowData.timestamp); 
                
                return rowData.timestamp; 
            })
        )});
        retrieveTask(timestamp).then(result => console.log(result));
        //className={`${hasTasksSaved?'hasTask':''}`}
        return (
            
            <div onClick={(e) => { menuStateAction(e, timestamp); }}>
                { empty ? '' : <p >Day { day }</p> }
            </div>
        )        
    }

}

const stateToProps = ({task}) => (
    {
        currentDayClicked: task.setCurrentDayClicked
    }
);

const dispatchToProps = dispatch => ({
    menuStateAction: (event, timestamp) => {
        batch(()=>{
            dispatch(setMenuState);
            dispatch(setCurrentDayClicked(event.currentTarget));
            dispatch(setDbDayTimestamp(timestamp));          
        }) 
    }
});
export default connect(stateToProps, dispatchToProps)(DayBox);