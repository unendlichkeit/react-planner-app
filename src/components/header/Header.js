import React from 'react';
import {Link} from 'react-router-dom';
import {auth} from '../../firebase/firebaseInit';
import {connect} from 'react-redux';
import './Header.scss';
import { signOut } from "firebase/auth";
import { setCurrentUser } from '../../redux/setCurrentUser.action';
import { resetHasTaskClass } from '../../redux/task.actions';

const Header = ({currentUser, setCurrentUser, resetHasTaskClass}) => {
    //if logged in, add Tasks link
    
    return (
        <div className='headerMenu'>
            <Link className='headerBtns' to='/'>HOME</Link>
            {
                currentUser ?
                <div><div onClick={() => signOut(auth).then(result => { setCurrentUser(null); resetHasTaskClass() }).catch(error=>console.log(error.message))}>SIGN OUT</div><span>{currentUser.email}</span></div> :
                <Link className='headerBtns signin' to='/signIn'>SIGN IN</Link>
            }
        </div>
    )  
}

const dispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user)),
    resetHasTaskClass: () => dispatch(resetHasTaskClass),
});

const mapStateToProps = ({user}) => ({
    currentUser: user.currentUser
});
  
export default connect(mapStateToProps, dispatchToProps)(Header);