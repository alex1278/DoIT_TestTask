import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';

import { userSignupRequest, setCurrentUser } from '../actions/authActions';
import { addFlashMessage } from '../actions/flashMessagesAction';
import validateInput from '../../server/shared/signupValidation';

class RegisterForm extends React.Component { 
    constructor() {
        super();
        
        this.state = {
            email: '',
            password: '',
            passwordСonfirmation: '',
            formErrors: {}
        }
        this.changeValue = this.changeValue.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    changeValue(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    isValid() {
        const { errors, isValid} = validateInput(this.state);
        if (!isValid) {
            this.setState({ formErrors: errors });
        }
        return isValid;
    }

    submitForm(e) {        
        e.preventDefault();
        if (this.isValid()) {  
            this.setState({
                formErrors: {}
            });
            this.props.userSignupRequest(this.state.email, this.state.password, this.state.passwordСonfirmation).then(
                (response) => { 
                    const token = JSON.parse(response.text).token;
                    localStorage.setItem('jwtToken', token);
                    this.props.setCurrentUser(jwtDecode(token));  
                    this.props.addFlashMessage({
                        type: "success",
                        text: "You signed up successfully. Welcome!"
                    });
                    this.context.router.push('/');
                },  
                ({response}) => {
                    if (response.statusCode == 400) {
                        this.setState({ formErrors: JSON.parse(response.text)}) 
                    }
                    if (response.statusCode == 500) {
                        this.props.addFlashMessage({
                            type: "error",
                            text: response.text
                        });
                    }
                }               
            );
        }        
    }   
    render() { 
        const {formErrors} = this.state;
        return (
            <form onSubmit={this.submitForm}>
                <h2>
                    Registration
                </h2>
                <div className={classnames("form-group", { 'has-error': formErrors.email })}>
                    <input 
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.changeValue} 
                        className="form-control" 
                        placeholder="Email"
                    />
                    {formErrors.email && <span className="help-block">{formErrors.email}</span>}                    
                </div>    
                <div className={classnames("form-group", { 'has-error': formErrors.password })}>   
                    <input 
                        type="password"
                        name="password" 
                        value={this.state.password}
                        onChange={this.changeValue}
                        className="form-control" 
                        placeholder="Пароль"
                    />
                    {formErrors.password && <span className="help-block">{formErrors.password}</span>}
                </div>
                <div className={classnames("form-group", { 'has-error': formErrors.passwordСonfirmation })}>   
                    <input
                        type="password"
                        name="passwordСonfirmation"
                        value={this.state.passwordСonfirmation}
                        onChange={this.changeValue}
                        className="form-control"
                        placeholder="Повторите пароль"
                    />
                    {formErrors.passwordСonfirmation && <span className="help-block">{formErrors.passwordСonfirmation}</span>}
                </div>
                <div className="form-group">    
                    <button 
                        id="sign-up" 
                        className="btn btn-default form-control"
                        type="submit"                     
                        >Регистрация
                    </button>
                </div>
            </form>
        )  
    }
}

RegisterForm.propTypes = {
    userSignupRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    setCurrentUser: PropTypes.func.isRequired
}
RegisterForm.contextTypes = {
    router: PropTypes.object
}

export default connect(null, { userSignupRequest, addFlashMessage, setCurrentUser })(RegisterForm);
