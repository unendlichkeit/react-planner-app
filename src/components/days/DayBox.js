import React, { useEffect } from 'react';
import { connect, batch  } from 'react-redux';
import { setTaskBoxState, setCurrentDayClicked, setDbDayTimestamp, setHastaskClass } from '../../redux/task.actions';
import {retrieveTask} from '../../firebase/firebaseInit';
import './DayBox.scss';


function DayBox(props) {
    const { timestamp, hasTask, menuStateAction, empty, day, allData, setHasTaskClass, currentUser } = props;
    // const {timestamp, hasTask, menuStateAction, empty, day, allData} = this.props;

    useEffect(() => {
        // console.log('daybox effect');
        // console.log(this);
        // console.log(timestamp); //nu a mers prima oara fara console.logul asta. retrieveTask nu returna taskul chiar daca exista in Firestore
        //retrieve task data from db
        currentUser && retrieveTask(timestamp, currentUser.uid)
        .then(result => { 
            // console.log(result);
            // if(result.exists()) {
                //daca documentul cu timestampul dat exista, inseamna ca are task in db si trebuie adaugata clasa pe element
                // if(!hasTask.includes(timestamp) && result.data())
                if(!hasTask.includes(timestamp) && result.docs.length > 0)
                {
                    // if(result.data().owner === currentUser.uid)
                        // setHasTaskClass(result.data().dayTimestamp);
                    setHasTaskClass(result.docs[0].data().dayTimestamp);
                }  
                 
            // }
        })
        .catch(error => console.log(error));
    }, [currentUser]);

    // componentDidUpdate() { 
    //     const { timestamp, hasTask, setHasTaskClass, currentUser } = this.props;
    //     console.log('DayBox did update');
    //     // console.log(this);

    // }

    
    return (
        <div onClick={(e) => { menuStateAction(e, timestamp, allData); }} className={ hasTask.includes(timestamp) ? 'hasTask' : '' }>
            { empty ? '' : <p >{ day }</p> }
        </div>
    )
    

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
            dispatch(setTaskBoxState);
            dispatch(setCurrentDayClicked([event.currentTarget, allData]));
            dispatch(setDbDayTimestamp(timestamp));          
        }) 
    },
    setHasTaskClass: (value) => { dispatch(setHastaskClass(value)) } 
});
export default connect(stateToProps, dispatchToProps)(DayBox);