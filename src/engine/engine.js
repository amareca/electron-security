const fs = require('fs');
const path = require('path')

const template = document.createElement('template');
let files, html, css

class Engine {

    //Devuelve un array con los ficheros del componente (nombre-component.html, .css, .js)
    static getComponentFiles(path) {
        return new Promise((resolve, reject) => {
            fs.readdir(path, (err, files) => {
                if (err) {
                    reject(Error(err))
                }
                resolve(files);
            });
        });
    }
    
    static getComponent(files, type) {
        return new Promise((resolve, reject) => {
            files.forEach(f => {
                if (f.match(new RegExp("-component." + type))) {
                    resolve('/' + f)
                }
            });
        });
    }

    static async setFileComponents(component) {
        files = await this.getComponentFiles(component.path)
        html = fs.readFileSync(path.join(component.path, await this.getComponent(files , 'html')), 'utf8')
        css = '<style>' + fs.readFileSync(path.join(component.path, await this.getComponent(files, 'css')), 'utf8') + '</style>'
        template.innerHTML = css + html
    
        component.attachShadow({mode: 'open'})
        component.shadowRoot.appendChild(template.content.cloneNode(true));
    }
} 
module.exports = {Engine}



