import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from '../actions/authActions';
import { addFlashMessage } from '../actions/flashMessagesAction';

class NavigationBar extends React.Component { 
    logout(e) {
        e.preventDefault();
        this.props.logout();
        this.props.addFlashMessage({
            type: "success",
            text: "Bye!"
        });
    }   

    render() {
        const { isAuthenticated } = this.props.authorization; 
        const userLinks = (
            <a href="#" onClick={this.logout.bind(this)}>Logout</a>
        );
        const guestLinks = (
            <div>
                <Link to='/register'>Register</Link>
                <Link to='/login'>Sign in</Link>
            </div>
        );
        return (
            <nav>
                <Link to='/'>Main Page</Link>
                <Link to='/about'>About author</Link>
                <div className="registerBlock">
                    { isAuthenticated ? userLinks : guestLinks }
                </div>
            </nav>
        )  
    }
}
NavigationBar.propTypes = {
    authorization: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        authorization: state.authorization
    }
}

export default connect(mapStateToProps, { logout, addFlashMessage })(NavigationBar);
