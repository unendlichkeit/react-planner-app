import React from 'react';
import { Switch, Route, Redirect, HashRouter } from 'react-router-dom';
import {db} from './firebase/firebaseInit';
import {d} from './calendarDaysLogic';
import {connect} from 'react-redux';

import Header from './components/header/Header';
import SignInAndUpPage from './components/header/SignInUp-page';
import CalendarDayView from './components/days/CalendarDayView';


import './App.css';


class App extends React.Component {

  componentDidMount() {
    
    //testing db functions
    db.collection('tasks').add({
      title: "first test",
      date: d
    }).then((result) => console.log(result)); 
  }

  render() {

    return (
      <div>
        <HashRouter basename="/">
          <Header/>

          <Route exact path='/' component={CalendarDayView}/>
          <Route exact path='/signIn' render={() => this.props.currentUser ? (<Redirect to='/'/>) : (<SignInAndUpPage />) } />
        </HashRouter>
      </div>
    );
  }
  
}

const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
});

export default connect(mapStateToProps)(App);
