class WUButton extends HTMLElement
{
    constructor (hoverData, src, onclick)
    {
        super();

        this.hoverData = hoverData;
        this.onclick   = onclick;

        this.appendChild($.dom('gfx', { hoverData }));
        this.lastChild.style.backgroundImage = `url(${src})`;
    }
}
window.customElements.define('wu-button', WUButton);