import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';

import { loginRequest, setCurrentUser } from '../actions/authActions';
import { addFlashMessage } from '../actions/flashMessagesAction';
import validateInput from '../../server/shared/loginValidation';

class LoginForm extends React.Component{
    constructor(props) {
        super(props);
        
        this.state = {
            email: '',
            password: '',
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
            this.props.loginRequest(this.state.email, this.state.password).then(
                (response) => {
                    const token = JSON.parse(response.text).token;
                    localStorage.setItem('jwtToken', token);
                    this.props.setCurrentUser(jwtDecode(token));
                    this.props.addFlashMessage({
                        type: "success",
                        text: "You login successfully. Welcome!"
                    });
                    this.context.router.push('/');
                }, 
                ({response}) => {
                    this.props.addFlashMessage({
                        type: "error",
                        text: response.text
                    });
                }         
            );
        }
    }

    render() {
        const {formErrors} = this.state;
        return(
            <form onSubmit={this.submitForm}>
                <h2>
                    Вход
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
                <div className="form-group">   
                    <button 
                        id="sign-in" 
                        type="submit" 
                        className="btn btn-default sign-in-btn form-control"
                        >Войти
                    </button>
                </div>
            </form>
        )
    } 
}

LoginForm.propTypes = {
    loginRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    setCurrentUser: PropTypes.func.isRequired
}
LoginForm.contextTypes = {
    router: PropTypes.object
}

export default connect(null, { loginRequest, addFlashMessage, setCurrentUser })(LoginForm);

