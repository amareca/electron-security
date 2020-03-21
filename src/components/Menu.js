import React from 'react';
import './Menu.css';

function Menu() {
    return (
        <div className="Menu">
            <div></div>
            <ul className="topmenu app-buttons">
                <li id="btn-pruebas" className="item" onClick={() => {
                    window.ipcRenderer.send('invokePruebas');
                }}>
                    <img src="https://img.icons8.com/windows/32/000000/security-configuration.png" />
                </li>
                <li id="btn-devTools" className="item" onClick={() => {
                    window.ipcRenderer.send('invokeDevTools');
                }}>
                    <img src="https://img.icons8.com/windows/32/000000/settings.png" />
                </li>
            </ul>
            <div></div>
            <ul className="topmenu window-buttons">
                <li id="btn-minimize" className="item" onClick={() => {
                    window.ipcRenderer.send('invokeMinimizeWindow');
                }}>
                    <img src="https://img.icons8.com/windows/32/000000/minus-math.png" />
                </li>
                <li id="btn-maximize" className="item" onClick={() => {
                    window.ipcRenderer.send('invokeMaximizeWindow');
                }}>
                    <img src="https://img.icons8.com/windows/32/000000/maximize-button.png" />
                </li>
                <li id="btn-cerrar" className="item" onClick={() => {
                    window.ipcRenderer.send('invokeCloseWindow');
                }}>
                    <img src="https://img.icons8.com/windows/32/000000/multiply.png" />
                </li>
            </ul>
        </div>
    );
}
export default Menu;