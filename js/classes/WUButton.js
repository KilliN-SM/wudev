class WUButton extends HTMLElement
{
    constructor (hoverData, src, onclick)
    {
        super();

        this.hoverData = hoverData;
        this.className = 'box border';

        const img = new Image();
        img.hoverData = hoverData;
        img.src = src;

        this.addEventListener('click', onclick);

        this.appendChild(img);
    }
}
window.customElements.define('wu-button', WUButton);