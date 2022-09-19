import React from 'react';
import {connect} from 'react-redux';
import {setMonthPickerPopupState} from '../../redux/monthPicker.action.js';
import MonthPickerPopup from './month_picker_popup/MonthPickerPopup';

class MonthPickParent extends React.Component {
    render() {
        const {monthPickState} = this.props;
        return (
            <div>
                <div onClick={ this.props.setMonthPickerPopupState }>Choose a previous month from the last 5 years</div>
                { monthPickState === 'show' ? <MonthPickerPopup/> : '' }
            </div>
        )
    }
}

const stateToProps = ({monthPicker}) => ({
    monthPickState: monthPicker.monthPickState
});
const dispatchToProps = (dispatch) => ({
    setMonthPickerPopupState: () => dispatch(setMonthPickerPopupState)
})
export default connect(stateToProps, dispatchToProps)(MonthPickParent);