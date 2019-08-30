class WUButton extends HTMLElement
{
    constructor (title, icon, onclick)
    {
        super();

        const gfx = $.dom('gfx', { title, onclick });
        gfx.style.backgroundImage = `url(${icon})`;

        this.appendChild(gfx);
    }
}
window.customElements.define('wu-button', WUButton);