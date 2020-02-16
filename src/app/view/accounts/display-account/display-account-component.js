const { Component } = require('@component')

class DisplayAccountComponent extends Component {
    constructor () {
        super()  
    }

    init() {
        this.path = __dirname
    }

    addEvents() {}

}

module.exports = { DisplayAccountComponent} ;