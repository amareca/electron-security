const { Component } = require('@component')

class ViewComponent extends Component {
    constructor () {
        super()  
    }

    init() {
        this.path = __dirname
    }

    addEvents() {}

}

module.exports = { ViewComponent} ;