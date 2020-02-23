const { Component } = require('@component')

class MenuComponent extends Component {
    constructor () {
        super()  
    }

    init() {
        this.path = __dirname
    }

    addEvents() {
        var ipcRenderer = require('electron').ipcRenderer;
        try {
            const btnClose = this.shadowRoot.getElementById('btn-cerrar')
            btnClose.addEventListener('click', () => {
                ipcRenderer.send('invokeCloseWindow')
            });
            const btnMinimize = this.shadowRoot.getElementById('btn-minimize')
            btnMinimize.addEventListener('click', () => {
                ipcRenderer.send('invokeMinimizeWindow', 'someData');
            });
            const btnMaximize = this.shadowRoot.getElementById('btn-maximize')
            btnMaximize.addEventListener('click', () => {
                ipcRenderer.send('invokeMaximizeWindow', 'someData');
                btnMaximize.firstElementChild.src = 'https://img.icons8.com/small/32/000000/restore-down.png'
            });
            const btnDevTools = this.shadowRoot.getElementById('btn-devTools')
            btnDevTools.addEventListener('click', () => {
                ipcRenderer.send('invokeDevTools', 'someData');
            });
            const btnPruebas = this.shadowRoot.getElementById('btn-pruebas')
            btnPruebas.addEventListener('click', () => {
                ipcRenderer.send('invokePruebas', 'someData');
            });
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = { MenuComponent} ;