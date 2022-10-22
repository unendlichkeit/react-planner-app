import React from 'react';
import { connect, batch  } from 'react-redux';
import { setMenuState, setCurrentDayClicked, setDbDayTimestamp, setHastaskClass } from '../../redux/task.actions';
import {retrieveTask} from '../../firebase/firebaseInit';
import './DayBox.scss';



class DayBox extends React.Component {
    componentDidMount() {
        const { timestamp, hasTask, setHasTaskClass, currentUser } = this.props;
        // console.log(hasTask);
        // console.log(timestamp); //nu a mers prima oara fara console.logul asta. retrieveTask nu returna taskul chiar daca exista in Firestore
        //retrieve task data from db
        retrieveTask(timestamp)
        .then(result => { 
            
            if(result.exists()) {
                console.log(currentUser.uid);
                console.log(result.data().owner);
                //daca documentul cu timestampul dat exista, inseamna ca are task in db si trebuie adaugata clasa pe element
                if(!hasTask.includes(timestamp) && result.data())
                {
                    if(result.data().owner === currentUser.uid)
                        setHasTaskClass(result.data().dayTimestamp);
                }  
                 
            }
        })
        .catch(error => console.log(error));
    }
    componentDidUpdate() { 
        
        console.log('DayBox did update');

    }

    render() {
        
        const {timestamp, hasTask, menuStateAction, empty, day, allData} = this.props;

        return (
            <div onClick={(e) => { menuStateAction(e, timestamp, allData); }} className={ hasTask.includes(timestamp) ? 'hasTask' : '' }>
                { empty ? '' : <p >{ day }</p> }
            </div>
        )
    }

}

const stateToProps = ({task, user}) => (
    {
        currentUser: user.currentUser,
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