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
        
        //retrieve task data from db
        retrieveTask(timestamp).then(result => { if(result.exists) {
            console.log(result.data());
            //daca documentul cu timestampul dat exista, inseamna ca are task in db si trebuie adaugata clasa pe element
            }    
        });
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