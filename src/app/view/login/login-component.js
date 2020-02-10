const { Component } = require('@component')

class LoginComponent extends Component {
    constructor () {
        super()  
    }

    init() {
        this.path = __dirname
    }

    addEvents() {}

}

module.exports = { LoginComponent} ;