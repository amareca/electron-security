const { BaseComponent } = require('@components')

class ViewComponent extends BaseComponent {
    constructor () {
        super()  
    }

    init() {
        this.path = __dirname
    }

    addEvents() {}

}

module.exports = { ViewComponent} ;