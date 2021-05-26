export let d = new Date(new Date().getFullYear(), new Date().getMonth());

let toDisplay = 0;
let monthIncrement = d.getMonth();
// let nrMonthsToDisplay = monthsAdded < 11 ? ;
let days = [];
// while(d.getMonth() < nrMonthsToDisplay)
while(toDisplay < 3)
{
    
  days.push( {day: d.getDay(), date: d.getDate(), month: d.getMonth(), timestamp: d.getTime()} );
  d.setDate(d.getDate()+1);

  if(monthIncrement != d.getMonth())
  {
    monthIncrement = d.getMonth();
    toDisplay++;
  }
  // console.log(d.getMonth(), d.getFullYear());

}

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
    tempArr = [days[i]];
    newArr.push(tempArr);
    
  }
  // if(i===days.length-1) newArr.push(tempArr);
}

export default newArr;