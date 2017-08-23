import React from 'react';
import { Link } from 'react-router';

class NavigationBar extends React.Component {    
    render() { 
        return (
            <nav>
                <Link to='/'>Main Page</Link>
                <Link to='/about'>About author</Link>
                <div className="registerBlock">
                    <Link to='/register'>Register</Link>
                    <Link to='/login'>Sign in</Link>
                </div>
            </nav>
        )  
    }
}

export default NavigationBar;
