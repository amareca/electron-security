const { Component } = require('@component')

class SearchBarComponent extends Component {
    constructor () {
        super()  
    }

    init() {
        this.path = __dirname
    }

    addEvents() {}

}

module.exports = { SearchBarComponent} ;