import React from 'react';
import {Link} from 'react-router-dom';
import {auth} from '../../firebase/firebaseInit';
import {connect} from 'react-redux';

const Header = ({currentUser}) => {
    //if logged in, add Tasks link
    return (
        <div>
            {
                currentUser ?
                <div><div onClick={() => auth.signOut()}>SIGN OUT</div><span>{currentUser.email}</span></div> :
                <Link className='signin' to='/signIn'>SIGN IN</Link>
            }
        </div>
    )  
}

const mapStateToProps = ({user}) => ({
    currentUser: user.currentUser
  });
  
  export default connect(mapStateToProps)(Header);