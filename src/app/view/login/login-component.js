const { Component } = require('@component');

const signInText = 'Continue';
const createAccountText = 'Create your account';

class LoginComponent extends Component {
    constructor() {
        super();
    }

    init() {
        this.path = __dirname;
    }

    addEvents() {
        let ipcRenderer = require('electron').ipcRenderer;

        const actions = new Map();
        actions.set("S", () => {
            console.log("Has pulsado Signin");

            //1. Comprobamos si los input son correctos
            if (!this.checkSignInForm()) {
                //2. Comprobamos si existe el usuario
                const exists = ipcRenderer.sendSync('invokeLogin', this.getSignInData());
                if (exists) {
                    //Entra en la app
                    this.style.display = "none";
                    this.parentElement.lastElementChild.style.display = "flex";
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

                }
            }
        });

        try {
            const btnAction = this.shadowRoot.querySelector('.btn-action');
            btnAction.addEventListener('click', actions.get(btnAction.getAttribute("action")));
            
            const signin = this.shadowRoot.querySelector("#form-signin");
            signin.addEventListener("click", () => {
                btnAction.removeEventListener('click', actions.get(btnAction.getAttribute("action")));
                this.clearAlerts();
                if (btnAction.getAttribute("action") === "S") {
                    btnAction.setAttribute("action", "C");
                    this.shadowRoot.querySelector(".form-confirm-password").style.display = "flex";
                    btnAction.innerHTML = createAccountText;
                } else {
                    btnAction.setAttribute("action", "S");
                    this.shadowRoot.querySelector(".form-confirm-password").style.display = "none";
                    btnAction.innerHTML = signInText;
                }
                btnAction.addEventListener('click', actions.get(btnAction.getAttribute("action")));
            });

        } catch (error) {
            console.log(error)
        }
    }

    checkSignInForm() {
        let result = false;
        this.clearAlerts();
        const user = this.getSignInData();

        const validations = [this.validateEmail(user.email), this.validatePassword(user.password)];
        if (!validations[0]) {
            //No es valido
            this.shadowRoot.querySelector('.form-email > .form-alert').innerHTML = 'El correo no es valido.'
        }
        if (!validations[1]) {
            //No es valido
            this.shadowRoot.querySelector('.form-password > .form-alert').innerHTML = 'La password no es valida.'
        }

        validations.some(v => {
            if (!v){
                return result = true;
            } 
        });

        return result;
    }
    checkCreateAccountForm() {
        let result = false;
        this.clearAlerts();
        const user = this.getCreateUserAccountData();
        console.log(user);

        const validations = [this.validateEmail(user.email), this.validatePassword(user.password), this.validateConfirmPassword(user.password, user.confirmPassword)];
        console.log(validations);
        if (!validations[0]) {
            //No es valido
            this.shadowRoot.querySelector('.form-email > .form-alert').innerHTML = 'El correo no es valido.'
        }
        if (!validations[1]) {
            //No es valido
            this.shadowRoot.querySelector('.form-password > .form-alert').innerHTML = 'La password no es valida.'
        }
        if (!validations[2]) {
            //No es valido
            this.shadowRoot.querySelector('.form-confirm-password > .form-alert').innerHTML = 'La password no coincide.'
        }

        validations.some(v => {
            if (!v){
                return result = true;
            } 
        });

        return result;
    }
    
    clearAlerts() {
        let alerts = this.shadowRoot.querySelectorAll('.form-alert');
        alerts.forEach( e => e.innerHTML = '');
    }

    validateEmail(email) {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return mailformat.test(email);
    }

    validatePassword(password) {
        return password !== '';
    }

    validateConfirmPassword(password, confirmPassword) {
        return (password === confirmPassword && this.validatePassword(password));
    }

    getSignInData() {
        return {
            email: this.shadowRoot.querySelector('.form-email > input').value,
            password: this.shadowRoot.querySelector('.form-password > input').value
        };
    }
    getCreateUserAccountData() {
        return {
            email: this.shadowRoot.querySelector('.form-email > input').value,
            password: this.shadowRoot.querySelector('.form-password > input').value,
            confirmPassword: this.shadowRoot.querySelector('.form-confirm-password > input').value
        };
    }
    

}

module.exports = { LoginComponent };