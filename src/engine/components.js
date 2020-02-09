const { Engine } = require('./engine.js')

class BaseComponent extends HTMLElement {
    constructor () {
        super()
        this.render()
    }

    init(){}

    async render() {
        this.init()

        await Engine.setFileComponents(this)
        
        this.addEvents()

    }
}
module.exports = { BaseComponent} ;