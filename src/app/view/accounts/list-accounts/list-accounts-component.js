const { Component } = require('@component')

class ListAccountsComponent extends Component {
    constructor () {
        super()  
    }

    init() {
        this.path = __dirname
    }

    addEvents() {}

}

module.exports = { ListAccountsComponent} ;