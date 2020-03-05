const { Engine } = require('./engine.js');

class Component extends HTMLElement {
    constructor () {
        super();
        this.render();
    }

    init(){}

    async render() {
        this.init();
        try {
            await Engine.setFileComponents(this);
            this.addEvents();
        } catch (error) {
            console.error(error);
        }

    }
}
module.exports = { Component} ;