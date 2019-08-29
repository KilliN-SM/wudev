class WUPlusButton extends HTMLElement
{
    constructor ()
    {
        super();

        const app = document.querySelector('app');
        const tab = new WUPlusNSettingsTab();

        tab.style.visibility = 'hidden';
        
        app.appendChild(tab);
        
        this.onclick = () => tab.show();
        tab.onclick = e => e.target === tab && tab.hide();
    }
}
window.customElements.define('wu-plus-button', WUPlusButton);