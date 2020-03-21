import React from 'react';
import './View.css';
import LoginForm from './LoginForm';

class View extends React.Component {
    render() {
        return (
        <div className="View">
            <LoginForm />
        </div>
        );
    }
}

export default View;