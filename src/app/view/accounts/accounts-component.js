const { Component } = require('@component')

class AccountsComponent extends Component {
    constructor () {
        super();  
    }

    init() {
        this.path = __dirname
    }

    addEvents() {
        let ipcRenderer = require('electron').ipcRenderer;
        //Recibir llamada para cargar (tras login / nueva cuenta)

        //Envia una llamada para cargar los datos
    }

}

module.exports = { AccountsComponent };