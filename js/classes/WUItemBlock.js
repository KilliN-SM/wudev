class WUItemBlock extends HTMLElement
{
    constructor (item)
    {
        super();
        
        this.item   = item;
        this.title  = item.name;
        this.gfx    = $.dom('gfx');
        this.hitBox = $.dom('hitBox');

        const elementColor = (item.element === 1 ? 'FB0' : item.element === 2 ? 'F22' : '09F');
        this.style.boxShadow = `0 0 calc(0.2vw + 0.2vh) #${ elementColor } inset`;
        this.gfx.style.backgroundImage = `url(${item.src})`;

        this.appendChild(this.gfx);
        this.appendChild(this.hitBox);
    }
}
window.customElements.define('wu-item-block', WUItemBlock);