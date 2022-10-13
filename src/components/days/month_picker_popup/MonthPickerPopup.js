import React from 'react';

class MonthPickerPopup extends React.Component {
    render() {
        let currentYear = new Date().getFullYear();
        let optionsList = [];
        for(let i = currentYear; i > (currentYear-5); i--) {
            console.log('year inside for loop step = ' +(i));
            optionsList.push(<option>{i}</option>);
        }
        return (
            <div className='monthPickerBox'>
                Select year:
                <select>
                    <option>placeholder</option>
                    {optionsList}
                </select>
            </div>
        )
    }
}

export default MonthPickerPopup;