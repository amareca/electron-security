const { Component } = require('@component')

class AppComponent extends Component {
    constructor () {
        super()  
    }

    init() {
        this.path = __dirname
    }

    addEvents() {}

}

module.exports = { AppComponent} ;