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
  componentDidMount() {
      console.log('app component did mount');
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


    return (
      <div>
        <HashRouter basename="/">
          <Header/>
          
          <Routes>
            <Route exact path='/' element={<CalendarDayView/>}/>
            <Route exact path='/signIn' render={() => this.props.currentUser ? (<Navigate to='/'/>) : (<SignInAndUpPage />) } />
          </Routes>
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
