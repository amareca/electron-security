require('module-alias/register')

//Here defines components
const  {AppComponent} = require('../app/app-component.js');
const  {MenuComponent} = require('../app/menu/menu-component.js');
const  {ViewComponent} = require('../app/view/view-component.js');
customElements.define ('app-root', AppComponent);
customElements.define ('menu-component', MenuComponent);
customElements.define ('view-component', ViewComponent);


