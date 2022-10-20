import React from 'react';
import { Routes, Route, Navigate, HashRouter } from 'react-router-dom';
import {auth} from './firebase/firebaseInit';
import {onAuthStateChanged} from 'firebase/auth';
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/setCurrentUser.action';


import Header from './components/header/Header';
import SignInAndUpPage from './components/header/SignInUp-page';
import CalendarDayView from './components/days/CalendarDayView';

import './App.scss';


class App extends React.Component {

  componentDidMount() {
    console.log('app component did mount');
    const { setCurrentUser } = this.props;

    const userStateChange = onAuthStateChanged(auth, user => {
      // console.log('user logged in is: ' + user);

      if(user) {
        //user is signed in
        setCurrentUser(user)
      }
      else {
        console.log('user nu e logat ?!');
        //user returneaza 'null' daca nu e logat
        setCurrentUser(user);
      }
    });

    
  }
  
  
  render() {
    // append/remove add task popup menu
    // const { menuState, setCurrentDayClicked } = this.props;
    
    // let toAppend = document.createElement('div');
    // toAppend.appendChild(document.createTextNode('Add task +'));
    // if(menuState === "show")
    //   setCurrentDayClicked.appendChild(toAppend);
    //   // console.log('menuState = show');
    // else {
    //   if(setCurrentDayClicked) {
    //     setCurrentDayClicked.removeChild(setCurrentDayClicked.lastChild); 
    //   }
     
    // }
    const toggleDone = (e) => {
      if(e.target.nodeName === 'LI') {
        if(e.target.style.textDecoration === 'line-through')
          e.target.style.textDecoration = 'none';
        else e.target.style.textDecoration = 'line-through';
      }
    }

    return (
      <div>
        <HashRouter basename="/">
          <Header/>
          
          <Routes>
            <Route exact path='/' element={<CalendarDayView/>}/>
            <Route exact path='/signIn' element={this.props.currentUser ? (<Navigate to='/'/>) : (<SignInAndUpPage />)} />
          </Routes>
          <div>
            to do:
            <ul onClick={(e) => toggleDone(e)}>
              <li>[monthPicker] cand se selecteaza an si luna, sa se re-randeze doar cand se selecteaza ceva pt ambele(?)</li>
              <li>[task]de adaugat functionalitate pt vizualizat taskurile existente pe o zi</li>
              <li>[task]de adaugat functionalitate pt sters taskuri</li>
              <li>[task]de sters campurile odata ce addTask() a terminat si aratat mesaj ca taskul a fost introdus in DB</li>
              <li>[task]de marcat cu hasTask ziua pt care tocmai s-a creat un task nou</li>
              <li>[task]de legat taskurile la un user</li>
              <li>[task]de afisat doar taskurile apartinand userului logat</li>
            </ul>
            <code>
              -------------------------------------<br/>
              Explicatie comportament DayBox cand intalneste zile care contin task:<br/>
              component mount -> schimba prop -> triggeruieste component update care din nou -> schimba prop -> trigger component update<br/>
              <br/>
              component updateul generat de prima schimbare de prop o sa vada propul in aceeasi stare in care a vazut-o component mountul, respectiv evenimentul care a generat acest update => d-asta exista un update care vede propsul cu valoarea veche
            </code>
          </div>
        </HashRouter>
      </div>
    );
  }
  
}

const dispatchToProprs = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

const mapStateToProps = ({user, task}) => ({
  currentUser: user.currentUser,
  menuState: task.menuState,
  setCurrentDayClicked: task.setCurrentDayClicked
});

export default connect(mapStateToProps, dispatchToProprs)(App);
