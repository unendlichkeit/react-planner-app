import React from 'react';
import { connect } from 'react-redux';



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