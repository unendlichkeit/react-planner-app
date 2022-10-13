import React from 'react';
import './MonthPickerPopup.scss';

class MonthPickerPopup extends React.Component {
    render() {
        let currentYear = new Date().getFullYear();
        let optionsList = [];
        for(let i = currentYear; i > (currentYear-5); i--) {
            optionsList.push(<option key={currentYear-i}>{i}</option>);
        }

        return (
            <div className='monthPickerBox'>
                Select year:
                <select>
                    <option>placeholder</option>
                    {optionsList}
                </select>
                <div className='monthPickerMonthsBox'>
                    <div className='pickrMonth'>Jan</div>
                    <div className='pickrMonth'>Feb</div>
                    <div className='pickrMonth'>Mar</div>
                    <div className='pickrMonth'>Apr</div>
                    <div className='pickrMonth'>May</div>
                    <div className='pickrMonth'>Jun</div>
                    <div className='pickrMonth'>Jul</div>
                    <div className='pickrMonth'>Aug</div>
                    <div className='pickrMonth'>Sep</div>
                    <div className='pickrMonth'>Oct</div>
                    <div className='pickrMonth'>Nov</div>
                    <div className='pickrMonth'>Dec</div>
                </div>
            </div>
        )
    }
}

export default MonthPickerPopup;