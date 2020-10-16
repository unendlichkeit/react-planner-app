import React from 'react';

const DayBox = ({day, empty}) => {
    return (
        <div>
            {
                empty ? '' : <p>Day { day }</p>
            }
            
        </div>
    )
}

export default DayBox;