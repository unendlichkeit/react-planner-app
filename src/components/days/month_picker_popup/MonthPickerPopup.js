import React from 'react';
import { connect } from 'react-redux';
import './MonthPickerPopup.scss';

class MonthPickerPopup extends React.Component {
    render() {
        const {monthPicked, addToMonthSelection} = this.props;

        let currentYear = new Date().getFullYear();
        let optionsList = [];
        for(let i = currentYear; i > (currentYear-5); i--) {
            optionsList.push(<option key={currentYear-i} value={i}>{i}</option>);
        }

        return (
            <div className='monthPickerBox'>
                Select year:
                <select onChange={(e) => addToMonthSelection(e, monthPicked)}>
                    <option value=''>placeholder</option>
                    {optionsList}
                </select>
                <div className='monthPickerMonthsBox' onClick={(e) => addToMonthSelection(e, monthPicked)}>
                    <div className='pickrMonth' >Jan</div>
                    <div className='pickrMonth' >Feb</div>
                    <div className='pickrMonth' >Mar</div>
                    <div className='pickrMonth' >Apr</div>
                    <div className='pickrMonth' >May</div>
                    <div className='pickrMonth' >Jun</div>
                    <div className='pickrMonth' >Jul</div>
                    <div className='pickrMonth' >Aug</div>
                    <div className='pickrMonth' >Sep</div>
                    <div className='pickrMonth' >Oct</div>
                    <div className='pickrMonth' >Nov</div>
                    <div className='pickrMonth' >Dec</div>
                </div>
            </div>
        )
    }
}

const stateToProps = ({monthPicker}) => ({
        monthPicked: monthPicker.monthPicked
    }
);
const dispatchToProps = (dispatch) => ({
        addToMonthSelection: (e, currentStateOfSelection) => {
            if(e.target.nodeName === 'SELECT') {
                console.log('value of select changed');
                if(e.target.value) {
                    currentStateOfSelection[0] = e.target.value;
                }
            }
            if(e.target.classList.contains('pickrMonth')) {
                currentStateOfSelection[1] = e.target.innerText;
            }
            
            console.log(e.target);
            console.log(currentStateOfSelection);

            console.log(currentStateOfSelection.length);
        }
    }
);

export default connect(stateToProps, dispatchToProps)(MonthPickerPopup);