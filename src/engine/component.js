const { Engine } = require('./engine.js');

class Component extends HTMLElement {
    constructor () {
        super();
        this.render();
    }

    init(){}

    async render() {
        this.init();

        await Engine.setFileComponents(this);
        
        this.addEvents();

    }

    destroy() {
        this.parentNode.removeChild(this);
    }
}
module.exports = { Component} ;