import React from 'react';
import {Link} from 'react-router-dom';
import {auth} from '../../firebase/firebaseInit';
import {connect} from 'react-redux';
import './Header.scss';

const Header = ({currentUser}) => {
    //if logged in, add Tasks link
    return (
        <div>
            <Link className='menuLink' to='/'>HOME</Link>
            {
                currentUser ?
                <div><div onClick={() => auth.signOut()}>SIGN OUT</div><span>{currentUser.email}</span></div> :
                <Link className='menuLink signin' to='/signIn'>SIGN IN</Link>
            }
        </div>
    )  
}

const mapStateToProps = ({user}) => ({
    currentUser: user.currentUser
  });
  
  export default connect(mapStateToProps)(Header);