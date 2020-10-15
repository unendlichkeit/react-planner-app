import React from 'react';
import DayBox from './DayBox';
import './DayRow.scss';

const DivRow = ({rowData, firstLast}) => {
    return (
        <div className={`divRow ${firstLast}`}>
            {
                rowData.map(days => (
                    <DayBox key={days.id} day={days.date} />
                ))
            }
        </div>
    )
};

export default DivRow;