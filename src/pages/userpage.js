import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../components/UI/Input/Input';
import Button from '../components/UI/Button/Button';
import classes from './userpage.module.css';
import inputClasses from '../components/UI/Input/Input.module.css';
import FaUser from 'react-icons/lib/fa/user';
import FaLock from 'react-icons/lib/fa/lock';
import logo from '../images/logo.png';
import NavigationItem from '../components/navigation/navigationItem/navigationItem';
import * as actions from '../store/actions/index';

class Auth extends Component {
    state = {
        controls: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'name',
                    placeholder: 'Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'username',
                    placeholder: 'Username'
                },
                value: '',
                validation: {
                    required: true,
                    // minLength: 3,
                    // maxLength: 50,
                },
                valid: false,
                touched: false
            },
            // email_user: {
            //     elementType: 'input',
            //     elementConfig: {
            //         type: 'email_user',
            //         placeholder: 'Username or Email'
            //     },
            //     value: '',
            //     validation: {
            //         required: true
            //     },
            //     valid: false,
            //     touched: false
            // },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    maxLength: 50,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6, 
                    maxLength: 100
                },
                valid: false,
                touched: false
            },            
            role: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'consumer', displayValue: 'Consumer'},
                        {value: 'customer', displayValue: 'Customer'}
                    ]
                },
                value: 'consumer',
                validation: {},
                valid: true
            }
        },        
        isSignup: false
    }

    componentDidMount() {
        if (this.props.authRedirectPath !== '/search') {
            this.props.onSetAuthRedirectPath();
        }
    }

    checkValidity ( value, rules ) {
        let isValid = true;
        if ( !rules ) {
            return true;
        }

        if ( rules.required ) {
            isValid = value.trim() !== '' && isValid;
        }

        if ( rules.minLength ) {
            isValid = value.length >= rules.minLength && isValid
        }

        if ( rules.maxLength ) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if ( rules.isEmail ) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test( value ) && isValid
        }

        if ( rules.isNumeric ) {
            const pattern = /^\d+$/;
            isValid = pattern.test( value ) && isValid
        }

        return isValid;
    }

    inputChangedHandler = ( event, controlName ) => {
      // console.log(...this.state.controls);
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity( event.target.value, this.state.controls[controlName].validation ),
                touched: true
            }
        };
        console.log(updatedControls);
        console.log(this.state);
        this.setState( { controls: updatedControls } );

    }

    submitHandler = ( event ) => {
        event.preventDefault(); //name, email, username, email_user, password, role, isSignup 
        this.props.onAuth( this.state.controls.name.value, this.state.controls.email.value, this.state.controls.username.value, this.state.controls.password.value, this.state.controls.role.value, this.state.isSignup );
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
    }

    render () {
        const formElementsArray = [];
        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }

        let form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
        ) );

        let formBuilder = null;
        const inClassesPass = [inputClasses.InputElement];
        const inClassesUsername = [inputClasses.InputElement];

        formBuilder = (
        <div>
            <div className={inputClasses.Input}>
                {!this.state.controls.username.valid && this.state.controls.username.validation && this.state.controls.username.touched ? <p className={classes.error}>Invalid username/email</p> : ''}
                <input className={inClassesUsername.join(' ')} type='user' placeholder='Username or Email' onChange={(event) => this.inputChangedHandler(event, "username")}/>                    
                <i className={inputClasses.icon}><FaUser/></i>
            </div>
            <div className={inputClasses.Input}>
                {!this.state.controls.password.valid && this.state.controls.password.validation && this.state.controls.password.touched ? <p className={classes.error}>Min length is 6, max length is 100</p> : ''}
                <input className={inClassesPass.join(' ')} type='password' placeholder='Password' onChange={(event) => this.inputChangedHandler(event, "password")}/>                   
            <i className={inputClasses.icon}><FaLock/></i>
            </div>
        </div>
        );        

        let errorMessage = null;        
        if (this.props.error) {
            errorMessage = (
                <p className={classes.bad_cred}>Bad credentials</p>
            );
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }
        let isEnabled = this.state.controls.username.valid && this.state.controls.password.valid;
        return (            
            <div className={classes.form_center}>    
                <div className={classes.signup}><NavigationItem link="/signup" exact>Sign up</NavigationItem>  </div>         
                {authRedirect}
                <img src={logo} alt="logo" className={classes.img} />
                <p className={classes.p}>Building Product Selection Platform</p>
                <form onSubmit={this.submitHandler} className={classes.form_login}>
                    <div>
                    {/* {form} */}
                    {formBuilder}
                    {errorMessage}
                    <Button disabled={!isEnabled}>Log In</Button></div>
                </form> 
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
      // onAuth: ( email, password, isSignup ) => dispatch({type:actionTypes.AUTH_START}）,
        onAuth: ( name, email, username, password, role, isSignup ) => dispatch( actions.auth( name, email, username, password, role, isSignup ) ),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/search'))
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Auth );
