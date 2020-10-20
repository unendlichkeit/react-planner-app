import React from 'react';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/setCurrentUser.action';
import { auth } from '../../firebase/firebaseInit';

class SignInAndUpPage extends React.Component {
    // setCurrentUser({
    //     //obiectul userului logat;
    //     //creare cont si logare se fac cu firebase => auth.onAuthStateChanged( async user => {} )
    // })

    handleSubmit = async event => {
        event.preventDefault();

        const {currentUser} = this.props; //the action
        const formElements = event.target.elements;
        const email = formElements['email'].value;
        const password = formElements['password'].value;

        //send form data to firebase and return the user (object) created in firebase authentication section
        const { user } = await auth.createUserWithEmailAndPassword(email, password);

        //setCurrentUser
        currentUser(user);
    }

    render() {
        return (

            <div>
                {/* sign up form */}
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <input type='text' name='displayName' label='Display name' />
                    <input type='email' name='email' label='Email'  />
                    <input type='password' name='password'label='Password'  />
                    <input type='password' name='confirmPassword' label='Confirm password'  />

                    <button type='submit'> SIGN UP </button>
                </form>
            </div>

        )        
    }

}

const dispatchToProps = dispatch => ({
    currentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, dispatchToProps)(SignInAndUpPage);