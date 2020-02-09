//Define new components

const components = [
    ['app-root', require('@app/app-component.js').AppComponent],
    ['menu-component', require('@app/menu/menu-component.js').MenuComponent],
    ['view-component', require('@app/view/view-component.js').ViewComponent]
]

components.forEach(c => {
    customElements.define (c[0], c[1]);
});


