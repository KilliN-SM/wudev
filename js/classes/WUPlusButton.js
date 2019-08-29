class WUPlusButton extends HTMLElement
{
    constructor ()
    {
        super();

        const app = document.querySelector('app');
        const tab = new WUPlusNSettingsTab();

        tab.hide();
        app.appendChild(tab);
        
        this.onclick = () => tab.show();
        tab.onclick = e =>
        {
            if (e.target === tab) tab.hide();
        }
    }
}
window.customElements.define('wu-plus-button', WUPlusButton);