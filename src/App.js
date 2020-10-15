import React from 'react';
import './App.css';
import DayBox from './components/days/DayBox';
import DivRow from './components/days/DivRow';


class App extends React.Component {

  render() {
    
    let d = new Date(new Date().getFullYear(), new Date().getMonth());

    let nrMonthsToDisplay = d.getMonth()+2;
    let days = [];
    while(d.getMonth() < nrMonthsToDisplay)
    {
      // console.log(d.getMonth(), d.getFullYear());
      // console.log(nrMonthsToDisplay);
      days.push( {day: d.getDay(), date: d.getDate()} );
      d.setDate(d.getDate()+1);
    }
console.log(days);

    let newArr = [];
    let tempArr = [];
    for(let i =0; i<days.length; i++)
    {
      //set id for each day object 
      days[i].id = i+1;

      //if day!=0, push object to temporary array, else push the whole temp array
      if(days[i].day !== 0) {
        tempArr.push(days[i]);
        // console.log(tempArr);
      }
      else {
        newArr.push(tempArr);
        tempArr = [days[i]];
      }
      if(i===days.length-1) newArr.push(tempArr);
    }
    console.log(newArr);

    return (
      <div>
        <div className="calendarHeader" style={{'display':'flex', 'justifyContent': 'space-around'}}>
          <div>Su</div>
          <div>Mo</div>
          <div>Tu</div>
          <div>We</div>
          <div>Th</div>
          <div>Fr</div>
          <div>Sa</div>
        </div>
        {
          newArr.map((row, index) => (
            <DivRow key={index} rowData={row} firstLast={ index==0 ? 'first' : index==newArr.length-1 ? 'last' : '' }/>
          ))
          // days.map(day => (<DayBox day={day.date}/>))
        }
      </div>
    );
  }
  
}

export default App;
