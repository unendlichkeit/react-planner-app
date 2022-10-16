import React from 'react';
import { connect, batch  } from 'react-redux';
import { setMenuState, setCurrentDayClicked, setDbDayTimestamp, setHastaskClass } from '../../redux/task.actions';
import {retrieveTask} from '../../firebase/firebaseInit';
import './DayBox.scss';



class DayBox extends React.Component {
    

    componentDidMount() {
        console.log('dayBox component did mount');
        // console.log(this);
        const { timestamp, hasTask, setHasTaskClass } = this.props;
        
        //retrieve task data from db
        retrieveTask(this.timestamp)
        .then(result => { 
            console.log(retrieveTask(result));
            if(result.exists) {
                // console.log(result.data(), timestamp);
                //daca documentul cu timestampul dat exista, inseamna ca are task in db si trebuie adaugata clasa pe element
                if(!hasTask.includes(timestamp) && result.data())
                {
                    setHasTaskClass(result.data().dayTimestamp);
                }  
                 
            }
        })
        .catch(error => console.log(error));
    }
    componentDidUpdate() { 
        console.log('dayBox component did update'); 
        // console.log(this);
        const { timestamp, hasTask, setHasTaskClass } = this.props;
        //retrieve task data from db
        retrieveTask(this.timestamp).then(result => { 
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

    render() {
        
        const {timestamp, hasTask, menuStateAction, empty, day, allData} = this.props;

        return (
            <div onClick={(e) => { menuStateAction(e, timestamp, allData); }} className={ hasTask.includes(timestamp) ? 'hasTask' : '' }>
                { empty ? '' : <p >{ day }</p> }
            </div>
        )
    }

}

const stateToProps = ({task}) => (
    {
        // currentDayClicked: task.setCurrentDayClicked,
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