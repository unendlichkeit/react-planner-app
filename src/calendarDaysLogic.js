let d = new Date(new Date().getFullYear(), new Date().getMonth()); //returneaza prima zi din luna curenta

let toDisplay = 0;
let monthIncrement = d.getMonth();
// let nrMonthsToDisplay = monthsAdded < 11 ? ;
let days = [];
// while(d.getMonth() < nrMonthsToDisplay)
while(toDisplay < 1)
{
  //console.log(d.getDate());
  days.push( { day: d.getDay(), date: d.getDate(), month: d.getMonth(), timestamp: d.getTime(), id: d.getDate()} );
  d.setDate(d.getDate()+1);
  //console.log(days);
  if(monthIncrement !== d.getMonth())
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
  // days[i].id = i+1;

  //if day!=0, push object to temporary array, else push the whole temp array
  if(days[i].day !== 0) {
    tempArr.push(days[i]);
    // console.log('tempArr addition: ',days[i]);
  }
  else {
    newArr.push(tempArr);
    tempArr = [days[i]];
    // console.log('tempArr else day=0: ',days[i],tempArr, newArr);
    
  }
  
  // if(i===days.length-1) newArr.push(tempArr);
}
newArr.push(tempArr);

export default newArr;