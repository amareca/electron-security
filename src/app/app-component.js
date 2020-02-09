const { BaseComponent } = require('@components')

class AppComponent extends BaseComponent {
    constructor () {
        super()  
    }

    init() {
        this.path = __dirname
    }

    addEvents() {}

}

module.exports = { AppComponent} ;