import React from 'react';
import newArr from '../../calendarDaysLogic';
import monthsNames from '../../stuff/monthsNames';
import {connect} from 'react-redux';
import Task from '../tasks/TaskBox';

import DivRow from './DivRow';


const CalendarDayView = ({menuState}) => {
    return (

        <div>
            
            <div className="calendarHeader" style={{display:'flex'}}>
                <div style={{width: '21px'}}></div>
                <div style={{display: 'flex', flex: '1', justifyContent: 'space-around'}}>
                    <div>Su</div>
                    <div>Mo</div>
                    <div>Tu</div>
                    <div>We</div>
                    <div>Th</div>
                    <div>Fr</div>
                    <div>Sa</div>            
                </div>
            </div>
            
            {
                newArr.map((row, index) => (
                    <div style={ {display: "flex"} }>
                        <div key={`0${index}`} style={{fontSize: '13px', color: 'darkgray'}}>{ monthsNames[row[0].month] }</div>
                        <DivRow key={index} rowData={row} firstLast={ index==0 ? 'first' : index==newArr.length-1 ? 'last' : '' }/>
                    </div>
                ))
            }  

            {
                menuState === "show" ? <Task/> : null
            }

        </div>      
    )
}

const mapStateToProps = ({task}) => ({
    menuState: task.menuState
});

export default connect(mapStateToProps)(CalendarDayView);