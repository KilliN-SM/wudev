class WUCreateItemTab extends HTMLElement
{
    constructor ()
    {
        super();

        this.className = 'tab';

        this.onclick = e => e.target === this && this.hide();

        this.hide();
    }

    hide ()
    {
        this.style.visibility = 'hidden';
    }

    show ()
    {
        this.style.visibility = 'visible';
    }
}
window.customElements.define('wu-create-item-tab', WUCreateItemTab);