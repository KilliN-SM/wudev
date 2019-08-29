class WUPlusButton extends HTMLElement
{
    constructor ()
    {
        super();

        const app = document.querySelector('app');
        const tab = new WUPlusNSettingsTab();

        tab.style.visibility = 'hidden';
        
        app.appendChild(tab);
        
        this.onclick = () => tab.style.visibility = 'visible';
    }
}
window.customElements.define('wu-plus-button', WUPlusButton);