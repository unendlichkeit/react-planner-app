import React from 'react';
import ReactDOM from 'react-dom';
import { connect, batch  } from 'react-redux';
import { setMenuState, setCurrentDayClicked, setDbDayTimestamp, setHastaskClass } from '../../redux/task.actions';
import {retrieveTask} from '../../firebase/firebaseInit';



class DayBox extends React.Component {

    componentDidMount() {
        console.log('dayBox component did mount');
    }
    shouldComponentUpdate() {
        
    }

    render() {
        const { menuState, menuStateAction, empty, day, currentDayClicked, timestamp, allData, hasTask, setHasTaskClass } = this.props;
        
        //retrieve task data from db
        retrieveTask(timestamp).then(result => { if(result.exists) {
            console.log(result.data());
            //daca documentul cu timestampul dat exista, inseamna ca are task in db si trebuie adaugata clasa pe element
            setHasTaskClass(true);
            console.log(this);
            }
            // else  { creeaza loop
            //     setHasTaskClass(false);
            // }   
        });
        //className={`${hasTasksSaved?'hasTask':''}`}
        return (
            
            <div onClick={(e) => { menuStateAction(e, timestamp); }} className={hasTask ? 'hasTask' : ' '}>
                { empty ? '' : <p >Day { day }</p> }
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
    menuStateAction: (event, timestamp) => {
        batch(()=>{
            dispatch(setMenuState);
            dispatch(setCurrentDayClicked(event.currentTarget));
            dispatch(setDbDayTimestamp(timestamp));          
        }) 
    },
    setHasTaskClass: (value) => dispatch(setHastaskClass(value)) 
});
export default connect(stateToProps, dispatchToProps)(DayBox);