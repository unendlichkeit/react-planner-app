import React from 'react';
import { batch } from 'react-redux';
import { connect } from 'react-redux';
import { setMenuState, setCurrentDayClicked } from '../../redux/task.actions';


const DayBox = ({day, empty, menuStateAction}) => {
    
    return (
        <div onClick={menuStateAction}>
            {
                empty ? '' : <p>Day { day }</p>
            }
        </div>
    )
}

const dispatchToProps = dispatch => ({
    menuStateAction: (event) => {
        batch(()=>{
            dispatch(setMenuState);
            dispatch(setCurrentDayClicked(event.currentTarget));             
        }) 
    }
});
export default connect(null, dispatchToProps)(DayBox);