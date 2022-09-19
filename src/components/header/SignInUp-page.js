import React from 'react';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/setCurrentUser.action';
import { db } from '../../firebase/firebaseInit';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import {Container, Row, Col, Button, Form} from 'react-bootstrap';
import './signInUp.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const auth = getAuth();

class SignInAndUpPage extends React.Component {
    

    handleSignUp = event => {
        event.preventDefault();

        const {setCurrentUser} = this.props; //the action
        const formElements = event.target.elements;
        const email = formElements.email.value;
        const password = formElements.password.value;
        const confirmPassword = formElements.confirmPassword.value;
        const displayName = formElements.displayName.value;
       
        for(let i = 0; i < formElements.length; i++)
        {
            //validate form fields on page level
            if(formElements[i].required && formElements[i].value === '') {
                console.log(formElements[i]);    
            }
            
        }

        //send form data to firebase and return the user (object) created in firebase authentication section
        if(password === confirmPassword){
            let user = {};
            createUserWithEmailAndPassword(auth, email, password, displayName)
            .then((userCredential) => {
                console.log('user creat?');
                console.log(userCredential);
                user = userCredential.user;
                console.log(user);
                //add user to db firestore too
                const userDocRef = doc(db, 'users', user.uid);
                
                const createdAt = new Date();
                setDoc(userDocRef, {
                    displayName: user.displayName,
                    email: user.email,
                    createdAt 
                })
                .then(resp => console.log("[DB] set resp :" + resp))
                .catch(resp => '[DB] Error creating user - '+resp);
                

                //setCurrentUser
                setCurrentUser(user);
            })
            .catch((error) => {
                console.log(error.message);
                document.querySelector('.signUpError').textContent = error.message;
            });
            
        }

    }

    handleSignIn = event => {
        event.preventDefault(); console.log('sign in submit triggered');
        const {setCurrentUser} = this.props;
        const formElements = event.target.elements;
        const email = formElements['email'].value;
        const password = formElements['password'].value;

        document.querySelector('.signInError').textContent = 'loading...';
        signInWithEmailAndPassword(auth, email, password).then(userCredential => {
            console.log(userCredential);
            setCurrentUser(userCredential.user);
            // document.querySelector('.signInError').textContent = '';
        }).catch(error => {
            document.querySelector('.signInError').textContent = error.message;
        });
    }

    hideSignIn = event => {
        document.querySelector('.outerFrame').classList.remove('show');
    }
    showSignIn = event => {
        document.querySelector('.outerFrame').classList.add('show');
        let signUpFormBox = document.querySelector('.signUpFormBox');
        if(!signUpFormBox.classList.contains('animateOut')) signUpFormBox.classList.add('animateOut');
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
                            <Form className='sign-in-form' onSubmit={this.handleSignIn} noValidate>
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

                {/* sign up form */}
                <div className='outerFrame'>
                    <div className='signUpFormBox'>
                        <div className='animationBox'>
                            <div className='signIn-backBtn' onClick={this.hideSignIn}>back</div>

                            <Container>
                                <Row className="justify-content-center">
                                    <Col md="5">
                                        <p className='signUpError'></p>
                                        <Form className='sign-up-form' onSubmit={this.handleSignUp} noValidate>
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
    setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, dispatchToProps)(SignInAndUpPage);