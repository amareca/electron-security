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
<<<<<<< HEAD

        const actions = new Map();
        actions.set("S", () => {
            console.log("Has pulsado Signin");

            //1. Comprobamos si los input son correctos
            if (!this.checkSignInForm()) {
                //2. Comprobamos si existe el usuario
                const exists = ipcRenderer.sendSync('invokeLogin', this.getSignInData());
                if (exists) {
                    // ipcRenderer.send('invokeAccounts'); //invocara en el main las acciones para inicializar el componente accounts-component
                    let accs = document.createElement("accounts-component");
                    this.parentNode.appendChild(accs);
                    this.destroy(); //esto borrara el componente
                } else {
                    this.shadowRoot.querySelector('.form-footer > .form-alert').innerHTML = 'No existe ese usuario.';
                }
            }
        });
        actions.set("C", () => {
            console.log("Has pulsado Create new account");

            //1. Comprobamos si los input son correctos
            if (!this.checkCreateAccountForm()) {
                //2. Comprobamos si existe el usuario
                ipcRenderer.send('invokeCreateUserAccount', this.getCreateUserAccountData());
                const exists = ipcRenderer.sendSync('invokeLogin', this.getSignInData());
                if (exists) {
                    this.shadowRoot.querySelector('.form-footer > .form-alert').innerHTML = 'Ya existe ese usuario.';
                } else {
                    //Entra en la app (se envia una señal)
                    ipcRenderer.send('invokeAccounts'); //invocara en el main las acciones para inicializar el componente accounts-component
                }
            }
        });

=======
>>>>>>> parent of 1f04410... Small change
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