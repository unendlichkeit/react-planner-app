import React from 'react';
// import newArr from '../../calendarDaysLogic';
import monthsNames from '../../stuff/monthsNames';
import {connect} from 'react-redux';
import TaskBox from '../tasks/TaskBox';
import MonthPickParent from './MonthPickParent';

import DivRow from './DivRow';

class CalendarDayView extends React.Component {
    componentDidMount() { console.log('calendarView component did mount'); }
    componentDidUpdate() { console.log('calendarView component did update'); }

    render() {
        const {menuState, newArr} = this.props;
        console.log(newArr);
        return (
            <div>
                <h1>{new Date(newArr[0][0].timestamp).getFullYear()}</h1>
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
                        <div key={index} style={ {display: "flex"} }>
                            <div style={{fontSize: '13px', color: 'darkgray'}}>{ monthsNames[row[0].month] }</div>
                            <DivRow key={index} rowData={row} firstLast={ index===0 ? 'first' : index===newArr.length-1 ? 'last' : '' }/>
                        </div>
                    ))
                }  

                {
                    menuState === "show" ? <TaskBox/> : null
                }
                <MonthPickParent/>
            </div>  
        )
    };
}


const mapStateToProps = ({task, calendar}) => ({
    menuState: task.menuState,
    newArr: calendar.calendarView
});

export default connect(mapStateToProps)(CalendarDayView);