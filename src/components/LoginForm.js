import React from 'react';
import './LoginForm.css';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'david',
            password: 'paco1234',
            confirmPassword: '',
            alerts: {
                email: '',
                password: '',
                confirmPassword: '',
                action: ''
            },
            settings: {
                action: 'LOGIN',
                titleLabel: 'Sign-in',
                showConfirmPassword: 'none',
                gotoText: 'Create new account'
            }
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const value = event.target.value;
        this.setState({
            ...this.state,
            [event.target.name]: value
        });
    }

    execute() {
        let user = {
            email: this.state.email,
            password: this.state.password,
        };
        if (!this.checkSignInForm()) {
            if (this.state.settings.action === 'LOGIN') {
                window.ipcRenderer.send('invokeLogin', user);
            } else if (this.state.settings.action === 'CREATE') {
                user = {
                    ...user,
                    confirmPassword: this.state.confirmPassword
                }
                window.ipcRenderer.send('invokeCreateNewUser', user);
            }
            console.log(user);
        }

    }

    checkSignInForm() {
        let result = false;
        this.clearAlerts();

        const validations = [
            this.validateEmail(this.state.email),
            this.validatePassword(this.state.password),
            this.validateConfirmPassword(this.state.password,
                this.state.confirmPassword)
        ];
        console.log(validations)
        if (!validations[0]) {
            //No es valido
            this.setState((state) => ({
                alerts: {
                    ...state.alerts,
                    email: 'El correo no es valido.',
                }
            }))
        }
        if (!validations[1]) {
            //No es valido
            this.setState((state) => ({
                alerts: {
                    ...state.alerts,
                    password: 'La password no es valida.',
                }
            }))
        }
        if (!validations[2]) {
            //No es valido
            this.setState((state) => ({
                alerts: {
                    ...state.alerts,
                    confirmPassword: 'La password no coincide.',
                }
            }))
        }

        validations.some(v => {
            if (!v) {
                return result = true;
            }
        });
        console.log(this.state)
        return result;
    }

    clearAlerts() {
        this.setState(() => ({
            alerts: {
                email:  '',
                password:  '',
                confirmPassword:  '',
                action:  ''
            }
        }));
    }

    clearInputs() {
        this.setState(() => ({
            email: '',
            password: '',
            confirmPassword: ''
        }));
    }

    validateEmail(email) {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return mailformat.test(email);
    }

    validatePassword(password) {
        return password !== '';
    }

    validateConfirmPassword(password, confirmPassword) {
        return (password === confirmPassword && password !== '' && this.validatePassword(password));
    }

    checkInputForms() {

    }

    changeAction() {
        this.clearInputs();
        this.clearAlerts();
        if (this.state.settings.action === 'LOGIN') {
            this.setState(() => ({
                settings: {
                    action: 'CREATE',
                    titleLabel: 'Create New Account',
                    showConfirmPassword: 'flex',
                    gotoText: 'Already have an account? Sign in'
                }
            }));
        } else {
            this.setState(() => ({
                settings: {
                    action: 'LOGIN',
                    titleLabel: 'Sign-in',
                    showConfirmPassword: 'none',
                    gotoText: 'Create new account'
                }
            }));
        }
    }

    render() {
        return (
            <div className="LoginForm">
                <div className="form-box">
                    <div className="form-input-box form-header">
                        <h3>{this.state.settings.titleLabel}</h3>
                    </div>
                    <div className="form-input-box form-email">
                        <label>Email</label>
                        <input type="text" name="email" value={this.state.email} onChange={this.handleChange} placeholder="john@gmail.com..." />
                        <div className="form-alert"> {this.state.alerts.email}</div>
                    </div>
                    <div className="form-input-box form-password">
                        <span>Password</span>
                        <input type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="**********" />
                        <div className="form-alert">{this.state.alerts.password}</div>
                    </div>
                    {/* Por defecto, no deberia estar disponible */}
                    <div className="form-input-box form-confirm-password" style={{ display: this.state.settings.showConfirmPassword }}>
                        <span>Confirm Password</span>
                        <input type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange} placeholder="**********" />
                        <div className="form-alert">{this.state.alerts.confirmPassword}</div>
                    </div>
                    <div className="form-input-box form-footer">
                        <button className="btn-action" onClick={() => this.execute()}>Continue</button>
                        <div className="form-alert" > {this.state.alerts.action} </div>
                        <p id="form-goto" onClick={() => this.changeAction()}>  {this.state.settings.gotoText}</p>
                        {/* <p id="form-forgot-password"> Forgot password?</p> */}
                    </div>
                </div>
            </div>
        );
    }
}
export default LoginForm;