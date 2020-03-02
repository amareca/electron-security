const { Component } = require('@component')

class LoginComponent extends Component {
    constructor () {
        super()  
    }

    init() {
        this.path = __dirname
    }

    addEvents() {
        let ipcRenderer = require('electron').ipcRenderer;
        try {
            const btnLogin = this.shadowRoot.querySelector('#btn-login')
            btnLogin.addEventListener('click', () => {
                let user = {
                    email: this.shadowRoot.querySelector('#form-email > input').value,
                    password: this.shadowRoot.querySelector('#form-password > input').value
                };
                console.log(user);

                //Call to main.js then check data and calls service
                ipcRenderer.send('invokeLogin', user);
            });
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = { LoginComponent} ;