import React from 'react';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/setCurrentUser.action';
import { auth, db } from '../../firebase/firebaseInit';
import {Container, Row, Col, Button, Form} from 'react-bootstrap';
import './signInUp.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

class SignInAndUpPage extends React.Component {


    handleSignUp = async event => {
        event.preventDefault();

        const {currentUser} = this.props; //the action
        const formElements = event.target.elements;
        const email = formElements['email'].value;
        const password = formElements['password'].value;
        const confirmPassword = formElements['confirmPassword'].value;

        //send form data to firebase and return the user (object) created in firebase authentication section
        if(password === confirmPassword){
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            console.log(user);
            //add user to db firestore too
            const userDocRef = db.collection('users').doc(user.uid);
            
            const createdAt = new Date();
            await userDocRef.set({
                displayName: user.displayName,
                email: user.email,
                createdAt 
            }).then(resp => console.log("set resp :" + resp)).catch(resp => 'Error creating user - '+resp);

            //setCurrentUser
            currentUser(user);
        }

    }

    handleSignIn = async event => {
        event.preventDefault();
        const formElements = event.target.elements;
        const email = formElements['email'].value;
        const password = formElements['password'].value;

        document.querySelector('.signInError').textContent = 'loading...';
         await auth.signInWithEmailAndPassword(email, password).then(result => {
            document.querySelector('.signInError').textContent = '';
        }).catch(error => {
            document.querySelector('.signInError').textContent = error.message;
        });
    }

    hideSignIn = event => {
        document.querySelector('.outerFrame').classList.remove('show');
    }
    showSignIn = event => {
        document.querySelector('.outerFrame').classList.add('show');
        let signInFormBox = document.querySelector('.signInFormBox');
        if(!signInFormBox.classList.contains('animateOut')) signInFormBox.classList.add('animateOut');
    }

    render() {
        return (

            <div style={{position: 'relative', height: 'calc(100vh - 25px)'}}>
                <h2 className="p-3">Sign In</h2>
                {/* sign in form */}
                <Container>
                    <Row className="justify-content-center">
                        <Col md="5">
                            <div className='signInError'></div>
                            <Form className='sign-in-form' onSubmit={this.handleSignIn}>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type='email'  name='email' label='Email' required/>   
                                </Form.Group>
                                
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type='password' name='password' label='Password' required/>
                                </Form.Group>
                                <Button type='submit'>SIGN IN</Button>
                            </Form>        
                        </Col>
                    </Row>
                </Container>
                
                <p className='text-center'>or</p>
                <p className='text-center'><span className='signInBtn' onClick={this.showSignIn}>Sign Up</span></p>

                {/* sign in form */}
                <div className='outerFrame'>
                    <div className='signInFormBox'>
                        <div className='animationBox'>
                            <div className='signIn-backBtn' onClick={this.hideSignIn}>back</div>

                            <Container>
                                <Row className="justify-content-center">
                                    <Col md="5">
                                        <Form className='sign-up-form' onSubmit={this.handleSignUp}>
                                            <Form.Group>
                                                <Form.Label>Display name</Form.Label>
                                                <Form.Control type='text' name='displayName' label='Display name' required/>
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type='email' name='email' label='Email' required/>
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type='password' name='password'label='Password' required/>
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Repeat password</Form.Label>
                                                <Form.Control type='password' name='confirmPassword' label='Confirm password' required/>
                                            </Form.Group>

                                            <Button type='submit'> SIGN UP </Button>
                                        </Form>
                                    </Col>
                                </Row>
                            </Container>                            
                            
                        </div>
                    </div>
                </div>
            </div>

        )        
    }

}

const dispatchToProps = dispatch => ({
    currentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, dispatchToProps)(SignInAndUpPage);