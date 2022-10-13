import React from 'react';
import ReactDOM from 'react-dom';
import { connect, batch  } from 'react-redux';
import { setMenuState, setCurrentDayClicked, setDbDayTimestamp, setHastaskClass } from '../../redux/task.actions';
import {retrieveTask} from '../../firebase/firebaseInit';
import './DayBox.scss';



class DayBox extends React.Component {


    componentDidMount() {
        //console.log('dayBox component did mount');
        const { timestamp, hasTask, setHasTaskClass } = this.props;
        //retrieve task data from db
        retrieveTask(timestamp).then(result => { 
            if(result.exists) {
                // console.log(result.data(), timestamp);
                //daca documentul cu timestampul dat exista, inseamna ca are task in db si trebuie adaugata clasa pe element
                if(!hasTask.includes(timestamp) && result.data())
                {
                    setHasTaskClass(result.data().dayTimestamp);
                }  
                 
            }
        });
    }
    // componentDidUpdate() { console.log('dayBox component did update'); }
    render() {
        
        const {timestamp, hasTask, menuState, menuStateAction, empty, day, currentDayClicked, allData} = this.props;

        return (
            <div onClick={(e) => { menuStateAction(e, timestamp, allData); }} className={ hasTask.includes(timestamp) ? 'hasTask' : '' }>
                { empty ? '' : <p >{ day }</p> }
            </div>
        )
    }

}

const stateToProps = ({task}) => (
    {
        currentDayClicked: task.setCurrentDayClicked,
        hasTask: task.hasTask
    }
);

const dispatchToProps = dispatch => ({
    menuStateAction: (event, timestamp, allData) => {
        batch(()=>{
            dispatch(setMenuState);
            dispatch(setCurrentDayClicked([event.currentTarget, allData]));
            dispatch(setDbDayTimestamp(timestamp));          
        }) 
    },
    setHasTaskClass: (value) => { dispatch(setHastaskClass(value)) } 
});
export default connect(stateToProps, dispatchToProps)(DayBox);