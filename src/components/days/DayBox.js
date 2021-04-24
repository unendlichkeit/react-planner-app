import React from 'react';
import ReactDOM from 'react-dom';
import { connect, batch  } from 'react-redux';
import { setMenuState, setCurrentDayClicked } from '../../redux/task.actions';
import AddTaskBox from '../tasks/AddTaskBox';


class DayBox extends React.Component {
    //({day, empty, menuStateAction, menuState}) =>
    //ReactDOM.findDOMNode(this)
   
    componentDidUpdate() {
        console.log('dayBox component mounted');
    }

    render() {
        const { menuState, menuStateAction, empty, day, currentDayClicked } = this.props;
        //console.log(currentDayClicked);
        
        return (
            
            <div onClick={menuStateAction}>
                { empty ? '' : <p>Day { day }</p> }
                { menuState === "show" ? 
                //if current rendered dayBox is the currentDayClicked, render AddTaskBox
                <AddTaskBox/> : null  }
                
            </div>
        )        
    }

}

const stateToProps = ({task}) => (
    {
        menuState: task.menuState,
        currentDayClicked: task.setCurrentDayClicked
    }
);

const dispatchToProps = dispatch => ({
    menuStateAction: (event) => {
        
        batch(()=>{
            dispatch(setMenuState);
            dispatch(setCurrentDayClicked(event.currentTarget));             
        }) 
    }
});
export default connect(stateToProps, dispatchToProps)(DayBox);