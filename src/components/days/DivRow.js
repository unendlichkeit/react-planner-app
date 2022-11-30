import React from 'react';
import { connect } from 'react-redux';
import DayBox from './DayBox';

import './DayRow.scss';

class DivRow extends React.Component {
    componentDidMount() { 
        console.log('dayRow component did mount'); 
        // console.log(this);
    }
    componentDidUpdate() { 
        console.log('dayRow component did update'); 
        // console.log(this);
    }

    render() {
        const {rowData, firstLast, currentUser} = this.props;

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

        return (
            <div className={`divRow ${firstLast}`}>
                {
                    row 
                }
            </div>
        )
    }
} 

const stateToProps = ({user}) => (
    {
        currentUser: user.currentUser
    }
);

export default connect(stateToProps)(DivRow);