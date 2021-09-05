import React from 'react';
import DayBox from './DayBox';

import './DayRow.scss';

const DivRow = ({rowData, firstLast}) => {
    let row = rowData.map(days => (<DayBox key={days.id} day={days.date} timestamp={days.timestamp} allData={days}/>));
    const rowLength = row.length; //

    if(firstLast === "first") {
        if(row.length < 7) {
            for(let i = 0; i < 7-rowLength; i++) {
                row.unshift(
                    <DayBox key={`empty${i}`} empty={true}/>
                );
            }
        }
    }
    if(firstLast === "last") {
        if(row.length < 7) {
            for(let i = 0; i < 7-rowLength; i++) {
                row.push(
                    <DayBox key={`empty${i}`} empty={true}/>
                );
            }
        }
    }
    console.log('divRow rendered');
    return (
        <div className={`divRow ${firstLast}`}>
            {
                row
            }
        </div>
    )
};

export default DivRow;