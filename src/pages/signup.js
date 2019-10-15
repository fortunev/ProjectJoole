import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../components/UI/Input/Input';
import Button from '../components/UI/Button/Button';
import classes from './userpage.module.css';
import inputClasses from '../components/UI/Input/Input.module.css';
import FaUser from 'react-icons/lib/fa/user';
import FaLock from 'react-icons/lib/fa/lock';
import FaMail from 'react-icons/lib/md/email';
import FaImage from 'react-icons/lib/fa/file-image-o';
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
                    required: true,
                    minLength: 3,
                    maxLength: 50,
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
                    minLength: 3,
                    maxLength: 50,
                },
                valid: false,
                touched: false
            },           
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
            image: {
                elementType: 'file',
                elementConfig: {
                    type: 'image',
                    placeholder: ''
                },
                value: '',
                file: '',               
                validation: {
                    required: true,
                    imgExtension: ['jpg', 'gif', 'png']
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
        isSignup: true
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
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

        if( rules.imgExtension ){
            let extension = value.split(".").pop();
            console.log(extension);
            switch (extension){
                case "png":
                    console.log("png - "+extension);
                    if(extension !== "png")
                        isValid = false && isValid;
                    console.log(isValid);
                    break;
                case "jpg":
                    console.log("jpg - "+extension);
                    if(extension !== "jpg")
                        isValid = false && isValid;
                    console.log(isValid);
                    break;
                default:
                    isValid = false && isValid;
            }            
        }
        return isValid;
    }

    inputChangedHandler = ( event, controlName ) => {
      let updatedControls = null;
      if (controlName === "image"){
        updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                file: URL.createObjectURL(event.target.files[0]),
                valid: this.checkValidity( event.target.value, this.state.controls[controlName].validation ),
                touched: true
            }
        };
      }
      else{
        updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity( event.target.value, this.state.controls[controlName].validation ),
                touched: true
            }
        };
      }  
        console.log(updatedControls);
        console.log(this.state);
        this.setState( { controls: updatedControls } );
    }

    submitHandler = ( event ) => {
        event.preventDefault();
        this.props.onAuth( this.state.controls.name.value, this.state.controls.email.value, this.state.controls.username.value,  this.state.controls.password.value, this.state.controls.role.value, this.state.controls.image.file, this.state.isSignup );
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
        const inClassesEmail = [inputClasses.InputElement];
        const inClassesPass = [inputClasses.InputElement];
        const inClassesName = [inputClasses.InputElement];
        const inClassesUsername = [inputClasses.InputElement];

        formBuilder = (
        <div>
            <div className={inputClasses.Input}>    
                {!this.state.controls.name.valid && this.state.controls.name.validation && this.state.controls.name.touched ? <p className={classes.error}>Min length is 3, max length is 50</p> : ''}                
                <input className={inClassesName.join(' ')} type='name' placeholder='Name' onChange={(event) => this.inputChangedHandler(event, "name")}/>                    
                <i className={inputClasses.icon}><FaUser/></i>
            </div>
            <div className={inputClasses.Input}>
                {!this.state.controls.username.valid && this.state.controls.username.validation && this.state.controls.username.touched ? <p className={classes.error}>Min length is 3, max length is 50</p> : ''}
                <input className={inClassesUsername.join(' ')} type='username' placeholder='Username' onChange={(event) => this.inputChangedHandler(event, "username")}/>                   
            <i className={inputClasses.icon}><FaUser/></i>
            </div>
            <div className={inputClasses.Input}>
                {!this.state.controls.email.valid && this.state.controls.email.validation && this.state.controls.email.touched ? <p className={classes.error}>Invalid username/email</p> : ''}
                <input className={inClassesEmail.join(' ')} type='email' placeholder='Email' onChange={(event) => this.inputChangedHandler(event, "email")}/>                    
                <i className={inputClasses.icon}><FaMail/></i>
            </div>
            <div className={inputClasses.Input}>
                {!this.state.controls.password.valid && this.state.controls.password.validation && this.state.controls.password.touched ? <p className={classes.error}>Min length is 6, max length is 100</p> : ''}
                <input className={inClassesPass.join(' ')} type='password' placeholder='Password' onChange={(event) => this.inputChangedHandler(event, "password")}/>                   
            <i className={inputClasses.icon}><FaLock/></i>
            </div>
            <div className={inputClasses.Input}>                    
                <select className={inClassesName.join(' ')} type='role' placeholder='Role' onChange={(event) => this.inputChangedHandler(event, "role")}>   
                    <option value="consumer">Consumer</option>
                    <option value="customer">Customer</option>
                </select>              
                <i className={inputClasses.icon}><FaUser/></i>
            </div>
            <div className={inputClasses.Input}>
                {!this.state.controls.image.valid && this.state.controls.image.validation && this.state.controls.image.touched ? <p className={classes.error}>Image required</p> : ''}
                <input className={inClassesPass.join(' ')} type='file' name="pic" accept="image/x-png,image/gif,image/jpeg" onChange={(event) => this.inputChangedHandler(event, "image")}/>                   
            <i className={inputClasses.icon}><FaImage/></i>
            </div>
            <div className={inputClasses.image}>
                {this.state.controls.image.file ? <h3 className={inputClasses.Label}>Preview image</h3> : "" }  
                <img src={this.state.controls.image.file} className={inputClasses.img} alt=""/>
            </div>
        </div>
        );
        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }
        let isEnabled = this.state.controls.email.valid && this.state.controls.password.valid && this.state.controls.username.valid;
        return (            
            <div className={classes.form_center}>    
                <div className={classes.signup}><NavigationItem link="/auth" exact>Log in</NavigationItem>  </div>         
                {authRedirect}
                {errorMessage}
                <img src={logo} alt="logo" className={classes.img} />
                <p className={classes.p}>Building Product Selection Platform</p>                
                <form onSubmit={this.submitHandler} className={classes.form_signup}>
                    <div>
                    {/* {form} */}
                    {formBuilder}
                    <Button disabled={!isEnabled}>Sign Up</Button></div>
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
        onAuth: (name, email, username, password, role, image, isSignup ) => dispatch( actions.auth(name, email, username, password, role, image, isSignup ) ),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/auth'))
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Auth );
