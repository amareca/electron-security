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
                let email = this.shadowRoot.querySelector('#form-email > input').value
                let password = this.shadowRoot.querySelector('#form-password > input').value
                console.log([email, password])

                //Call to main.js then check data and calls DAO
                ipcRenderer.send('invokeLogin', [email, password]);
            });
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = { LoginComponent} ;