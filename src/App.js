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
        {
          newArr.map(row => (
            <DivRow>
              {
                row.map(days => (
                  <DayBox day={days.date} />
                ))
              }
            </DivRow>
          ))
          // days.map(day => (<DayBox day={day.date}/>))
        }
      </div>
    );
  }
  
}

export default App;
