const { Component } = require('@component')

class AccountsComponent extends Component {
    constructor () {
        super()  
    }

    init() {
        this.path = __dirname
    }

    addEvents() {}

}

module.exports = { AccountsComponent} ;