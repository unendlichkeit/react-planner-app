import React from 'react';
import { connect } from 'react-redux';
import { changeCalendarContent } from '../../../redux/calendar.action';
import './MonthPickerPopup.scss';

class MonthPickerPopup extends React.Component {
    render() {
        const {addToMonthSelection} = this.props;

        let currentYear = new Date().getFullYear();
        let optionsList = [];
        let yearMonthSelections = [];

        for(let i = currentYear; i > (currentYear-5); i--) {
            optionsList.push(<option key={currentYear-i} value={i}>{i}</option>);
        }

        return (
            <div className='monthPickerBox'>
                Select year:
                <select onChange={(e) => addToMonthSelection(e, yearMonthSelections)}>
                    <option value=''>placeholder</option>
                    {optionsList}
                </select>
                <div className='monthPickerMonthsBox' onClick={(e) => addToMonthSelection(e, yearMonthSelections)}>
                    <div className='pickrMonth' data-id='0'>Jan</div>
                    <div className='pickrMonth' data-id='1'>Feb</div>
                    <div className='pickrMonth' data-id='2'>Mar</div>
                    <div className='pickrMonth' data-id='3'>Apr</div>
                    <div className='pickrMonth' data-id='4'>May</div>
                    <div className='pickrMonth' data-id='5'>Jun</div>
                    <div className='pickrMonth' data-id='6'>Jul</div>
                    <div className='pickrMonth' data-id='7'>Aug</div>
                    <div className='pickrMonth' data-id='8'>Sep</div>
                    <div className='pickrMonth' data-id='9'>Oct</div>
                    <div className='pickrMonth' data-id='10'>Nov</div>
                    <div className='pickrMonth' data-id='11'>Dec</div>
                </div>
            </div>
        )
    }
}

// const stateToProps = ({monthPicker}) => ({
        
//     }
// );
const dispatchToProps = (dispatch) => ({
        addToMonthSelection: (e, yearMonthSelections) => {
            if(e.target.nodeName === 'SELECT') {
                console.log('value of select changed');
                if(e.target.value) {
                    yearMonthSelections[0] = e.target.value;
                }
            }
            if(e.target.classList.contains('pickrMonth')) {
                yearMonthSelections[1] = e.target.dataset.id;
            }
            
            console.log(e.target);
            console.log(yearMonthSelections);

            if(yearMonthSelections.length === 2 && yearMonthSelections[0]){
                dispatch(changeCalendarContent(yearMonthSelections[0], yearMonthSelections[1]));
            }
        }
    }
);

export default connect(null, dispatchToProps)(MonthPickerPopup);